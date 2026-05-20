import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

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
    highlight: false,
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
  { label: "Cours particulier", detail: "1h avec un coach certifié", price: "Sur devis" },
  { label: "Cours collectif", detail: "Groupe 2-8 joueurs — 1h", price: "Sur devis" },
  { label: "Stage initiation", detail: "Formule découverte débutants", price: "Sur devis" },
];

export default function TarifsPage() {
  return (
    <>
      <PageHero
        title="Tarifs"
        subtitle="Réservation via Playtomic — pas d'abonnement obligatoire, payez à la séance."
        imageSrc="/images/terrains/padel-ext.jpg"
        imageAlt="Courts Padel 15 Paris"
        height="md"
      />

      <div className="container mx-auto px-4 py-16 space-y-16 max-w-4xl">

        {/* Terrains */}
        <AnimatedSection>
          <div>
            <h2 className="font-buzz text-3xl mb-2">Location de terrains</h2>
            <p className="text-gray-500 mb-6">Prix par personne pour 1 heure. 4 joueurs par terrain.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TARIFS_TERRAIN.map((t) => (
                <div
                  key={t.label}
                  className={`rounded-2xl p-8 border-2 ${t.highlight ? "border-brand bg-brand/5" : "border-gray-200"}`}
                >
                  {t.highlight && (
                    <span className="text-xs font-semibold text-brand uppercase tracking-wider">Le plus populaire</span>
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
            <p className="text-gray-500 text-sm mt-4 flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-brand flex-shrink-0" />
              Créneaux ouverts 5 jours à l&apos;avance via Playtomic. Location de raquettes disponible sur place.
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
        </AnimatedSection>

        {/* Coaching */}
        <AnimatedSection delay={0.1}>
          <div>
            <h2 className="font-buzz text-3xl mb-2">Coaching</h2>
            <p className="text-gray-500 mb-6">Tarifs sur devis selon la formule choisie. Contactez-nous pour un programme personnalisé.</p>
            <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden">
              {TARIFS_COACHING.map((t) => (
                <div key={t.label} className="flex items-center justify-between p-5 bg-white hover:bg-gray-50">
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
        </AnimatedSection>

        {/* Événements */}
        <AnimatedSection delay={0.2}>
          <div className="bg-black rounded-2xl p-8 text-white">
            <h2 className="font-buzz text-2xl mb-2">Événements d&apos;entreprise</h2>
            <p className="text-gray-400 mb-4">
              Formules sur-mesure pour vos team buildings, afterworks et séminaires. Devis personnalisé sous 24h.
            </p>
            <Link
              href="/evenements"
              className="bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block"
            >
              Demander un devis
            </Link>
          </div>
        </AnimatedSection>

      </div>
    </>
  );
}
