import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Users, Trophy, Wine, Download, Phone, Mail, FileText, MessageSquare } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { JsonLd } from "@/components/shared/JsonLd";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { LightboxGallery } from "@/components/shared/LightboxGallery";
import { TallyEmbed } from "@/components/shared/TallyEmbed";
import Clients from "@/components/Clients";

export const metadata: Metadata = {
  title: "Événements d'entreprise & Team Building — Padel 15 Paris",
  description:
    "Organisez votre team building, tournoi d'entreprise ou soirée privée au Padel 15 Paris 15ème. Formules sur-mesure, coaching, restauration. Devis gratuit sous 24h.",
  openGraph: {
    title: "Événements d'entreprise & Team Building — Padel 15 Paris",
    description:
      "Formules clé-en-main pour vos événements corporate. BlackRock, BNP, BCG, Kering, AXA leur font confiance.",
    images: [{ url: "/images/autres/work-and-padel.webp" }],
  },
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: "Padel 15 — Espace Événements Entreprise",
  description: "Lieu d'événements corporate à Paris 15ème — team building, tournois, soirées privées.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "115 rue Castagnary",
    postalCode: "75015",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  telephone: "+33145315876",
  url: "https://padel15.fr/entreprises",
};

const OFFRES = [
  {
    icon: Users,
    titre: "Séminaire Padel",
    prix: "Sur devis",
    description: "La formule idéale pour renforcer la cohésion de vos équipes dans un cadre atypique.",
    inclus: [
      "Terrains privatisés (2h minimum)",
      "Coach dédié — initiation ou perfectionnement",
      "Arbitrage et organisation du tournoi",
      "Matériel fourni (raquettes, balles)",
      "Cocktail dinatoire ou déjeuner au restaurant",
      "Support événementiel (score, podium)",
    ],
    cible: "10 à 80 personnes",
  },
  {
    icon: Trophy,
    titre: "Tournoi Corporate",
    prix: "Sur devis",
    description: "Affrontez-vous entre équipes dans un format compétitif et convivial, clé en main.",
    inclus: [
      "Format tournoi round-robin ou élimination directe",
      "Arbitre + animateur dédié",
      "Podium et remise de trophées",
      "Photo/vidéo souvenir (option)",
      "Restauration personnalisable",
      "Privatisation complète du club possible",
    ],
    cible: "20 à 120 personnes",
  },
  {
    icon: Wine,
    titre: "Soirée Privée",
    prix: "Sur devis",
    description: "Privatisez notre guinguette et terrasse pour votre afterwork, anniversaire ou soirée de fin d'année.",
    inclus: [
      "Guinguette et terrasse privatisées",
      "Bar ouvert personnalisable",
      "Animation pétanque, fléchettes, padel découverte",
      "Traiteur ou formule buffet",
      "Décoration thématique (option)",
      "DJ ou musique d'ambiance (option)",
    ],
    cible: "15 à 150 personnes",
  },
];

const GALLERY_IMAGES = [
  { src: "/images/terrains/terrain-match-1.webp", alt: "Match de padel en entreprise" },
  { src: "/images/autres/work-and-padel.webp", alt: "Coworking et padel" },
  { src: "/images/restaurant/rest-inte-grand-angle.webp", alt: "Espace restaurant et événements" },
  { src: "/images/restaurant/guinguette.webp", alt: "Terrasse guinguette privatisée" },
  { src: "/images/terrains/terrain-ext-jour.webp", alt: "Terrains extérieurs" },
  { src: "/images/terrains/terrain-inte-game.webp", alt: "Match en cours sur terrain intérieur" },
];

const CHIFFRES = [
  { valeur: "21+", label: "Entreprises clientes" },
  { valeur: "500+", label: "Événements organisés" },
  { valeur: "24h", label: "Délai de réponse" },
  { valeur: "100%", label: "Sur-mesure" },
];

