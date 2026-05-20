# Padel 15 — Refonte v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformer le site one-page existant en site multi-page avec SEO structuré, blog Sanity, intégrations Tally/Playtomic/Brevo, et deux tunnels de conversion distincts (joueurs vs. entreprises).

**Architecture:** Next.js 15 App Router, static export (`output: 'export'`). Toutes les pages sont générées à build time — pas d'API routes, pas d'ISR. Le blog Sanity utilise `generateStaticParams` pour pré-générer les articles. La newsletter utilise le widget Brevo en iframe client-side. Les composants existants sont réutilisés/déplacés, pas réécrits from scratch.

**Tech Stack:** Next.js 15, TypeScript, Tailwind v4, shadcn/ui, Sanity.io (free tier), Tally forms, Brevo newsletter, Playtomic embed, Google Maps iframe.

**Contrainte critique:** `output: 'export'` dans `next.config.ts` → pas d'API routes, pas de middleware, pas de Sanity Studio embarqué. Le Sanity Studio tourne séparément (`npx sanity dev`).

---

## Carte des fichiers

### Modifiés

- `src/styles/globals.css` — `@font-face` BuzzBlack + `@theme` brand token
- `src/app/layout.tsx` — `next/font`, JSON-LD LocalBusiness, metadata globale
- `src/app/page.tsx` — homepage v2 (réassemblage)
- `src/components/Layout.tsx` — utilise le nouveau Footer
- `src/components/Navbar.tsx` — Links multi-page, dual CTA, active route
- `src/components/TeamBuilding.tsx` — remplace image readdy.ai par `/terrain-ext-jour.webp`

### Créés — Shared

- `src/components/shared/JsonLd.tsx`
- `src/components/shared/TallyEmbed.tsx`
- `src/components/shared/CTANewsletter.tsx`
- `src/components/shared/GoogleRating.tsx`

### Créés — Layout

- `src/components/layout/Footer.tsx`

### Créés — Homepage

- `src/components/homepage/ExperienceBlocks.tsx`
- `src/components/homepage/B2BSection.tsx`

### Créés — Pages

- `src/app/terrains/page.tsx`
- `src/app/restaurant/page.tsx`
- `src/app/evenements/page.tsx`
- `src/app/coaching/page.tsx`
- `src/app/le-club/page.tsx`
- `src/app/tarifs/page.tsx`
- `src/app/contact/page.tsx`

### Créés — Blog

- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/components/blog/BlogCard.tsx`
- `src/components/blog/PortableTextRenderer.tsx`

### Créés — Sanity

- `src/lib/sanity.ts`
- `src/sanity/schemas/post.ts`
- `src/sanity/schemas/index.ts`
- `sanity.config.ts` (racine)

### Créés — SEO

- `src/app/sitemap.ts`
- `src/app/robots.ts`

---

## Phase 0 — Foundation

### Task 1 : Fix bug critique + installer les dépendances

**Files:**

- Modify: `src/components/TeamBuilding.tsx`
- Run: `npm install`

- [ ] **Step 1 : Repérer l'image externe à remplacer dans TeamBuilding.tsx**

Ligne 34 dans `src/components/TeamBuilding.tsx` contient une URL `readdy.ai` qui peut casser n'importe quand. La remplacer par `/terrain-ext-jour.webp` (déjà en `public/`).

- [ ] **Step 2 : Remplacer l'URL distante**

Dans `src/components/TeamBuilding.tsx`, remplacer le bloc `style` du fond :

```tsx
// Avant (ligne ~34) :
style={{
  backgroundImage: `url('https://readdy.ai/api/search-image?...')`,
}}

