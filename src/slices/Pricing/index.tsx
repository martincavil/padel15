import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { CalendarDays } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Title, Text } from "@/components/prismic/RichText";
import { Badge, Buttons, Contained, type SliceContext } from "../shared";

type Props = SliceComponentProps<Content.PricingSlice, SliceContext>;

/** Grille de prix des terrains, aperçu de l'accueil ou liste de formules. */
export default function Pricing(props: Props) {
  const { slice } = props;
  if (slice.variation === "compact") return <Compact slice={slice} />;
  return (
    <Contained {...props}>
      <AnimatedSection>
        {slice.variation === "list" ? <List slice={slice} /> : <Cards slice={slice} />}
      </AnimatedSection>
    </Contained>
  );
}

function Cards({ slice }: { slice: Content.PricingSliceCards }) {
  const p = slice.primary;
  return (
    <div>
      <Badge className="mb-4">{p.badge}</Badge>
      <Title field={p.title} className="font-buzz mb-2" />
      <Text field={p.intro} paragraphClassName="text-gray-500 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {p.items.map((t, i) => (
          <div key={i} className={`rounded-2xl p-8 border-2 ${t.highlight ? "border-brand bg-brand/5" : "border-gray-200"}`}>
            {t.highlight && t.highlight_label && (
              <span className="text-xs font-semibold text-brand uppercase tracking-wider">{t.highlight_label}</span>
            )}
            <h3 className="font-semibold mt-1 mb-1">{t.label}</h3>
            <p className="text-gray-500 text-sm mb-4">{t.detail}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">{t.price}</span>
              <span className="text-gray-500 text-sm">{t.unit}</span>
            </div>
          </div>
        ))}
      </div>
      {p.note.length > 0 && (
        <div className="text-gray-500 text-sm mt-4 flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-brand flex-shrink-0" />
          <Text field={p.note} />
        </div>
      )}
      <Buttons
        items={p.buttons}
        className="mt-6 flex flex-wrap gap-3"
        classes={{
          "Orange (principal)": "bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block",
          Contour: "border border-brand text-brand hover:bg-brand hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block",
          "Lien texte": "text-brand hover:underline font-medium py-3",
        }}
      />
    </div>
  );
}

function List({ slice }: { slice: Content.PricingSliceList }) {
  const p = slice.primary;
  return (
    <div>
      <Title field={p.title} className="font-buzz mb-2" />
      <Text field={p.intro} paragraphClassName="text-gray-500 mb-6" />
      <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden">
        {p.items.map((t, i) => (
          <div key={i} className="flex items-center justify-between p-5 bg-white hover:bg-gray-50">
            <div>
              <p className="font-semibold">{t.label}</p>
              <p className="text-gray-500 text-sm">{t.detail}</p>
            </div>
            <span className="font-semibold text-brand">{t.price}</span>
          </div>
        ))}
      </div>
      <Buttons
        items={p.buttons}
        className="mt-6 flex flex-wrap gap-3"
        classes={{
          "Orange (principal)": "bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block",
          Contour: "border border-brand text-brand hover:bg-brand hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block",
          "Lien texte": "text-brand hover:underline font-medium py-3",
        }}
      />
    </div>
  );
}

/** Ex. « Jouez à votre rythme » (accueil). */
function Compact({ slice }: { slice: Content.PricingSliceCompact }) {
  const p = slice.primary;
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto text-center mb-8">
            <Badge className="mb-4">{p.badge}</Badge>
            <Title field={p.title} className="font-buzz" />
          </div>
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {p.items.map((t, i) => (
                <div key={i} className={`border-2 rounded-2xl p-5 ${t.highlight ? "border-brand bg-brand/5" : "border-gray-200"}`}>
                  <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${t.highlight ? "text-brand" : "text-gray-400"}`}>{t.label}</p>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="font-buzz text-3xl">{t.price}</span>
                    <span className="text-gray-400 text-sm">{t.unit}</span>
                  </div>
                  <p className="text-gray-500 text-xs">{t.detail}</p>
                </div>
              ))}
            </div>
            <Text field={p.note} paragraphClassName="text-gray-500 text-sm mb-6" />
            <Buttons
              items={p.buttons}
              className="flex flex-wrap justify-center gap-3"
              classes={{
                "Orange (principal)": "inline-block bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm",
                Contour: "inline-block border border-brand text-brand hover:bg-brand hover:text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm",
                "Lien texte": "text-brand hover:underline font-medium text-sm",
              }}
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
