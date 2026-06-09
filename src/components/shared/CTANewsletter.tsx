"use client";

import { useState } from "react";
import { Mail, CheckCircle, ArrowRight, Loader2 } from "lucide-react";

export function CTANewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "already"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus(data.alreadySubscribed ? "already" : "success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Une erreur est survenue.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Une erreur réseau est survenue.");
    }
  }

  return (
    <section className="relative py-16 bg-gray-50 overflow-hidden">
      {/* Ligne déco haut */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

      {/* Fond déco */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-brand/4 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 max-w-2xl text-center">
        {/* Icône */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand/10 mb-6">
          <Mail className="w-7 h-7 text-brand" />
        </div>

        {/* Titre */}
        <h2 className="font-buzz text-gray-900 mb-4 leading-tight">
          Restez au cœur
          <br />
          <span className="text-brand-dark">du jeu.</span>
        </h2>

        {/* Sous-titre */}
        <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
          Tournois, offres exclusives et actus du club — avant tout le monde.
          2&times;&nbsp;par mois, zéro spam.
        </p>

        {/* Formulaire */}
        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <p className="font-semibold text-gray-900 text-lg">
              Bienvenue dans l&apos;équipe !
            </p>
            <p className="text-gray-500 text-sm">
              Vérifiez votre boîte mail pour confirmer votre inscription.
            </p>
          </div>
        ) : status === "already" ? (
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-brand" />
            </div>
            <p className="font-semibold text-gray-900 text-lg">
              Vous êtes déjà inscrit·e !
            </p>
            <p className="text-gray-500 text-sm">
              Vous recevez déjà nos newsletters. Merci pour votre fidélité.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              disabled={status === "loading"}
              className="flex-1 px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand text-sm bg-white disabled:opacity-60 transition-all"
            />
            <button
              type="submit"
              disabled={status === "loading" || !email}
              className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3.5 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap text-sm"
            >
              {status === "loading" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  S&apos;inscrire
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Message d'erreur */}
        {status === "error" && (
          <p className="text-red-500 text-sm mb-4">{errorMsg}</p>
        )}

        {/* RGPD */}
        {status === "idle" || status === "loading" || status === "error" ? (
          <p className="text-xs text-gray-600 mt-2">
            En vous inscrivant, vous acceptez notre{" "}
            <a
              href="/confidentialite"
              className="underline hover:text-brand transition-colors"
            >
              politique de confidentialité
            </a>
            . Désabonnement en 1 clic.
          </p>
        ) : null}
      </div>
    </section>
  );
}