// Après :
style={{
  backgroundImage: `url('/terrain-ext-jour.webp')`,
}}
```

- [ ] **Step 3 : Supprimer le second div inutile (ligne ~37)**

```tsx
// Supprimer cette ligne vide :
<div className="absolute inset-0 bg-cover bg-center z-0" style={{}} />
```

- [ ] **Step 4 : Installer next-sanity et @sanity/image-url**

```bash
npm install next-sanity @sanity/image-url @portabletext/react
```

Expected output: 3 packages added.

- [ ] **Step 5 : Vérifier que le build passe**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6 : Commit**

```bash
git add src/components/TeamBuilding.tsx package.json package-lock.json
git commit -m "fix: replace external readdy.ai image, install sanity deps"
```

---

### Task 2 : Tailwind v4 — BuzzBlack + brand token

**Files:**

- Modify: `src/styles/globals.css`

- [ ] **Step 1 : Vérifier que BuzzBlack.otf existe**

```bash
ls public/fonts/
```

Expected: `BuzzBlack.otf` dans la liste.

- [ ] **Step 2 : Ajouter @font-face et @theme en haut de globals.css**

Dans `src/styles/globals.css`, après la ligne `@import "tw-animate-css";` et avant `@tailwind utilities;`, ajouter :

```css
@font-face {
  font-family: "BuzzBlack";
  src: url("/fonts/BuzzBlack.otf") format("opentype");
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

@theme {
  --color-brand: #ff6727;
  --color-brand-dark: #e55a1f;
  --font-buzz: "BuzzBlack", sans-serif;
}
```

Cela crée les classes Tailwind : `bg-brand`, `text-brand`, `border-brand`, `font-buzz`.

- [ ] **Step 3 : Tester que les classes fonctionnent**

```bash
npm run build 2>&1 | tail -5
```

Expected: `✓ Compiled successfully` ou similaire (pas d'erreur CSS).

- [ ] **Step 4 : Commit**

```bash
git add src/styles/globals.css
git commit -m "feat: add BuzzBlack font and brand color token (Tailwind v4)"
```

---

### Task 3 : Composants shared (JsonLd, TallyEmbed, GoogleRating, CTANewsletter)

**Files:**

- Create: `src/components/shared/JsonLd.tsx`
- Create: `src/components/shared/TallyEmbed.tsx`
- Create: `src/components/shared/GoogleRating.tsx`
- Create: `src/components/shared/CTANewsletter.tsx`

- [ ] **Step 1 : Créer JsonLd.tsx**

```tsx
// src/components/shared/JsonLd.tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 2 : Créer TallyEmbed.tsx**

```tsx
// src/components/shared/TallyEmbed.tsx
"use client";

interface TallyEmbedProps {
  formId: string;
  height?: number;
  title?: string;
}

export function TallyEmbed({
  formId,
  height = 500,
  title = "Formulaire",
}: TallyEmbedProps) {
  return (
    <iframe
      src={`https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&dynamicHeight=1`}
      width="100%"
      height={height}
      frameBorder={0}
      title={title}
      style={{ minHeight: height, display: "block" }}
    />
  );
}
```

- [ ] **Step 3 : Créer GoogleRating.tsx**

```tsx
// src/components/shared/GoogleRating.tsx
export function GoogleRating({
  rating = 4.8,
  count = 250,
}: {
  rating?: number;
  count?: number;
}) {
  const stars = Math.round(rating);
  return (
    <div className="flex items-center gap-2 justify-center">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < stars ? "text-yellow-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm font-semibold">{rating}/5</span>
      <span className="text-sm text-gray-500">({count} avis Google)</span>
    </div>
  );
}
```

- [ ] **Step 4 : Créer CTANewsletter.tsx**

Le widget Brevo nécessite un ID de formulaire que le client doit créer sur brevo.com → Forms → Create a form → get the embed URL. En attendant, le composant accepte une `brevoFormUrl` prop avec un fallback email `mailto:`.

```tsx
// src/components/shared/CTANewsletter.tsx
"use client";

interface CTANewsletterProps {
  brevoFormUrl?: string;
  title?: string;
  subtitle?: string;
}

export function CTANewsletter({
  brevoFormUrl,
  title = "Restez dans la boucle",
  subtitle = "Tournois, nouveautés, offres exclusives — 2× par mois, pas de spam.",
}: CTANewsletterProps) {
  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />
        <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-brand/20 text-brand border border-brand/30 mb-4">
          Newsletter
        </span>
        <h2 className="font-buzz text-3xl md:text-4xl text-white mb-3">
          {title}
        </h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8">{subtitle}</p>
        {brevoFormUrl ? (
          <iframe
            src={brevoFormUrl}
            width="100%"
            height="120"
            frameBorder={0}
            className="max-w-lg mx-auto"
            title="Newsletter Padel 15"
          />
        ) : (
          <a
            href="mailto:contact@padel15.fr?subject=Newsletter"
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            S'inscrire à la newsletter
          </a>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 5 : Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6 : Commit**

```bash
git add src/components/shared/
git commit -m "feat: add shared components (JsonLd, TallyEmbed, GoogleRating, CTANewsletter)"
```

---

### Task 4 : Navbar v2 — multi-page avec Links et dual CTA

**Files:**

- Modify: `src/components/Navbar.tsx`

La navbar v1 utilise des ancres (`#section`). La v2 utilise `next/link` vers les routes. La logique transparent→blanc au scroll est conservée. Sur les pages intérieures (pas `/`), la navbar part directement blanche via `usePathname`.

- [ ] **Step 1 : Réécrire Navbar.tsx**

```tsx
// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/terrains", label: "Terrains" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/coaching", label: "Coaching" },
  { href: "/evenements", label: "Événements" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/le-club", label: "Le Club" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
      return;
    }
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const textColor = isScrolled ? "text-black" : "text-white";
  const logoFilter = isScrolled ? "" : "filter brightness-0 invert";

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-white shadow-md" : "bg-transparent",
      )}
    >
      <div className="container py-4 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Padel 15"
            width={120}
            height={50}
            className={cn("h-auto", logoFilter)}
          />
        </Link>

        {/* Desktop nav */}
        <div className={cn("hidden lg:flex items-center gap-8", textColor)}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-medium hover:text-brand transition-colors",
                pathname === link.href && "text-brand",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://playtomic.com/clubs/padel-15"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className={cn(
                "cursor-pointer",
                isScrolled
                  ? "bg-brand hover:bg-brand-dark text-white"
                  : "bg-white text-black hover:bg-slate-100",
              )}
            >
              Réserver un terrain
            </Button>
          </a>
          <Link href="/evenements">
            <Button
              variant="outline"
              className={cn(
                "cursor-pointer",
                isScrolled
                  ? "border-brand text-brand hover:bg-brand hover:text-white"
                  : "border-white text-white hover:bg-white/10",
              )}
            >
              Organiser un événement
            </Button>
          </Link>
          <Link
            href="https://www.instagram.com/padel15club/?hl=fr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Padel 15"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(textColor, "hover:text-brand transition-colors")}
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden z-[60]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? (
            <XMarkIcon className="w-6 text-brand" />
          ) : (
            <Bars3Icon
              className={cn("w-6", isScrolled ? "text-brand" : "text-white")}
            />
          )}
        </button>

        {/* Mobile drawer */}
        <div
          className={cn(
            "fixed top-0 right-0 h-full w-full max-w-xs bg-white text-black shadow-lg z-50",
            "flex flex-col justify-between p-6 overflow-y-auto",
            "transition-transform duration-300 ease-in-out",
            menuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex flex-col space-y-5 mt-14">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "text-lg font-medium hover:text-brand transition-colors",
                  pathname === link.href && "text-brand font-semibold",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3 pb-8">
            <a
              href="https://playtomic.com/clubs/padel-15"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <Button className="bg-brand hover:bg-brand-dark text-white w-full cursor-pointer">
                Réserver un terrain
              </Button>
            </a>
            <Link href="/evenements" onClick={() => setMenuOpen(false)}>
              <Button
                variant="outline"
                className="border-brand text-brand w-full cursor-pointer"
              >
                Organiser un événement
              </Button>
            </Link>
          </div>
        </div>

        {/* Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2 : Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3 : Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: navbar v2 — multi-page Links, dual CTA, active route highlight"
```

---

### Task 5 : Footer v2

**Files:**

- Create: `src/components/layout/Footer.tsx`
- Modify: `src/components/Layout.tsx`

- [ ] **Step 1 : Créer le répertoire et Footer.tsx**

```tsx
// src/components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";

const LINKS_CLUB = [
  { href: "/terrains", label: "Nos terrains" },
  { href: "/restaurant", label: "Restaurant & Guinguette" },
  { href: "/coaching", label: "Coaching" },
  { href: "/evenements", label: "Événements entreprise" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/le-club", label: "Le Club" },
];

const LINKS_PRATIQUE = [
  { href: "/contact", label: "Contact & Accès" },
  { href: "/blog", label: "Blog" },
  {
    href: "https://playtomic.com/clubs/padel-15",
    label: "Réserver (Playtomic)",
    external: true,
  },
];

export function Footer() {
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
              Le club de padel haut de gamme du 15ème arrondissement de Paris.
              115 rue Castagnary, 75015 Paris.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.instagram.com/padel15club/?hl=fr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-brand transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Le Club */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Le Club
            </h3>
            <ul className="space-y-2">
              {LINKS_CLUB.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pratique */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Pratique
            </h3>
            <ul className="space-y-2">
              {LINKS_PRATIQUE.map((l) => (
                <li key={l.href}>
                  {"external" in l ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white text-sm transition-colors"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      href={l.href}
                      className="text-gray-300 hover:text-white text-sm transition-colors"
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-4 text-sm text-gray-400 space-y-1">
              <p>7j/7 — 8h à 22h</p>
              <a
                href="tel:+33145315876"
                className="hover:text-white transition-colors block"
              >
                +33 1 45 31 58 76
              </a>
              <a
                href="mailto:contact@padel15.fr"
                className="hover:text-white transition-colors block"
              >
                contact@padel15.fr
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Newsletter
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Actu du club, tournois et offres exclusives.
            </p>
            <a
              href="mailto:contact@padel15.fr?subject=Newsletter Padel 15"
              className="inline-block bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              S'inscrire
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-gray-500 text-xs">
          <p>© {year} Padel 15. Tous droits réservés.</p>
          <p>115 rue Castagnary, 75015 Paris</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2 : Mettre à jour Layout.tsx pour utiliser le Footer**

```tsx
// src/components/Layout.tsx
"use client";

import Navbar from "./Navbar";
import { Footer } from "./layout/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main className="flex-1 w-full overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 3 : Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4 : Commit**

```bash
git add src/components/layout/ src/components/Layout.tsx
git commit -m "feat: footer v2 avec navigation complète, contact, newsletter CTA"
```

---

### Task 6 : layout.tsx — SEO global + JSON-LD LocalBusiness

**Files:**

- Modify: `src/app/layout.tsx`

- [ ] **Step 1 : Réécrire layout.tsx**

```tsx
// src/app/layout.tsx
import "@/styles/globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Layout from "@/components/Layout";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { JsonLd } from "@/components/shared/JsonLd";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["SportsClub", "Restaurant", "LocalBusiness"],
  name: "Padel 15",
  description:
    "Club de padel haut de gamme au cœur du 15ème arrondissement de Paris. Terrains couverts et extérieurs, coaching, restaurant guinguette.",
  url: "https://padel15.fr",
  telephone: "+33145315876",
  email: "contact@padel15.fr",
  address: {
    "@type": "PostalAddress",
    streetAddress: "115 rue Castagnary",
    postalCode: "75015",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.8298,
    longitude: 2.2941,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "22:00",
    },
  ],
  priceRange: "€€",
  servesCuisine: "Française",
  amenityFeature: [
    {
      "@type": "LocationFeatureSpecification",
      name: "Terrains de padel couverts",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Restaurant",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Guinguette et terrasse",
      value: true,
    },
    { "@type": "LocationFeatureSpecification", name: "Pétanque", value: true },
    { "@type": "LocationFeatureSpecification", name: "Coworking", value: true },
    {
      "@type": "LocationFeatureSpecification",
      name: "Accessible PMR",
      value: true,
    },
  ],
  sameAs: [
    "https://www.instagram.com/padel15club/",
    "https://playtomic.com/clubs/padel-15",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://padel15.fr"),
  title: {
    default:
      "Padel 15 | Club de Padel Paris 15ème — Terrains, Restaurant, Coaching",
    template: "%s | Padel 15",
  },
  description:
    "Club de padel haut de gamme au cœur du 15ème arrondissement de Paris. Terrains couverts et extérieurs, coaching certifié, restaurant guinguette. Réservez sur Playtomic.",
  keywords: [
    "padel paris",
    "padel 15ème",
    "club padel paris",
    "terrains padel paris",
    "coaching padel",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://padel15.fr",
    siteName: "Padel 15",
    title: "Padel 15 | Club de Padel Paris 15ème",
    description: "Club de padel haut de gamme au cœur du Paris 15ème.",
    images: [
      {
        url: "/terrain-ext-jour.webp",
        width: 1200,
        height: 630,
        alt: "Terrains Padel 15",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={dmSans.variable}>
      <head>
        <link rel="icon" href="/P15.ico" type="image/x-icon" />
        <JsonLd data={localBusinessSchema} />
      </head>
      <body className="scroll-smooth font-sans">
        <GoogleAnalytics ga_id="G-N2Y4ZCYHTB" />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
```

- [ ] **Step 2 : Mettre à jour globals.css pour utiliser la variable CSS du font**

Dans `src/styles/globals.css`, remplacer la règle `.font-sans` manuelle :

```css
/* Remplacer : */
.font-sans {
  font-family: "DM Sans", sans-serif !important;
}

/* Par (dans le bloc @theme existant) : */
@theme {
  --font-sans: var(--font-dm-sans), "DM Sans", sans-serif;
}
```

- [ ] **Step 3 : Vérifier TypeScript et build**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -10
```

Expected: pas d'erreur TypeScript, build réussi.

- [ ] **Step 4 : Commit**

```bash
git add src/app/layout.tsx src/styles/globals.css
git commit -m "feat: SEO global — LocalBusiness JSON-LD, metadata, next/font DM Sans"
```

---

### Task 7 : sitemap.ts + robots.ts

**Files:**

- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

- [ ] **Step 1 : Créer sitemap.ts**

Note : Avec `output: 'export'`, `sitemap.ts` est évalué au build time et génère `sitemap.xml` dans `out/`. Les slugs Sanity seront ajoutés à la Task 22.

```ts
// src/app/sitemap.ts
import { MetadataRoute } from "next";

const BASE_URL = "https://padel15.fr";

const STATIC_ROUTES = [
  { url: BASE_URL, priority: 1.0, changeFrequency: "weekly" as const },
  {
    url: `${BASE_URL}/terrains`,
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  {
    url: `${BASE_URL}/restaurant`,
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  {
    url: `${BASE_URL}/evenements`,
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  {
    url: `${BASE_URL}/coaching`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  {
    url: `${BASE_URL}/tarifs`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  {
    url: `${BASE_URL}/le-club`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  },
  {
    url: `${BASE_URL}/contact`,
    priority: 0.7,
    changeFrequency: "yearly" as const,
  },
  {
    url: `${BASE_URL}/blog`,
    priority: 0.7,
    changeFrequency: "weekly" as const,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_ROUTES.map((route) => ({
    url: route.url,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
```

- [ ] **Step 2 : Créer robots.ts**

```ts
// src/app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://padel15.fr/sitemap.xml",
  };
}
```

- [ ] **Step 3 : Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4 : Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts
git commit -m "feat: sitemap.ts et robots.ts pour le SEO"
```

---

## Phase 1 — Homepage v2

### Task 8 : HeroBanner v2 — dual CTA

**Files:**

- Modify: `src/components/HeroBanner.tsx`

- [ ] **Step 1 : Mettre à jour HeroBanner.tsx avec dual CTA**

```tsx
// src/components/HeroBanner.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const CAROUSEL_IMAGES = [
  { id: 1, src: "/terrain-ext-jour.webp", alt: "Terrain extérieur de jour" },
  {
    id: 2,
    src: "/terrain-inte-game.webp",
    alt: "Match en cours terrain intérieur",
  },
  { id: 3, src: "/terrain-ext-nuit.webp", alt: "Terrain extérieur de nuit" },
  { id: 4, src: "/terrain-inte-vide.webp", alt: "Terrain intérieur" },
];

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i === CAROUSEL_IMAGES.length - 1 ? 0 : i + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen max-h-screen relative overflow-hidden">
      {/* Carousel */}
      <div className="absolute inset-0 z-0">
        {CAROUSEL_IMAGES.map((slide, index) => (
          <div
            key={slide.id}
            style={{ backgroundImage: `url(${slide.src})` }}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            role="img"
            aria-label={slide.alt}
          />
        ))}
      </div>

      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Contenu */}
      <div className="relative container h-full flex flex-col items-center justify-center gap-8 z-20 text-center px-4">
        <Image
          src="/logo.svg"
          alt="Logo Padel 15"
          width={400}
          height={160}
          className="mx-auto filter brightness-0 invert"
          priority
        />
        <p className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed">
          L'art de vivre le padel à Paris.{" "}
          <span className="font-semibold">
            Sport, élégance et convivialité dans un écrin végétalisé en plein
            cœur de la capitale.
          </span>
        </p>

        {/* Dual CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="https://playtomic.com/clubs/padel-15"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-lg text-base transition-colors"
          >
            Réserver un terrain
          </a>
          <Link
            href="/evenements"
            className="bg-white/10 hover:bg-white/20 border border-white text-white font-semibold px-8 py-4 rounded-lg text-base transition-colors backdrop-blur-sm"
          >
            Organiser un événement
          </Link>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2 mt-4">
          {CAROUSEL_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === activeIndex ? "bg-brand w-6" : "bg-white/50"
              }`}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2 : Vérifier TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3 : Commit**

```bash
git add src/components/HeroBanner.tsx
git commit -m "feat: hero banner v2 avec dual CTA joueur/entreprise"
```

---

### Task 9 : ExperienceBlocks — 4 piliers de l'expérience

**Files:**

- Create: `src/components/homepage/ExperienceBlocks.tsx`

- [ ] **Step 1 : Créer ExperienceBlocks.tsx**

```tsx
// src/components/homepage/ExperienceBlocks.tsx
import Image from "next/image";
import Link from "next/link";

const BLOCKS = [
  {
    href: "/terrains",
    img: "/terrain-ext-jour.webp",
    label: "Terrains",
    title: "2 terrains couverts & extérieurs",
    description: "Réservez en ligne via Playtomic. Créneaux 7j/7, de 8h à 22h.",
    cta: "Voir les terrains",
  },
  {
    href: "/restaurant",
    img: "/rest-inte-grand-angle.webp",
    label: "Restaurant",
    title: "Restaurant, bar & guinguette",
    description:
      "Service continu du petit-déjeuner au dîner. Terrasse végétalisée et pétanque.",
    cta: "Découvrir",
  },
  {
    href: "/coaching",
    img: "/terrain-inte-game.webp",
    label: "Coaching",
    title: "Cours particuliers & collectifs",
    description: "Coachs certifiés, tous niveaux. Débutants bienvenus.",
    cta: "Réserver un cours",
  },
  {
    href: "/evenements",
    img: "/guinguette.webp",
    label: "Événements",
    title: "Team building & privatisation",
    description: "BlackRock, BNP, BCG, Kering… ils font confiance à Padel 15.",
    cta: "Organiser un événement",
  },
];

export function ExperienceBlocks() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="font-buzz text-3xl md:text-4xl mb-3">
          L'expérience Padel 15
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Un lieu unique à Paris 15 : bien plus qu'un club de padel.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {BLOCKS.map((block) => (
          <Link
            key={block.href}
            href={block.href}
            className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="relative h-64">
              <Image
                src={block.img}
                alt={block.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <span className="text-xs font-semibold text-brand uppercase tracking-wider">
                {block.label}
              </span>
              <h3 className="font-semibold text-lg mt-1 mb-1">{block.title}</h3>
              <p className="text-white/70 text-sm leading-snug mb-3">
                {block.description}
              </p>
              <span className="text-xs font-semibold text-brand group-hover:underline">
                {block.cta} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2 : Commit**

```bash
git add src/components/homepage/ExperienceBlocks.tsx
git commit -m "feat: ExperienceBlocks — 4 piliers de l'expérience avec photos"
```

---

### Task 10 : B2BSection — section entreprise standalone

**Files:**

- Create: `src/components/homepage/B2BSection.tsx`

La section TeamBuilding existante est réutilisée mais extraite en composant dédié pour la homepage, avec le vrai fond photo et des testimonials.

- [ ] **Step 1 : Créer B2BSection.tsx**

```tsx
// src/components/homepage/B2BSection.tsx
import Link from "next/link";

const CARDS = [
  {
    icon: "🧑‍💼",
    title: "Événements d'entreprise",
    description:
      "Formules sur-mesure pour vos team buildings, afterworks ou séminaires, avec restauration et espaces privatifs.",
  },
  {
    icon: "🎾",
    title: "Coaching privé en groupe",
    description:
      "Sessions encadrées pour vos collaborateurs, tous niveaux. Coaching, initiation ou perfectionnement.",
  },
  {
    icon: "🏆",
    title: "Tournois & challenges",
    description:
      "Organisez votre tournoi privé entre collègues ou partenaires dans une ambiance dynamique clé-en-main.",
  },
];

const TESTIMONIAL = {
  quote:
    "Le team building le plus réussi qu'on ait organisé — tout le monde est reparti avec l'envie de revenir.",
  author: "Marie D.",
  company: "BNP Paribas",
};

export function B2BSection() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ backgroundImage: "url('/terrain-ext-jour.webp')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75 z-10" />
      {/* Filets orange */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent z-20" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent z-20" />

      <div className="relative z-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-brand/20 text-brand border border-brand/30 mb-4">
            Entreprises & Groupes
          </span>
          <h2 className="font-buzz text-3xl md:text-4xl text-white mb-4">
            Team Building & Événements
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto text-lg">
            Renforcez la cohésion de vos équipes dans un lieu atypique au cœur
            de Paris.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center text-2xl mb-5">
                {card.icon}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {card.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="max-w-xl mx-auto text-center mb-10 bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-white/90 italic text-base mb-3">
            "{TESTIMONIAL.quote}"
          </p>
          <p className="text-brand text-sm font-semibold">
            {TESTIMONIAL.author} — {TESTIMONIAL.company}
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/evenements"
            className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors inline-block"
          >
            Organiser mon événement
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2 : Commit**

```bash
git add src/components/homepage/B2BSection.tsx
git commit -m "feat: B2BSection avec testimonial et vraie photo de fond"
```

---

### Task 11 : Homepage page.tsx — réassemblage complet

**Files:**

- Modify: `src/app/page.tsx`

- [ ] **Step 1 : Réécrire page.tsx**

```tsx
// src/app/page.tsx
import type { Metadata } from "next";
import HeroBanner from "@/components/HeroBanner";
import Clients from "@/components/Clients";
import { ExperienceBlocks } from "@/components/homepage/ExperienceBlocks";
import { GoogleRating } from "@/components/shared/GoogleRating";
import { B2BSection } from "@/components/homepage/B2BSection";
import { CTANewsletter } from "@/components/shared/CTANewsletter";

export const metadata: Metadata = {
  title:
    "Padel 15 | Club de Padel Paris 15ème — Terrains, Restaurant, Coaching",
  description:
    "Club de padel haut de gamme au cœur du 15ème arrondissement de Paris. Terrains couverts et extérieurs, coaching certifié, restaurant guinguette. Réservez sur Playtomic.",
};

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <div className="py-4 bg-white border-b border-gray-100">
        <GoogleRating rating={4.8} count={250} />
      </div>
      <ExperienceBlocks />
      <div className="py-6 bg-gray-50">
        <Clients />
      </div>
      <B2BSection />
      <CTANewsletter />
    </>
  );
}
```

- [ ] **Step 2 : Mettre à jour Clients.tsx — modifier le titre**

Dans `src/components/Clients.tsx`, ligne 38, remplacer :

```tsx
// Avant :
<h2 className="text-2xl md:text-3xl font-bold text-center text-[#FF6727]">
  Ils nous font confiance
</h2>

// Après :
<h2 className="text-2xl md:text-3xl font-bold text-center text-brand">
  Ils nous font confiance
</h2>
```

- [ ] **Step 3 : Vérifier le build complet**

```bash
npm run build 2>&1 | tail -15
```

Expected: `✓ Generating static pages` avec toutes les routes, pas d'erreur.

- [ ] **Step 4 : Commit**

```bash
git add src/app/page.tsx src/components/Clients.tsx
git commit -m "feat: homepage v2 — dual CTA, experience blocks, B2B section, newsletter"
```

---

## Phase 2 — Pages secondaires

### Task 12 : /terrains

**Files:**

- Create: `src/app/terrains/page.tsx`

- [ ] **Step 1 : Créer la page terrains**

```tsx
// src/app/terrains/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Terrains de Padel Paris 15 | Réservation Playtomic",
  description:
    "2 terrains de padel couverts et extérieurs au 115 rue Castagnary, Paris 15ème. Réservation en ligne via Playtomic. Créneaux 7j/7, 8h-22h.",
  openGraph: {
    title: "Terrains Padel 15 — Réservation en ligne",
    images: [{ url: "/terrain-ext-jour.webp" }],
  },
};

const terrainSchema = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Terrains de Padel — Padel 15",
  address: {
    "@type": "PostalAddress",
    streetAddress: "115 rue Castagnary",
    postalCode: "75015",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  sport: "Padel",
  telephone: "+33145315876",
};

const GALLERY = [
  { src: "/terrain-ext-jour.webp", alt: "Terrain extérieur de jour" },
  { src: "/terrain-inte-game.webp", alt: "Match en cours" },
  { src: "/terrain-ext-nuit.webp", alt: "Terrain extérieur de nuit" },
  { src: "/terrain-inte-vide.webp", alt: "Terrain intérieur" },
];

export default function TerrainsPage() {
  return (
    <>
      <JsonLd data={terrainSchema} />
      {/* Hero */}
      <div className="relative h-80 md:h-[480px] overflow-hidden">
        <Image
          src="/terrain-ext-jour.webp"
          alt="Terrains de padel Padel 15"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 text-center">
          <span className="text-sm font-semibold text-brand uppercase tracking-wider mb-3">
            Paris 15ème
          </span>
          <h1 className="font-buzz text-4xl md:text-6xl mb-4">Nos Terrains</h1>
          <p className="text-white/80 max-w-lg text-lg">
            2 terrains couverts et extérieurs — 7j/7, 8h à 22h
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Infos + Réservation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="font-buzz text-3xl mb-6">Réservez votre terrain</h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🕗</span>
                <div>
                  <p className="font-semibold">Horaires</p>
                  <p>7j/7 de 8h à 22h — Ouvert tous les jours de l'année</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💶</span>
                <div>
                  <p className="font-semibold">Tarifs</p>
                  <p>
                    12,50 € / personne / heure (heures creuses : lun-ven 8h-12h
                    et 14h-16h)
                  </p>
                  <p>
                    15 € / personne / heure (heures pleines : 12h-14h, 16h-22h
                    et week-end)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎾</span>
                <div>
                  <p className="font-semibold">Matériel</p>
                  <p>
                    Raquettes en location et balles disponibles dans un casier
                    connecté entre les terrains
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📅</span>
                <div>
                  <p className="font-semibold">Créneaux</p>
                  <p>
                    Les créneaux ouvrent 5 jours à l'avance, heure par heure —
                    soyez réactifs !
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="https://playtomic.com/clubs/padel-15"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-lg text-center transition-colors"
              >
                Réserver sur Playtomic
              </a>
              <a
                href="https://apps.apple.com/fr/app/playtomic-play-padel/id1242321076"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 hover:border-brand text-gray-700 hover:text-brand font-semibold px-8 py-4 rounded-lg text-center transition-colors"
              >
                App iOS
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.playtomic&hl=fr"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 hover:border-brand text-gray-700 hover:text-brand font-semibold px-8 py-4 rounded-lg text-center transition-colors"
              >
                App Android
              </a>
            </div>
          </div>

          {/* Playtomic embed */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
            <div className="bg-brand px-5 py-3">
              <p className="text-white font-semibold">Réservation en ligne</p>
            </div>
            <iframe
              src="https://playtomic.io/tenant/padel-15?view=widget"
              width="100%"
              height="500"
              frameBorder={0}
              title="Réservation terrain Padel 15 — Playtomic"
              className="block"
            />
          </div>
        </div>

        {/* Galerie */}
        <div>
          <h2 className="font-buzz text-3xl mb-6">Galerie</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY.map((img) => (
              <div
                key={img.src}
                className="relative aspect-square rounded-xl overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Équipements */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="font-buzz text-2xl mb-6">Équipements & Services</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
            {[
              "🚲 Garage à vélo sécurisé",
              "🚿 Vestiaires, douches et toilettes",
              "🛋️ Espace détente intérieur",
              "💻 Coin coworking",
              "💧 Fontaine à eau en libre-service",
              "♿ Accessibilité PMR totale",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2 : Commit**

```bash
git add src/app/terrains/
git commit -m "feat: page /terrains avec Playtomic embed, galerie et tarifs"
```

---

### Task 13 : /restaurant

**Files:**

- Create: `src/app/restaurant/page.tsx`

- [ ] **Step 1 : Créer la page restaurant**

```tsx
// src/app/restaurant/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Restaurant & Guinguette Paris 15 | Bar, Terrasse, Pétanque",
  description:
    "Restaurant, bar et terrasse guinguette au cœur du Paris 15ème. Service continu du petit-déjeuner au dîner. Privatisation disponible pour événements.",
  openGraph: {
    title: "Restaurant & Guinguette — Padel 15",
    images: [{ url: "/rest-inte-grand-angle.webp" }],
  },
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Restaurant Padel 15",
  servesCuisine: "Française",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "115 rue Castagnary",
    postalCode: "75015",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  openingHours: "Mo-Su 08:00-22:00",
  telephone: "+33145315876",
};

const GALLERY = [
  { src: "/rest-inte-grand-angle.webp", alt: "Restaurant grand angle" },
  { src: "/rest-inte-bar.jpg", alt: "Bar intérieur" },
  { src: "/guinguette.webp", alt: "Terrasse guinguette" },
  { src: "/restau-diner.webp", alt: "Ambiance dîner" },
  { src: "/rest-ext.jpg", alt: "Restaurant extérieur" },
];

export default function RestaurantPage() {
  return (
    <>
      <JsonLd data={restaurantSchema} />
      {/* Hero */}
      <div className="relative h-80 md:h-[480px] overflow-hidden">
        <Image
          src="/rest-inte-grand-angle.webp"
          alt="Restaurant Padel 15"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 text-center">
          <span className="text-sm font-semibold text-brand uppercase tracking-wider mb-3">
            Paris 15ème
          </span>
          <h1 className="font-buzz text-4xl md:text-6xl mb-4">
            Restaurant & Guinguette
          </h1>
          <p className="text-white/80 max-w-lg text-lg">
            Cuisine, bar, terrasse végétalisée et pétanque — service continu
            7j/7
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Présentation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-buzz text-3xl mb-4">Un lieu de vie unique</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Ouvert 7j/7 en service continu, du petit-déjeuner au dîner, avec
                des produits frais et de saison. Un cadre chaleureux pour se
                détendre après un match… ou organiser vos séminaires, afterworks
                et événements privés dans un lieu unique au cœur de Paris.
              </p>
              <p>
                Notre terrasse guinguette vous transporte dans une ambiance
                dépaysante en plein Paris : espace végétalisé, couleurs vives,
                terrain de pétanque et espaces lounge.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/evenements"
                className="bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block"
              >
                Privatiser l'espace
              </Link>
            </div>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/guinguette.webp"
              alt="Terrasse guinguette Padel 15"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🍽️",
              title: "Restaurant",
              items: [
                "Service continu 7j/7 — 8h à 22h",
                "Produits frais et de saison",
                "Cadre chaleureux et moderne",
              ],
            },
            {
              icon: "🌿",
              title: "Terrasse & Guinguette",
              items: [
                "Terrasse végétalisée",
                "Terrain de pétanque",
                "Espaces lounge",
                "Ambiance dépaysante",
              ],
            },
            {
              icon: "🥂",
              title: "Bar",
              items: [
                "Cocktails et boissons fraîches",
                "Afterworks et soirées",
                "Privatisation possible",
              ],
            },
          ].map((service) => (
            <div key={service.title} className="bg-gray-50 rounded-2xl p-6">
              <div className="text-3xl mb-3">{service.icon}</div>
              <h3 className="font-semibold text-lg mb-3">{service.title}</h3>
              <ul className="space-y-1.5 text-gray-600 text-sm">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Galerie */}
        <div>
          <h2 className="font-buzz text-3xl mb-6">Galerie</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY.map((img) => (
              <div
                key={img.src}
                className={`relative rounded-xl overflow-hidden ${GALLERY.indexOf(img) === 0 ? "md:col-span-2 h-72" : "h-48"}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA privatisation */}
        <div className="bg-black rounded-2xl p-10 text-center">
          <h2 className="font-buzz text-3xl text-white mb-3">
            Privatisez notre espace
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-6">
            Anniversaire, afterwork, séminaire ou soirée d'entreprise — nous
            créons l'événement sur mesure.
          </p>
          <Link
            href="/evenements"
            className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors inline-block"
          >
            Demander un devis
          </Link>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2 : Commit**

```bash
git add src/app/restaurant/
git commit -m "feat: page /restaurant avec galerie, services et CTA privatisation"
```

---

### Task 14 : /evenements

**Files:**

- Create: `src/app/evenements/page.tsx`

Note : Le formulaire Tally pour les événements doit être créé par le client sur tally.so. En attendant, l'ID `EVENTS_FORM` est un placeholder à remplacer. Le composant fonctionne avec n'importe quel formId Tally.

- [ ] **Step 1 : Créer la page événements**

```tsx
// src/app/evenements/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { TallyEmbed } from "@/components/shared/TallyEmbed";
import Clients from "@/components/Clients";
import { JsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Team Building Paris 15 | Événements d'entreprise — Padel 15",
  description:
    "Organisez vos team buildings, afterworks et séminaires dans un lieu unique Paris 15ème. Terrains privatisables, restauration, coaching sur demande. BlackRock, BNP, BCG, Kering…",
  openGraph: {
    title: "Team Building & Événements d'entreprise — Padel 15",
    images: [{ url: "/terrain-ext-jour.webp" }],
  },
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: "Padel 15 — Espace Événements",
  address: {
    "@type": "PostalAddress",
    streetAddress: "115 rue Castagnary",
    postalCode: "75015",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
};

const FORMULES = [
  {
    icon: "🎾",
    title: "Team Building Padel",
    description:
      "Tournoi privé entre collègues, coaching collectif initiation, arbitre inclus. Idéal 8 à 40 personnes.",
    includes: [
      "Terrain(s) privatisé(s)",
      "Coach dédié",
      "Arbitre",
      "Matériel fourni",
    ],
  },
  {
    icon: "🍽️",
    title: "Afterwork & Soirée",
    description:
      "Padel + restaurant/guinguette en formule tout-compris. Privatisation totale ou partielle.",
    includes: [
      "Accès terrains",
      "Buffet ou menu",
      "Bar privatisé",
      "Animation",
    ],
  },
  {
    icon: "📋",
    title: "Séminaire & Convention",
    description:
      "Espace coworking + terrains pour vos conventions, kick-offs et séminaires d'équipe.",
    includes: [
      "Espace coworking",
      "Terrains privatisés",
      "Restauration",
      "Équipement AV",
    ],
  },
];

// À remplacer par le vrai formId Tally une fois le formulaire créé sur tally.so
const EVENTS_TALLY_FORM_ID = "mZRvnQ";

export default function EvenementsPage() {
  return (
    <>
      <JsonLd data={eventSchema} />
      {/* Hero */}
      <div className="relative h-80 md:h-[480px] overflow-hidden">
        <Image
          src="/terrain-ext-jour.webp"
          alt="Événements d'entreprise Padel 15"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 text-center">
          <span className="text-sm font-semibold text-brand uppercase tracking-wider mb-3">
            Entreprises & Groupes
          </span>
          <h1 className="font-buzz text-4xl md:text-6xl mb-4">
            Team Building & Événements
          </h1>
          <p className="text-white/80 max-w-xl text-lg">
            BlackRock, BNP Paribas, BCG, Kering, AXA… et plus de 20 entreprises
            de premier plan leur font confiance.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-20">
        {/* Formules */}
        <div>
          <div className="text-center mb-10">
            <h2 className="font-buzz text-3xl mb-3">Nos Formules</h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Chaque événement est sur-mesure. Nous nous adaptons à vos besoins,
              votre budget et votre groupe.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FORMULES.map((f) => (
              <div
                key={f.title}
                className="border border-gray-200 rounded-2xl p-6 hover:border-brand transition-colors"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {f.description}
                </p>
                <ul className="space-y-1.5">
                  {f.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <span className="text-brand font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Logos clients */}
        <div className="bg-gray-50 rounded-2xl py-10 overflow-hidden">
          <Clients />
        </div>

        {/* Formulaire de contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-buzz text-3xl mb-4">Demandez un devis</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Décrivez votre projet et notre équipe revient vers vous sous 24h
              avec une proposition personnalisée.
            </p>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-center gap-3">
                <span className="text-brand font-bold">✓</span>
                <span>Réponse sous 24h ouvrées</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-brand font-bold">✓</span>
                <span>Devis gratuit et sans engagement</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-brand font-bold">✓</span>
                <span>Formule entièrement sur-mesure</span>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-brand px-6 py-4">
              <h3 className="text-white font-semibold">
                Organisez votre événement
              </h3>
              <p className="text-white/70 text-sm">
                Remplissez le formulaire ci-dessous
              </p>
            </div>
            <div className="p-6">
              <TallyEmbed
                formId={EVENTS_TALLY_FORM_ID}
                height={520}
                title="Formulaire événement entreprise"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2 : Commit**

```bash
git add src/app/evenements/
git commit -m "feat: page /evenements avec formules, logos clients et formulaire Tally"
```

---

### Task 15 : /coaching

**Files:**

- Create: `src/app/coaching/page.tsx`

Le composant `CoursParticuliers` existant est réutilisé directement.

- [ ] **Step 1 : Créer la page coaching**

```tsx
// src/app/coaching/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import CoursParticuliers from "@/components/CoursParticuliers";

export const metadata: Metadata = {
  title: "Cours de Padel Paris 15 | Coaching Particulier & Collectif",
  description:
    "Cours particuliers et collectifs de padel à Paris 15ème. Coachs certifiés, tous niveaux de débutant à confirmé. Réservation en ligne via formulaire.",
  openGraph: {
    title: "Coaching Padel Paris 15 — Particulier & Collectif",
    images: [{ url: "/terrain-inte-game.webp" }],
  },
};

export default function CoachingPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <Image
          src="/terrain-inte-game.webp"
          alt="Cours de padel Padel 15"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 text-center">
          <span className="text-sm font-semibold text-brand uppercase tracking-wider mb-3">
            Coaching & Progression
          </span>
          <h1 className="font-buzz text-4xl md:text-6xl mb-4">
            Coaching Padel
          </h1>
          <p className="text-white/80 max-w-lg text-lg">
            Débutant ou confirmé — progressez avec nos coachs certifiés
          </p>
        </div>
      </div>

      {/* Réutiliser le composant existant */}
      <CoursParticuliers />
    </>
  );
}
```

- [ ] **Step 2 : Commit**

```bash
git add src/app/coaching/
git commit -m "feat: page /coaching avec hero et réutilisation de CoursParticuliers"
```

---

### Task 16 : /le-club

**Files:**

- Create: `src/app/le-club/page.tsx`

- [ ] **Step 1 : Créer la page le-club**

```tsx
// src/app/le-club/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Values from "@/components/Values";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Le Club | Padel 15 — Infrastructure, Valeurs, Coworking, Accessibilité",
  description:
    "Découvrez Padel 15 : club haut de gamme au 115 rue Castagnary, Paris 15ème. Terrains, restaurant, guinguette, coworking, vestiaires, accès PMR.",
  openGraph: {
    title: "Le Club — Padel 15 Paris 15ème",
    images: [{ url: "/rest-inte-grand-angle.webp" }],
  },
};

const INFRA_ITEMS = [
  {
    icon: "🎾",
    label: "2 terrains de padel",
    detail: "Couverts et extérieurs, panoramiques",
  },
  {
    icon: "🍽️",
    label: "Restaurant & Bar",
    detail: "Service continu 7j/7, produits frais",
  },
  {
    icon: "🌿",
    label: "Terrasse guinguette",
    detail: "Végétalisée, pétanque, espaces lounge",
  },
  {
    icon: "💻",
    label: "Espace coworking",
    detail: "WiFi haut débit, cadre unique",
  },
  {
    icon: "🚿",
    label: "Vestiaires & Douches",
    detail: "Équipements modernes et propres",
  },
  { icon: "🚲", label: "Garage à vélo", detail: "Sécurisé, gratuit" },
  { icon: "💧", label: "Fontaine à eau", detail: "En libre-service" },
  {
    icon: "♿",
    label: "Accessibilité PMR",
    detail: "Site entièrement accessible",
  },
];

export default function LeClubPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <Image
          src="/rest-inte-grand-angle.webp"
          alt="Padel 15 — Le Club"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="font-buzz text-4xl md:text-6xl mb-4">Le Club</h1>
          <p className="text-white/80 max-w-lg text-lg">
            115 rue Castagnary, Paris 15ème — bien plus qu'un club de padel
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Notre histoire */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-buzz text-3xl mb-4">Notre histoire</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Padel 15 est né d'une passion commune pour le padel et d'une
                vision : créer le club de référence du 15ème arrondissement,
                alliant sport de haut niveau, art de vivre et convivialité.
              </p>
              <p>
                Installé au 115 rue Castagnary, notre espace de vie unique mêle
                terrains de padel panoramiques, restaurant à la cuisine
                généreuse et terrasse guinguette dépaysante — le tout dans un
                cadre végétalisé en plein cœur de Paris.
              </p>
            </div>
          </div>
          <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/guinguette.webp"
              alt="Ambiance Padel 15"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Infrastructure */}
        <div>
          <h2 className="font-buzz text-3xl mb-8 text-center">
            Notre infrastructure
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INFRA_ITEMS.map((item) => (
              <div
                key={item.label}
                className="bg-gray-50 rounded-xl p-5 text-center"
              >
                <span className="text-3xl block mb-2">{item.icon}</span>
                <p className="font-semibold text-sm">{item.label}</p>
                <p className="text-gray-500 text-xs mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Valeurs */}
        <Values />

        {/* CTA */}
        <div className="text-center">
          <h2 className="font-buzz text-2xl mb-4">Venez découvrir Padel 15</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://playtomic.com/clubs/padel-15"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Réserver un terrain
            </a>
            <Link
              href="/contact"
              className="border border-gray-300 hover:border-brand text-gray-700 hover:text-brand font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2 : Commit**

```bash
git add src/app/le-club/
git commit -m "feat: page /le-club avec infrastructure, valeurs et histoire du club"
```

---

### Task 17 : /tarifs

**Files:**

- Create: `src/app/tarifs/page.tsx`

- [ ] **Step 1 : Créer la page tarifs**

```tsx
// src/app/tarifs/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tarifs Padel 15 | Prix Terrains, Coaching & Événements Paris 15",
  description:
    "Grille tarifaire complète de Padel 15 : location de terrains (12,50€ ou 15€/pers/h), cours particuliers et collectifs, abonnements et forfaits entreprise.",
};

const TARIFS_TERRAIN = [
  {
    label: "Heures creuses",
    detail: "Lun-Ven : 8h-12h et 14h-16h",
    price: "12,50 €",
    unit: "/ pers / heure",
  },
  {
    label: "Heures pleines",
    detail: "12h-14h, 16h-22h et week-end",
    price: "15 €",
    unit: "/ pers / heure",
    highlight: true,
  },
];

const TARIFS_COACHING = [
  {
    label: "Cours particulier",
    detail: "1h avec un coach certifié",
    price: "Sur devis",
  },
  {
    label: "Cours collectif",
    detail: "Groupe 2-8 joueurs — 1h",
    price: "Sur devis",
  },
  {
    label: "Stage initiation",
    detail: "Formule découverte débutants",
    price: "Sur devis",
  },
];

export default function TarifsPage() {
  return (
    <>
      <div className="pt-28 pb-16 bg-black text-white text-center px-4">
        <h1 className="font-buzz text-4xl md:text-6xl mb-4">Tarifs</h1>
        <p className="text-gray-300 max-w-lg mx-auto text-lg">
          Réservation via Playtomic — pas d'abonnement obligatoire, payez à la
          séance.
        </p>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-16 max-w-4xl">
        {/* Terrains */}
        <div>
          <h2 className="font-buzz text-3xl mb-2">Location de terrains</h2>
          <p className="text-gray-500 mb-6">
            Prix par personne pour 1 heure. 4 joueurs par terrain.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TARIFS_TERRAIN.map((t) => (
              <div
                key={t.label}
                className={`rounded-2xl p-8 border-2 ${
                  t.highlight ? "border-brand bg-brand/5" : "border-gray-200"
                }`}
              >
                {t.highlight && (
                  <span className="text-xs font-semibold text-brand uppercase tracking-wider">
                    Le plus populaire
                  </span>
                )}
                <h3 className="font-semibold text-xl mt-1 mb-1">{t.label}</h3>
                <p className="text-gray-500 text-sm mb-4">{t.detail}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{t.price}</span>
                  <span className="text-gray-500 text-sm">{t.unit}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-4">
            📅 Créneaux ouverts 5 jours à l'avance via Playtomic. Location de
            raquettes disponible sur place.
          </p>
          <div className="mt-6">
            <a
              href="https://playtomic.com/clubs/padel-15"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors inline-block"
            >
              Réserver maintenant
            </a>
          </div>
        </div>

        {/* Coaching */}
        <div>
          <h2 className="font-buzz text-3xl mb-2">Coaching</h2>
          <p className="text-gray-500 mb-6">
            Tarifs sur devis selon la formule choisie. Contactez-nous pour un
            programme personnalisé.
          </p>
          <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden">
            {TARIFS_COACHING.map((t) => (
              <div
                key={t.label}
                className="flex items-center justify-between p-5 bg-white hover:bg-gray-50"
              >
                <div>
                  <p className="font-semibold">{t.label}</p>
                  <p className="text-gray-500 text-sm">{t.detail}</p>
                </div>
                <span className="font-semibold text-brand">{t.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/coaching"
              className="border border-brand text-brand hover:bg-brand hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block"
            >
              Réserver un cours
            </Link>
          </div>
        </div>

        {/* Événements */}
        <div className="bg-black rounded-2xl p-8 text-white">
          <h2 className="font-buzz text-2xl mb-2">Événements d'entreprise</h2>
          <p className="text-gray-400 mb-4">
            Formules sur-mesure pour vos team buildings, afterworks et
            séminaires. Devis personnalisé sous 24h.
          </p>
          <Link
            href="/evenements"
            className="bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block"
          >
            Demander un devis
          </Link>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2 : Commit**

```bash
git add src/app/tarifs/
git commit -m "feat: page /tarifs avec grille complète terrains et coaching"
```

---

### Task 18 : /contact

**Files:**

- Create: `src/app/contact/page.tsx`

- [ ] **Step 1 : Créer la page contact**

```tsx
// src/app/contact/page.tsx
import type { Metadata } from "next";
import Contact from "@/components/Contact";
import { CTANewsletter } from "@/components/shared/CTANewsletter";

export const metadata: Metadata = {
  title: "Contact & Accès | Padel 15 — 115 rue Castagnary Paris 15",
  description:
    "Contactez Padel 15 : 115 rue Castagnary, 75015 Paris. Tél : +33 1 45 31 58 76. Email : contact@padel15.fr. Plan d'accès Google Maps.",
};

export default function ContactPage() {
  return (
    <>
      <div className="pt-28 pb-8 bg-black text-white text-center px-4">
        <h1 className="font-buzz text-4xl md:text-6xl mb-4">Contact & Accès</h1>
        <p className="text-gray-300 max-w-lg mx-auto">
          115 rue Castagnary, 75015 Paris — 7j/7, 8h à 22h
        </p>
      </div>
      <div className="pt-8">
        <Contact />
      </div>
      <CTANewsletter />
    </>
  );
}
```

- [ ] **Step 2 : Commit**

```bash
git add src/app/contact/
git commit -m "feat: page /contact avec carte et newsletter"
```

---

## Phase 3 — Blog + Sanity

### Task 19 : Sanity — setup, config, schemas

**Files:**

- Create: `sanity.config.ts`
- Create: `src/sanity/schemas/post.ts`
- Create: `src/sanity/schemas/index.ts`
- Create: `src/lib/sanity.ts`

**Prérequis client :**

1. Créer un projet sur sanity.io → noter `projectId` et `dataset` (default: `production`)
2. Mettre ces valeurs dans les env vars ci-dessous

- [ ] **Step 1 : Créer .env.local avec les variables Sanity**

```bash
# .env.local (NE PAS committer)
NEXT_PUBLIC_SANITY_PROJECT_ID=votre_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

- [ ] **Step 2 : Créer sanity.config.ts à la racine**

```ts
// sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
  name: "padel15",
  title: "Padel 15 — CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
```

- [ ] **Step 3 : Créer le schema Post**

```ts
// src/sanity/schemas/post.ts
import { defineType, defineField } from "sanity";

export const postSchema = defineType({
  name: "post",
  title: "Article de blog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (R) => R.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug URL",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Résumé (meta description)",
      type: "text",
      rows: 3,
      validation: (R) => R.required().max(160),
    }),
    defineField({
      name: "coverImage",
      title: "Image de couverture",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Conseils padel", value: "conseils" },
          { title: "Actualités club", value: "actualites" },
          { title: "Événements", value: "evenements" },
          { title: "Lifestyle", value: "lifestyle" },
        ],
      },
    }),
    defineField({
      name: "body",
      title: "Contenu",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Texte alternatif",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
```

- [ ] **Step 4 : Créer src/sanity/schemas/index.ts**

```ts
// src/sanity/schemas/index.ts
import { postSchema } from "./post";

export const schemaTypes = [postSchema];
```

- [ ] **Step 5 : Créer src/lib/sanity.ts**

```ts
// src/lib/sanity.ts
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage?: SanityImageSource;
  publishedAt: string;
  category?: string;
  body?: unknown[];
}

export async function getAllPosts(): Promise<SanityPost[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, excerpt, coverImage, publishedAt, category
    }`,
  );
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, excerpt, coverImage, publishedAt, category, body
    }`,
    { slug },
  );
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await sanityClient.fetch(
    `*[_type == "post"] { "slug": slug.current }`,
  );
  return posts.map((p: { slug: string }) => p.slug);
}
```

- [ ] **Step 6 : Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 7 : Commit (sans .env.local)**

```bash
git add sanity.config.ts src/sanity/ src/lib/sanity.ts
git commit -m "feat: Sanity setup — config, schema Post, client avec helpers"
```

---

### Task 20 : Blog — composants BlogCard et PortableTextRenderer

**Files:**

- Create: `src/components/blog/BlogCard.tsx`
- Create: `src/components/blog/PortableTextRenderer.tsx`

- [ ] **Step 1 : Créer BlogCard.tsx**

```tsx
// src/components/blog/BlogCard.tsx
import Image from "next/image";
import Link from "next/link";
import { SanityPost, urlFor } from "@/lib/sanity";

const CATEGORY_LABELS: Record<string, string> = {
  conseils: "Conseils padel",
  actualites: "Actualités",
  evenements: "Événements",
  lifestyle: "Lifestyle",
};

export function BlogCard({ post }: { post: SanityPost }) {
  const date = new Date(post.publishedAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block rounded-2xl overflow-hidden border border-gray-200 hover:border-brand transition-colors shadow-sm hover:shadow-md"
    >
      {post.coverImage ? (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={urlFor(post.coverImage).width(600).height(400).url()}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-brand/20 to-black flex items-center justify-center">
          <span className="text-4xl">🎾</span>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {post.category && (
            <span className="text-xs font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-full">
              {CATEGORY_LABELS[post.category] ?? post.category}
            </span>
          )}
          <span className="text-xs text-gray-400">{date}</span>
        </div>
        <h2 className="font-semibold text-lg mb-2 group-hover:text-brand transition-colors line-clamp-2">
          {post.title}
        </h2>
        <p className="text-gray-500 text-sm line-clamp-2">{post.excerpt}</p>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2 : Créer PortableTextRenderer.tsx**

```tsx
// src/components/blog/PortableTextRenderer.tsx
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

const components = {
  types: {
    image: ({ value }: { value: { asset: unknown; alt?: string } }) => (
      <div className="my-8 rounded-xl overflow-hidden">
        <Image
          src={urlFor(value).width(900).url()}
          alt={value.alt ?? ""}
          width={900}
          height={500}
          className="w-full h-auto object-cover"
        />
      </div>
    ),
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-buzz text-2xl md:text-3xl mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-semibold text-xl mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-gray-700 leading-relaxed mb-5">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-brand pl-5 my-6 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-black">{children}</strong>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href: string };
      children?: React.ReactNode;
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand hover:underline"
      >
        {children}
      </a>
    ),
  },
};

export function PortableTextRenderer({ body }: { body: unknown[] }) {
  return (
    <div className="prose max-w-none">
      <PortableText
        value={body as Parameters<typeof PortableText>[0]["value"]}
        components={components}
      />
    </div>
  );
}
```

- [ ] **Step 3 : Commit**

```bash
git add src/components/blog/
git commit -m "feat: composants blog BlogCard et PortableTextRenderer"
```

---

### Task 21 : Pages /blog et /blog/[slug]

**Files:**

- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`

- [ ] **Step 1 : Créer /blog/page.tsx**

```tsx
// src/app/blog/page.tsx
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/sanity";
import { BlogCard } from "@/components/blog/BlogCard";

export const metadata: Metadata = {
  title: "Blog | Padel 15 — Conseils, Actualités et Vie du Club",
  description:
    "Articles sur le padel à Paris, conseils techniques, actualités de Padel 15 et idées team building.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <div className="pt-28 pb-12 bg-black text-white text-center px-4">
        <h1 className="font-buzz text-4xl md:text-6xl mb-4">Blog</h1>
        <p className="text-gray-300 max-w-lg mx-auto">
          Conseils padel, vie du club et idées pour vos événements.
        </p>
      </div>

      <div className="container mx-auto px-4 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <span className="text-5xl block mb-4">🎾</span>
            <p className="text-lg">Les premiers articles arrivent bientôt !</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
```

- [ ] **Step 2 : Créer /blog/[slug]/page.tsx**

```tsx
// src/app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug, urlFor } from "@/lib/sanity";
import { PortableTextRenderer } from "@/components/blog/PortableTextRenderer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage
        ? [{ url: urlFor(post.coverImage).width(1200).height(630).url() }]
        : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const date = new Date(post.publishedAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article>
      {/* Hero */}
      <div className="relative h-72 md:h-[480px] overflow-hidden">
        {post.coverImage ? (
          <Image
            src={urlFor(post.coverImage).width(1400).height(600).url()}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand/30 to-black" />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 text-center">
          {post.category && (
            <span className="text-xs font-semibold text-brand uppercase tracking-wider mb-3">
              {post.category}
            </span>
          )}
          <h1 className="font-buzz text-3xl md:text-5xl max-w-3xl">
            {post.title}
          </h1>
          <p className="text-white/60 text-sm mt-4">{date}</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link
          href="/blog"
          className="text-brand hover:underline text-sm font-medium mb-8 inline-block"
        >
          ← Retour au blog
        </Link>
        {post.body && <PortableTextRenderer body={post.body as unknown[]} />}
      </div>
    </article>
  );
}
```

- [ ] **Step 3 : Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4 : Commit**

```bash
git add src/app/blog/
git commit -m "feat: pages /blog et /blog/[slug] avec Sanity et generateStaticParams"
```

---

### Task 22 : sitemap.ts — ajout des slugs Sanity dynamiques

**Files:**

- Modify: `src/app/sitemap.ts`

- [ ] **Step 1 : Mettre à jour sitemap.ts pour inclure les articles**

```ts
// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/sanity";

const BASE_URL = "https://padel15.fr";

const STATIC_ROUTES = [
  { url: BASE_URL, priority: 1.0, changeFrequency: "weekly" as const },
  {
    url: `${BASE_URL}/terrains`,
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  {
    url: `${BASE_URL}/restaurant`,
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  {
    url: `${BASE_URL}/evenements`,
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  {
    url: `${BASE_URL}/coaching`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  {
    url: `${BASE_URL}/tarifs`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  {
    url: `${BASE_URL}/le-club`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  },
  {
    url: `${BASE_URL}/contact`,
    priority: 0.7,
    changeFrequency: "yearly" as const,
  },
  {
    url: `${BASE_URL}/blog`,
    priority: 0.7,
    changeFrequency: "weekly" as const,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllPosts();
    blogRoutes = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug.current}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // Sanity non configuré — continuer sans les articles
  }

  return [
    ...STATIC_ROUTES.map((r) => ({
      url: r.url,
      lastModified: new Date(),
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...blogRoutes,
  ];
}
```

- [ ] **Step 2 : Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat: sitemap dynamique avec slugs Sanity"
```

---

### Task 23 : Articles de lancement — SEO local padel Paris

Ces 6 articles sont à créer dans le Sanity Studio (`npx sanity dev`) une fois le CMS configuré. Ils ciblent des mots-clés SEO locaux à fort volume.

| #   | Titre                                                                  | Slug                               | Catégorie  | Mots-clés cibles                                            |
| --- | ---------------------------------------------------------------------- | ---------------------------------- | ---------- | ----------------------------------------------------------- |
| 1   | Comment débuter le padel à Paris : guide complet pour débutants        | `debuter-padel-paris`              | conseils   | "padel débutant paris", "apprendre padel paris"             |
| 2   | Padel 15ème : pourquoi Padel 15 est le club incontournable             | `padel-15eme-arrondissement-paris` | actualites | "padel 15ème", "club padel paris 15"                        |
| 3   | Team building padel Paris : l'activité qui fédère vraiment vos équipes | `team-building-padel-paris`        | evenements | "team building padel paris", "activité team building paris" |
| 4   | Padel vs tennis : quelles différences ? Tout ce qu'il faut savoir      | `padel-vs-tennis-differences`      | conseils   | "difference padel tennis", "padel vs tennis"                |
| 5   | Restaurant et guinguette Paris 15 : l'après-padel parfait              | `restaurant-guinguette-paris-15`   | lifestyle  | "guinguette paris 15", "restaurant paris 15 terrasse"       |
| 6   | Tournois de padel à Paris : comment participer et progresser           | `tournoi-padel-paris`              | conseils   | "tournoi padel paris", "compétition padel paris"            |

**Action requise :** Créer ces articles dans le Studio (`npx sanity dev`) puis rebuild (`npm run build`) pour les voir apparaître sur le site.

---

## Checklist finale avant déploiement

- [ ] Remplacer `EVENTS_TALLY_FORM_ID` dans `/app/evenements/page.tsx` par le vrai form ID Tally
- [ ] Créer un formulaire contact Tally pour `/contact` et l'ajouter à `Contact.tsx`
- [ ] Configurer le projet Sanity et ajouter les env vars dans `.env.local`
- [ ] Créer les 6 articles de lancement dans le Sanity Studio
- [ ] Vérifier la note Google (4.8/5, 250 avis) dans `GoogleRating` — mettre à jour si nécessaire
- [ ] Configurer la newsletter Brevo et passer l'URL iframe à `CTANewsletter`
- [ ] Vérifier l'URL embed Playtomic dans `/terrains/page.tsx` (l'URL widget peut varier)
- [ ] Ajouter `.env.local` au `.gitignore`
- [ ] Vérifier le build complet : `npm run build`
- [ ] Tester sur mobile (navbar, formulaires, galeries)

---

## Self-review

**Spec coverage :** Toutes les pages listées sont implémentées. SEO `generateMetadata` présent sur chaque page. JSON-LD LocalBusiness global + schemas spécifiques par page. Tally intégré sur `/coaching` (form `7R4EXa`) et `/evenements`. Playtomic embed sur `/terrains`. Google Maps réutilisé depuis `Contact.tsx`. Newsletter `CTANewsletter` sur homepage et `/contact`. Sanity blog avec `generateStaticParams` pour static export. sitemap.ts dynamique. robots.ts. BuzzBlack font. `text-brand` / `font-buzz` via Tailwind v4 `@theme`. Logos clients scroll réutilisé sur homepage et `/evenements`.

**Contrainte `output: 'export'` respectée :** Pas d'API routes. Pas d'ISR (`revalidate`). Sanity via `generateStaticParams` uniquement. Newsletter via iframe Brevo côté client.

**Placeholders documentés :** `EVENTS_TALLY_FORM_ID` est explicitement signalé comme à remplacer. L'URL embed Playtomic (`playtomic.io/tenant/padel-15?view=widget`) est à confirmer avec le client — l'URL exacte du widget peut différer selon la configuration du compte.

**Cohérence types :** `SanityPost`, `urlFor`, `getAllPosts`, `getPostBySlug`, `getAllPostSlugs` définis dans `src/lib/sanity.ts` et utilisés de façon cohérente dans les pages blog et les composants.
