"use client";

import { Button } from "./ui/Button";

const cards = [
  {
    emoji: "🧑‍💼",
    title: "Événements d’entreprise",
    description:
      "Formules sur-mesure pour vos team buildings, afterworks ou séminaires, avec possibilité de restauration et d’espaces privatifs.",
  },
  {
    emoji: "🎾",
    title: "Cours & coaching privé",
    description:
      "Sessions encadrées pour vos collaborateurs ou groupes, tous niveaux. Coaching, initiation ou perfectionnement à la carte.",
  },
  {
    emoji: "🏆",
    title: "Tournois & challenges",
    description:
      "Organisez votre tournoi privé entre collègues, partenaires ou ami·e·s, dans une ambiance dynamique et clé-en-main.",
  },
];

export default function TeamBuilding() {
  return (
    <section id="events" className="relative scroll-mt-24 py-20">
      {/* Structure d’origine conservée */}
      <div className="absolute inset-0 bg-black opacity-70 z-10" />
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Corporate%20team%20building%20event%20on%20padel%20court%2C%20diverse%20group%20of%20professionals%20in%20casual%20attire%20playing%20and%20laughing%20together%2C%20modern%20sports%20facility%20with%20glass%20walls%2C%20team%20bonding%20activity%2C%20professional%20photography%20with%20natural%20lighting%2C%20wide%20angle%20view%20capturing%20the%20group%20dynamics%20and%20energy&width=1440&height=600&seq=5&orientation=landscape')`,
        }}
      />
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{}} />
      {/* Filets orange */}
      <div className="absolute top-0 left-0 right-0 h-1 z-30 bg-gradient-to-r from-transparent via-[#FF6727] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 z-30 bg-gradient-to-r from-transparent via-[#FF6727] to-transparent" />

      <div className="container mx-auto px-4 relative z-20">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-[#FF6727]/20 text-[#FF6727] border border-[#FF6727]/30 mb-4">
            Entreprises & Groupes
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Team Building & Événements
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Organisez vos événements d’entreprise ou privés dans un lieu
            atypique au cœur de Paris. Renforcez la cohésion de vos équipes ou
            célébrez une occasion spéciale.
          </p>
        </div>

        {/* Cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-full bg-[#FF6727]/20 flex items-center justify-center text-2xl mb-5">
                {card.emoji}
              </div>
              <h3 className="text-white text-lg font-semibold mb-3">
                {card.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            <Button className="bg-[#FF6727] hover:bg-orange-600 cursor-pointer">
              Contactez-nous
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
