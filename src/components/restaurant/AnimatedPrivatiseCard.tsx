"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function AnimatedPrivatiseCard() {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl p-10 text-center overflow-hidden">
      <motion.div
        className="absolute w-40 h-40 rounded-full border border-brand/15 top-[-20px] left-[-20px]"
        animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-24 h-24 rounded-full border border-white/8 bottom-[-10px] right-10"
        animate={{ x: [0, -12, 0], y: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute w-16 h-16 rounded-full bg-brand/8 top-10 right-[-8px]"
        animate={{ x: [0, -8, 0], y: [0, 15, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute w-10 h-10 rounded-full border border-brand/20 bottom-12 left-8"
        animate={{ x: [0, 10, 0], y: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
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
