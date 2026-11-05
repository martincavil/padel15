import { UtensilsCrossed } from "lucide-react";
import type { ReactNode } from "react";
import type { NavLink } from "@/lib/settings";
import { NavAnchor } from "@/components/prismic/NavAnchor";

/**
 * Lien vers la carte du restaurant (Canva ou PDF). L'adresse vient des
 * réglages du site (« Carte du restaurant »), les textes du bloc Prismic.
 */
export function CarteCanvaWidget({
  menu, badge, title, intro,
}: {
  menu: NavLink | null;
  badge?: ReactNode;
  title?: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <div className="max-w-sm mx-auto text-center">
      {badge && (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand/10 text-brand border border-brand/20 mb-3">
          {badge}
        </span>
      )}
      {title}
      {intro}
      {menu && (
        <NavAnchor
          link={menu}
          className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          <UtensilsCrossed className="w-5 h-5" />
          Voir la carte complète
        </NavAnchor>
      )}
    </div>
  );
}
