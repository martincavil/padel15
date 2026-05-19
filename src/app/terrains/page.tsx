import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Terrains de Padel Paris 15 | Réservation Playtomic",
  description:
    "2 terrains de padel couverts et extérieurs au 115 rue Castagnary, Paris 15ème. Réservation en ligne via Playtomic. Créneaux 7j/7, 8h-22h.",
  openGraph: {
    title: "Terrains Padel 15 — Réservation en ligne",
    images: [{ url: "/terrain-ext-jour.webp" }],
  },
};

const terrainSchema = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Terrains de Padel — Padel 15",
  address: {
    "@type": "PostalAddress",
    streetAddress: "115 rue Castagnary",
    postalCode: "75015",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  sport: "Padel",
  telephone: "+33145315876",
};

const GALLERY = [
  { src: "/terrain-ext-jour.webp", alt: "Terrain extérieur de jour" },
  { src: "/terrain-inte-game.webp", alt: "Match en cours" },
  { src: "/terrain-ext-nuit.webp", alt: "Terrain extérieur de nuit" },
  { src: "/terrain-inte-vide.webp", alt: "Terrain intérieur" },
];

export default function TerrainsPage() {
  return (
    <>
      <JsonLd data={terrainSchema} />

      {/* Hero */}
      <div className="relative h-80 md:h-[480px] overflow-hidden">
        <Image
          src="/terrain-ext-jour.webp"
          alt="Terrains de padel Padel 15"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 text-center">
          <span className="text-sm font-semibold text-brand uppercase tracking-wider mb-3">Paris 15ème</span>
          <h1 className="font-buzz text-4xl md:text-6xl mb-4">Nos Terrains</h1>
          <p className="text-white/80 max-w-lg text-lg">
            2 terrains couverts et extérieurs — 7j/7, 8h à 22h
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-16">

        {/* Info + Playtomic embed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="font-buzz text-3xl mb-6">Réservez votre terrain</h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🕗</span>
                <div>
                  <p className="font-semibold">Horaires</p>
                  <p>7j/7 de 8h à 22h — Ouvert tous les jours de l&apos;année</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💶</span>
                <div>
                  <p className="font-semibold">Tarifs</p>
                  <p>12,50 € / personne / heure (heures creuses : lun-ven 8h-12h et 14h-16h)</p>
                  <p>15 € / personne / heure (heures pleines : 12h-14h, 16h-22h et week-end)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎾</span>
                <div>
                  <p className="font-semibold">Matériel</p>
                  <p>Raquettes en location et balles disponibles dans un casier connecté entre les terrains</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📅</span>
                <div>
                  <p className="font-semibold">Créneaux</p>
                  <p>Les créneaux ouvrent 5 jours à l&apos;avance, heure par heure — soyez réactifs !</p>
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
              <a
                href="https://apps.apple.com/fr/app/playtomic-play-padel/id1242321076"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 hover:border-brand text-gray-700 hover:text-brand font-semibold px-6 py-4 rounded-lg text-center transition-colors"
              >
                App iOS
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.playtomic&hl=fr"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 hover:border-brand text-gray-700 hover:text-brand font-semibold px-6 py-4 rounded-lg text-center transition-colors"
              >
                App Android
              </a>
            </div>
          </div>

          {/* Playtomic embed */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="bg-brand px-5 py-3">
              <p className="text-white font-semibold">Réservation en ligne</p>
            </div>
            <iframe
              src="https://playtomic.io/tenant/padel-15?view=widget"
              width="100%"
              height="500"
              frameBorder={0}
              title="Réservation terrain Padel 15 — Playtomic"
              className="block bg-gray-50"
            />
          </div>
        </div>

        {/* Gallery */}
        <div>
          <h2 className="font-buzz text-3xl mb-6">Galerie</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY.map((img) => (
              <div key={img.src} className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Equipment */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="font-buzz text-2xl mb-6">Équipements &amp; Services</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
            {[
              "🚲 Garage à vélo sécurisé",
              "🚿 Vestiaires, douches et toilettes",
              "🛋️ Espace détente intérieur",
              "💻 Coin coworking",
              "💧 Fontaine à eau en libre-service",
              "♿ Accessibilité PMR totale",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

      </div>
    </>
  );
}
