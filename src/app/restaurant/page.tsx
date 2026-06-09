import type { Metadata } from "next";
import Image from "next/image";
import { Check, Utensils, Leaf, Wine } from "lucide-react";
import { CarteCanvaWidget } from "@/components/restaurant/CarteCanvaWidget";
import { PageHero } from "@/components/shared/PageHero";
import { LightboxGallery } from "@/components/shared/LightboxGallery";
import { JsonLd } from "@/components/shared/JsonLd";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { AnimatedPrivatiseCard } from "@/components/restaurant/AnimatedPrivatiseCard";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Restaurant & Guinguette Paris 15 | Bar, Terrasse, Pétanque",
  description:
    "Restaurant, bar et terrasse guinguette au cœur du Paris 15ème. Ouvert 7j/7 de 8h à 22h. Ouvert à tous, même sans réservation de terrain. Privatisation disponible.",
  openGraph: {
    title: "Restaurant & Guinguette — Padel 15",
    images: [{ url: "/images/restaurant/rest-inte-grand-angle.webp" }],
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
    icon: Utensils,
    title: "Restaurant",
    items: [
      "Service continu 7j/7 — 8h à 22h",
      "Ouvert à tous, sans réservation de terrain",
      "Produits frais et de saison",
      "Cadre chaleureux et moderne",
    ],
  },
  {
    icon: Leaf,
    title: "Terrasse & Guinguette",
    items: [
      "Terrasse végétalisée",
      "Terrain de pétanque",
      "Espaces lounge",
      "Ambiance dépaysante",
    ],
  },
  {
    icon: Wine,
    title: "Bar",
    items: [
      "Cocktails et boissons fraîches",
      "Afterworks et soirées",
      "Privatisation possible",
    ],
  },
];

const GALLERY_IMAGES = [
  { src: "/images/restaurant/restau-diner.webp", alt: "Ambiance dîner" },
  { src: "/images/restaurant/food/DSC00739.webp", alt: "Burger Maison" },
  { src: "/images/restaurant/rest-inte-bar.webp", alt: "Bar intérieur" },
  { src: "/images/restaurant/food/DSC00768.webp", alt: "Salade César" },
  {
    src: "/images/restaurant/rest-inte-terrain.webp",
    alt: "Vue sur les terrains",
  },
  { src: "/images/restaurant/food/DSC00577.webp", alt: "Planche Mixte" },
];

export default function RestaurantPage() {
  return (
    <>
      <JsonLd data={restaurantSchema} />

      <PageHero
        title="Restaurant & Guinguette"
        subtitle="Cuisine, bar, terrasse en plein air — 7j/7 de 8h à 22h · Ouvert à tous, sans réservation"
        badge="Paris 15ème"
        imageSrc="/images/restaurant/rest-inte-grand-angle.webp"
        imageAlt="Restaurant Padel 15"
        height="lg"
      />

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Présentation */}
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-buzz mb-4">Un lieu de vie unique</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Ouvert 7j/7 en service continu de 8h à 22h, avec des produits
                  frais et de saison.{" "}
                  <strong>Ouvert à tous, sans réservation de terrain.</strong>{" "}
                  Un cadre chaleureux pour se détendre après un match… ou
                  organiser vos séminaires, afterworks et événements privés dans
                  un lieu unique au cœur de Paris.
                </p>
                <p>
                  Notre terrasse guinguette vous transporte dans une ambiance
                  dépaysante en plein Paris : espace végétalisé, couleurs vives,
                  terrain de pétanque et espaces lounge.
                </p>
              </div>
              <div className="mt-8">
                <a
                  href="mailto:contact@padel15.fr?subject=Demande privatisation restaurant"
                  className="bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block"
                >
                  Privatiser l&apos;espace
                </a>
              </div>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/restaurant/food/DSC00617.webp"
                alt="Planche à partagée Padel 15"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <AnimatedSection key={service.title} delay={i * 0.1}>
                <div className="bg-gray-50 rounded-2xl p-6 h-full">
                  <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-brand" />
                  </div>
                  <h3 className="font-semibold mb-3">
                    {service.title}
                  </h3>
                  <ul className="space-y-1.5 text-gray-600 text-sm">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Galerie */}
        <AnimatedSection>
          <h2 className="font-buzz mb-6">Galerie</h2>
          <LightboxGallery images={GALLERY_IMAGES} columns={3} />
        </AnimatedSection>

        {/* Notre carte — aperçu Canva + lien */}
        <AnimatedSection>
          <CarteCanvaWidget variant="full" />
        </AnimatedSection>

        {/* Card privatisation */}
        <AnimatedPrivatiseCard />
      </div>
    </>
  );
}
