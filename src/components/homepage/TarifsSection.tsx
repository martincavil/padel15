import Link from "next/link";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function TarifsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand/10 text-brand border border-brand/20 mb-4">
              Tarifs & Horaires
            </span>
            <h2 className="font-buzz">
              Jouez à votre rythme
            </h2>
          </div>
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="border-2 border-gray-200 rounded-2xl p-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Heures creuses
                </p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-buzz text-3xl">12,50 €</span>
                  <span className="text-gray-400 text-sm">/ pers / h</span>
                </div>
                <p className="text-gray-500 text-xs">
                  Lun–Ven : 8h–12h et 14h–16h
                </p>
              </div>
              <div className="border-2 border-brand rounded-2xl p-5 bg-brand/5">
                <p className="text-xs font-semibold text-brand uppercase tracking-wider mb-1">
                  Heures pleines
                </p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-buzz text-3xl">15 €</span>
                  <span className="text-gray-400 text-sm">/ pers / h</span>
                </div>
                <p className="text-gray-500 text-xs">
                  12h–14h, 16h–22h et week-end
                </p>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              4 joueurs par terrain · Raquettes et balles disponibles sur place
              · Créneaux ouverts 5 jours à l&apos;avance
            </p>
            <Link
              href="/tarifs"
              className="inline-block border border-brand text-brand hover:bg-brand hover:text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Voir tous les tarifs
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
