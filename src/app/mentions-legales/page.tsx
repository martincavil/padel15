import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — Padel 15",
  description: "Mentions légales du site padel15.fr — Éditeur, hébergeur, propriété intellectuelle.",
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <div className="pt-24 pb-16 container mx-auto px-4 max-w-3xl">
      <h1 className="font-buzz text-4xl mb-8">Mentions légales</h1>
      <div className="prose prose-gray max-w-none space-y-8 text-gray-700">

        <section>
          <h2 className="font-semibold text-gray-900 mb-3">1. Éditeur du site</h2>
          <p>Le site <strong>padel15.fr</strong> est édité par :</p>
          <ul className="list-none space-y-1 mt-2">
            <li><strong>Raison sociale :</strong> PADEL 15</li>
            <li><strong>Forme juridique :</strong> Société par actions simplifiée (SAS)</li>
            <li><strong>Capital social :</strong> 5 000,00 €</li>
            <li><strong>RCS :</strong> 949 726 848 R.C.S. Paris</li>
            <li><strong>SIRET :</strong> 949 726 848 (NIC à compléter)</li>
            <li><strong>Date d&apos;immatriculation :</strong> 29/11/2024</li>
            <li><strong>Siège social :</strong> 115 rue Castagnary, 75015 Paris, France</li>
            <li><strong>Activité :</strong> Exploitation de complexes sportifs et restauration</li>
            <li><strong>Téléphone :</strong> +33 1 45 31 58 76</li>
            <li><strong>Email :</strong> contact@padel15.fr</li>
          </ul>
          <div className="mt-4 space-y-1">
            <p><strong>Président :</strong> BROK EVENT (SARL) — 52 rue Labrouste, 75015 Paris — RCS 988 151 643 Paris</p>
            <p><strong>Directeur général :</strong> GM HOLDING (SARL) — 52 rue Labrouste, 75015 Paris — RCS 988 127 064 Paris</p>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900 mb-3">2. Hébergement</h2>
          <p>Ce site est hébergé par :</p>
          <ul className="list-none space-y-1 mt-2">
            <li><strong>Vercel Inc.</strong></li>
            <li>340 Pine Street Suite 701, San Francisco, CA 94104, États-Unis</li>
            <li>Site : <a href="https://vercel.com" className="text-brand hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a></li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900 mb-3">3. Propriété intellectuelle</h2>
          <p>L&apos;ensemble du contenu de ce site (textes, images, logos, vidéos) est la propriété exclusive de Padel 15 ou de ses partenaires, sauf mention contraire. Toute reproduction, distribution ou utilisation sans autorisation écrite est interdite.</p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900 mb-3">4. Cookies</h2>
          <p>Ce site utilise des cookies à des fins d&apos;analyse d&apos;audience (Google Analytics 4) et de publicité (Meta Pixel). Vous pouvez gérer vos préférences via notre bandeau de consentement ou en consultant notre <a href="/confidentialite" className="text-brand hover:underline">politique de confidentialité</a>.</p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900 mb-3">5. Loi applicable</h2>
          <p>Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront compétents.</p>
        </section>

        <p className="text-gray-400 text-sm mt-8">Dernière mise à jour : Juin 2026</p>
      </div>
    </div>
  );
}
