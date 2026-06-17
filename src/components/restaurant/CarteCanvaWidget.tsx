import { ExternalLink, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

const CANVA_URL = "https://canva.link/hk499dmtauwn9vl";

interface CarteCanvaWidgetProps {
  variant?: "full" | "compact";
}

export function CarteCanvaWidget({ variant = "full" }: CarteCanvaWidgetProps) {
  if (variant === "compact") {
    return (
      <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-6 py-4 border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
            <UtensilsCrossed className="w-5 h-5 text-brand" />
          </div>
          <div>
            <p className="font-semibold text-sm">Plat du jour &amp; Carte</p>
            <p className="text-gray-500 text-xs">Mis à jour chaque matin</p>
          </div>
        </div>
        <a
          href={CANVA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm flex-shrink-0"
        >
          Voir la carte
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto text-center">
      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand/10 text-brand border border-brand/20 mb-3">
        Menu
      </span>
      <h2 className="font-buzz mb-1">Plat du jour &amp; Carte</h2>
      <p className="text-gray-500 text-sm mb-6">Mis à jour chaque matin</p>
      <Link
        href={CANVA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        <UtensilsCrossed className="w-5 h-5" />
        Voir la carte complète
      </Link>
    </div>
  );
}
