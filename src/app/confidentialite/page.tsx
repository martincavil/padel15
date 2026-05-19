import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Padel 15",
  description: "Politique de confidentialité et gestion des données personnelles de Padel 15.",
  robots: { index: false },
};

export default function ConfidentialitePage() {
  return (
    <div className="pt-24 pb-16 container mx-auto px-4 max-w-3xl">
      <h1 className="font-buzz text-4xl mb-8">Politique de confidentialité</h1>
      <div className="prose prose-gray max-w-none space-y-8 text-gray-700">

        <section>
          <h2 className="font-semibold text-xl text-gray-900 mb-3">1. Responsable du traitement</h2>
          <p>Padel 15 — 115 rue Castagnary, 75015 Paris — contact@padel15.fr</p>
        </section>

        <section>
          <h2 className="font-semibold text-xl text-gray-900 mb-3">2. Données collectées</h2>
          <p>Nous collectons les données suivantes :</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Données de formulaire : nom, email, téléphone, message (formulaires de contact et devis)</li>
            <li>Données de navigation : pages visitées, durée de session (via Google Analytics 4, anonymisé)</li>
            <li>Données marketing : interactions publicitaires (via Meta Pixel, avec consentement préalable)</li>
            <li>Email pour newsletter (via Brevo, avec consentement explicite)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-xl text-gray-900 mb-3">3. Finalités du traitement</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Répondre à vos demandes de contact et devis</li>
            <li>Envoyer notre newsletter (sur abonnement)</li>
            <li>Mesurer l&apos;audience de notre site pour l&apos;améliorer</li>
            <li>Diffuser de la publicité ciblée (avec votre consentement)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-xl text-gray-900 mb-3">4. Durée de conservation</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Données de contact : 3 ans après le dernier contact</li>
            <li>Données newsletter : jusqu&apos;à désabonnement</li>
            <li>Données analytiques : 14 mois (GA4 par défaut)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-xl text-gray-900 mb-3">5. Vos droits (RGPD)</h2>
          <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Droit d&apos;accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l&apos;effacement (droit à l&apos;oubli)</li>
            <li>Droit à la portabilité</li>
            <li>Droit d&apos;opposition au traitement</li>
          </ul>
          <p className="mt-2">Pour exercer ces droits : <a href="mailto:contact@padel15.fr" className="text-brand hover:underline">contact@padel15.fr</a></p>
        </section>

        <section>
          <h2 className="font-semibold text-xl text-gray-900 mb-3">6. Cookies</h2>
          <p>Vous pouvez gérer vos préférences de cookies à tout moment via le bandeau affiché sur notre site. Le refus des cookies analytiques et marketing n&apos;affecte pas votre navigation.</p>
        </section>

        <p className="text-gray-400 text-sm mt-8">Dernière mise à jour : Mai 2026</p>
      </div>
    </div>
  );
}
