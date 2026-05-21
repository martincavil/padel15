"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
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
    <section id="cours" className="scroll-mt-16 py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-brand/10 text-brand border border-brand/20 mb-4">
            Coaching & Progression
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Réservez votre cours de Padel
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Débutant ou confirmé, nos coaches certifiés vous accompagnent pour
            progresser rapidement et prendre encore plus de plaisir sur le
            terrain.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left — infos + tabs */}
          <div className="lg:col-span-1">
            {/* Toggle tabs */}
            <div className="flex gap-3 mb-8 bg-white p-1.5 rounded-xl border border-gray-200">
              {COURSE_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer",
                    activeType === type.id
                      ? "bg-brand text-white shadow-lg shadow-brand/20"
                      : "text-gray-500 hover:text-gray-900",
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
                <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
                  <p className="text-gray-600 text-base leading-relaxed mb-6">
                    {type.description}
                  </p>
                  <ul className="space-y-3">
                    {type.id === "particulier" ? (
                      <>
                        <li className="flex items-center gap-3 text-gray-700">
                          <span className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                          </span>
                          Suivi individuel et technique personnalisée
                        </li>
                        <li className="flex items-center gap-3 text-gray-700">
                          <span className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                          </span>
                          Horaires flexibles selon vos disponibilités
                        </li>
                        <li className="flex items-center gap-3 text-gray-700">
                          <span className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                          </span>
                          Tous niveaux, de débutant à confirmé
                        </li>
                        <li className="flex items-center gap-3 text-gray-700">
                          <span className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                          </span>
                          Pack de séances ou séance à l'unité
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-center gap-3 text-gray-700">
                          <span className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                          </span>
                          Groupes de 2 à 8 joueurs maximum
                        </li>
                        <li className="flex items-center gap-3 text-gray-700">
                          <span className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                          </span>
                          Ambiance conviviale et progression rapide
                        </li>
                        <li className="flex items-center gap-3 text-gray-700">
                          <span className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                          </span>
                          Initiation, perfectionnement, compétition
                        </li>
                        <li className="flex items-center gap-3 text-gray-700">
                          <span className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3.5 h-3.5 text-brand flex-shrink-0" />
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
                  className="text-center bg-white border border-gray-200 rounded-xl py-4 px-2"
                >
                  <div className="text-brand font-bold text-xl">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Tally form */}
          <div className="lg:col-span-2 border border-gray-200 rounded-2xl overflow-hidden bg-white">
            <div className="px-6 pt-6 pb-4 border-b border-gray-100">
              <h3 className="font-semibold text-lg mb-1">Demande de cours</h3>
              <p className="text-gray-500 text-sm">
                Remplissez le formulaire, notre équipe vous contacte sous 24h.
              </p>
            </div>
            <div className="px-6 pt-2 pb-4">
              <iframe
                src={tallyUrl}
                width="100%"
                height="500"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                loading="lazy"
                title="Réservation cours de padel"
                style={{ minHeight: 480, display: "block" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
