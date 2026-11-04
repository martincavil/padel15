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
 * Confirmation après envoi : l'outil affiche un court message « Merci… »
 * en haut du cadre, alors que le visiteur est en bas, près du bouton. Le site
 * ne voit pas ce qui se passe dans le cadre (autre domaine), sauf un
 * rechargement complet. On charge donc le formulaire SANS JavaScript
 * (sandbox sans allow-scripts) : il s'envoie alors comme un formulaire HTML
 * classique (POST puis redirection vers /demande?envoye=1, vérifié le
 * 04/11/2026), ce qui recharge le cadre. Sur ce rechargement :
 *   - on remonte au message de confirmation,
 *   - on réduit le cadre à la taille du message,
 *   - on compte la demande dans GA4 (b2b_form_submit).
 * Le formulaire n'a pas besoin de JS : champs natifs, validation native,
 * bouton Pro/Privé = simple lien.
 *
 * Toutes les CTA « Demander un devis » / « Organiser un événement » du site
 * pointent vers l'ancre #demande de /evenements.
 */
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/components/Tracking";

export const EVENT_REQUEST_FORM_URL =
  "https://padel15-app-production.up.railway.app/demande";

// Hauteur de la navbar fixe, pour ne pas cacher le haut du cadre.
const NAVBAR_OFFSET = 112;

// Hauteur du cadre une fois le message « Merci » affiché.
const CONFIRMATION_HEIGHT = 400;

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
    const iframe = iframeRef.current;
    if (!iframe) return;
    let loads = 0;

    function onLoad() {
      loads += 1;
      const frameTop = frameRef.current?.getBoundingClientRect().top ?? 0;
      // Le visiteur était dans le bas du formulaire : c'est le bouton
      // « Envoyer ». En haut, c'est le chargement initial ou le bouton
      // Pro/Privé.
      const wasNearSubmit = frameTop < -300;

      if (!wasNearSubmit) {
        if (loads > 1) setHeight(null); // ex. « Faire une autre demande »
        return;
      }

      setHeight(CONFIRMATION_HEIGHT);
      window.scrollTo({
        top: window.scrollY + frameTop - NAVBAR_OFFSET,
        behavior: "smooth",
      });
      trackEvent("b2b_form_submit", {
        event_category: "lead",
        form: "demande_evenement",
      });
    }

    iframe.addEventListener("load", onLoad);
    return () => iframe.removeEventListener("load", onLoad);
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
          // Sans allow-scripts : envoi en formulaire HTML classique (voir
          // l'en-tête). allow-same-origin est nécessaire pour que l'outil
          // accepte l'envoi (contrôle de l'origine côté serveur).
          sandbox="allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox"
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
