import Image from "next/image";
import Link from "next/link";
import { UtensilsCrossed, Phone, ExternalLink } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function RestaurantHighlight() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Photo grid — grande gauche + 2 empilées droite */}
            <div className="grid grid-cols-2 grid-rows-2 gap-3 h-[480px]">
              <div className="relative rounded-2xl overflow-hidden row-span-2">
                <Image
                  src="/images/restaurant/restaurant-verticale-1.webp"
                  alt="Restaurant intérieur Padel 15"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/images/restaurant/restau-diner.webp"
                  alt="Ambiance dîner au restaurant Padel 15"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 50vw, 20vw"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/images/restaurant/restaurant-nourriture-verticale-1.webp"
                  alt="Plats du restaurant Padel 15 — cuisine fraîche et de saison"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 50vw, 20vw"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand/10 text-brand border border-brand/20 mb-4">
                Restaurant & Bar
              </span>
              <h2 className="font-buzz mb-4">
                Le plaisir du Padel,
                <br />
                <span className="text-brand">le plaisir de La table</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Service continu du petit-déjeuner au dîner, 7j/7. Cuisine
                généreuse avec des produits frais et de saison. Terrasse
                guinguette végétalisée, terrain de pétanque et espaces lounge —
                l&apos;après-padel parfait, ou un déjeuner en plein air en
                semaine.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <a
                  href="https://canva.link/hk499dmtauwn9vl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  Voir la carte
                </a>
                {/* Réserver une table */}
                <a
                  href="tel:+33145315876"
                  className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-brand text-gray-700 hover:text-brand font-semibold px-5 py-3 rounded-xl transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Réserver une table
                </a>
              </div>

              <Link
                href="/restaurant"
                className="inline-flex items-center gap-1.5 text-sm text-brand hover:underline font-medium"
              >
                En savoir plus sur le restaurant
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
