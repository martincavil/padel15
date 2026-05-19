import Image from "next/image";
import { Instagram } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const POSTS = [
  { src: "/terrain-ext-nuit.webp", alt: "Terrain extérieur de nuit" },
  { src: "/guinguette.webp", alt: "Terrasse guinguette" },
  { src: "/terrain-inte-game.webp", alt: "Match en cours" },
  { src: "/restau-diner.webp", alt: "Ambiance restaurant" },
  { src: "/rest-inte-bar.jpg", alt: "Bar Padel 15" },
  { src: "/terrain-ext-jour.webp", alt: "Terrain extérieur de jour" },
];

export function InstagramSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="font-buzz text-3xl md:text-4xl mb-1">Suivez-nous</h2>
              <a
                href="https://www.instagram.com/padel15club/?hl=fr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-brand hover:underline font-medium"
              >
                <Instagram className="w-4 h-4" />
                @padel15club
              </a>
            </div>
            <a
              href="https://www.instagram.com/padel15club/?hl=fr"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 border border-brand text-brand hover:bg-brand hover:text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
            >
              <Instagram className="w-4 h-4" />
              Voir le profil
            </a>
          </div>
        </AnimatedSection>

        {/* Photo grid */}
        <AnimatedSection>
          <a
            href="https://www.instagram.com/padel15club/?hl=fr"
            target="_blank"
            rel="noopener noreferrer"
            className="grid grid-cols-3 md:grid-cols-6 gap-2 group"
          >
            {POSTS.map((post, i) => (
              <div
                key={post.src}
                className={`relative overflow-hidden rounded-xl ${i === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"}`}
              >
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </a>
        </AnimatedSection>

        <div className="text-center mt-6 md:hidden">
          <a
            href="https://www.instagram.com/padel15club/?hl=fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-brand text-brand font-semibold px-5 py-2.5 rounded-xl text-sm"
          >
            <Instagram className="w-4 h-4" />
            Voir le profil Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
