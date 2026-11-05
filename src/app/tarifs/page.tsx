import { PrismicPage, pageMetadata } from "@/lib/prismic-pages";

export const generateMetadata = () => pageMetadata("tarifs");

/** Contenu : document « Page » tarifs dans Prismic. */
export default function TarifsPage() {
  return (
    <PrismicPage uid="tarifs" containerClassName="max-w-4xl" />
  );
}
