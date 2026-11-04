"use client";

/**
 * Formulaire de demande d'événement, hébergé par l'outil interne Padel 15
 * (Railway) et intégré tel quel en iframe, selon la doc fournie par Gaspard
 * le 03/11/2026.
 *
 * Chaque demande envoyée crée côté outil : le client, un devis prérempli
 * (tarifs Pennylane) et les tâches de suivi ; le client reçoit un email de
 * confirmation depuis contact@padel15.fr. Rien à gérer côté site (pas de
 * base, pas de clé), et le formulaire porte déjà la charte Padel 15.
 *
 * Hauteurs fixes reprises de la doc : mesurées à 1 477 px (desktop) et
 * 2 138 px (mobile), avec une marge pour les champs qui s'ouvrent selon les
 * réponses.
 *
 * Problème connu : après l'envoi, l'outil affiche un court message
 * « Merci… » en haut du cadre. Le visiteur, resté en bas près du bouton,
 * voit une zone vide. Le site ne peut pas le détecter seul (domaine
 * différent), donc on écoute deux messages que l'outil peut envoyer via
 * window.parent.postMessage :
 *   { type: "padel15:demande:height", height: <px> } → on ajuste la hauteur
 *   { type: "padel15:demande:sent" }                 → on remonte au message
 *                                                      + événement GA4
 * Tant que l'outil ne les envoie pas, on garde les hauteurs fixes.
 *
 * Toutes les CTA « Demander un devis » / « Organiser un événement » du site
 * pointent vers l'ancre #demande de /evenements.
 */
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/components/Tracking";

export const EVENT_REQUEST_FORM_URL =
  "https://padel15-app-production.up.railway.app/demande";

const FORM_ORIGIN = new URL(EVENT_REQUEST_FORM_URL).origin;

// Hauteur de la navbar fixe, pour ne pas cacher le haut du cadre.
const NAVBAR_OFFSET = 112;

/**
 * `tone="dark"` pour une section à fond sombre (ex. Team Building sur la
 * homepage) : seuls le cadre et le texte de repli changent, le contenu du
 * formulaire est géré par l'outil de Gaspard.
 */
export function EventRequestForm({
  tone = "light",
}: {
  tone?: "light" | "dark";
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      // Uniquement l'outil Padel 15, et uniquement notre iframe (il peut y en
      // avoir une seule par page, mais on reste strict).
      if (e.origin !== FORM_ORIGIN) return;
      if (e.source !== iframeRef.current?.contentWindow) return;
      const data = e.data as { type?: string; height?: unknown };
      if (data?.type === "padel15:demande:height") {
        const h = Number(data.height);
        if (Number.isFinite(h) && h > 200 && h < 10000) setHeight(Math.ceil(h));
      } else if (data?.type === "padel15:demande:sent") {
        const top = frameRef.current?.getBoundingClientRect().top;
        if (top !== undefined && (top < 0 || top > window.innerHeight / 2)) {
          window.scrollTo({
            top: window.scrollY + top - NAVBAR_OFFSET,
            behavior: "smooth",
          });
        }
        trackEvent("b2b_form_submit", {
          event_category: "lead",
          form: "demande_evenement",
        });
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const frame =
    tone === "dark"
      ? "border-white/10 shadow-2xl shadow-black/40"
      : "border-gray-200 shadow-lg shadow-gray-200/80";
  return (
    <div className="space-y-4">
      {/* Cadre aux couleurs des cartes du site. Le fond reprend celui du
          formulaire (#f6f6f3) pour éviter un flash pendant le chargement. */}
      <div
        ref={frameRef}
        className={`mx-auto max-w-[900px] overflow-hidden rounded-2xl border bg-[#f6f6f3] ${frame}`}
      >
        <iframe
          ref={iframeRef}
          src={EVENT_REQUEST_FORM_URL}
          title="Demande d'événement Padel 15"
          style={height ? { height } : undefined}
          className="block h-[2400px] w-full border-0 sm:h-[1650px]"
        />
      </div>
      <p
        className={`text-center text-sm ${tone === "dark" ? "text-gray-400" : "text-gray-500"}`}
      >
        Un souci avec le formulaire ? Écrivez-nous à{" "}
        <a
          href="mailto:contact@padel15.fr?subject=Demande de devis événement"
          className="text-brand hover:underline"
        >
          contact@padel15.fr
        </a>{" "}
        ou appelez le{" "}
        <a href="tel:+33145315876" className="text-brand hover:underline">
          01 45 31 58 76
        </a>
        .
      </p>
    </div>
  );
}
