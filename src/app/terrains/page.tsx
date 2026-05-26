"use client";

import {
  Clock,
  Banknote,
  ShoppingCart,
  CalendarDays,
  Bike,
  ShowerHead,
  Sofa,
  Laptop,
  Droplets,
  Accessibility,
} from "lucide-react";
import { LightboxGallery } from "@/components/shared/LightboxGallery";
import { PageHero } from "@/components/shared/PageHero";
import { BookingWidget } from "@/components/shared/BookingWidget";

export default function TerrainsPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        title="Nos Terrains"
        subtitle="2 terrains couverts et extérieurs — 7j/7, 8h à 22h"
        badge="Paris 15ème"
        imageSrc="/images/terrains/terrain-ext-jour.webp"
        imageAlt="Terrains de padel Padel 15"
        height="lg"
      />

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Info + Booking widget */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="font-buzz text-3xl mb-6">Réservez votre terrain</h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Horaires</p>
                  <p>
                    7j/7 de 8h à 22h — Ouvert tous les jours de l&apos;année
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Banknote className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Tarifs</p>
                  <p>
                    12,50 € / personne / heure (heures creuses : lun-ven 8h-12h
                    et 14h-16h)
                  </p>
                  <p>
                    15 € / personne / heure (heures pleines : 12h-14h, 16h-22h
                    et week-end)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShoppingCart className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Matériel</p>
                  <p>
                    Raquettes en location et balles disponibles dans un casier
                    connecté entre les terrains
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarDays className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Créneaux</p>
                  <p>
                    Les créneaux ouvrent 5 jours à l&apos;avance, heure par
                    heure — soyez réactifs !
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="https://playtomic.com/clubs/padel-15"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-lg text-center transition-colors"
              >
                Réserver sur Playtomic
              </a>
            </div>
          </div>

          {/* Booking widget */}
          <div className="flex justify-center">
            <BookingWidget className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg" />
          </div>
        </div>

        {/* Gallery */}
        <div>
          <h2 className="font-buzz text-3xl mb-6">Galerie</h2>
          <LightboxGallery
            images={[
              {
                src: "/images/terrains/terrain-ext-jour.webp",
                alt: "Terrain extérieur de jour",
              },
              {
                src: "/images/terrains/terrain-inte-game.webp",
                alt: "Match en cours",
              },
              {
                src: "/images/terrains/terrain-ext-nuit.webp",
                alt: "Terrain extérieur de nuit",
              },
              {
                src: "/images/terrains/terrain-inte-vide.webp",
                alt: "Terrain intérieur",
              },
              {
                src: "/images/terrains/terrain-inte-1.webp",
                alt: "Terrain intérieur vue d'ensemble",
              },
              {
                src: "/images/terrains/terrain-match-1.webp",
                alt: "Match en tournoi",
              },
            ]}
            columns={3}
          />
        </div>

        {/* Equipment */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="font-buzz text-2xl mb-6">
            Équipements &amp; Services
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
            {[
              {
                icon: <Bike className="w-4 h-4 text-brand" />,
                text: "Garage à vélo sécurisé",
              },
              {
                icon: <ShowerHead className="w-4 h-4 text-brand" />,
                text: "Vestiaires, douches et toilettes",
              },
              {
                icon: <Sofa className="w-4 h-4 text-brand" />,
                text: "Espace détente intérieur",
              },
              {
                icon: <Laptop className="w-4 h-4 text-brand" />,
                text: "Coin coworking",
              },
              {
                icon: <Droplets className="w-4 h-4 text-brand" />,
                text: "Fontaine à eau en libre-service",
              },
              {
                icon: <Accessibility className="w-4 h-4 text-brand" />,
                text: "Accessibilité PMR totale",
              },
            ].map((item) => (
              <li key={item.text} className="flex items-center gap-2">
                {item.icon}
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
