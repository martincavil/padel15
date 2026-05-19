import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Clients from "@/components/Clients";
import { JsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Team Building Paris 15 | Événements d'entreprise — Padel 15",
  description:
    "Organisez vos team buildings, afterworks et séminaires dans un lieu unique Paris 15ème. Terrains privatisables, restauration, coaching. BlackRock, BNP, BCG, Kering…",
  openGraph: {
    title: "Team Building & Événements d'entreprise — Padel 15",
    images: [{ url: "/terrain-ext-jour.webp" }],
  },
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: "Padel 15 — Espace Événements",
  address: {
    "@type": "PostalAddress",
    streetAddress: "115 rue Castagnary",
    postalCode: "75015",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
};

const FORMULES = [
  {
    icon: "🎾",
    title: "Team Building Padel",
    description: "Tournoi privé entre collègues, coaching collectif initiation, arbitre inclus. Idéal 8 à 40 personnes.",
    includes: ["Terrain(s) privatisé(s)", "Coach dédié", "Arbitre", "Matériel fourni"],
  },
  {
    icon: "🍽️",
    title: "Afterwork & Soirée",
    description: "Padel + restaurant/guinguette en formule tout-compris. Privatisation totale ou partielle.",
    includes: ["Accès terrains", "Buffet ou menu", "Bar privatisé", "Animation"],
  },
  {
    icon: "📋",
    title: "Séminaire & Convention",
    description: "Espace coworking + terrains pour vos conventions, kick-offs et séminaires d'équipe.",
    includes: ["Espace coworking", "Terrains privatisés", "Restauration", "Équipement AV"],
  },
];

export default function EvenementsPage() {
  return (
    <>
      <JsonLd data={eventSchema} />

      {/* Hero */}
      <div className="relative h-80 md:h-[480px] overflow-hidden">
        <Image
          src="/terrain-ext-jour.webp"
          alt="Événements d'entreprise Padel 15"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 text-center">
          <span className="text-sm font-semibold text-brand uppercase tracking-wider mb-3">Entreprises &amp; Groupes</span>
          <h1 className="font-buzz text-4xl md:text-6xl mb-4">Team Building &amp; Événements</h1>
          <p className="text-white/80 max-w-xl text-lg">
            BlackRock, BNP Paribas, BCG, Kering, AXA… et plus de 20 entreprises de premier plan leur font confiance.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-20">

        {/* Formules */}
        <div>
          <div className="text-center mb-10">
            <h2 className="font-buzz text-3xl mb-3">Nos Formules</h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Chaque événement est sur-mesure. Nous nous adaptons à vos besoins, votre budget et votre groupe.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FORMULES.map((f) => (
              <div key={f.title} className="border border-gray-200 rounded-2xl p-6 hover:border-brand transition-colors">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{f.description}</p>
                <ul className="space-y-1.5">
                  {f.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-brand font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Logos clients */}
        <div className="bg-gray-50 rounded-2xl py-10 overflow-hidden">
          <Clients />
        </div>

        {/* Contact CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-buzz text-3xl mb-4">Demandez un devis</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Décrivez votre projet et notre équipe revient vers vous sous 24h avec une proposition personnalisée.
            </p>
            <div className="space-y-3 text-gray-700 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-brand font-bold">✓</span>
                <span>Réponse sous 24h ouvrées</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-brand font-bold">✓</span>
                <span>Devis gratuit et sans engagement</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-brand font-bold">✓</span>
                <span>Formule entièrement sur-mesure</span>
              </div>
            </div>
            <a
              href="mailto:contact@padel15.fr?subject=Événement entreprise"
              className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors inline-block"
            >
              Envoyer une demande
            </a>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
            <Image src="/guinguette.webp" alt="Espace événements Padel 15" fill className="object-cover" />
          </div>
        </div>

      </div>
    </>
  );
}
