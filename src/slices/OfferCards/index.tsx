import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Title, Text } from "@/components/prismic/RichText";
import { Icon } from "@/components/prismic/icons";
import { Contained, type SliceContext } from "../shared";

type Props = SliceComponentProps<Content.OfferCardsSlice, SliceContext>;

/** Cartes de formules (Événements) ou de services (Restaurant). */
export default function OfferCards(props: Props) {
  const { slice } = props;
  return (
    <Contained {...props}>
      {slice.variation === "simple" ? <Simple slice={slice} /> : <Detailed slice={slice} />}
    </Contained>
  );
}

function Simple({ slice }: { slice: Content.OfferCardsSliceSimple }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {slice.primary.items.map((card, i) => (
        <AnimatedSection key={i} delay={i * 0.1}>
          <div className="bg-gray-50 rounded-2xl p-6 h-full">
            <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center mb-3">
              <Icon name={card.icon} className="w-5 h-5 text-brand" />
            </div>
            <h3 className="font-semibold mb-3">{card.title}</h3>
            <Text
              field={card.includes}
              listClassName="space-y-1.5 text-gray-600 text-sm"
              itemClassName="flex items-center gap-2"
              checkClassName="w-3.5 h-3.5 text-brand flex-shrink-0"
            />
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}

function Detailed({ slice }: { slice: Content.OfferCardsSliceDefault }) {
  const p = slice.primary;
  return (
    <div>
      {(p.title.length > 0 || p.intro.length > 0) && (
        <div className="text-center mb-10">
          <Title field={p.title} className="font-buzz mb-3" />
          <Text field={p.intro} paragraphClassName="text-gray-500 max-w-lg mx-auto" />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {p.items.map((f, i) => (
          <AnimatedSection delay={i * 0.1} key={i} className="h-full">
            <div className="border border-gray-200 rounded-2xl p-6 hover:border-brand transition-colors h-full flex flex-col">
              <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center mb-3">
                <Icon name={f.icon} className="w-5 h-5 text-brand" />
              </div>
              <h3 className="font-semibold mb-1">{f.title}</h3>
              {f.subtitle && <p className="text-brand text-xs font-semibold mb-3">{f.subtitle}</p>}
              <Text field={f.description} className="text-gray-600 text-sm mb-4 leading-relaxed flex-1 space-y-4" />
              <Text
                field={f.includes}
                listClassName="space-y-1.5"
                itemClassName="flex items-center gap-2 text-sm text-gray-700"
              />
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
