import type { Metadata } from "next";
import Contact from "@/components/Contact";
import { CTANewsletter } from "@/components/shared/CTANewsletter";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Contact & Accès | Padel 15 — 115 rue Castagnary Paris 15",
  description:
    "Contactez Padel 15 : 115 rue Castagnary, 75015 Paris. Tél : +33 1 45 31 58 76. Email : contact@padel15.fr. Plan d'accès Google Maps.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title=" Contact &amp; Accès"
        subtitle="115 rue Castagnary, 75015 Paris — 7j/7, 8h à 22h"
        imageSrc="/images/restaurant/gaspard-work.webp"
        imageAlt="Padel 15 — Contact & Accès"
        height="lg"
      />
      <div className="pt-8">
        <Contact />
      </div>
      <CTANewsletter />
    </>
  );
}
