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

/**
 * Les dates de l'API Playtomic sont en UTC, sans suffixe « Z ».
 * Vérifié le 04/09/2026 en comparant au planning public playtomic.com :
 * lecture en heure murale → 2 créneaux sur 30 concordants ; conversion depuis
 * UTC → 14/14. C'est aussi ce qui aligne les données sur l'amplitude réelle
 * du club (08:00–22:00) et sur le pic de fréquentation du soir.
 *
 * On passe par Intl plutôt qu'un décalage fixe : Paris est UTC+2 l'été mais
 * UTC+1 l'hiver.
 */
const PARIS_HM = new Intl.DateTimeFormat("fr-FR", {
  timeZone: "Europe/Paris",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/** "2026-09-04T17:00:00" (UTC) → 1140 (19:00 à Paris, en minutes). */
function toParisMinutes(isoUtc: string): number {
  const parts = PARIS_HM.formatToParts(new Date(`${isoUtc}Z`));
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return h * 60 + m;
}

/** Date calendaire à Paris ("2026-09-04") d'un instant UTC. */
function toParisDate(isoUtc: string): string {
  return new Date(`${isoUtc}Z`).toLocaleDateString("en-CA", {
    timeZone: "Europe/Paris",
  });
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

  // La plage est interrogée en UTC et élargie d'un jour de chaque côté : la
  // journée parisienne déborde sur deux journées UTC. On filtre ensuite sur la
  // date parisienne réelle de chaque réservation.
  const dayMs = 86_400_000;
  const prev = new Date(`${date}T00:00:00Z`).getTime() - dayMs;
  const next = new Date(`${date}T00:00:00Z`).getTime() + dayMs;
  const toIso = (ms: number) => new Date(ms).toISOString().slice(0, 10);

  const url =
    `${PLAYTOMIC_API_BASE}/bookings` +
    `?tenant_id=${TENANT_ID}` +
    `&start_booking_date=${toIso(prev)}T00:00:00` +
    `&end_booking_date=${toIso(next)}T23:59:59`;

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
      // On ne garde que les réservations du jour demandé, en heure de Paris.
      if (toParisDate(b.booking_start_date) !== date) continue;
      const start = toParisMinutes(b.booking_start_date);
      let end = toParisMinutes(b.booking_end_date);
      // Réservation qui déborde sur le lendemain : on la borne à minuit.
      if (end <= start) end = 24 * 60;
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
