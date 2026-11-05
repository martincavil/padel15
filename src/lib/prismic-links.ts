import { asLink, isFilled, type LinkField } from "@prismicio/client";

/** Adresses du site : les liens Prismic vers ces domaines deviennent internes. */
const SITE_ORIGINS = ["https://www.padel15.fr", "https://padel15.fr"];

export type ResolvedLink = {
  href: string;
  /** Page du site : rendu avec next/link. */
  internal: boolean;
  /** Ouvrir dans un nouvel onglet. */
  newTab: boolean;
  text?: string;
};

/**
 * Transforme un lien Prismic en adresse utilisable. Les liens internes sont
 * saisis en adresse complète (`https://www.padel15.fr/evenements#demande`)
 * pour garder les ancres ; ils redeviennent des chemins (`/evenements#demande`).
 */
export function resolveLink(field: LinkField | null | undefined): ResolvedLink | null {
  if (!field || !isFilled.link(field)) return null;
  const raw = asLink(field);
  if (!raw) return null;
  const text = "text" in field && field.text ? field.text : undefined;
  const origin = SITE_ORIGINS.find((o) => raw === o || raw.startsWith(`${o}/`) || raw.startsWith(`${o}#`));
  if (origin) {
    return { href: raw.slice(origin.length) || "/", internal: true, newTab: false, text };
  }
  if (raw.startsWith("/")) return { href: raw, internal: true, newTab: false, text };
  const newTab = "target" in field && field.target === "_blank";
  return { href: raw, internal: false, newTab, text };
}

/** Adresse seule (ou chaîne vide). */
export const linkHref = (field: LinkField | null | undefined) => resolveLink(field)?.href ?? "";
