"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ConsentState = "accepted" | "refused" | "pending";

export function CookieBanner() {
  // Initialized as "pending" so the banner is in the SSR HTML — this prevents
  // a late LCP paint when the component only renders after JS hydration.
  const [consent, setConsent] = useState<ConsentState>("pending");
  const [hydrated, setHydrated] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent") as ConsentState | null;
    setConsent(stored ?? "pending");
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (consent !== "accepted") return;
    // TODO: Replace XXXXXXXXXXXXXXXXX with your real Meta Pixel ID
    // Meta Pixel — loaded only after user consent (RGPD compliant)
    // const pixelId = "XXXXXXXXXXXXXXXXX";
    // if (pixelId !== "XXXXXXXXXXXXXXXXX" && !(window as Window & { fbq?: unknown }).fbq) {
    //   const script = document.createElement("script");
    //   script.innerHTML = `
    //     !function(f,b,e,v,n,t,s){...}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    //     fbq('init','${pixelId}');fbq('track','PageView');
    //   `;
    //   document.head.appendChild(script);
    // }
  }, [consent]);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setConsent("accepted");
  };

  const refuse = () => {
    localStorage.setItem("cookie-consent", "refused");
    setConsent("refused");
  };

  // Hide once consent is resolved (accepted or refused)
  if (hydrated && consent !== "pending") return null;

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      className="fixed bottom-0 left-0 right-0 z-[60] bg-gray-900 border-t border-white/10 shadow-2xl"
    >
      <div className="container mx-auto px-4 py-4">
        {!showCustomize ? (
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <p className="text-gray-300 text-sm flex-1">
              Nous utilisons des cookies pour améliorer votre expérience et mesurer notre audience.{" "}
              <Link href="/confidentialite" className="underline hover:text-white">
                Politique de confidentialité
              </Link>
              {" "}·{" "}
              <Link href="/mentions-legales" className="underline hover:text-white">
                Mentions légales
              </Link>
            </p>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setShowCustomize(true)}
                className="text-gray-400 hover:text-white text-sm underline px-3 py-2"
              >
                Personnaliser
              </button>
              <button
                onClick={refuse}
                className="border border-white/30 hover:border-white text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Refuser
              </button>
              <button
                onClick={accept}
                className="bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
              >
                Accepter
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-white font-semibold text-sm">Personnaliser vos préférences</p>
            <div className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3">
              <div>
                <p className="text-white text-sm font-medium">Cookies nécessaires</p>
                <p className="text-gray-400 text-xs">Requis pour le fonctionnement du site</p>
              </div>
              <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded">Toujours actifs</span>
            </div>
            <div className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3">
              <div>
                <p className="text-white text-sm font-medium">Cookies analytiques (GA4)</p>
                <p className="text-gray-400 text-xs">Mesure d&apos;audience anonymisée</p>
              </div>
              <button onClick={accept} className="text-brand text-sm font-medium hover:underline">Accepter</button>
            </div>
            <div className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3">
              <div>
                <p className="text-white text-sm font-medium">Cookies marketing (Meta Pixel)</p>
                <p className="text-gray-400 text-xs">Publicité ciblée sur les réseaux sociaux</p>
              </div>
              <button onClick={accept} className="text-brand text-sm font-medium hover:underline">Accepter</button>
            </div>
            <div className="flex gap-2">
              <button onClick={refuse} className="border border-white/30 text-white text-sm px-4 py-2 rounded-lg">Tout refuser</button>
              <button onClick={accept} className="bg-brand text-white text-sm font-semibold px-4 py-2 rounded-lg">Tout accepter</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
