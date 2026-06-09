const TENANT_ID = "1191f8b5-ea25-4153-89fb-997b6ec5b053";
const API_URL = `https://api.playtomic.io/v1/tournaments?tenant_id=${TENANT_ID}&size=20`;
export const PLAYTOMIC_CLUB_URL = "https://playtomic.com/clubs/padel-15";

function buildHeaders(): HeadersInit {
  const key = process.env.PLAYTOMIC_API_KEY;
  return key ? { "x-api-key": key } : {};
}

export interface PlaytomicTournament {
  tournament_id: string;
  tournament_name: string;
  tournament_image: string | null;
  start_date: string;
  end_date: string;
  registration_closing_time: string;
  type: string;
  max_players: number;
  available_places: number;
  level_description: string;
  price: string;
  gender: "MIXED" | "MALE" | "FEMALE";
  tournament_status:
    | "REGISTRATION_OPEN"
    | "REGISTRATION_CLOSED"
    | "PLAYED"
    | "CANCELLED"
    | string;
  description: string | null;
}

// Données de fallback si l'API est indisponible
const FALLBACK: PlaytomicTournament[] = [];

export async function getUpcomingTournaments(): Promise<PlaytomicTournament[]> {
  try {
    const res = await fetch(API_URL, {
      headers: buildHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK;

    type RawTournament = PlaytomicTournament & {
      is_cancelled?: boolean;
      tournament_visibility?: string;
    };
    const raw = (await res.json()) as RawTournament[];
    const now = new Date();

    return raw
      .filter((t) => {
        const start = new Date(t.start_date);
        return (
          !t.is_cancelled &&
          t.tournament_visibility === "PUBLIC" &&
          (t.tournament_status === "REGISTRATION_OPEN" ||
            t.tournament_status === "REGISTRATION_CLOSED") &&
          start >= now
        );
      })
      .sort(
        (a, b) =>
          new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
      )
      .slice(0, 6)
      // Strip registered_players et toute donnée personnelle (RGPD)
      .map((t) => ({
        tournament_id: t.tournament_id,
        tournament_name: t.tournament_name,
        tournament_image: t.tournament_image ?? null,
        start_date: t.start_date,
        end_date: t.end_date,
        registration_closing_time: t.registration_closing_time,
        type: t.type,
        max_players: t.max_players,
        available_places: t.available_places,
        level_description: t.level_description,
        price: t.price,
        gender: t.gender,
        tournament_status: t.tournament_status,
        description: t.description ?? null,
      }));
  } catch {
    return FALLBACK;
  }
}

export function tournamentUrl(tournament_id: string): string {
  return `https://app.playtomic.io/tournament/${tournament_id}`;
}

// Helpers d'affichage
export function formatTournamentDate(iso: string): { day: string; month: string; full: string } {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString("fr-FR", { day: "2-digit" }),
    month: d.toLocaleDateString("fr-FR", { month: "short" }).replace(".", ""),
    full: d.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }),
  };
}

export function genderLabel(gender: PlaytomicTournament["gender"]): string {
  return { MIXED: "Mixte", MALE: "Hommes", FEMALE: "Femmes" }[gender] ?? gender;
}

export function levelLabel(description: string): string {
  if (!description || description === "0.00 - 7.00") return "Tous niveaux";
  return `Niveau ${description}`;
}

export function statusLabel(
  status: string,
  availablePlaces: number
): { text: string; color: "green" | "orange" | "gray" } {
  if (status === "REGISTRATION_OPEN" && availablePlaces > 0)
    return { text: `${availablePlaces} place${availablePlaces > 1 ? "s" : ""} restante${availablePlaces > 1 ? "s" : ""}`, color: "green" };
  if (status === "REGISTRATION_OPEN" && availablePlaces === 0)
    return { text: "Complet", color: "gray" };
  if (status === "REGISTRATION_CLOSED")
    return { text: "Inscriptions closes", color: "orange" };
  return { text: status, color: "gray" };
}
