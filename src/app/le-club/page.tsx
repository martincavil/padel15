import { PrismicPage, pageMetadata } from "@/lib/prismic-pages";

export const revalidate = 3600;

export const generateMetadata = () => pageMetadata("le-club");

/** Contenu : document « Page » le-club dans Prismic. */
export default function LeClubPage() {
  return (
    <PrismicPage uid="le-club" />
  );
}
