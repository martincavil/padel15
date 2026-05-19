import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Users, Trophy, Wine, Download, Phone, Mail, FileText } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { JsonLd } from "@/components/shared/JsonLd";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { LightboxGallery } from "@/components/shared/LightboxGallery";
import Clients from "@/components/Clients";

export const metadata: Metadata = {
  title: "Événements d'entreprise & Team Building — Padel 15 Paris",
  description:
    "Organisez votre team building, tournoi d'entreprise ou soirée privée au Padel 15 Paris 15ème. Formules sur-mesure, coaching, restauration. Devis gratuit sous 24h.",
  openGraph: {
    title: "Événements d'entreprise & Team Building — Padel 15 Paris",
    description:
      "Formules clé-en-main pour vos événements corporate. BlackRock, BNP, BCG, Kering, AXA leur font confiance.",
    images: [{ url: "/work-and-padel.webp" }],
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
  { src: "/terrain-match-1.jpg", alt: "Match de padel en entreprise" },
  { src: "/work-and-padel.webp", alt: "Coworking et padel" },
  { src: "/rest-inte-grand-angle.webp", alt: "Espace restaurant et événements" },
  { src: "/guinguette.webp", alt: "Terrasse guinguette privatisée" },
  { src: "/terrain-ext-jour.webp", alt: "Terrains extérieurs" },
  { src: "/terrain-inte-game.webp", alt: "Match en cours sur terrain intérieur" },
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
        imageSrc="/work-and-padel.webp"
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

          {/* Right — form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-black px-6 py-4">
                <h3 className="text-white font-semibold">Demande de devis événement</h3>
                <p className="text-gray-400 text-sm">Gratuit et sans engagement — réponse sous 24h</p>
              </div>
              <form
                action="mailto:contact@padel15.fr"
                method="POST"
                encType="text/plain"
                className="p-6 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                    <input id="nom" name="nom" type="text" required placeholder="Jean Dupont"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" />
                  </div>
                  <div>
                    <label htmlFor="entreprise" className="block text-sm font-medium text-gray-700 mb-1">Entreprise *</label>
                    <input id="entreprise" name="entreprise" type="text" required placeholder="Nom de votre société"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input id="email" name="email" type="email" required placeholder="jean@entreprise.fr"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" />
                  </div>
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input id="telephone" name="telephone" type="tel" placeholder="+33 6 00 00 00 00"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type d&apos;événement *</label>
                    <select id="type" name="type" required
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand bg-white">
                      <option value="">Choisir...</option>
                      <option value="seminaire">Séminaire padel</option>
                      <option value="tournoi">Tournoi corporate</option>
                      <option value="soiree">Soirée privée</option>
                      <option value="afterwork">Afterwork</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="personnes" className="block text-sm font-medium text-gray-700 mb-1">Nombre de personnes</label>
                    <select id="personnes" name="personnes"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand bg-white">
                      <option value="">Estimer...</option>
                      <option value="10-20">10 à 20</option>
                      <option value="20-40">20 à 40</option>
                      <option value="40-80">40 à 80</option>
                      <option value="80+">80+</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date souhaitée</label>
                    <input id="date" name="date" type="date"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" />
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Budget estimé</label>
                    <select id="budget" name="budget"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand bg-white">
                      <option value="">Indiquer...</option>
                      <option value="1000-3000">1 000 € – 3 000 €</option>
                      <option value="3000-6000">3 000 € – 6 000 €</option>
                      <option value="6000-10000">6 000 € – 10 000 €</option>
                      <option value="10000+">10 000 €+</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message / détails</label>
                  <textarea id="message" name="message" rows={3} placeholder="Décrivez votre projet, vos attentes particulières..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-none" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-3">
                    En envoyant ce formulaire, vous acceptez notre{" "}
                    <Link href="/confidentialite" className="underline hover:text-brand">politique de confidentialité</Link>.
                    Données utilisées uniquement pour répondre à votre demande.
                  </p>
                  <button
                    type="submit"
                    className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-3.5 rounded-xl transition-colors"
                  >
                    Envoyer ma demande
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
