import { cache } from "react";
import type { LinkField } from "@prismicio/client";
import { createClient, isPrismicConfigured } from "@/prismicio";
import { resolveLink } from "@/lib/prismic-links";

export type NavLink = { href: string; label: string; internal: boolean; newTab: boolean };

/** Réglages du site (document « Réglages du site » de Prismic), en données simples. */
export type SiteSettings = {
  clubName: string;
  address: string;
  phone: string;
  phoneHref: string;
  email: string;
  hours: string;
  hoursLong: string;
  playtomicUrl: string;
  appStoreUrl: string;
  googlePlayUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  menu: NavLink | null;
  tableBooking: NavLink | null;
  navLinks: NavLink[];
  navCta: NavLink | null;
  footerLinks: NavLink[];
  footerPracticalLinks: NavLink[];
  footerTagline: string;
  footerNewsletterText: string;
  footerLegal: string;
};

const toNav = (field: LinkField | null | undefined): NavLink | null => {
  const l = resolveLink(field);
  return l ? { href: l.href, label: l.text ?? "", internal: l.internal, newTab: l.newTab } : null;
};
const toNavList = (items: { link: LinkField }[]) => items.map((i) => toNav(i.link)).filter((l): l is NavLink => !!l);

/** Réglages lus une fois par requête, partagés par la mise en page et les pages. */
export const getSettings = cache(async (): Promise<SiteSettings> => {
  if (!isPrismicConfigured) throw new Error("Prismic n'est pas configuré (prismic.config.json).");
  const { data: d } = await createClient().getSingle("settings");
  return {
    clubName: d.club_name ?? "",
    address: d.address ?? "",
    phone: d.phone ?? "",
    phoneHref: d.phone_link ? `tel:${d.phone_link}` : "",
    email: d.email ?? "",
    hours: d.hours ?? "",
    hoursLong: d.hours_long ?? "",
    playtomicUrl: resolveLink(d.playtomic_url)?.href ?? "",
    appStoreUrl: resolveLink(d.app_store_url)?.href ?? "",
    googlePlayUrl: resolveLink(d.google_play_url)?.href ?? "",
    instagramUrl: resolveLink(d.instagram_url)?.href ?? "",
    facebookUrl: resolveLink(d.facebook_url)?.href ?? "",
    menu: toNav(d.menu_url),
    tableBooking: toNav(d.table_booking),
    navLinks: toNavList(d.nav_links),
    navCta: toNav(d.nav_cta),
    footerLinks: toNavList(d.footer_links),
    footerPracticalLinks: toNavList(d.footer_practical_links),
    footerTagline: d.footer_tagline ?? "",
    footerNewsletterText: d.footer_newsletter_text ?? "",
    footerLegal: d.footer_legal ?? "",
  };
});
