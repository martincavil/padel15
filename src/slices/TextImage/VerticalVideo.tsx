"use client";

import { useRef, useEffect, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

/** Vidéo verticale : lecture quand elle est visible, son activable (ex. Événements). */
export function VerticalVideo({ src, poster, cornerLabel }: { src: string; poster?: string; cornerLabel?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => { setPlaying(true); setStarted(true); }).catch(() => {});
        } else {
          video.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.4 },
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
    <div className="relative group">
      <div className="absolute -inset-4 bg-brand/10 rounded-[2.5rem] blur-2xl" />
      <div
        className="relative w-[280px] sm:w-[320px] aspect-[9/16] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/60 border border-white/10 cursor-pointer"
        onClick={togglePlay}
      >
        <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" className="absolute inset-0 w-full h-full object-cover">
          <track kind="captions" srcLang="fr" label="Français" default />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
        {!started && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-transform group-hover:scale-110">
              <Play className="w-7 h-7 text-white fill-white ml-1" />
            </div>
          </div>
        )}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${playing ? "bg-brand animate-pulse" : "bg-white/40"}`} />
            <span className="text-white text-xs font-medium">{playing ? "En direct" : "Padel 15"}</span>
          </div>
          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label={muted ? "Activer le son" : "Couper le son"}
          >
            {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
      {cornerLabel && (
        <div className="absolute -right-4 top-1/3 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 shadow-lg shadow-gray-200/80 flex items-center gap-2 -rotate-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-semibold text-gray-800 whitespace-nowrap">{cornerLabel}</span>
        </div>
      )}
    </div>
  );
}