export default function EntreprisesPage() {
  return (
    <>
      <JsonLd data={eventSchema} />

      <PageHero
        title="Votre prochain événement commence ici"
        subtitle="Team building, tournoi corporate ou soirée privée — formules clé-en-main au cœur de Paris 15ème."
        badge="Entreprises & Groupes"
        imageSrc="/images/autres/work-and-padel.webp"
        imageAlt="Événements d'entreprise Padel 15"
        height="lg"
      />

      <div className="container mx-auto px-4 py-16 space-y-20">

        {/* Chiffres clés */}
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CHIFFRES.map((c) => (
              <div key={c.label} className="text-center bg-gray-50 rounded-2xl p-6">
                <div className="font-buzz text-4xl text-brand mb-1">{c.valeur}</div>
                <div className="text-gray-500 text-sm">{c.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* 3 offres */}
        <div>
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="font-buzz text-3xl md:text-4xl mb-3">Nos formules</h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Chaque événement est unique. Nos formules sont des points de départ — nous adaptons tout à vos besoins.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OFFRES.map((offre, i) => {
              const Icon = offre.icon;
              return (
                <AnimatedSection key={offre.titre} delay={i * 0.1}>
                  <div className="border border-gray-200 rounded-2xl p-7 hover:border-brand hover:shadow-lg transition-all h-full flex flex-col">
                    <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-brand" />
                    </div>
                    <h3 className="font-buzz text-xl mb-1">{offre.titre}</h3>
                    <p className="text-brand text-sm font-semibold mb-3">{offre.cible}</p>
                    <p className="text-gray-600 text-sm mb-5 leading-relaxed">{offre.description}</p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {offre.inclus.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                          <Check className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#formulaire"
                      className="block text-center bg-brand hover:bg-brand-dark text-white font-semibold py-3 rounded-xl transition-colors"
                    >
                      Demander un devis
                    </a>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>

        {/* Galerie */}
        <AnimatedSection>
          <h2 className="font-buzz text-3xl mb-6">L&apos;espace événements</h2>
          <LightboxGallery images={GALLERY_IMAGES} columns={3} />
        </AnimatedSection>

        {/* Clients logos */}
        <AnimatedSection>
          <h2 className="font-buzz text-3xl text-center mb-2">Ils nous ont fait confiance</h2>
          <p className="text-center text-gray-500 mb-8">Plus de 21 entreprises de premier plan ont choisi Padel 15 pour leurs événements.</p>
          <div className="bg-gray-50 rounded-2xl py-8 overflow-hidden">
            <Clients />
          </div>
        </AnimatedSection>

        {/* Formulaire + infos contact */}
        <div id="formulaire" className="grid grid-cols-1 lg:grid-cols-3 gap-12 scroll-mt-24">

          {/* Left — infos */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="font-buzz text-3xl mb-3">Parlons de votre projet</h2>
              <p className="text-gray-600 leading-relaxed">
                Notre équipe vous répond sous 24h ouvrées avec une proposition personnalisée.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Téléphone</p>
                  <a href="tel:+33145315876" className="font-medium hover:text-brand transition-colors">+33 1 45 31 58 76</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Email</p>
                  {/* TODO: Remplacer par adresse commerciale dédiée */}
                  <a href="mailto:contact@padel15.fr" className="font-medium hover:text-brand transition-colors">contact@padel15.fr</a>
                </div>
              </div>
            </div>
            {/* Brochure PDF placeholder */}
            <div className="bg-gray-50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-5 h-5 text-brand" />
                <p className="font-semibold text-sm">Brochure entreprises</p>
              </div>
              <p className="text-gray-500 text-xs mb-3">
                Toutes nos formules et tarifs en détail — à partager avec votre direction.
              </p>
              {/* TODO: Remplacer par /brochure-entreprises.pdf quand le fichier est prêt */}
              <a
                href="/brochure-entreprises.pdf"
                className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Télécharger la brochure
              </a>
            </div>
          </div>

          {/* Right — form (Tally si NEXT_PUBLIC_TALLY_FORM_ID est défini, sinon contact direct) */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-black px-6 py-4">
                <h3 className="text-white font-semibold">Demande de devis événement</h3>
                <p className="text-gray-400 text-sm">Gratuit et sans engagement — réponse sous 24h</p>
              </div>
              {process.env.NEXT_PUBLIC_TALLY_FORM_ID ? (
                // Formulaire Tally — ajouter NEXT_PUBLIC_TALLY_FORM_ID dans .env.local + Vercel
                <div className="p-2">
                  <TallyEmbed
                    formId={process.env.NEXT_PUBLIC_TALLY_FORM_ID}
                    height={560}
                    title="Demande de devis événement Padel 15"
                  />
                </div>
              ) : (
                // Fallback : contact direct tant que Tally n'est pas configuré
                <div className="p-8 space-y-6">
                  <p className="text-gray-600">
                    Décrivez-nous votre projet par email ou téléphone — nous vous répondons sous 24h avec une proposition sur-mesure.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="mailto:contact@padel15.fr?subject=Demande%20de%20devis%20%C3%A9v%C3%A9nement"
                      className="flex items-center gap-3 bg-brand hover:bg-brand-dark text-white font-semibold px-5 py-3.5 rounded-xl transition-colors"
                    >
                      <Mail className="w-5 h-5 shrink-0" />
                      Envoyer un email
                    </a>
                    <a
                      href="tel:+33145315876"
                      className="flex items-center gap-3 border border-gray-300 hover:border-brand text-gray-700 hover:text-brand font-semibold px-5 py-3.5 rounded-xl transition-colors"
                    >
                      <Phone className="w-5 h-5 shrink-0" />
                      +33 1 45 31 58 76
                    </a>
                    <a
                      href="https://wa.me/33145315876"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 border border-gray-300 hover:border-brand text-gray-700 hover:text-brand font-semibold px-5 py-3.5 rounded-xl transition-colors"
                    >
                      <MessageSquare className="w-5 h-5 shrink-0" />
                      WhatsApp
                    </a>
                  </div>
                  <p className="text-gray-400 text-xs">
                    En nous contactant, vous acceptez notre{" "}
                    <Link href="/confidentialite" className="underline hover:text-brand">politique de confidentialité</Link>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
