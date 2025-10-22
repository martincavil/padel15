"use client";

import { useState, useEffect } from "react";
import { ButtonDownloadApp } from "./ui/ButtonDowloadApp";
import Image from "next/image";

export default function HeroBanner() {
  // État pour suivre l'image active
  const [activeIndex, setActiveIndex] = useState(0);

  // Images temporaires (remplacer par des vrais chemins quand disponibles)
  // const carouselImages = [
  //   { id: 1, color: "bg-red-500" },
  //   { id: 2, color: "bg-blue-500" },
  //   { id: 3, color: "bg-green-500" },
  //   { id: 4, color: "bg-purple-500" },
  //   { id: 5, color: "bg-yellow-500" },
  // ];

  const carouselImages = [
    { id: 1, src: "/terrain-ext-jour.webp" },
    { id: 2, src: "/terrain-inte-game.webp" },
    { id: 3, src: "/terrain-ext-nuit.webp" },
    { id: 4, src: "/terrain-inte-vide.webp" },
  ];

  // Effet pour faire défiler automatiquement
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) =>
        current === carouselImages.length - 1 ? 0 : current + 1
      );
    }, 4000); // Changer d'image toutes les 4 secondes

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="h-screen max-h-screen relative overflow-hidden">
      {/* Carousel d'images */}
      <div className="absolute inset-0 z-0">
        {carouselImages.map((slide, index) => (
          <div
            key={slide.id}
            style={{ backgroundImage: `url(${slide.src})` }}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Volet orange semi-transparent */}
      {/* <div className="absolute inset-0 bg-orange-600 bg-opacity-70 z-10"></div> */}

      {/* Contenu - même structure que l'original */}
      <div className="relative container h-full flex flex-col justify-center space-y-6 md:space-y-8 z-20">
        <div className="relative">
          <Image
            src="/logo.svg"
            alt="Logo Padel 15"
            width={500}
            height={500}
            className="mx-auto filter brightness-0 invert"
          />
        </div>
        <h2 className="text-lg text-slate-100 max-w-3xl text-center mx-auto">
          <span className="font-medium">
            L&apos;art de vivre le padel à Paris.
          </span>
          <br />
          <span className="font-medium">
            Un club d&apos;exception où sport, élégance et convivialité se
            rencontrent.
          </span>
          <br />
          Dans un écrin végétalisé en plein cœur de la capitale, jouez,
          partagez, détendez-vous… et savourez chaque instant. Terrains couvert
          et haut de gamme, terrasse guinguette, pétanque, fléchettes, bar et
          restaurant
        </h2>
        <div className="mx-auto">
          <ButtonDownloadApp />
        </div>
      </div>
    </div>
  );
}
