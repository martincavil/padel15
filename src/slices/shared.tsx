import type { LinkField } from "@prismicio/client";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/lib/settings";
import { SiteLink } from "@/components/prismic/SiteLink";

/** Données transmises à toutes les sections par la page (SliceZone `context`). */
export type SliceContext = {
  settings: SiteSettings;
  /** Largeur du contenu des pages (ex. `max-w-4xl` sur Tarifs). */
  containerClassName?: string;
};

export type ButtonStyle = "Orange (principal)" | "Contour" | "Lien texte";
export type ButtonItem = { link: LinkField; style: ButtonStyle | null };

/** Boutons d'une section ; chaque section fournit ses classes par style. */
export function Buttons({
  items, classes, className, icon, trailing,
}: {
  items: ButtonItem[] | null | undefined;
  classes: Partial<Record<ButtonStyle, string>>;
  className?: string;
  /** Icône éventuelle selon le lien (ex. téléphone). */
  icon?: (href: string, style: ButtonStyle) => ReactNode;
  /** Icône après le texte. */
  trailing?: (href: string, style: ButtonStyle) => ReactNode;
}) {
  const buttons = (items ?? []).filter((b) => b.link && "url" in b.link && b.link.url);
  if (!buttons.length) return null;
  const render = (b: ButtonItem, i: number) => {
    const style = b.style ?? "Orange (principal)";
    const href = "url" in b.link ? (b.link.url as string) : "";
    const text = "text" in b.link ? b.link.text : undefined;
    return (
      <SiteLink key={i} field={b.link} className={classes[style] ?? classes["Orange (principal)"]}>
        {icon || trailing ? <>{icon?.(href, style)}{text}{trailing?.(href, style)}</> : text}
      </SiteLink>
    );
  };
  return className ? <div className={className}>{buttons.map(render)}</div> : <>{buttons.map(render)}</>;
}

/** Pastille au-dessus d'un titre. */
export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  if (!children) return null;
  return (
    <span className={cn("inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand/10 text-brand border border-brand/20", className)}>
      {children}
    </span>
  );
}

/**
 * Sections qui occupent toute la largeur (fond, image…) et gèrent leur propre
 * marge. Les autres sont posées dans le conteneur de la page.
 */
const FULL_WIDTH = new Set([
  "feature_grid/strip", "feature_grid/tiles", "pricing/compact", "text_image/photoMosaic",
  "text_image/video", "logos/partners", "logos/marquee", "b2b_highlight/default",
  "course_booking/default", "instagram_videos/default",
]);
const FULL_WIDTH_WIDGETS = new Set([
  "Prochains tournois (Playtomic)", "Avis Google", "Inscription newsletter",
  "Archives des newsletters", "Contact et plan d'accès",
]);

type AnySlice = { slice_type: string; variation?: string; primary?: unknown };

export function isFullWidth(slice: AnySlice) {
  if (slice.slice_type === "widget") {
    const name = (slice.primary as { widget?: string } | undefined)?.widget ?? "";
    return FULL_WIDTH_WIDGETS.has(name);
  }
  return FULL_WIDTH.has(`${slice.slice_type}/${slice.variation}`);
}

/**
 * Conteneur des sections « dans la page » : 64 px entre deux sections et
 * autour du groupe, comme les anciennes pages (`py-16 space-y-16`).
 */
export function Contained({
  index, slices, context, id, className, children,
}: {
  index: number;
  slices: readonly unknown[];
  context: SliceContext;
  id?: string | null;
  className?: string;
  children: ReactNode;
}) {
  const prev = slices[index - 1] as AnySlice | undefined;
  const next = slices[index + 1] as AnySlice | undefined;
  const pt = !prev || isFullWidth(prev) ? "pt-16" : "pt-8";
  const pb = !next || isFullWidth(next) ? "pb-16" : "pb-8";
  return (
    <div id={id || undefined} className={cn("container mx-auto px-4 scroll-mt-28", context.containerClassName, pt, pb, className)}>
      {children}
    </div>
  );
}
