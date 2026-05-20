import type { Metadata } from "next";
import { Suspense } from "react";
import HeroBanner from "@/components/HeroBanner";
import { PlaytomicSection } from "@/components/homepage/PlaytomicSection";
import { PadelInfoSection } from "@/components/homepage/PadelInfoSection";
import { RestaurantHighlight } from "@/components/homepage/RestaurantHighlight";
import CoursParticuliers from "@/components/CoursParticuliers";
import { AgendaSection } from "@/components/homepage/AgendaSection";
import { PartenairesSection } from "@/components/homepage/PartenairesSection";
import { B2BSection } from "@/components/homepage/B2BSection";
import Clients from "@/components/Clients";
import { InstagramSection } from "@/components/homepage/InstagramSection";
import { CTANewsletter } from "@/components/shared/CTANewsletter";

export const metadata: Metadata = {
  title: "Padel 15 | Club de Padel Paris 15ème — Terrains, Restaurant, Coaching",
  description:
    "Club de padel haut de gamme au cœur du 15ème arrondissement de Paris. Terrains couverts et extérieurs, coaching certifié, restaurant guinguette. Réservez sur Playtomic.",
};

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <PlaytomicSection />
      <PadelInfoSection />
      <RestaurantHighlight />
      <CoursParticuliers />
      <Suspense fallback={<div className="py-16 bg-gray-50" aria-hidden />}>
        <AgendaSection />
      </Suspense>
      <PartenairesSection />
      <B2BSection />
      <div className="py-6 bg-gray-50">
        <Clients />
      </div>
      <InstagramSection />
      <CTANewsletter />
    </>
  );
}
