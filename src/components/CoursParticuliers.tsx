"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type CourseType = "particulier" | "collectif";

const COURSE_TYPES: {
  id: CourseType;
  label: string;
  emoji: string;
  description: string;
}[] = [
  {
    id: "particulier",
    label: "Cours Particulier",
    emoji: "🎾",
    description:
      "Un coach dédié, un programme sur mesure. Progressez à votre rythme avec un suivi personnalisé.",
  },
  {
    id: "collectif",
    label: "Cours Collectif",
    emoji: "👥",
    description:
      "Apprenez en groupe dans une ambiance conviviale. Idéal pour débuter ou progresser ensemble.",
  },
];

export default function CoursParticuliers() {
  const [activeType, setActiveType] = useState<CourseType>("particulier");

  const tallyUrl =
    "https://tally.so/embed/7R4EXa?alignLeft=1&hideTitle=1&dynamicHeight=1";

  return (
    <section id="cours" className="relative scroll-mt-16 py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/terrain-inte-game.webp')" }}
      />
      {/* Accent orange top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6727] to-transparent" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-[#FF6727]/20 text-[#FF6727] border border-[#FF6727]/30 mb-4">
            Coaching & Progression
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Réservez votre cours de Padel
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Débutant ou confirmé, nos coaches certifiés vous accompagnent pour
            progresser rapidement et prendre encore plus de plaisir sur le
            terrain.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left — infos + tabs */}
          <div className="lg:col-span-1 ">
            {/* Toggle tabs */}
            <div className="flex gap-3 mb-8 bg-white/5 p-1.5 rounded-xl border border-white/10">
              {COURSE_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer",
                    activeType === type.id
                      ? "bg-[#FF6727] text-white shadow-lg shadow-orange-500/20"
                      : "text-gray-400 hover:text-white",
                  )}
                >
                  {type.emoji} {type.label}
                </button>
              ))}
            </div>

            {/* Active card info */}
            {COURSE_TYPES.map((type) => (
              <div
                key={type.id}
                className={cn(
                  "transition-all duration-300",
                  activeType === type.id ? "block" : "hidden",
                )}
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                  <p className="text-gray-300 text-base leading-relaxed mb-6">
                    {type.description}
                  </p>
                  <ul className="space-y-3">
                    {type.id === "particulier" ? (
                      <>
                        <li className="flex items-center gap-3 text-gray-300">
                          <span className="w-5 h-5 rounded-full bg-[#FF6727]/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#FF6727] text-xs font-bold">
                              ✓
                            </span>
                          </span>
                          Suivi individuel et technique personnalisée
                        </li>
                        <li className="flex items-center gap-3 text-gray-300">
                          <span className="w-5 h-5 rounded-full bg-[#FF6727]/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#FF6727] text-xs font-bold">
                              ✓
                            </span>
                          </span>
                          Horaires flexibles selon vos disponibilités
                        </li>
                        <li className="flex items-center gap-3 text-gray-300">
                          <span className="w-5 h-5 rounded-full bg-[#FF6727]/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#FF6727] text-xs font-bold">
                              ✓
                            </span>
                          </span>
                          Tous niveaux, de débutant à confirmé
                        </li>
                        <li className="flex items-center gap-3 text-gray-300">
                          <span className="w-5 h-5 rounded-full bg-[#FF6727]/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#FF6727] text-xs font-bold">
                              ✓
                            </span>
                          </span>
                          Pack de séances ou séance à l'unité
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-center gap-3 text-gray-300">
                          <span className="w-5 h-5 rounded-full bg-[#FF6727]/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#FF6727] text-xs font-bold">
                              ✓
                            </span>
                          </span>
                          Groupes de 2 à 8 joueurs maximum
                        </li>
                        <li className="flex items-center gap-3 text-gray-300">
                          <span className="w-5 h-5 rounded-full bg-[#FF6727]/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#FF6727] text-xs font-bold">
                              ✓
                            </span>
                          </span>
                          Ambiance conviviale et progression rapide
                        </li>
                        <li className="flex items-center gap-3 text-gray-300">
                          <span className="w-5 h-5 rounded-full bg-[#FF6727]/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#FF6727] text-xs font-bold">
                              ✓
                            </span>
                          </span>
                          Initiation, perfectionnement, compétition
                        </li>
                        <li className="flex items-center gap-3 text-gray-300">
                          <span className="w-5 h-5 rounded-full bg-[#FF6727]/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#FF6727] text-xs font-bold">
                              ✓
                            </span>
                          </span>
                          Tarif préférentiel vs. cours particulier
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            ))}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "5+", label: "Coachs certifiés" },
                { value: "100%", label: "Satisfaction" },
                { value: "Tous niveaux", label: "Accueillis" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center bg-white/5 border border-white/10 rounded-xl py-4 px-2"
                >
                  <div className="text-[#FF6727] font-bold text-xl">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Tally form */}
          <div className="lg:col-span-2 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="bg-white px-6 pt-6 pb-4">
              <h3 className="font-semibold text-lg mb-1">Demande de cours</h3>
              <p className="text-gray-400 text-sm">
                Remplissez le formulaire, notre équipe vous contacte sous 24h.
              </p>
            </div>
            <div className="bg-white rounded-b-2xl px-6 pt-2 pb-4">
              <iframe
                src={tallyUrl}
                width="100%"
                height="500"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Réservation cours de padel"
                style={{ minHeight: 480, display: "block" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Accent orange bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6727] to-transparent" />
    </section>
  );
}
