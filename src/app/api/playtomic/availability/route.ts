import { NextRequest, NextResponse } from "next/server";

const TENANT_ID = "1191f8b5-ea25-4153-89fb-997b6ec5b053";

// Playtomic n'ouvre les réservations que quelques jours à l'avance (cf. copy du site)
const OPENING_WINDOW_DAYS = 5;

// Les start_time de l'API Playtomic sont en UTC — on convertit en heure Paris
function utcSlotToParisHour(dateStr: string, utcTimeStr: string): number {
  const d = new Date(`${dateStr}T${utcTimeStr}Z`);
  const parisTime = d.toLocaleTimeString("fr-FR", {
    timeZone: "Europe/Paris",
    hour12: false,
  });
  return parseInt(parisTime.split(":")[0], 10);
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
  return diffDays <= OPENING_WINDOW_DAYS;
}

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "date invalide (YYYY-MM-DD requis)" },
      { status: 400 },
    );
  }

  const apiKey = process.env.PLAYTOMIC_API_KEY;
  const url =
    `https://api.playtomic.io/v1/availability` +
    `?tenant_id=${TENANT_ID}&sport_id=PADEL` +
    `&local_start_min=${date}T00:00:00&local_start_max=${date}T23:59:59`;

  try {
    const res = await fetch(url, {
      headers: apiKey ? { "x-api-key": apiKey } : {},
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error(
        "[playtomic] availability fetch failed",
        res.status,
        await res.text(),
      );
      return NextResponse.json({ availableHours: [], hasData: false });
    }

    const courts: Array<{
      slots: Array<{ start_time: string; duration: number }>;
    }> = await res.json();

    // hasData = le jour est dans la fenêtre de réservation Playtomic.
    // Un tableau de terrains vide dans cette fenêtre veut dire "complet",
    // pas "pas encore ouvert" (Playtomic ne renvoie pas de terrain sans créneau libre).
    const hasData = courts.length > 0 || isWithinOpeningWindow(date);

    const availableHours = new Set<number>();
    for (const court of courts) {
      for (const slot of court.slots) {
        // On ne filtre plus par durée : Playtomic peut proposer 60/90/120min
        // (et potentiellement d'autres durées à l'avenir) pour un même horaire.
        const parisHour = utcSlotToParisHour(date, slot.start_time);
        availableHours.add(parisHour);
      }
    }

    return NextResponse.json({
      availableHours: Array.from(availableHours).sort((a, b) => a - b),
      hasData,
    });
  } catch (err) {
    console.error("[playtomic] availability fetch threw", err);
    return NextResponse.json({ availableHours: [], hasData: false });
  }
}
