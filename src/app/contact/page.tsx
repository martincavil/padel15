import { PrismicPage, pageMetadata } from "@/lib/prismic-pages";

export const generateMetadata = () => pageMetadata("contact");

/** Contenu : document « Page » contact dans Prismic. */
export default function ContactPage() {
  return (
    <PrismicPage uid="contact" />
  );
}
