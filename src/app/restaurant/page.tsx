import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Restaurant & Guinguette Paris 15 | Bar, Terrasse, Pétanque",
  description:
    "Restaurant, bar et terrasse guinguette au cœur du Paris 15ème. Service continu du petit-déjeuner au dîner. Privatisation disponible pour événements.",
  openGraph: {
    title: "Restaurant & Guinguette — Padel 15",
    images: [{ url: "/rest-inte-grand-angle.webp" }],
  },
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Restaurant Padel 15",
  servesCuisine: "Française",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "115 rue Castagnary",
    postalCode: "75015",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  openingHours: "Mo-Su 08:00-22:00",
  telephone: "+33145315876",
};

const SERVICES = [
  {
    icon: "🍽️",
    title: "Restaurant",
    items: ["Service continu 7j/7 — 8h à 22h", "Produits frais et de saison", "Cadre chaleureux et moderne"],
  },
  {
    icon: "🌿",
    title: "Terrasse & Guinguette",
    items: ["Terrasse végétalisée", "Terrain de pétanque", "Espaces lounge", "Ambiance dépaysante"],
  },
  {
    icon: "🥂",
    title: "Bar",
    items: ["Cocktails et boissons fraîches", "Afterworks et soirées", "Privatisation possible"],
  },
];

const GALLERY = [
  { src: "/rest-inte-grand-angle.webp", alt: "Restaurant grand angle", wide: true },
  { src: "/rest-inte-bar.jpg", alt: "Bar intérieur", wide: false },
  { src: "/guinguette.webp", alt: "Terrasse guinguette", wide: false },
  { src: "/restau-diner.webp", alt: "Ambiance dîner", wide: false },
  { src: "/rest-ext.jpg", alt: "Restaurant extérieur", wide: false },
];

export default function RestaurantPage() {
  return (
    <>
      <JsonLd data={restaurantSchema} />

      {/* Hero */}
      <div className="relative h-80 md:h-[480px] overflow-hidden">
        <Image
          src="/rest-inte-grand-angle.webp"
          alt="Restaurant Padel 15"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 text-center">
          <span className="text-sm font-semibold text-brand uppercase tracking-wider mb-3">Paris 15ème</span>
          <h1 className="font-buzz text-4xl md:text-6xl mb-4">Restaurant &amp; Guinguette</h1>
          <p className="text-white/80 max-w-lg text-lg">
            Cuisine, bar, terrasse végétalisée et pétanque — service continu 7j/7
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-16">

        {/* Présentation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-buzz text-3xl mb-4">Un lieu de vie unique</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Ouvert 7j/7 en service continu, du petit-déjeuner au dîner, avec des produits frais
                et de saison. Un cadre chaleureux pour se détendre après un match… ou organiser vos
                séminaires, afterworks et événements privés dans un lieu unique au cœur de Paris.
              </p>
              <p>
                Notre terrasse guinguette vous transporte dans une ambiance dépaysante en plein Paris :
                espace végétalisé, couleurs vives, terrain de pétanque et espaces lounge.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/evenements"
                className="bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block"
              >
                Privatiser l&apos;espace
              </Link>
            </div>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
            <Image src="/guinguette.webp" alt="Terrasse guinguette Padel 15" fill className="object-cover" />
          </div>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div key={service.title} className="bg-gray-50 rounded-2xl p-6">
              <div className="text-3xl mb-3">{service.icon}</div>
              <h3 className="font-semibold text-lg mb-3">{service.title}</h3>
              <ul className="space-y-1.5 text-gray-600 text-sm">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Gallery */}
        <div>
          <h2 className="font-buzz text-3xl mb-6">Galerie</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY.map((img) => (
              <div
                key={img.src}
                className={`relative rounded-xl overflow-hidden ${img.wide ? "md:col-span-2 h-72" : "h-48"}`}
              >
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

        {/* CTA privatisation */}
        <div className="bg-black rounded-2xl p-10 text-center">
          <h2 className="font-buzz text-3xl text-white mb-3">Privatisez notre espace</h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-6">
            Anniversaire, afterwork, séminaire ou soirée d&apos;entreprise — nous créons l&apos;événement sur mesure.
          </p>
          <Link
            href="/evenements"
            className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors inline-block"
          >
            Demander un devis
          </Link>
        </div>

      </div>
    </>
  );
}
