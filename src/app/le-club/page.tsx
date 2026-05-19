import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Trophy, Utensils, Leaf, Laptop, ShowerHead, Bike, Droplets, Accessibility } from "lucide-react";
import Values from "@/components/Values";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

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
  { icon: Trophy, label: "2 terrains de padel", detail: "Couverts et extérieurs, panoramiques" },
  { icon: Utensils, label: "Restaurant & Bar", detail: "Service continu 7j/7, produits frais" },
  { icon: Leaf, label: "Terrasse guinguette", detail: "Végétalisée, pétanque, espaces lounge" },
  { icon: Laptop, label: "Espace coworking", detail: "WiFi haut débit, cadre unique" },
  { icon: ShowerHead, label: "Vestiaires & Douches", detail: "Équipements modernes et propres" },
  { icon: Bike, label: "Garage à vélo", detail: "Sécurisé, gratuit" },
  { icon: Droplets, label: "Fontaine à eau", detail: "En libre-service" },
  { icon: Accessibility, label: "Accessibilité PMR", detail: "Site entièrement accessible" },
];

const PHOTO_HIGHLIGHTS = [
  {
    src: "/work-and-padel.webp",
    alt: "Espace coworking Padel 15",
    label: "Coworking",
    detail: "WiFi haut débit, cadre unique",
  },
  {
    src: "/raquettes-1.jpg",
    alt: "Équipements Padel 15",
    label: "Équipements",
    detail: "Location de raquettes",
  },
  {
    src: "/terrain-inte-filet.jpg",
    alt: "Terrain intérieur Padel 15",
    label: "Terrains",
    detail: "2 courts panoramiques",
  },
];

export default function LeClubPage() {
  return (
    <>
      <PageHero
        title="Le Club"
        subtitle="115 rue Castagnary, Paris 15ème — bien plus qu'un club de padel"
        imageSrc="/rest-inte-grand-angle.webp"
        imageAlt="Padel 15 — Le Club"
        height="md"
      />

      <div className="container mx-auto px-4 py-16 space-y-16">

        {/* Notre histoire */}
        <AnimatedSection>
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
        </AnimatedSection>

        {/* Photo highlights — coworking, équipements, terrains */}
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PHOTO_HIGHLIGHTS.map((photo) => (
              <div key={photo.src} className="relative h-64 rounded-2xl overflow-hidden group">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold text-sm">{photo.label}</p>
                  <p className="text-white/70 text-xs">{photo.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Infrastructure */}
        <AnimatedSection>
          <h2 className="font-buzz text-3xl mb-8 text-center">Notre infrastructure</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INFRA_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="bg-gray-50 rounded-xl p-5 text-center hover:bg-brand/5 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-5 h-5 text-brand" />
                  </div>
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-gray-500 text-xs mt-1">{item.detail}</p>
                </div>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Valeurs */}
        <Values />

        {/* CTA */}
        <AnimatedSection>
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
        </AnimatedSection>

      </div>
    </>
  );
}
