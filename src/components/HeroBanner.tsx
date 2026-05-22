"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Smartphone,
} from "lucide-react";

const CAROUSEL_IMAGES = [
  "/images/terrains/terrain-ext-jour.webp",
  "/images/terrains/terrain-inte-game.webp",
  "/images/terrains/terrain-ext-nuit.webp",
  "/images/terrains/terrain-inte-vide.webp",
];

const DAY_NAMES_SHORT = [
  "Dim.",
  "Lun.",
  "Mar.",
  "Mer.",
  "Jeu.",
  "Ven.",
  "Sam.",
];
const DAY_NAMES_FULL = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];
const MONTH_NAMES = [
  "jan.",
  "fév.",
  "mar.",
  "avr.",
  "mai",
  "juin",
  "juil.",
  "août",
  "sep.",
  "oct.",
  "nov.",
  "déc.",
];

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}
function toDateStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// null = chargement, objet = réponse reçue
type AvailabilityState = { hours: Set<number>; hasData: boolean } | null;

const WIDGET_DAYS = 14; // horizon affiché (Playtomic ouvre 5 jours, le reste = "non ouvert")
const DAYS_PER_PAGE = 7;

function BookingWidget() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [now, setNow] = useState<Date | null>(null);
  const [availability, setAvailability] = useState<AvailabilityState>(null);
  const [weekPage, setWeekPage] = useState(0); // 0 = cette semaine, 1 = semaine suivante

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
    setNow(today);
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!selectedDate) return;
    setAvailability(null);
    fetch(`/api/playtomic/availability?date=${toDateStr(selectedDate)}`)
      .then((r) => r.json())
      .then((data) =>
        setAvailability({
          hours: new Set<number>(data.availableHours ?? []),
          hasData: data.hasData ?? false,
        }),
      )
      .catch(() =>
        setAvailability({ hours: new Set<number>(), hasData: false }),
      );
  }, [selectedDate]);

  if (!selectedDate || !now) return null;

  const isToday = isSameDay(selectedDate, now);
  const currentHour = isToday ? now.getHours() : -1;
  const dateStr = toDateStr(selectedDate);
  const bookingUrl = `https://playtomic.com/clubs/padel-15?date=${dateStr}`;

  const maxWeekPage = Math.floor((WIDGET_DAYS - 1) / DAYS_PER_PAGE);
  const pageStart = weekPage * DAYS_PER_PAGE;
  const weekDays = Array.from({ length: DAYS_PER_PAGE }, (_, i) =>
    addDays(now, pageStart + i),
  );

  // Quand on change de page, sélectionner le premier jour de la nouvelle page
  const goNextWeek = () => {
    if (weekPage < maxWeekPage) {
      const next = weekPage + 1;
      setWeekPage(next);
      setSelectedDate(addDays(now, next * DAYS_PER_PAGE));
    }
  };
  const goPrevWeek = () => {
    if (weekPage > 0) {
      const prev = weekPage - 1;
      setWeekPage(prev);
      setSelectedDate(addDays(now, prev * DAYS_PER_PAGE));
    }
  };

  const slots = Array.from({ length: 14 }, (_, i) => {
    const hour = 8 + i;
    const isPast = hour < currentHour;
    const loading = !isPast && availability === null;
    const notOpen = !isPast && !loading && !availability!.hasData;
    const isAvailable =
      !isPast && !loading && !notOpen && availability!.hours.has(hour);
    const isFull =
      !isPast && !loading && !notOpen && !availability!.hours.has(hour);
    return { hour, isPast, isAvailable, isFull, isLoading: loading, notOpen };
  });

  const dispoCount = availability?.hasData
    ? slots.filter((s) => s.isAvailable).length
    : null;

  const headerSub =
    availability === null
      ? "Chargement…"
      : !availability.hasData
        ? "Créneaux pas encore ouverts"
        : dispoCount! > 0
          ? `${dispoCount} créneau${dispoCount! > 1 ? "x" : ""} disponible${dispoCount! > 1 ? "s" : ""}`
          : "Aucun créneau disponible";

  const headerColor =
    availability === null || !availability.hasData
      ? "text-white/35"
      : dispoCount! > 0
        ? "text-green-400/80"
        : "text-white/40";

  const dayLabel = isToday
    ? "Aujourd'hui"
    : `${DAY_NAMES_FULL[selectedDate.getDay()]} ${selectedDate.getDate()} ${MONTH_NAMES[selectedDate.getMonth()]}`;

  return (
    <div className="bg-black/65 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-full max-w-sm">
      {/* Header — hauteurs figées pour éviter tout layout shift */}
      <div className="mb-4">
        <p className="text-white/50 text-xs uppercase tracking-wider font-medium mb-0.5">
          Réservation
        </p>
        <p className="text-white font-semibold h-6 leading-6 truncate">
          {dayLabel}
        </p>
        <p
          className={`text-sm h-5 leading-5 truncate transition-colors ${headerColor}`}
        >
          {headerSub}
        </p>
      </div>

      {/* Mini calendrier — pagination par semaine */}
      <div className="flex items-center gap-0.5 mb-4">
        <button
          onClick={goPrevWeek}
          disabled={weekPage === 0}
          aria-label="Semaine précédente"
          className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-white transition-colors disabled:opacity-20 disabled:cursor-not-allowed flex-shrink-0"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex flex-1">
          {weekDays.map((d) => {
            const isSelected = isSameDay(d, selectedDate);
            const isTodayD = isSameDay(d, now);
            return (
              <button
                key={d.toISOString()}
                onClick={() => setSelectedDate(d)}
                className="flex-1 flex flex-col items-center gap-1 h-14 justify-center rounded-xl transition-all hover:bg-white/5 group"
              >
                <span className="text-[9px] font-semibold uppercase tracking-widest text-white/35 group-hover:text-white/50 transition-colors">
                  {DAY_NAMES_SHORT[d.getDay()].replace(".", "")}
                </span>
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    isSelected
                      ? "bg-brand text-white shadow-md shadow-brand/50"
                      : isTodayD
                        ? "ring-1 ring-brand/70 text-brand"
                        : "text-white/60 group-hover:text-white"
                  }`}
                >
                  {d.getDate()}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={goNextWeek}
          disabled={weekPage >= maxWeekPage}
          aria-label="Semaine suivante"
          className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-white transition-colors disabled:opacity-20 disabled:cursor-not-allowed flex-shrink-0"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grille créneaux */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {slots.map(
          ({ hour, isPast, isAvailable, isFull, isLoading, notOpen }) => {
            const label = `${hour}h`;
            const base =
              "h-9 flex items-center justify-center rounded-xl text-xs font-medium";
            if (isPast)
              return (
                <div
                  key={hour}
                  className={`${base} text-white/20 bg-white/5 line-through select-none`}
                >
                  {label}
                </div>
              );
            if (isLoading)
              return (
                <div
                  key={hour}
                  className={`${base} text-white/20 bg-white/5 animate-pulse`}
                >
                  {label}
                </div>
              );
            if (notOpen)
              return (
                <div
                  key={hour}
                  className={`${base} text-white/15 bg-white/[0.03] select-none`}
                >
                  {label}
                </div>
              );
            if (isAvailable)
              return (
                <a
                  key={hour}
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Réserver ${label} — ${dayLabel}`}
                  className={`${base} font-semibold text-white bg-brand/70 hover:bg-brand transition-colors border border-brand/40`}
                >
                  {label}
                </a>
              );
            // isFull
            return (
              <div
                key={hour}
                className={`${base} text-white/25 bg-white/5 select-none`}
              >
                {label}
              </div>
            );
          },
        )}
      </div>

      {/* Légende */}
      <div className="flex items-center gap-3 mb-4 justify-center">
        <span className="flex items-center gap-1 text-[10px] text-white/35">
          <span className="w-2.5 h-2.5 rounded bg-brand/70 inline-block" />
          Disponible
        </span>
        <span className="flex items-center gap-1 text-[10px] text-white/35">
          <span className="w-2.5 h-2.5 rounded bg-white/10 border border-white/10 inline-block" />
          Complet
        </span>
      </div>

      {/* CTA principal */}
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-brand hover:bg-brand-dark text-white font-semibold py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-brand/25 mb-3"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l3 3" />
        </svg>
        Voir les créneaux en temps réel
      </a>

      {/* App badges */}
      <div className="grid grid-cols-2 gap-2">
        <a
          href="https://apps.apple.com/fr/app/playtomic-play-padel/id1242321076"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="App Store"
          className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-2.5 rounded-xl text-xs font-medium transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          App Store
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.playtomic&hl=fr"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Google Play"
          className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-2.5 rounded-xl text-xs font-medium transition-colors"
        >
          <Smartphone className="w-4 h-4 shrink-0" />
          Google Play
        </a>
      </div>
    </div>
  );
}

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i === CAROUSEL_IMAGES.length - 1 ? 0 : i + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen max-h-screen relative overflow-hidden">
      {/* Vidéo — uploadez /public/bg-video-test.mp4 pour activer */}
      {/* <video
        autoPlay
        muted
        loop
        playsInline
        poster="/_next/image?url=%2Fimages%2Fterrains%2Fterrain-ext-jour.webp&w=828&q=75"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/bg-video-test.mp4" type="video/mp4" />
        <track kind="captions" srcLang="fr" label="Français" default />
      </video> */}

      {/* Fallback carousel photo — seule image 0 est priority, les autres lazy */}
      <div className="absolute inset-0 z-0">
        {CAROUSEL_IMAGES.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={src}
              alt="Terrains Padel 15"
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
              quality={index === 0 ? 75 : 60}
            />
          </div>
        ))}
      </div>

      {/* Overlays : gauche sombre pour lisibilité texte */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />

      {/* ── Desktop lg+ : split gauche / droite ── */}
      <div className="hidden lg:grid grid-cols-3 relative z-20 h-full container items-center gap-8">
        {/* LEFT */}
        <div className="col-span-2 flex flex-col gap-5">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 w-fit">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg
                  key={s}
                  className="w-3.5 h-3.5 fill-yellow-400"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-white text-xs font-medium">
              4,6 · 112 avis Google
            </span>
          </div>

          <div>
            <Image
              src="/logo.svg"
              alt="Padel 15"
              width={300}
              height={100}
              className="filter brightness-0 invert mb-4"
              priority
            />
            <h1 className="font-buzz text-6xl xl:text-7xl text-white leading-none tracking-tight">
              L&apos;art de Vivre <span className="text-brand">Le Padel</span>
            </h1>
          </div>

          <p className="text-white/70">
            L&apos;art de vivre le padel à Paris. Un club d&apos;exception où
            sport, élégance et convivialité se rencontrent. Dans un écrin
            végétalisé en plein cœur de la capitale, jouez, partagez,
            détendez-vous… et savourez chaque instant. Terrains couvert et haut
            de gamme, terrasse guinguette, pétanque, fléchettes, bar et
            restaurant
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/entreprises"
              className="bg-[#1A7A4A] hover:bg-[#155f3a] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              Organiser un événement pro ou perso
            </Link>
          </div>
        </div>

        {/* RIGHT — Booking widget */}
        <div className="flex justify-end">
          <BookingWidget />
        </div>
      </div>

      {/* ── Mobile / tablet <lg : centré ── */}
      <div className="flex lg:hidden relative z-20 h-full flex-col items-center justify-center text-center px-4 gap-5">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg
                key={s}
                className="w-3 h-3 fill-yellow-400"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-white text-xs font-medium">4,6 · 112 avis</span>
        </div>

        <div>
          <Image
            src="/logo.svg"
            alt="Padel 15"
            width={240}
            height={95}
            className="mx-auto filter brightness-0 invert mb-3"
            priority
          />
          <h1 className="font-buzz text-5xl text-white leading-none">
            L&apos;art de vivre
            <br />
            <span className="text-brand">le padel</span>
          </h1>
        </div>

        <p className="text-white/70 text-sm">
          Sport · Élégance · Convivialité · Paris 15ème
        </p>

        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          <a
            href="https://playtomic.com/clubs/padel-15"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center bg-brand hover:bg-brand-dark text-white font-semibold py-4 rounded-xl text-base transition-colors shadow-lg shadow-brand/30"
          >
            Réserver un terrain
          </a>
          <div className="flex gap-2 w-full">
            <a
              href="https://apps.apple.com/fr/app/playtomic-play-padel/id1242321076"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 border border-white/20 text-white py-2.5 rounded-xl text-xs font-medium"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-current shrink-0"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              App Store
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.playtomic&hl=fr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 border border-white/20 text-white py-2.5 rounded-xl text-xs font-medium"
            >
              <Smartphone className="w-4 h-4 shrink-0" />
              Google Play
            </a>
          </div>
          <Link
            href="/entreprises"
            className="w-full text-center bg-[#1A7A4A] hover:bg-[#155f3a] text-white font-semibold py-4 rounded-xl text-base transition-colors shadow-lg"
          >
            Organiser un événement pro ou perso
          </Link>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-0.5">
        {CAROUSEL_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Photo ${i + 1}`}
            className="p-1 flex items-center justify-center"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-5 h-1.5 bg-brand"
                  : "w-1.5 h-1.5 bg-white/40"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Scroll indicator desktop */}
      <div className="absolute bottom-4 left-1/2 z-20 hidden lg:block animate-pulse">
        <div>
          <ChevronDown className="w-5 h-5 text-white/40" />
        </div>
      </div>
    </div>
  );
}
