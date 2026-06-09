"use client";

import { useRef, useEffect } from "react";
import { Instagram } from "lucide-react";

// Poster = première frame Cloudinary. Transformations w_520,h_924,c_fill,f_auto,q_auto
// réduisent les posters de ~200 KB à ~20 KB chacun (affiché en 260×462 à 1.75x DPR).
const CLD_TRANSFORM = "w_520,h_924,c_fill,f_auto,q_auto";

const COL_LEFT = [
  {
    src: "https://res.cloudinary.com/martincvl/video/upload/v1779279891/padel15/videos/PADEL_FOOD_r1zv05.mp4",
    poster: `https://res.cloudinary.com/martincvl/video/upload/${CLD_TRANSFORM}/v1779279891/padel15/videos/PADEL_FOOD_r1zv05.jpg`,
  },
  {
    src: "https://res.cloudinary.com/martincvl/video/upload/v1779279891/padel15/videos/FOOD_tumxyq.mp4",
    poster: `https://res.cloudinary.com/martincvl/video/upload/${CLD_TRANSFORM}/v1779279891/padel15/videos/FOOD_tumxyq.jpg`,
  },
];

const COL_RIGHT = [
  {
    src: "https://res.cloudinary.com/martincvl/video/upload/v1779279890/padel15/videos/PADEL_hwhmqg.mp4",
    poster: `https://res.cloudinary.com/martincvl/video/upload/${CLD_TRANSFORM}/v1779279890/padel15/videos/PADEL_hwhmqg.jpg`,
  },
  {
    src: "https://res.cloudinary.com/martincvl/video/upload/v1779279890/padel15/videos/APP_yr8e68.mp4",
    poster: `https://res.cloudinary.com/martincvl/video/upload/${CLD_TRANSFORM}/v1779279890/padel15/videos/APP_yr8e68.jpg`,
  },
];

const INSTAGRAM_URL = "https://www.instagram.com/padel15club/?hl=fr";

function VideoItem({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Joue uniquement quand la section est visible — évite les 50MB de réseau au chargement
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.1 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden flex-shrink-0 bg-black">
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        preload="none"
      >
        {/* Track requis pour l'accessibilité (Lighthouse Accessibility) */}
        <track kind="captions" srcLang="fr" label="Français" default />
      </video>
    </div>
  );
}

function ScrollColumn({
  videos,
  animClass,
  offsetPx = 0,
}: {
  videos: typeof COL_LEFT;
  animClass: "animate-scroll-up" | "animate-scroll-down";
  offsetPx?: number;
}) {
  const doubled = [...videos, ...videos];
  return (
    <div className="w-[260px] flex-shrink-0">
      <div
        className={`flex flex-col gap-3 ${animClass}`}
        style={offsetPx ? { marginTop: `-${offsetPx}px` } : undefined}
      >
        {doubled.map((v, i) => (
          <VideoItem key={`${v.src}-${i}`} src={v.src} poster={v.poster} />
        ))}
      </div>
    </div>
  );
}

export function InstagramSection() {
  return (
    <section className="py-20 bg-white">
      {/* Header */}
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <div>
          <h2 className="font-buzz mb-1">
            Vivez l&apos;expérience Padel15
          </h2>
        </div>
      </div>

      {/* Mur scrollant — plus haut pour voir les vidéos en entier */}
      <div className="relative h-[700px] md:h-[860px] overflow-hidden">
        {/* Fades haut et bas */}
        <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

        {/* Badge Instagram central */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl px-6 py-3.5 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Instagram className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm leading-tight">
                @padel15club
              </p>
              <p className="text-gray-400 text-xs">Voir sur Instagram</p>
            </div>
          </a>
        </div>

        {/* Colonnes centrées, largeur naturelle 9:16 */}
        <div className="flex gap-3 justify-center h-full">
          <ScrollColumn
            videos={COL_LEFT}
            animClass="animate-scroll-up"
            offsetPx={0}
          />
          <ScrollColumn
            videos={COL_RIGHT}
            animClass="animate-scroll-down"
            offsetPx={200}
          />
        </div>
      </div>
    </section>
  );
}
