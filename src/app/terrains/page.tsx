import { JsonLd } from "@/components/shared/JsonLd";
import { PrismicPage, pageMetadata } from "@/lib/prismic-pages";

export const generateMetadata = () => pageMetadata("terrains");

const terrainSchema = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Terrains de Padel — Padel 15",
  address: {
    "@type": "PostalAddress",
    streetAddress: "115 rue Castagnary",
    postalCode: "75015",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  sport: "Padel",
  telephone: "+33145315876",
};

/** Contenu : document « Page » terrains dans Prismic. */
export default function TerrainsPage() {
  return (
    <>
      <JsonLd data={terrainSchema} />
      <PrismicPage uid="terrains" />
    </>
  );
}
