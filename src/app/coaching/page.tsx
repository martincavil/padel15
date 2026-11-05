import { JsonLd } from "@/components/shared/JsonLd";
import { SITE_URL } from "@/lib/site";
import { PrismicPage, pageMetadata } from "@/lib/prismic-pages";

export const generateMetadata = () => pageMetadata("coaching");

const coachingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Coaching Padel — Padel 15",
  serviceType: "Cours de padel",
  description:
    "Cours particuliers et collectifs de padel à Paris 15ème avec des coachs certifiés. Tous niveaux, 7j/7.",
  provider: {
    "@type": "SportsClub",
    name: "Padel 15",
    address: {
      "@type": "PostalAddress",
      streetAddress: "115 rue Castagnary",
      postalCode: "75015",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
    telephone: "+33145315876",
    url: SITE_URL,
  },
  areaServed: {
    "@type": "City",
    name: "Paris",
  },
};

/** Contenu : document « Page » coaching dans Prismic. */
export default function CoachingPage() {
  return (
    <>
      <JsonLd data={coachingSchema} />
      <PrismicPage uid="coaching" />
    </>
  );
}
