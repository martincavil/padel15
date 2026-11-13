"use client";

/**
 * Formulaire de demande d'événement, hébergé par l'outil interne Padel 15
 * (Railway) et intégré en iframe selon la doc de Gaspard du 13/11/2026.
 *
 * Chaque demande envoyée crée côté outil : le client, un devis prérempli et
 * les tâches de suivi ; le client reçoit un e-mail de confirmation. Rien à
 * gérer côté site (pas de base, pas de clé).
 *
 * - `?embed=1` : version compacte, sans en-tête ni introduction en double.
 * - Le formulaire (6 étapes) a besoin de JavaScript : `allow-scripts`.
 * - Il envoie sa hauteur (`padel15:demande:height`) à chaque étape : le cadre
 *   prend cette hauteur, sans espace vide en dessous.
 * - Quand une étape est plus courte que la précédente (ou après l'envoi), le
 *   bas du formulaire peut remonter au-dessus de l'écran : on ramène alors le
 *   haut du cadre sous la navbar.
 * - Envoi : si l'outil envoie `padel15:demande:sent`, la demande est comptée
 *   dans GA4 (`b2b_form_submit`).
 *
 * Toutes les CTA « Demander un devis » / « Organiser un événement » du site
 * pointent vers l'ancre #demande de /evenements.
 */
import { useEffect, useRef } from "react";
import { trackEvent } from "@/components/Tracking";

const APP = "https://padel15-app-production.up.railway.app";
export const EVENT_REQUEST_FORM_URL = `${APP}/demande?embed=1`;

/** Hauteur avant le premier message du formulaire. */
const INITIAL_HEIGHT = 760;

/** Hauteur de la navbar fixe, pour ne pas cacher le haut du cadre. */
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

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const iframe = iframeRef.current;
      if (e.origin !== APP || !iframe || e.source !== iframe.contentWindow) return;

      if (e.data?.type === "padel15:demande:height" && typeof e.data.height === "number") {
        iframe.style.height = `${Math.ceil(e.data.height)}px`;
        // Le formulaire a raccourci et son bas est passé au-dessus du milieu
        // de l'écran : on remonte au début pour ne pas laisser un vide.
        const box = frameRef.current?.getBoundingClientRect();
        if (box && box.bottom < window.innerHeight / 2) {
          window.scrollTo({ top: window.scrollY + box.top - NAVBAR_OFFSET, behavior: "smooth" });
        }
      }

      if (e.data?.type === "padel15:demande:sent") {
        trackEvent("b2b_form_submit", { event_category: "lead", form: "demande_evenement" });
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
          sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          className="block w-full border-0"
          style={{ height: INITIAL_HEIGHT }}
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
