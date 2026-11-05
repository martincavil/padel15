"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { Instagram } from "lucide-react";

// Vidéos sur Cloudflare Pages (projet padel15-video, dossier instagram/) :
// ça ne compte pas dans le quota Vercel. Adresses et images d'attente
// saisies dans Prismic (bloc « Vidéos Instagram »).
export type InstagramVideo = { src: string; poster?: string };

function VideoItem({ src, poster }: InstagramVideo) {
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
  videos: InstagramVideo[];
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

export function InstagramSection({
  title, handle, instagramUrl, left, right,
}: {
  title: ReactNode;
  handle: string;
  instagramUrl: string;
  left: InstagramVideo[];
  right: InstagramVideo[];
}) {
  return (
    <section className="py-20 bg-white">
      {/* Header */}
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <div>
          {title}
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
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl px-6 py-3.5 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Instagram className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm leading-tight">
                {handle}
              </p>
              <p className="text-gray-400 text-xs">Voir sur Instagram</p>
            </div>
          </a>
        </div>

        {/* Colonnes centrées, largeur naturelle 9:16 */}
        <div className="flex gap-3 justify-center h-full">
          <ScrollColumn
            videos={left}
            animClass="animate-scroll-up"
            offsetPx={0}
          />
          <ScrollColumn
            videos={right}
            animClass="animate-scroll-down"
            offsetPx={200}
          />
        </div>
      </div>
    </section>
  );
}
