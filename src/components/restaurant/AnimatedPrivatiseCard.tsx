export function AnimatedPrivatiseCard() {
  return (
    <div className="relative bg-gradient-to-br from-gray-700 via-gray)800 to-black rounded-2xl p-10 text-center overflow-hidden">
      {/* Cercle 1 — haut gauche */}
      <div
        className="absolute w-40 h-40 rounded-full border border-brand/20 top-[-20px] left-[-20px]"
        style={{ animation: "float1 9s ease-in-out infinite" }}
      />
      {/* Cercle 2 — bas droite */}
      <div
        className="absolute w-24 h-24 rounded-full border border-white/10 bottom-[-10px] right-10"
        style={{ animation: "float2 7s ease-in-out 1s infinite" }}
      />
      {/* Cercle 3 — haut droite */}
      <div
        className="absolute w-16 h-16 rounded-full bg-brand/10 top-10 right-[-8px]"
        style={{ animation: "float3 11s ease-in-out 2s infinite" }}
      />
      {/* Cercle 4 — bas gauche */}
      <div
        className="absolute w-10 h-10 rounded-full border border-brand/25 bottom-12 left-8"
        style={{ animation: "float4 8s ease-in-out 0.5s infinite" }}
      />

      <div className="relative z-10">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-brand/20 text-brand border border-brand/30 mb-5">
          Privatisation
        </span>
        <h2 className="font-buzz text-white mb-3">
          Privatisez notre espace
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto mb-2 text-lg">
          Séminaires · Afterworks · Événements privés
        </p>
        <p className="text-gray-500 max-w-md mx-auto mb-8 text-sm">
          Anniversaire, afterwork, séminaire ou soirée d&apos;entreprise — nous
          créons l&apos;événement sur mesure.
        </p>
        <a
          href="mailto:contact@padel15.fr?subject=Demande privatisation restaurant"
          className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors inline-block"
        >
          Demander un devis
        </a>
      </div>
    </div>
  );
}
