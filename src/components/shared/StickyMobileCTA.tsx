"use client";

import { useEffect, useState, useRef } from "react";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const footerRef = useRef<Element | null>(null);

  useEffect(() => {
    footerRef.current = document.querySelector("footer");
    if (!footerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setMenuOpen(document.body.dataset.menuOpen === "true");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-menu-open"] });
    return () => observer.disconnect();
  }, []);

  if (!visible || menuOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <a
        href="https://playtomic.com/clubs/padel-15"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Réserver un terrain de padel sur Playtomic"
        className="flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold py-4 text-base w-full transition-colors shadow-lg shadow-brand/30"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 12s1.5 2 4 2 4-2 4-2"/>
          <line x1="9" y1="9" x2="9.01" y2="9"/>
          <line x1="15" y1="9" x2="15.01" y2="9"/>
        </svg>
        Réserver un terrain
      </a>
    </div>
  );
}
