"use client";

import { useEffect, useState } from "react";
import { Utensils } from "lucide-react";
import { trackEvent } from "@/components/Tracking";

const RESTAURANT_BOOKING_URL =
  "https://reservation.laddition.com/booking/P15#/couverts";

/**
 * Bouton flottant « Réserver au restaurant », au milieu à droite de toutes
 * les pages. Rond (icône seule) au repos ; au survol ou au focus clavier, il
 * s'étire vers la gauche et fait apparaître le libellé à droite de l'icône.
 * Sur écran tactile (pas de survol), seul le bouton rond est visible.
 *
 * Masqué quand le menu mobile est ouvert (la Navbar pose `data-menu-open`
 * sur <body>, comme StickyMobileCTA) pour ne pas flotter par-dessus le menu.
 */
export function RestaurantBookingButton() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sync = () => setMenuOpen(document.body.dataset.menuOpen === "true");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-menu-open"],
    });
    return () => observer.disconnect();
  }, []);

  if (menuOpen) return null;

  return (
    <a
      href={RESTAURANT_BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Réserver au restaurant (s'ouvre dans un nouvel onglet)"
      onClick={() =>
        trackEvent("restaurant_booking_click", {
          event_category: "engagement",
          link_url: RESTAURANT_BOOKING_URL,
        })
      }
      className="group fixed right-3 top-1/2 z-30 flex h-12 -translate-y-1/2 items-center rounded-full border border-white/30 bg-[#1A7A4A] px-[13px] text-white shadow-lg shadow-black/25 transition-colors duration-300 hover:bg-[#155f3a] focus-visible:bg-[#155f3a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none md:right-5"
    >
      <Utensils className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span
        aria-hidden="true"
        className="ml-0 max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 ease-out group-hover:ml-2 group-hover:max-w-[180px] group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:max-w-[180px] group-focus-visible:opacity-100 motion-reduce:transition-none"
      >
        Réserver au restaurant
      </span>
    </a>
  );
}
