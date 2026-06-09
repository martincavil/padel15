import type { Metadata } from "next";
import CoursParticuliers from "@/components/CoursParticuliers";
import { PageHero } from "@/components/shared/PageHero";
import { JsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Cours de Padel Paris 15 | Coaching Particulier & Collectif",
  description:
    "Cours particuliers et collectifs de padel à Paris 15ème. Coachs certifiés, tous niveaux de débutant à confirmé. Réservation en ligne via formulaire.",
  openGraph: {
    title: "Coaching Padel Paris 15 — Particulier & Collectif",
    images: [{ url: "/images/terrains/terrain-inte-game.webp" }],
  },
};

const coachingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Coaching Padel — Padel 15",
  serviceType: "Cours de padel",
  description:
    "Cours particuliers et collectifs de padel à Paris 15ème avec des coachs certifiés. Tous niveaux, 7j/7.",
  provider: {
    "@type": "SportsClub",
    name: "Padel 15",
    address: {
      "@type": "PostalAddress",
      streetAddress: "115 rue Castagnary",
      postalCode: "75015",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
    telephone: "+33145315876",
    url: "https://padel15.fr",
  },
  areaServed: {
    "@type": "City",
    name: "Paris",
  },
};

export default function CoachingPage() {
  return (
    <>
      <JsonLd data={coachingSchema} />
      <PageHero
        title="Coaching Padel"
        subtitle="Cours particuliers et collectifs avec nos coachs certifiés. Tous niveaux, tous les jours."
        badge="Coaching & Progression"
        imageSrc="/images/terrains/terrain-inte-game.webp"
        imageAlt="Cours de padel Padel 15 Paris"
        height="lg"
      />
      <CoursParticuliers />
    </>
  );
}
