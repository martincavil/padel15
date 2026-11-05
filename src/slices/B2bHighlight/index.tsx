import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { EventRequestForm } from "@/components/evenements/EventRequestForm";
import { Title, Text } from "@/components/prismic/RichText";
import { Icon } from "@/components/prismic/icons";
import type { SliceContext } from "../shared";

type Props = SliceComponentProps<Content.B2bHighlightSlice, SliceContext>;

/** Team Building & Événements (accueil) : cartes, témoignage et formulaire. */
export default function B2bHighlight({ slice }: Props) {
  const p = slice.primary;
  return (
    <section className="relative py-24 overflow-hidden">
      <PrismicNextImage field={p.background} fill className="object-cover" sizes="100vw" quality={72} alt="" />
      <div className="absolute inset-0 bg-black/75 z-10" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent z-20" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent z-20" />

      <div className="relative z-20 container mx-auto px-4">
        <div className="text-center mb-12">
          {p.badge && (
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-brand/20 text-brand border border-brand/30 mb-4">{p.badge}</span>
          )}
          <Title field={p.title} className="font-buzz text-white mb-4" />
          <Text field={p.intro} paragraphClassName="text-gray-300 max-w-xl mx-auto text-lg" />
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {p.cards.map((card, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center mb-5">
                <Icon name={card.icon} className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-white font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

        {p.quote && (
          <div className="max-w-xl mx-auto text-center mb-10 bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-white/90 italic text-base mb-3">&ldquo;{p.quote}&rdquo;</p>
            <p className="text-brand text-sm font-semibold">
              {[p.quote_author, p.quote_company].filter(Boolean).join(" — ")}
            </p>
          </div>
        )}

        {p.show_form && (
          <div id="demande-accueil" className="scroll-mt-28">
            <EventRequestForm tone="dark" />
          </div>
        )}
      </div>
    </section>
  );
}
