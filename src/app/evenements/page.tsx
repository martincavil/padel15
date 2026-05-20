import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Activity, Utensils, ClipboardList, Check } from "lucide-react";
import Clients from "@/components/Clients";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export const metadata: Metadata = {
  title: "Team Building Paris 15 | Événements d'entreprise — Padel 15",
  description:
    "Organisez vos team buildings, afterworks et séminaires dans un lieu unique Paris 15ème. Terrains privatisables, restauration, coaching. BlackRock, BNP, BCG, Kering…",
  openGraph: {
    title: "Team Building & Événements d'entreprise — Padel 15",
    images: [{ url: "/images/terrains/terrain-ext-jour.webp" }],
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
    icon: Activity,
    title: "Team Building Padel",
    description: "Tournoi privé entre collègues, coaching collectif initiation, arbitre inclus. Idéal 8 à 40 personnes.",
    includes: ["Terrain(s) privatisé(s)", "Coach dédié", "Arbitre", "Matériel fourni"],
  },
  {
    icon: Utensils,
    title: "Afterwork & Soirée",
    description: "Padel + restaurant/guinguette en formule tout-compris. Privatisation totale ou partielle.",
    includes: ["Accès terrains", "Buffet ou menu", "Bar privatisé", "Animation"],
  },
  {
    icon: ClipboardList,
    title: "Séminaire & Convention",
    description: "Espace coworking + terrains pour vos conventions, kick-offs et séminaires d'équipe.",
    includes: ["Espace coworking", "Terrains privatisés", "Restauration", "Équipement AV"],
  },
];

export default function EvenementsPage() {
  return (
    <>
      <JsonLd data={eventSchema} />

      <PageHero
        title="Team Building & Événements"
        subtitle="BlackRock, BNP Paribas, BCG, Kering, AXA… plus de 20 entreprises de premier plan font confiance à Padel 15."
        badge="Entreprises & Groupes"
        imageSrc="/images/terrains/terrain-match-1.jpg"
        imageAlt="Événements d'entreprise Padel 15"
        height="lg"
      />

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
            {FORMULES.map((f, index) => {
              const Icon = f.icon;
              return (
              <AnimatedSection delay={index * 0.1} key={f.title}>
                <div className="border border-gray-200 rounded-2xl p-6 hover:border-brand transition-colors h-full">
                  <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-brand" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{f.description}</p>
                  <ul className="space-y-1.5">
                    {f.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-brand flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
              );
            })}
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
                <Check className="w-4 h-4 text-brand flex-shrink-0" />
                <span>Réponse sous 24h ouvrées</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-brand flex-shrink-0" />
                <span>Devis gratuit et sans engagement</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-brand flex-shrink-0" />
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
            <Image src="/images/restaurant/guinguette.webp" alt="Espace événements Padel 15" fill className="object-cover" />
          </div>
        </div>

      </div>
    </>
  );
}
