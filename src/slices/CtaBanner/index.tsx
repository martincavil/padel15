import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { ArrowRight, Phone } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Title, Text } from "@/components/prismic/RichText";
import { Buttons, Contained, type SliceContext } from "../shared";

type Props = SliceComponentProps<Content.CtaBannerSlice, SliceContext>;

/** Encadré d'appel à l'action : simple, noir ou sur photo. */
export default function CtaBanner(props: Props) {
  const { slice } = props;
  return (
    <Contained {...props}>
      <AnimatedSection>
        {slice.variation === "dark" ? <Dark slice={slice} />
          : slice.variation === "image" ? <OnImage slice={slice} />
          : <Simple slice={slice} />}
      </AnimatedSection>
    </Contained>
  );
}

function Simple({ slice }: { slice: Content.CtaBannerSliceDefault }) {
  const p = slice.primary;
  return (
    <div className="text-center">
      <Title field={p.title} className="font-buzz mb-4" />
      <Text field={p.text} paragraphClassName="text-gray-600 mb-6" />
      <Buttons
        items={p.buttons}
        className="flex flex-col sm:flex-row gap-3 justify-center"
        classes={{
          "Orange (principal)": "bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors",
          Contour: "border border-gray-300 hover:border-brand text-gray-700 hover:text-brand font-semibold px-6 py-3 rounded-lg transition-colors",
          "Lien texte": "text-brand hover:underline font-semibold px-6 py-3",
        }}
      />
    </div>
  );
}

function Dark({ slice }: { slice: Content.CtaBannerSliceDark }) {
  const p = slice.primary;
  return (
    <div className="bg-black rounded-2xl p-8 text-white">
      <Title field={p.title} className="font-buzz mb-2" />
      <Text field={p.text} paragraphClassName="text-gray-400 mb-4" />
      <Buttons
        items={p.buttons}
        className="flex flex-wrap gap-3"
        classes={{
          "Orange (principal)": "bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block",
          Contour: "border border-white/30 hover:border-white text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block",
          "Lien texte": "text-brand hover:underline font-semibold py-3",
        }}
      />
    </div>
  );
}

function OnImage({ slice }: { slice: Content.CtaBannerSliceImage }) {
  const p = slice.primary;
  return (
    <div className="relative rounded-2xl overflow-hidden">
      <div className="absolute inset-0">
        <PrismicNextImage field={p.image} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 1024px" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-brand-dark/30" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent z-20" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent z-20" />
      <div className="absolute w-40 h-40 rounded-full border border-brand/20 top-[-20px] left-[-20px] z-10" style={{ animation: "float1 9s ease-in-out infinite" }} />
      <div className="absolute w-24 h-24 rounded-full border border-white/10 bottom-[-10px] right-10 z-10" style={{ animation: "float2 7s ease-in-out 1s infinite" }} />
      <div className="relative z-20 px-6 py-14 sm:px-12 sm:py-16 text-center">
        {p.badge && (
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-brand/20 text-brand border border-brand/30 mb-5">{p.badge}</span>
        )}
        <Title field={p.title} className="font-buzz text-white mb-3" />
        {p.subtitle && <p className="text-gray-200 max-w-lg mx-auto mb-2 text-lg">{p.subtitle}</p>}
        <Text field={p.text} paragraphClassName="text-gray-400 max-w-md mx-auto mb-8 text-sm" />
        <Buttons
          items={p.buttons}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          icon={(href) => href.startsWith("tel:") ? <Phone className="w-4 h-4" /> : null}
          trailing={(href, style) => style === "Orange (principal)" && !href.startsWith("tel:") ? <ArrowRight className="w-4 h-4" /> : null}
          classes={{
            "Orange (principal)": "inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors",
            Contour: "inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-xl transition-colors backdrop-blur-sm",
            "Lien texte": "inline-flex items-center gap-2 text-white hover:text-brand font-semibold px-6 py-3",
          }}
        />
      </div>
    </div>
  );
}
