"use client";

import { useRef, useEffect, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

const VIDEO_SRC =
  "https://res.cloudinary.com/martincvl/video/upload/v1779368241/padel15/videos/Reel_Trend_Kent-_1_acuqpj.mp4";

// Cloudinary auto-thumbnail (première frame, redimensionnée)
const POSTER =
  "https://res.cloudinary.com/martincvl/video/upload/w_720,h_1280,c_fill,f_auto,q_auto/v1779368241/padel15/videos/Reel_Trend_Kent-_1_acuqpj.jpg";

export function VideoReel() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false);

  // Autoplay / pause quand le reel entre / sort du viewport
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => {
            setPlaying(true);
            setStarted(true);
          }).catch(() => {});
        } else {
          video.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => { setPlaying(true); setStarted(true); }).catch(() => {});
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — texte */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand/10 text-brand border border-brand/20 mb-5">
              En exclusivité
            </span>
            <h2 className="font-buzz text-4xl md:text-5xl text-gray-900 leading-tight mb-6">
              L&apos;expérience <br />
              <span className="text-brand">Padel 15</span> en images
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
              Terrain privatisé, coach dédié, restaurant et guinguette — tout
              ce qu&apos;il faut pour un team building d&apos;exception au cœur
              de Paris.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="mailto:contact@padel15.fr?subject=Événement entreprise"
                className="bg-brand hover:bg-brand-dark text-white font-semibold px-7 py-4 rounded-xl transition-colors shadow-lg shadow-brand/20"
              >
                Demander un devis
              </a>
              <a
                href="tel:+33145315876"
                className="border border-gray-200 hover:border-gray-400 text-gray-700 font-medium px-7 py-4 rounded-xl transition-colors"
              >
                Appeler le club
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 justify-center lg:justify-start mt-10">
              {[
                { value: "20+", label: "Entreprises clientes" },
                { value: "8–40", label: "Personnes / événement" },
                { value: "24h", label: "Réponse garantie" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-gray-900 font-buzz text-2xl">{s.value}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — vidéo reel vertical */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative group">

              {/* Halo orange derrière la vidéo */}
              <div className="absolute -inset-4 bg-brand/10 rounded-[2.5rem] blur-2xl" />

              {/* Cadre vidéo */}
              <div
                className="relative w-[280px] sm:w-[320px] aspect-[9/16] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/60 border border-white/10 cursor-pointer"
                onClick={togglePlay}
              >
                <video
                  ref={ref}
                  src={VIDEO_SRC}
                  poster={POSTER}
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <track kind="captions" srcLang="fr" label="Français" default />
                </video>

                {/* Overlay sombre léger */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                {/* Bouton play — visible si pas encore lancé */}
                {!started && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-transform group-hover:scale-110">
                      <Play className="w-7 h-7 text-white fill-white ml-1" />
                    </div>
                  </div>
                )}

                {/* Contrôles bas */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${playing ? "bg-brand animate-pulse" : "bg-white/40"}`} />
                    <span className="text-white text-xs font-medium">
                      {playing ? "En direct" : "Padel 15"}
                    </span>
                  </div>
                  <button
                    onClick={toggleMute}
                    className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    aria-label={muted ? "Activer le son" : "Couper le son"}
                  >
                    {muted
                      ? <VolumeX className="w-3.5 h-3.5" />
                      : <Volume2 className="w-3.5 h-3.5" />
                    }
                  </button>
                </div>
              </div>

              {/* Badge flottant */}
              <div className="absolute -right-4 top-1/3 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 shadow-lg shadow-gray-200/80 flex items-center gap-2 -rotate-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold text-gray-800 whitespace-nowrap">
                  Paris 15ème
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
