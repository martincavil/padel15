import type { Metadata } from "next";
import CoursParticuliers from "@/components/CoursParticuliers";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Cours de Padel Paris 15 | Coaching Particulier & Collectif",
  description:
    "Cours particuliers et collectifs de padel à Paris 15ème. Coachs certifiés, tous niveaux de débutant à confirmé. Réservation en ligne via formulaire.",
  openGraph: {
    title: "Coaching Padel Paris 15 — Particulier & Collectif",
    images: [{ url: "/images/terrains/terrain-inte-game.webp" }],
  },
};

export default function CoachingPage() {
  return (
    <>
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
