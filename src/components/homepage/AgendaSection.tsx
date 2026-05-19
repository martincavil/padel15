import Link from "next/link";
import { Calendar, Users, Trophy, ChevronRight } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const EVENTS = [
  {
    date: { day: "14", month: "Jun" },
    type: "Tournoi",
    icon: Trophy,
    title: "Tournoi Open Padel 15",
    description: "Compétition ouverte à tous niveaux — inscriptions ouvertes",
    spots: "12 places restantes",
    href: "/contact",
  },
  {
    date: { day: "21", month: "Jun" },
    type: "Team Building",
    icon: Users,
    title: "Journée Entreprise — Formule Premium",
    description: "Terrains privatisés + coaching + restaurant — groupe 20-40 pers.",
    spots: "Sur réservation",
    href: "/evenements",
  },
  {
    date: { day: "28", month: "Jun" },
    type: "Tournoi",
    icon: Trophy,
    title: "Challenge Mixte Été",
    description: "Format mixte convivial — tous niveaux bienvenus",
    spots: "8 places restantes",
    href: "/contact",
  },
];

export function AgendaSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand/10 text-brand border border-brand/20 mb-3">
                Agenda
              </span>
              <h2 className="font-buzz text-3xl md:text-4xl">Prochains événements</h2>
            </div>
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
            >
              Voir tout <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {EVENTS.map((event, i) => {
            const Icon = event.icon;
            return (
              <AnimatedSection key={event.title} delay={i * 0.1}>
                <Link
                  href={event.href}
                  className="group block bg-white rounded-2xl p-5 border border-gray-200 hover:border-brand hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    {/* Date badge */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-brand/8 flex flex-col items-center justify-center">
                      <span className="font-buzz text-xl text-brand leading-none">{event.date.day}</span>
                      <span className="text-xs text-brand/70 uppercase tracking-wide">{event.date.month}</span>
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                        <span className="text-xs font-semibold text-brand uppercase tracking-wider">{event.type}</span>
                      </div>
                      <h3 className="font-semibold text-sm leading-snug mb-1 group-hover:text-brand transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed mb-2">{event.description}</p>
                      <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {event.spots}
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>

        <div className="text-center mt-6 md:hidden">
          <Link href="/contact" className="text-sm font-medium text-brand hover:underline">
            Voir tous les événements →
          </Link>
        </div>

        {/* Newsletter tournois — inline */}
        <AnimatedSection delay={0.3}>
          <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-5">
            <div>
              <p className="font-semibold text-gray-900 mb-1">Recevez le calendrier des tournois chaque mois</p>
              <p className="text-gray-500 text-sm">Tournois, matchs amicaux, soirées club — en avant-première.</p>
            </div>
            <a
              href="mailto:contact@padel15.fr?subject=Newsletter tournois"
              className="flex-shrink-0 bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap"
            >
              S&apos;inscrire à la newsletter
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
