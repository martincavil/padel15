export const PLAYTOMIC_CLUB_URL = "https://playtomic.com/clubs/padel-15";

/**
 * ⚠️ Les tournois ne sont plus récupérables automatiquement.
 *
 * L'ancienne API (api.playtomic.io/v1/tournaments) a été fermée le 15/07/2026.
 * La nouvelle API tierce partie (thirdparty.playtomic.io) n'expose que
 * Authentication, Bookings, Players et Payments — aucun endpoint tournois.
 * Le champ `tournament_id` des réservations n'est jamais renseigné (vérifié
 * sur 128 réservations réparties sur 30 jours).
 *
 * `getUpcomingTournaments()` renvoie donc systématiquement une liste vide, et
 * AgendaSection affiche son repli (« Aucun tournoi à venir » + lien Playtomic).
 * On n'appelle plus l'ancienne URL : elle répond 403 et faisait attendre le
 * rendu de la page pour rien.
 *
 * Pour réactiver la section : soit Playtomic rouvre un endpoint tournois, soit
 * on passe par une saisie manuelle (CMS ou données en dur).
 */

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

export async function getUpcomingTournaments(): Promise<PlaytomicTournament[]> {
  // Aucune source de données disponible — cf. commentaire en tête de fichier.
  return [];
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
