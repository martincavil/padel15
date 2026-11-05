import { LegalPage, legalPageMetadata } from "@/lib/prismic-pages";

export const generateMetadata = () => legalPageMetadata("confidentialite");

/** Contenu : document « Page légale » confidentialite dans Prismic. */
export default function ConfidentialitePage() {
  return <LegalPage uid="confidentialite" />;
}
