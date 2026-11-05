import { JsonLd } from "@/components/shared/JsonLd";
import { PrismicPage, pageMetadata } from "@/lib/prismic-pages";

export const generateMetadata = () => pageMetadata("evenements");

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: "Padel 15 — Espace Événements",
  address: {
    "@type": "PostalAddress",
    streetAddress: "115 rue Castagnary",
    postalCode: "75015",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
};

/** Contenu : document « Page » evenements dans Prismic. */
export default function EvenementsPage() {
  return (
    <>
      <JsonLd data={eventSchema} />
      <PrismicPage uid="evenements" />
    </>
  );
}
