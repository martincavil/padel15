import { Briefcase, Activity, Trophy } from "lucide-react";

const CARDS = [
  {
    icon: Briefcase,
    title: "Événements d'entreprise",
    description:
      "Formules sur-mesure pour vos team buildings, afterworks ou séminaires, avec restauration et espaces privatifs.",
  },
  {
    icon: Activity,
    title: "Coaching privé en groupe",
    description:
      "Sessions encadrées pour vos collaborateurs, tous niveaux. Coaching, initiation ou perfectionnement.",
  },
  {
    icon: Trophy,
    title: "Tournois & challenges",
    description:
      "Organisez votre tournoi privé entre collègues ou partenaires dans une ambiance dynamique clé-en-main.",
  },
];

const TESTIMONIAL = {
  quote:
    "Le team building le plus réussi qu&apos;on ait organisé — tout le monde est reparti avec l&apos;envie de revenir.",
  author: "Marie D.",
  company: "BNP Paribas",
};

export function B2BSection() {
  return (
    <section
      className="relative py-24 overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/terrains/match.webp')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/75 z-10" />
      {/* Orange accent lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent z-20" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent z-20" />

      <div className="relative z-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-brand/20 text-brand border border-brand/30 mb-4">
            Entreprises &amp; Groupes
          </span>
          <h2 className="font-buzz text-white mb-4">
            Team Building &amp; Événements
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto text-lg">
            Renforcez la cohésion de vos équipes dans un lieu atypique au cœur
            de Paris.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-white font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Testimonial */}
        <div className="max-w-xl mx-auto text-center mb-10 bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-white/90 italic text-base mb-3">
            &ldquo;Le team building le plus réussi qu&apos;on ait organisé —
            tout le monde est reparti avec l&apos;envie de revenir.&rdquo;
          </p>
          <p className="text-brand text-sm font-semibold">
            {TESTIMONIAL.author} — {TESTIMONIAL.company}
          </p>
        </div>

        <div className="text-center">
          <a
            href="mailto:contact@padel15.fr?subject=Demande de devis événement&body=Bonjour, je souhaite obtenir un devis pour :"
            className="bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block"
          >
            Organiser mon événement
          </a>
        </div>
      </div>
    </section>
  );
}
