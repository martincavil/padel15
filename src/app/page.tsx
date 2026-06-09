import type { Metadata } from "next";
import { Suspense } from "react";
import HeroBanner from "@/components/HeroBanner";
import { fetchGoogleRating } from "@/lib/google-places";
import { GoogleReviews } from "@/components/shared/GoogleReviews";
import { RestaurantHighlight } from "@/components/homepage/RestaurantHighlight";
import { PartenairesSection } from "@/components/homepage/PartenairesSection";
import { TarifsSection } from "@/components/homepage/TarifsSection";
import CoursParticuliers from "@/components/CoursParticuliers";
import { AgendaSection } from "@/components/homepage/AgendaSection";
import { B2BSection } from "@/components/homepage/B2BSection";
import { CTANewsletter } from "@/components/shared/CTANewsletter";
import Clients from "@/components/Clients";
import { PlaytomicSection } from "@/components/homepage/PlaytomicSection";
import { PadelInfoSection } from "@/components/homepage/PadelInfoSection";
import { InstagramSection } from "@/components/homepage/InstagramSection";
import { CarteCanvaWidget } from "@/components/restaurant/CarteCanvaWidget";

export const metadata: Metadata = {
  title:
    "Padel 15 | Club de Padel Paris 15ème — Terrains, Restaurant, Coaching",
  description:
    "Club de padel haut de gamme au cœur du 15ème arrondissement de Paris. Terrains couverts et extérieurs, coaching certifié, restaurant guinguette. Réservez sur Playtomic.",
};

export default async function HomePage() {
  const raw = await fetchGoogleRating();
  const googleRating = raw
    ? { rating: raw.rating, count: raw.userRatingCount }
    : undefined;
  return (
    <>
      <HeroBanner googleRating={googleRating} />
      <PlaytomicSection />
      <PadelInfoSection />
      <TarifsSection />
      <Suspense fallback={<div className="py-16 bg-gray-50" aria-hidden />}>
        <AgendaSection />
      </Suspense>
      <RestaurantHighlight />
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <CarteCanvaWidget variant="compact" />
        </div>
      </section>
      <GoogleReviews />
      <PartenairesSection />
      <CoursParticuliers />
      <InstagramSection />
      <B2BSection />
      <Clients />
      <CTANewsletter />
    </>
  );
}
