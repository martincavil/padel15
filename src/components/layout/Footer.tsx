"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import type { SiteSettings } from "@/lib/settings";
import { NavAnchor } from "@/components/prismic/NavAnchor";


function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "already"
  >("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
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
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success")
    return <p className="text-green-400 text-sm">Inscription confirmée !</p>;
  if (status === "already")
    return <p className="text-brand text-sm">Vous êtes déjà inscrit·e.</p>;

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-2 mt-1">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          required
          disabled={status === "loading"}
          className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-white/20 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-brand disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading" || !email}
          className="flex items-center gap-1.5 bg-brand hover:bg-brand-dark text-white font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-60 text-sm whitespace-nowrap"
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              S&apos;inscrire <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
      {status === "error" && (
        <p className="text-red-400 text-sm mt-2">
          Une erreur est survenue. Réessayez dans quelques instants.
        </p>
      )}
    </>
  );
}

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Padel 15"
                width={100}
                height={40}
                className="filter brightness-0 invert mb-4"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {settings.footerTagline}
            </p>
            <address className="text-gray-400 text-sm mt-2 not-italic leading-relaxed">
              {settings.clubName.toUpperCase()}
              {settings.address.split(", ").map((line) => (
                <span key={line}>
                  <br />
                  {line}
                </span>
              ))}
            </address>
            <div className="flex gap-3 mt-4">
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Padel 15"
                className="text-gray-400 hover:text-brand transition-colors"
              >
                <Image
                  src="/images/autres/instagram.webp"
                  alt="Instagram"
                  width={22}
                  height={22}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                />
              </a>
            </div>
          </div>

          {/* Le Club */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Le Club
            </h3>
            <ul className="space-y-2">
              {settings.footerLinks.map((l) => (
                <li key={l.href}>
                  <NavAnchor
                    link={l}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Pratique */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Pratique
            </h3>
            <ul className="space-y-2 mb-4">
              {settings.footerPracticalLinks.map((l) => (
                <li key={l.href}>
                  <NavAnchor
                    link={l}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  />
                </li>
              ))}
              <li>
                <a
                  href={settings.playtomicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Réserver (Playtomic)
                </a>
              </li>
            </ul>
            <div className="text-sm text-gray-400 space-y-1">
              <p>7j/7</p>
              <p>{settings.hours}</p>
              <a
                href={settings.phoneHref}
                className="hover:text-white transition-colors block"
              >
                {settings.phone}
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="hover:text-white transition-colors block"
              >
                {settings.email}
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Newsletter
            </h3>
            <p className="text-gray-400 text-sm mb-3">
              {settings.footerNewsletterText}
            </p>
            <FooterNewsletter />
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 space-y-3">
          <p className="text-gray-400 text-xs">
            © {year} {settings.footerLegal}
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            <Link
              href="/mentions-legales"
              className="hover:text-gray-300 transition-colors"
            >
              Mentions légales
            </Link>
            <span>·</span>
            <Link
              href="/confidentialite"
              className="hover:text-gray-300 transition-colors"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
