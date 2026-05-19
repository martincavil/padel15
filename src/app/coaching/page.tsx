import type { Metadata } from "next";
import CoursParticuliers from "@/components/CoursParticuliers";

export const metadata: Metadata = {
  title: "Cours de Padel Paris 15 | Coaching Particulier & Collectif",
  description:
    "Cours particuliers et collectifs de padel à Paris 15ème. Coachs certifiés, tous niveaux de débutant à confirmé. Réservation en ligne via formulaire.",
  openGraph: {
    title: "Coaching Padel Paris 15 — Particulier & Collectif",
    images: [{ url: "/terrain-inte-game.webp" }],
  },
};

export default function CoachingPage() {
  return (
    <div className="pt-16">
      <CoursParticuliers />
    </div>
  );
}
