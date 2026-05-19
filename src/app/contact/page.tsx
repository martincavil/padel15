import type { Metadata } from "next";
import Contact from "@/components/Contact";
import { CTANewsletter } from "@/components/shared/CTANewsletter";

export const metadata: Metadata = {
  title: "Contact & Accès | Padel 15 — 115 rue Castagnary Paris 15",
  description:
    "Contactez Padel 15 : 115 rue Castagnary, 75015 Paris. Tél : +33 1 45 31 58 76. Email : contact@padel15.fr. Plan d'accès Google Maps.",
};

export default function ContactPage() {
  return (
    <>
      <div className="pt-28 pb-8 bg-black text-white text-center px-4">
        <h1 className="font-buzz text-4xl md:text-6xl mb-4">Contact &amp; Accès</h1>
        <p className="text-gray-300 max-w-lg mx-auto">
          115 rue Castagnary, 75015 Paris — 7j/7, 8h à 22h
        </p>
      </div>
      <div className="pt-8">
        <Contact />
      </div>
      <CTANewsletter />
    </>
  );
}
