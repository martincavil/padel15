import { Calendar, Clock, Smartphone } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function PlaytomicSection() {
  return (
    <section className="bg-black py-10 border-b border-white/10">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Left — infos rapides */}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">7j/7 · 8h–22h</p>
                  <p className="text-gray-400 text-xs">Ouvert toute l&apos;année</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand/20 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Créneaux en temps réel</p>
                  <p className="text-gray-400 text-xs">Ouverts 5 jours à l&apos;avance</p>
                </div>
              </div>
            </div>

            {/* Right — CTA + badges */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href="https://playtomic.com/clubs/padel-15"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap"
              >
                Réserver sur Playtomic
              </a>
              <div className="flex gap-2">
                {/* App Store badge */}
                <a
                  href="https://apps.apple.com/fr/app/playtomic-play-padel/id1242321076"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Télécharger sur l'App Store"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3 py-2 rounded-lg transition-colors text-xs font-medium"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  App Store
                </a>
                {/* Google Play badge */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.playtomic&hl=fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Télécharger sur Google Play"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3 py-2 rounded-lg transition-colors text-xs font-medium"
                >
                  <Smartphone className="w-4 h-4" />
                  Google Play
                </a>
              </div>
            </div>

          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
