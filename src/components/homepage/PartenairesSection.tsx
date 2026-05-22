import Image from "next/image";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const PARTENAIRES = [
  {
    nom: "ASICS",
    logo: "/logos/asics.svg",
    description:
      "Équipementier officiel — accessoires de padel disponibles sur place.",
    lien: "https://www.asics.com/fr/fr-fr/padel/",
    hasLogo: true,
  },
  {
    nom: "CUPRA",
    logo: "/logos/cupra.svg",
    description:
      "Partenaire automobile — l'esprit performance et élégance, sur le terrain comme sur la route.",
    lien: "https://www.cupraofficial.fr/",
    hasLogo: true,
  },
  {
    nom: "HEAD",
    logo: "/logos/head.png",
    description:
      "Équipementier racket sport — raquettes et balles de padel disponibles sur nos courts, à l'achat comme à la location.",
    lien: "https://www.head.com/fr-FR/sports/padel/",
    hasLogo: true,
  },
];

export function PartenairesSection() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand/10 text-brand border border-brand/20 mb-4">
              Partenaires premium
            </span>
            <h2 className="font-buzz text-3xl md:text-4xl">Nos partenaires</h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PARTENAIRES.map((p, i) => (
            <AnimatedSection key={p.nom} delay={i * 0.1}>
              <a
                href={p.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-gray-200 rounded-2xl p-8 hover:border-brand hover:shadow-md transition-all text-center"
              >
                {/* Logo ou texte placeholder */}
                <div className="h-20 flex items-center justify-center mb-5">
                  {p.hasLogo && p.logo ? (
                    <Image
                      src={p.logo}
                      alt={`Logo ${p.nom}`}
                      width={200}
                      height={80}
                      className="max-h-14 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <span className="font-buzz text-4xl text-gray-300 group-hover:text-brand transition-colors">
                      {p.nom}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-brand transition-colors">
                  {p.nom}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {p.description}
                </p>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
