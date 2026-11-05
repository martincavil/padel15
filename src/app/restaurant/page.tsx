import { JsonLd } from "@/components/shared/JsonLd";
import { PrismicPage, pageMetadata } from "@/lib/prismic-pages";

export const revalidate = 3600;

export const generateMetadata = () => pageMetadata("restaurant");

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Restaurant Padel 15",
  servesCuisine: "Française",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "115 rue Castagnary",
    postalCode: "75015",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  openingHours: "Mo-Su 08:00-22:00",
  telephone: "+33145315876",
};

/** Contenu : document « Page » restaurant dans Prismic. */
export default function RestaurantPage() {
  return (
    <>
      <JsonLd data={restaurantSchema} />
      <PrismicPage uid="restaurant" />
    </>
  );
}
