import type { Metadata } from "next";
import HeroBanner from "@/components/HeroBanner";
import Clients from "@/components/Clients";
import { ExperienceBlocks } from "@/components/homepage/ExperienceBlocks";
import { GoogleRating } from "@/components/shared/GoogleRating";
import { GoogleReviews } from "@/components/shared/GoogleReviews";
import { B2BSection } from "@/components/homepage/B2BSection";
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
      <div className="py-4 bg-white border-b border-gray-100">
        <GoogleRating rating={4.8} count={247} />
      </div>
      <ExperienceBlocks />
      <GoogleReviews />
      <div className="py-6 bg-gray-50">
        <Clients />
      </div>
      <B2BSection />
      <CTANewsletter variant="light" />
    </>
  );
}
