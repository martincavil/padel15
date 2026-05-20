"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";

const COL_LEFT = [
  {
    src: "/images/terrains/terrain-ext-jour.webp",
    alt: "Terrain extérieur de jour",
  },
  { src: "/images/restaurant/guinguette.webp", alt: "Terrasse guinguette" },
  { src: "/images/terrains/terrain-inte-game.webp", alt: "Match en cours" },
  { src: "/images/autres/raquettes-1.jpg", alt: "Raquettes de padel" },
  {
    src: "/images/terrains/terrain-ext-nuit.webp",
    alt: "Terrain extérieur de nuit",
  },
  {
    src: "/images/restaurant/rest-inte-grand-angle.webp",
    alt: "Restaurant vue d'ensemble",
  },
];

const COL_RIGHT = [
  { src: "/images/restaurant/restau-diner.webp", alt: "Ambiance restaurant" },
  { src: "/images/terrains/terrain-match-1.jpg", alt: "Match de padel" },
  { src: "/images/restaurant/rest-inte-bar.jpg", alt: "Bar Padel 15" },
  { src: "/images/terrains/terrain-inte-vide.webp", alt: "Terrain intérieur" },
  { src: "/images/autres/work-and-padel.webp", alt: "Padel & entreprises" },
  { src: "/images/terrains/padel-ext.jpg", alt: "Vue extérieure" },
];

function ScrollColumn({
  images,
  animClass,
  offsetPx = 0,
}: {
  images: typeof COL_LEFT;
  animClass: "animate-scroll-up" | "animate-scroll-down";
  offsetPx?: number;
}) {
  const doubled = [...images, ...images];
  return (
    <div className="flex-1 min-w-0">
      <div
        className={`flex flex-col gap-3 cursor-pointer ${animClass}`}
        style={offsetPx ? { marginTop: `-${offsetPx}px` } : undefined}
      >
        {doubled.map((img, i) => (
          <div
            key={`${img.src}-${i}`}
            className="relative aspect-[4/5] w-full rounded-xl overflow-hidden flex-shrink-0"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 300px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const INSTAGRAM_URL = "https://www.instagram.com/padel15club/?hl=fr";

export function InstagramSection() {
  return (
    <section className="py-20 bg-white">
      {/* Header */}
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <div>
          <h2 className="font-buzz text-3xl md:text-4xl mb-1">
            Suivez l&apos;aventure sur Instagram
          </h2>
        </div>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-brand text-brand hover:bg-brand hover:text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          <Instagram className="w-4 h-4" />
          Voir le profil
        </a>
      </div>

      {/* Scrolling wall */}
      <div className="relative h-[560px] md:h-[680px] overflow-hidden">
        {/* Fades haut et bas */}
        <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

        {/* Badge Instagram central */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl px-6 py-3.5 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Instagram className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm leading-tight">
                @padel15club
              </p>
              <p className="text-gray-400 text-xs">Voir sur Instagram</p>
            </div>
          </a>
        </div>

        {/* Colonnes — contraintes en largeur et centrées */}
        <div className="flex gap-3 h-full max-w-2xl mx-auto px-4">
          <ScrollColumn
            images={COL_LEFT}
            animClass="animate-scroll-up"
            offsetPx={0}
          />
          <ScrollColumn
            images={COL_RIGHT}
            animClass="animate-scroll-down"
            offsetPx={140}
          />
        </div>
      </div>
    </section>
  );
}
