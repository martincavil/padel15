import Link from "next/link";
import type { ReactNode } from "react";
import type { NavLink } from "@/lib/settings";

/** Lien venant des réglages : next/link pour les pages du site, <a> sinon. */
export function NavAnchor({
  link, className, children, onClick,
}: { link: NavLink; className?: string; children?: ReactNode; onClick?: () => void }) {
  if (link.internal) {
    return <Link href={link.href} className={className} onClick={onClick}>{children ?? link.label}</Link>;
  }
  return (
    <a href={link.href} className={className} onClick={onClick}
      {...(link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children ?? link.label}
    </a>
  );
}
