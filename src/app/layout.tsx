import "@/styles/globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Layout from "@/components/Layout";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { JsonLd } from "@/components/shared/JsonLd";
import Tracking from "@/components/Tracking";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["SportsClub", "Restaurant", "LocalBusiness"],
  name: "Padel 15",
  description:
    "Club de padel haut de gamme au cœur du 15ème arrondissement de Paris. Terrains couverts et extérieurs, coaching certifié, restaurant guinguette.",
  url: "https://padel15.fr",
  telephone: "+33145315876",
  email: "contact@padel15.fr",
  address: {
    "@type": "PostalAddress",
    streetAddress: "115 rue Castagnary",
    postalCode: "75015",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.8298,
    longitude: 2.2941,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "22:00",
    },
  ],
  priceRange: "€€",
  servesCuisine: "Française",
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Terrains de padel couverts", value: true },
    { "@type": "LocationFeatureSpecification", name: "Restaurant", value: true },
    { "@type": "LocationFeatureSpecification", name: "Guinguette et terrasse", value: true },
    { "@type": "LocationFeatureSpecification", name: "Pétanque", value: true },
    { "@type": "LocationFeatureSpecification", name: "Coworking", value: true },
    { "@type": "LocationFeatureSpecification", name: "Accessible PMR", value: true },
  ],
  sameAs: [
    "https://www.instagram.com/padel15club/",
    "https://playtomic.com/clubs/padel-15",
  ],
};

const sportsActivitySchema = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Padel 15",
  sport: "Padel",
  address: {
    "@type": "PostalAddress",
    streetAddress: "115 rue Castagnary",
    postalCode: "75015",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  openingHours: "Mo-Su 08:00-22:00",
  telephone: "+33145315876",
  url: "https://padel15.fr",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://padel15.fr"),
  title: {
    default: "Padel 15 | Club de Padel Paris 15ème — Terrains, Restaurant, Coaching",
    template: "%s | Padel 15",
  },
  description:
    "Club de padel haut de gamme au cœur du 15ème arrondissement de Paris. Terrains couverts et extérieurs, coaching certifié, restaurant guinguette. Réservez sur Playtomic.",
  keywords: ["padel paris", "padel 15ème", "club padel paris", "terrains padel paris", "coaching padel"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://padel15.fr",
    siteName: "Padel 15",
    title: "Padel 15 | Club de Padel Paris 15ème",
    description: "Club de padel haut de gamme au cœur du Paris 15ème.",
    images: [{ url: "/images/terrains/terrain-ext-jour.webp", width: 1200, height: 630, alt: "Terrains Padel 15" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={dmSans.variable}>
      <head>
        <link rel="preload" as="image" href="/images/terrains/terrain-ext-jour.webp" fetchPriority="high" />
        <link rel="icon" href="/P15.ico" type="image/x-icon" />
        <JsonLd data={localBusinessSchema} />
        <JsonLd data={sportsActivitySchema} />
      </head>
      <body className="scroll-smooth font-sans">
        <GoogleAnalytics ga_id="G-N2Y4ZCYHTB" />
        <Tracking />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
