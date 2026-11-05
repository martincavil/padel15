import Link from "next/link";
import type { LinkField } from "@prismicio/client";
import type { ReactNode } from "react";
import { resolveLink } from "@/lib/prismic-links";

type Props = {
  field: LinkField | null | undefined;
  className?: string;
  /** Contenu du lien ; par défaut le texte saisi dans Prismic. */
  children?: ReactNode;
  "aria-label"?: string;
};

/** Lien Prismic : next/link pour les pages du site, <a> sinon. */
export function SiteLink({ field, className, children, ...rest }: Props) {
  const link = resolveLink(field);
  if (!link) return null;
  const content = children ?? link.text;
  if (link.internal) {
    return <Link href={link.href} className={className} {...rest}>{content}</Link>;
  }
  return (
    <a
      href={link.href}
      className={className}
      {...(link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {content}
    </a>
  );
}
