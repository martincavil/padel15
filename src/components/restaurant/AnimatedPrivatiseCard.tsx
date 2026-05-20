import Link from "next/link";

// Animations CSS pures — framer-motion retiré pour réduire le bundle JS
export function AnimatedPrivatiseCard() {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl p-10 text-center overflow-hidden">
      <div className="absolute w-40 h-40 rounded-full border border-brand/15 top-[-20px] left-[-20px] animate-[float1_9s_ease-in-out_infinite]" />
      <div className="absolute w-24 h-24 rounded-full border border-white/[0.08] bottom-[-10px] right-10 animate-[float2_7s_ease-in-out_1s_infinite]" />
      <div className="absolute w-16 h-16 rounded-full bg-brand/[0.08] top-10 right-[-8px] animate-[float3_11s_ease-in-out_2s_infinite]" />
      <div className="absolute w-10 h-10 rounded-full border border-brand/20 bottom-12 left-8 animate-[float4_8s_ease-in-out_0.5s_infinite]" />
      <div className="relative z-10">
        <h2 className="font-buzz text-3xl text-white mb-3">Privatisez notre espace</h2>
        <p className="text-gray-400 max-w-lg mx-auto mb-6">
          Anniversaire, afterwork, séminaire ou soirée d&apos;entreprise — nous créons l&apos;événement sur mesure.
        </p>
        <Link
          href="/evenements"
          className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors inline-block"
        >
          Demander un devis
        </Link>
      </div>
    </div>
  );
}
