import { NextRequest, NextResponse } from "next/server";
import {
  getAccessToken,
  PLAYTOMIC_API_BASE,
  TENANT_ID,
} from "@/lib/playtomic-auth";

/**
 * Disponibilités des terrains.
 *
 * La nouvelle API tierce partie Playtomic n'expose plus d'endpoint
 * `availability` : on déduit les créneaux libres en inversant les
 * réservations existantes (/bookings).
 *
 * Limite assumée : une fermeture technique (maintenance, météo) n'est pas une
 * réservation et n'apparaît donc pas ici — le terrain sera affiché comme libre.
 * Le widget renvoie vers Playtomic pour la réservation réelle.
 */

// Court ASICS + Court CUPRA. Figé volontairement : un terrain sans aucune
// réservation n'apparaît pas dans la réponse, impossible de le déduire.
const COURT_COUNT = 2;

const OPEN_HOUR = 8;
const CLOSE_HOUR = 22;
const STEP_MIN = 30; // Playtomic aligne les réservations sur des demi-heures.
const MIN_DURATION_MIN = 60; // Durée réservable la plus courte.

// Playtomic n'ouvre les réservations que quelques jours à l'avance.
const OPENING_WINDOW_DAYS = 5;

interface PlaytomicBooking {
  resource_id: string;
  booking_start_date: string; // "2026-09-01T19:00:00" — heure locale du club
  booking_end_date: string;
  is_canceled: boolean;
}

/** "2026-09-01T19:30:00" → 1170 (minutes depuis minuit). */
function toMinutes(isoLocal: string): number {
  return Number(isoLocal.slice(11, 13)) * 60 + Number(isoLocal.slice(14, 16));
}

/** 1170 → "19:30" */
function toLabel(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function isWithinOpeningWindow(date: string): boolean {
  const todayStr = new Date().toLocaleDateString("en-CA", {
    timeZone: "Europe/Paris",
  });
  const diffDays = Math.round(
    (new Date(`${date}T00:00:00Z`).getTime() -
      new Date(`${todayStr}T00:00:00Z`).getTime()) /
      86_400_000,
  );
  return diffDays >= 0 && diffDays <= OPENING_WINDOW_DAYS;
}

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "date invalide (YYYY-MM-DD requis)" },
      { status: 400 },
    );
  }

  // Hors fenêtre de réservation : inutile d'appeler l'API, le visiteur ne
  // pourrait de toute façon pas réserver ce jour-là.
  if (!isWithinOpeningWindow(date)) {
    return NextResponse.json({ availableSlots: [], hasData: false });
  }

  const token = await getAccessToken();
  if (!token) {
    return NextResponse.json({ availableSlots: [], hasData: false });
  }

  const url =
    `${PLAYTOMIC_API_BASE}/bookings` +
    `?tenant_id=${TENANT_ID}` +
    `&start_booking_date=${date}T00:00:00` +
    `&end_booking_date=${date}T23:59:59`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error(
        "[playtomic] bookings fetch failed",
        res.status,
        await res.text(),
      );
      return NextResponse.json({ availableSlots: [], hasData: false });
    }

    const bookings: PlaytomicBooking[] = await res.json();

    // Intervalles occupés, groupés par terrain.
    const busyByCourt = new Map<string, Array<[number, number]>>();
    for (const b of bookings) {
      if (b.is_canceled) continue;
      const start = toMinutes(b.booking_start_date);
      const end = toMinutes(b.booking_end_date);
      if (end <= start) continue; // réservation à cheval sur minuit : ignorée
      const list = busyByCourt.get(b.resource_id) ?? [];
      list.push([start, end]);
      busyByCourt.set(b.resource_id, list);
    }

    // Un créneau est disponible s'il reste au moins un terrain libre sur toute
    // la durée minimale réservable.
    const availableSlots: string[] = [];
    const lastStart = CLOSE_HOUR * 60 - MIN_DURATION_MIN;

    for (let t = OPEN_HOUR * 60; t <= lastStart; t += STEP_MIN) {
      const windowEnd = t + MIN_DURATION_MIN;
      let busyCourts = 0;
      for (const intervals of busyByCourt.values()) {
        if (intervals.some(([s, e]) => s < windowEnd && e > t)) busyCourts++;
      }
      if (busyCourts < COURT_COUNT) availableSlots.push(toLabel(t));
    }

    return NextResponse.json({ availableSlots, hasData: true });
  } catch (err) {
    console.error("[playtomic] bookings fetch threw", err);
    return NextResponse.json({ availableSlots: [], hasData: false });
  }
}
