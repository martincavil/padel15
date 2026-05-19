"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const BLOCKS = [
  {
    href: "/terrains",
    img: "/terrain-ext-jour.webp",
    label: "Terrains",
    title: "2 terrains couverts & extérieurs",
    description: "Réservez en ligne via Playtomic. Créneaux 7j/7, de 8h à 22h.",
    cta: "Voir les terrains",
  },
  {
    href: "/restaurant",
    img: "/rest-inte-grand-angle.webp",
    label: "Restaurant",
    title: "Restaurant, bar & guinguette",
    description:
      "Service continu du petit-déjeuner au dîner. Terrasse végétalisée et pétanque.",
    cta: "Découvrir",
  },
  {
    href: "/coaching",
    img: "/terrain-inte-game.webp",
    label: "Coaching",
    title: "Cours particuliers & collectifs",
    description: "Coachs certifiés, tous niveaux. Débutants bienvenus.",
    cta: "Réserver un cours",
  },
  {
    href: "/evenements",
    img: "/guinguette.webp",
    label: "Événements",
    title: "Team building & privatisation",
    description: "BlackRock, BNP, BCG, Kering… ils font confiance à Padel 15.",
    cta: "Organiser un événement",
  },
];

export function ExperienceBlocks() {
  return (
    <section className="container mx-auto px-4 py-16">
      <AnimatedSection className="text-center mb-12">
        <h2 className="font-buzz text-3xl md:text-4xl mb-3">
          L&apos;expérience Padel 15
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Un lieu unique à Paris 15 : bien plus qu&apos;un club de padel.
        </p>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {BLOCKS.map((block, i) => (
          <AnimatedSection key={block.href} delay={i * 0.1}>
            <Link
              href={block.href}
              className="group relative rounded-2xl shadow-md hover:shadow-xl transition-shadow block"
            >
              <div className="relative h-64 overflow-hidden rounded-2xl">
                <Image
                  src={block.img}
                  alt={block.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <span className="text-xs font-semibold text-brand uppercase tracking-wider">
                  {block.label}
                </span>
                <h3 className="font-semibold text-lg mt-1 mb-1">{block.title}</h3>
                <p className="text-white/70 text-sm leading-snug mb-3">
                  {block.description}
                </p>
                <span className="text-xs font-semibold text-brand group-hover:underline">
                  {block.cta} →
                </span>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
