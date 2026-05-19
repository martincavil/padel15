"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const CAROUSEL_IMAGES = [
  { id: 1, src: "/terrain-ext-jour.webp", alt: "Terrain extérieur de jour" },
  { id: 2, src: "/terrain-inte-game.webp", alt: "Match en cours terrain intérieur" },
  { id: 3, src: "/terrain-ext-nuit.webp", alt: "Terrain extérieur de nuit" },
  { id: 4, src: "/terrain-inte-vide.webp", alt: "Terrain intérieur" },
];

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i === CAROUSEL_IMAGES.length - 1 ? 0 : i + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen max-h-screen relative overflow-hidden">
      {/* Carousel */}
      <div className="absolute inset-0 z-0">
        {CAROUSEL_IMAGES.map((slide, index) => (
          <div
            key={slide.id}
            style={{ backgroundImage: `url(${slide.src})` }}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            role="img"
            aria-label={slide.alt}
          />
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative container h-full flex flex-col items-center justify-center gap-8 z-20 text-center px-4">
        <Image
          src="/logo.svg"
          alt="Logo Padel 15"
          width={400}
          height={160}
          className="mx-auto filter brightness-0 invert"
          priority
        />
        <p className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed">
          L&apos;art de vivre le padel à Paris.{" "}
          <span className="font-semibold">
            Sport, élégance et convivialité dans un écrin végétalisé en plein cœur de la capitale.
          </span>
        </p>

        {/* Dual CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="https://playtomic.com/clubs/padel-15"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-lg text-base transition-colors"
          >
            Réserver un terrain
          </a>
          <Link
            href="/evenements"
            className="bg-white/10 hover:bg-white/20 border border-white text-white font-semibold px-8 py-4 rounded-lg text-base transition-colors backdrop-blur-sm"
          >
            Organiser un événement
          </Link>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2">
          {CAROUSEL_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "bg-brand w-6" : "bg-white/50 w-2"
              }`}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
