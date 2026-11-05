import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { Smartphone } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { BookingWidget } from "@/components/shared/BookingWidget";
import { Title, Text } from "@/components/prismic/RichText";
import { Icon } from "@/components/prismic/icons";
import { Badge, Buttons, Contained, type SliceContext } from "../shared";

type Props = SliceComponentProps<Content.FeatureGridSlice, SliceContext>;

/** Équipements, services, infos pratiques ou valeurs, avec icônes. */
export default function FeatureGrid(props: Props) {
  const { slice } = props;
  switch (slice.variation) {
    case "strip": return <Strip slice={slice} context={props.context} />;
    case "tiles": return <Tiles slice={slice} />;
    case "cards": return <Contained {...props}><Cards slice={slice} /></Contained>;
    case "list": return <Contained {...props}><List slice={slice} /></Contained>;
    case "bookingInfo": return <Contained {...props}><BookingInfo slice={slice} /></Contained>;
    case "values": return <Contained {...props}><Values slice={slice} /></Contained>;
  }
}

/** Bandeau noir sous la vidéo d'accueil. */
function Strip({ slice, context }: { slice: Content.FeatureGridSliceStrip; context: SliceContext }) {
  const p = slice.primary;
  const { appStoreUrl, googlePlayUrl } = context.settings;
  const badge = "flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3 py-2 rounded-lg transition-colors text-xs font-medium";
  return (
    <section className="bg-black py-10 border-b border-white/10">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-6">
              {p.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand/20 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.label}</p>
                    <p className="text-gray-400 text-xs">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Buttons
                items={p.buttons}
                classes={{
                  "Orange (principal)": "bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap",
                  Contour: "border border-white/30 hover:border-white text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap",
                  "Lien texte": "text-white hover:text-brand text-sm font-medium",
                }}
              />
              {p.show_app_badges && (
                <div className="flex lg:hidden gap-2">
                  <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" aria-label="Télécharger sur l'App Store" className={badge}>
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    App Store
                  </a>
                  <a href={googlePlayUrl} target="_blank" rel="noopener noreferrer" aria-label="Télécharger sur Google Play" className={badge}>
                    <Smartphone className="w-4 h-4" />
                    Google Play
                  </a>
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/** Ex. « Tout est prévu » (accueil). */
function Tiles({ slice }: { slice: Content.FeatureGridSliceTiles }) {
  const p = slice.primary;
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <Badge className="mb-4">{p.badge}</Badge>
            <Title field={p.title} className="font-buzz" />
            <Text field={p.intro} paragraphClassName="text-gray-500 mt-3 text-base max-w-xl mx-auto" />
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 max-w-5xl mx-auto">
            {p.items.map((item, i) => (
              <li key={i} className="flex flex-col items-center gap-3 bg-gray-50 hover:bg-brand/5 border border-gray-100 hover:border-brand/20 rounded-2xl p-5 text-center transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                  <Icon name={item.icon} className="w-6 h-6 text-brand" />
                </div>
                <span className="text-gray-700 text-sm font-medium leading-snug">{item.label}</span>
                {item.detail && <span className="text-gray-500 text-xs -mt-2">{item.detail}</span>}
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </div>
    </section>
  );
}

/** Ex. « Notre infrastructure » (Le Club). */
function Cards({ slice }: { slice: Content.FeatureGridSliceCards }) {
  const p = slice.primary;
  return (
    <AnimatedSection>
      <Title field={p.title} className="font-buzz mb-8 text-center" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {p.items.map((item, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-5 text-center hover:bg-brand/5 transition-colors">
            <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-2">
              <Icon name={item.icon} className="w-5 h-5 text-brand" />
            </div>
            <p className="font-semibold text-sm">{item.label}</p>
            <p className="text-gray-500 text-xs mt-1">{item.detail}</p>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}

/** Ex. « Équipements & Services » (Terrains). */
function List({ slice }: { slice: Content.FeatureGridSliceList }) {
  const p = slice.primary;
  return (
    <div className="bg-gray-50 rounded-2xl p-8">
      <Title field={p.title} className="font-buzz mb-6" />
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
        {p.items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <Icon name={item.icon} className="w-4 h-4 text-brand" />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Ex. « Réservez votre terrain » : infos à gauche, widget Playtomic à droite. */
function BookingInfo({ slice }: { slice: Content.FeatureGridSliceBookingInfo }) {
  const p = slice.primary;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <div>
        <Title field={p.title} className="font-buzz mb-6" />
        <div className="space-y-4 text-gray-700">
          {p.items.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <Icon name={item.icon} className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{item.label}</p>
                <Text field={item.detail} />
              </div>
            </div>
          ))}
        </div>
        <Buttons
          items={p.buttons}
          className="mt-8 flex flex-col sm:flex-row gap-3"
          classes={{
            "Orange (principal)": "bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-lg text-center transition-colors",
            Contour: "border border-brand text-brand hover:bg-brand hover:text-white font-semibold px-6 py-3 rounded-lg text-center transition-colors",
            "Lien texte": "text-brand hover:underline font-medium py-3",
          }}
        />
      </div>
      <div className="flex justify-center">
        <BookingWidget className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg" />
      </div>
    </div>
  );
}

const VALUE_COLORS: Record<string, string> = {
  Orange: "bg-orange-500/10 text-orange-500",
  Vert: "bg-green-600/10 text-green-600",
};

/** Ex. « Nos Valeurs » (Le Club). */
function Values({ slice }: { slice: Content.FeatureGridSliceValues }) {
  const p = slice.primary;
  return (
    <section id="values" className="py-10 bg-white">
      <Title field={p.title} className="font-buzz mb-4 font-bold text-[#FF6727]" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {p.items.map((value, i) => (
          <div className="text-center group" key={i}>
            <div className="mb-4 flex justify-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${VALUE_COLORS[value.color ?? "Orange"]}`}>
                <Icon name={value.icon} className="w-6 h-6" />
              </div>
            </div>
            <h3 className="font-semibold mb-2">{value.label}</h3>
            <div className="text-gray-600 text-sm">
              <Text field={value.detail} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
