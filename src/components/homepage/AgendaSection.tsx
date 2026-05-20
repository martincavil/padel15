import Link from "next/link";
import { Calendar, ChevronRight, Trophy, Users } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import {
  getUpcomingTournaments,
  formatTournamentDate,
  genderLabel,
  levelLabel,
  statusLabel,
  PLAYTOMIC_CLUB_URL,
  type PlaytomicTournament,
} from "@/lib/playtomic";

function TournamentCard({ t }: { t: PlaytomicTournament }) {
  const date = formatTournamentDate(t.start_date);
  const status = statusLabel(t.tournament_status, t.available_places);
  const price = t.price.replace(" EUR", " €");

  const statusColors = {
    green: "bg-green-50 text-green-700 border-green-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
    gray: "bg-gray-100 text-gray-500 border-gray-200",
  };

  return (
    <a
      href={PLAYTOMIC_CLUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-2xl p-5 border border-gray-200 hover:border-brand hover:shadow-md transition-all"
    >
      <div className="flex items-start gap-4">
        {/* Date badge */}
        <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-brand/8 flex flex-col items-center justify-center">
          <span className="font-buzz text-xl text-brand leading-none">{date.day}</span>
          <span className="text-xs text-brand/70 uppercase tracking-wide">{date.month}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-3.5 h-3.5 text-brand flex-shrink-0" />
            <span className="text-xs font-semibold text-brand uppercase tracking-wider">
              Tournoi · {genderLabel(t.gender)}
            </span>
          </div>
          <h3 className="font-semibold text-sm leading-snug mb-1 group-hover:text-brand transition-colors">
            {t.tournament_name}
          </h3>
          <p className="text-gray-400 text-xs mb-2">
            {levelLabel(t.level_description)} · {price} / équipe
          </p>
          <span
            className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${statusColors[status.color]}`}
          >
            <Calendar className="w-3 h-3" />
            {status.text}
          </span>
        </div>
      </div>
    </a>
  );
}

export async function AgendaSection() {
  const tournaments = await getUpcomingTournaments();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand/10 text-brand border border-brand/20 mb-3">
                Agenda
              </span>
              <h2 className="font-buzz text-3xl md:text-4xl">Prochains tournois</h2>
            </div>
            <a
              href={PLAYTOMIC_CLUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
            >
              Voir sur Playtomic <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </AnimatedSection>

        {tournaments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tournaments.map((t, i) => (
              <AnimatedSection key={t.tournament_id} delay={i * 0.08}>
                <TournamentCard t={t} />
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <AnimatedSection>
            <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
              <Trophy className="w-8 h-8 text-brand/30 mx-auto mb-3" />
              <p className="font-semibold text-gray-700 mb-1">Aucun tournoi à venir pour le moment</p>
              <p className="text-gray-400 text-sm mb-4">
                Consultez Playtomic pour voir tous les créneaux disponibles
              </p>
              <a
                href={PLAYTOMIC_CLUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
              >
                Voir sur Playtomic
              </a>
            </div>
          </AnimatedSection>
        )}

        <div className="text-center mt-4 md:hidden">
          <a
            href={PLAYTOMIC_CLUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-brand hover:underline"
          >
            Voir tous les tournois sur Playtomic →
          </a>
        </div>

        {/* Bloc événements entreprise */}
        <AnimatedSection delay={0.3}>
          <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-brand" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-0.5">Organiser un événement entreprise ?</p>
                <p className="text-gray-500 text-sm">Team building, tournoi corporate, soirée privée — sur-mesure.</p>
              </div>
            </div>
            <Link
              href="/entreprises"
              className="flex-shrink-0 bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap"
            >
              Demander un devis
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
