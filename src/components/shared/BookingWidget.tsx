"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Smartphone } from "lucide-react";

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

type AvailabilityState = { hours: Set<number>; hasData: boolean } | null;

const WIDGET_DAYS = 14;
const DAYS_PER_PAGE = 7;

interface BookingWidgetProps {
  className?: string;
}

export function BookingWidget({ className }: BookingWidgetProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [now, setNow] = useState<Date | null>(null);
  const [availability, setAvailability] = useState<AvailabilityState>(null);
  const [weekPage, setWeekPage] = useState(0);

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
        ? "Créneaux visibles directement sur Playtomic"
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
    <div
      className={
        className ??
        "bg-black/65 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-full max-w-sm"
      }
    >
      {/* Header */}
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

      {/* Mini calendrier */}
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
      <div className="md:hidden grid grid-cols-2 gap-2">
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
