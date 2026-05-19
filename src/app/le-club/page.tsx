import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Values from "@/components/Values";

export const metadata: Metadata = {
  title: "Le Club | Padel 15 — Infrastructure, Valeurs, Coworking, Accessibilité",
  description:
    "Découvrez Padel 15 : club haut de gamme au 115 rue Castagnary, Paris 15ème. Terrains, restaurant, guinguette, coworking, vestiaires, accès PMR.",
  openGraph: {
    title: "Le Club — Padel 15 Paris 15ème",
    images: [{ url: "/rest-inte-grand-angle.webp" }],
  },
};

const INFRA_ITEMS = [
  { icon: "🎾", label: "2 terrains de padel", detail: "Couverts et extérieurs, panoramiques" },
  { icon: "🍽️", label: "Restaurant & Bar", detail: "Service continu 7j/7, produits frais" },
  { icon: "🌿", label: "Terrasse guinguette", detail: "Végétalisée, pétanque, espaces lounge" },
  { icon: "💻", label: "Espace coworking", detail: "WiFi haut débit, cadre unique" },
  { icon: "🚿", label: "Vestiaires & Douches", detail: "Équipements modernes et propres" },
  { icon: "🚲", label: "Garage à vélo", detail: "Sécurisé, gratuit" },
  { icon: "💧", label: "Fontaine à eau", detail: "En libre-service" },
  { icon: "♿", label: "Accessibilité PMR", detail: "Site entièrement accessible" },
];

export default function LeClubPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <Image
          src="/rest-inte-grand-angle.webp"
          alt="Padel 15 — Le Club"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="font-buzz text-4xl md:text-6xl mb-4">Le Club</h1>
          <p className="text-white/80 max-w-lg text-lg">
            115 rue Castagnary, Paris 15ème — bien plus qu&apos;un club de padel
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-16">

        {/* Notre histoire */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-buzz text-3xl mb-4">Notre histoire</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Padel 15 est né d&apos;une passion commune pour le padel et d&apos;une vision : créer le club
                de référence du 15ème arrondissement, alliant sport de haut niveau, art de vivre et
                convivialité.
              </p>
              <p>
                Installé au 115 rue Castagnary, notre espace de vie unique mêle terrains de padel
                panoramiques, restaurant à la cuisine généreuse et terrasse guinguette dépaysante —
                le tout dans un cadre végétalisé en plein cœur de Paris.
              </p>
            </div>
          </div>
          <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
            <Image src="/guinguette.webp" alt="Ambiance Padel 15" fill className="object-cover" />
          </div>
        </div>

        {/* Infrastructure */}
        <div>
          <h2 className="font-buzz text-3xl mb-8 text-center">Notre infrastructure</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INFRA_ITEMS.map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-xl p-5 text-center">
                <span className="text-3xl block mb-2">{item.icon}</span>
                <p className="font-semibold text-sm">{item.label}</p>
                <p className="text-gray-500 text-xs mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Valeurs */}
        <Values />

        {/* CTA */}
        <div className="text-center">
          <h2 className="font-buzz text-2xl mb-4">Venez découvrir Padel 15</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://playtomic.com/clubs/padel-15"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Réserver un terrain
            </a>
            <Link
              href="/contact"
              className="border border-gray-300 hover:border-brand text-gray-700 hover:text-brand font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
