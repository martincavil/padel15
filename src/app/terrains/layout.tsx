import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Terrains de Padel Paris 15 | Réservation Playtomic",
  description:
    "2 terrains de padel couverts et extérieurs au 115 rue Castagnary, Paris 15ème. Réservation en ligne via Playtomic. Créneaux 7j/7, 8h-22h.",
  openGraph: {
    title: "Terrains Padel 15 — Réservation en ligne",
    images: [{ url: "/images/terrains/terrain-ext-jour.webp" }],
  },
};

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

export default function TerrainsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={terrainSchema} />
      {children}
    </>
  );
}
