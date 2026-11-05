import { LegalPage, legalPageMetadata } from "@/lib/prismic-pages";

export const generateMetadata = () => legalPageMetadata("mentions-legales");

/** Contenu : document « Page légale » mentions-legales dans Prismic. */
export default function MentionsLegalesPage() {
  return <LegalPage uid="mentions-legales" />;
}
