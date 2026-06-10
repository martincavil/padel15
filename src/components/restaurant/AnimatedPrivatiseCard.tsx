import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";

export function AnimatedPrivatiseCard() {
  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* Photo de fond */}
      <div className="absolute inset-0">
        <Image
          src="/images/restaurant/rest-ext.webp"
          alt="Terrasse extérieure Padel 15 — espace privatisable"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-brand-dark/30" />

      {/* Liserés accent haut/bas */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent z-20" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent z-20" />

      {/* Cercle décoratif — haut gauche */}
      <div
        className="absolute w-40 h-40 rounded-full border border-brand/20 top-[-20px] left-[-20px] z-10"
        style={{ animation: "float1 9s ease-in-out infinite" }}
      />
      {/* Cercle décoratif — bas droite */}
      <div
        className="absolute w-24 h-24 rounded-full border border-white/10 bottom-[-10px] right-10 z-10"
        style={{ animation: "float2 7s ease-in-out 1s infinite" }}
      />

      <div className="relative z-20 px-6 py-14 sm:px-12 sm:py-16 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-brand/20 text-brand border border-brand/30 mb-5">
          Privatisation
        </span>
        <h2 className="font-buzz text-white mb-3">Privatisez notre espace</h2>
        <p className="text-gray-200 max-w-lg mx-auto mb-2 text-lg">
          Séminaires · Afterworks · Événements privés
        </p>
        <p className="text-gray-400 max-w-md mx-auto mb-8 text-sm">
          Anniversaire, afterwork, séminaire ou soirée d&apos;entreprise — nous
          créons l&apos;événement sur mesure.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="mailto:contact@padel15.fr?subject=Demande privatisation restaurant"
            className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Demander un devis
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="tel:+33145315876"
            className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-xl transition-colors backdrop-blur-sm"
          >
            <Phone className="w-4 h-4" />
            +33 1 45 31 58 76
          </a>
        </div>
      </div>
    </div>
  );
}
