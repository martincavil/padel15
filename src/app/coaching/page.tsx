import type { Metadata } from "next";
import Image from "next/image";
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
    <>
      {/* Hero */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <Image
          src="/terrain-inte-game.webp"
          alt="Cours de padel Padel 15"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 text-center">
          <span className="text-sm font-semibold text-brand uppercase tracking-wider mb-3">Coaching &amp; Progression</span>
          <h1 className="font-buzz text-4xl md:text-6xl mb-4">Coaching Padel</h1>
          <p className="text-white/80 max-w-lg text-lg">
            Débutant ou confirmé — progressez avec nos coachs certifiés
          </p>
        </div>
      </div>

      {/* Reuse existing CoursParticuliers component (has Tally form 7R4EXa) */}
      <CoursParticuliers />
    </>
  );
}
