import { NextRequest, NextResponse } from "next/server";

const TENANT_ID = "1191f8b5-ea25-4153-89fb-997b6ec5b053";

// Les start_time de l'API Playtomic sont en UTC — on convertit en heure Paris
function utcSlotToParisHour(dateStr: string, utcTimeStr: string): number {
  const d = new Date(`${dateStr}T${utcTimeStr}Z`);
  const parisTime = d.toLocaleTimeString("fr-FR", {
    timeZone: "Europe/Paris",
    hour12: false,
  });
  return parseInt(parisTime.split(":")[0], 10);
}

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "date invalide (YYYY-MM-DD requis)" }, { status: 400 });
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
      return NextResponse.json({ availableHours: [], hasData: false });
    }

    const courts: Array<{ slots: Array<{ start_time: string; duration: number }> }> =
      await res.json();

    // hasData = Playtomic a ouvert ce jour (au moins un terrain retourné)
    const hasData = courts.length > 0;

    const availableHours = new Set<number>();
    for (const court of courts) {
      for (const slot of court.slots) {
        if (slot.duration === 60) {
          // Conversion UTC → heure locale Paris
          const parisHour = utcSlotToParisHour(date, slot.start_time);
          availableHours.add(parisHour);
        }
      }
    }

    return NextResponse.json({
      availableHours: Array.from(availableHours).sort((a, b) => a - b),
      hasData,
    });
  } catch {
    return NextResponse.json({ availableHours: [], hasData: false });
  }
}
