import type { Metadata } from "next";
import Image from "next/image";
import { Activity, ClipboardList, Check, Star } from "lucide-react";
import Clients from "@/components/Clients";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { VideoReel } from "@/components/evenements/VideoReel";

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
    title: "Team Building & Afterwork Padel",
    subtitle: "Sport, cohésion & soirée · 8 à 120 personnes",
    description:
      "Privatisez nos terrains pour une expérience padel sur-mesure : tournoi interne, coaching collectif ou initiation encadrée par nos pros, puis laissez la soirée prendre le relais. Guinguette, bar privatisé, ambiance pilotée par notre équipe. Notre cuisine assure du début à la fin : collation d'accueil, buffet maison entre les sessions, planches & tapas, BBQ ou dîner assis en soirée, tout préparé sur place, avec des produits frais, et ajusté à votre format et votre budget.",
    includes: [
      "Terrains privatisés · Coach dédié · Matériel fourni",
      "Bar privatisé & animation",
      "Restauration sur mesure (buffet, dîner, cocktail…)",
      "Privatisation totale ou partielle selon vos besoins",
    ],
  },
  {
    icon: ClipboardList,
    title: "Séminaire & Convention",
    subtitle:
      "Journée, demi-journée ou format hybride travail + sport · 8 à 120 personnes",
    description:
      "Un cadre qui change tout. Nos espaces de travail climatisés et équipés accueillent vos réunions stratégiques, kick-offs et conventions — avec la possibilité de couper sur les terrains pour recharger les équipes.\n\nLa restauration, pensée pour les pros : Petit-déjeuner d'accueil, déjeuner assis ou buffet/brunch, pause café gourmande",
    includes: [
      "Salle privatisée & équipement AV complet",
      "Terrains privatisés entre les sessions",
      "Restauration complète sur toute la journée",
      "Coordination par nos équipes : zéro logistique pour vos équipes",
    ],
  },
  {
    icon: Star,
    title: "Réception & Événement Client",
    subtitle:
      "Entertainment externe : clients, partenaires, prospects · 8 à 120 personnes",
    description:
      "Recevez vos clients dans un lieu qui parle de vous. Padel premium, service haut de gamme, ambiance unique : offrez une expérience qui crée le lien.\n\nNous composons des menus adaptés à vos exigences : cocktail dinatoire, déjeuner d'affaires, offre BBQ, formule traiteur.",
    includes: [
      "Privatisation complète & accueil personnalisé",
      "Service en salle haut de gamme",
      "Menu sur mesure (cocktail, déjeuner, dîner)",
      "Expérience encadrée par des professionnels",
    ],
  },
];

export default function EvenementsPage() {
  return (
    <>
      <JsonLd data={eventSchema} />
      <PageHero
        title="Team Building & Événements"
        subtitle="BlackRock, BNP Paribas, BCG, Kering, AXA… plus de 100 entreprises de premier plan font confiance à Padel 15."
        badge="Entreprises & Groupes"
        imageSrc="/images/events/event-terrain.webp"
        imageAlt="Événements d'entreprise Padel 15"
        height="lg"
      />

      <VideoReel />

      <div className="container mx-auto px-4 py-16 space-y-20">
        {/* Formules */}
        <div>
          <div className="text-center mb-10">
            <h2 className="font-buzz mb-3">Nos Formules</h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Chaque événement est sur-mesure. Nous nous adaptons à vos besoins,
              votre budget et votre groupe.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FORMULES.map((f, index) => {
              const Icon = f.icon;
              return (
                <AnimatedSection
                  delay={index * 0.1}
                  key={f.title}
                  className="h-full"
                >
                  <div className="border border-gray-200 rounded-2xl p-6 hover:border-brand transition-colors h-full flex flex-col">
                    <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-brand" />
                    </div>
                    <h3 className="font-semibold mb-1">{f.title}</h3>
                    <p className="text-brand text-xs font-semibold mb-3">
                      {f.subtitle}
                    </p>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1 whitespace-pre-line">
                      {f.description}
                    </p>
                    <ul className="space-y-1.5">
                      {f.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
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
            <h2 className="font-buzz mb-4">Demandez un devis</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Décrivez votre projet et notre équipe revient vers vous sous 24h
              avec une proposition personnalisée.
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
              href="mailto:contact@padel15.fr?subject=Demande de devis événement&body=Bonjour, je souhaite obtenir un devis pour :"
              className="bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block"
            >
              Demander un devis
            </a>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/events/event-group.webp"
              alt="Espace événements Padel 15"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </>
  );
}
