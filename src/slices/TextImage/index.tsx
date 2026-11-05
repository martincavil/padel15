import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Phone, UtensilsCrossed, ExternalLink } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Title, Text } from "@/components/prismic/RichText";
import { linkHref } from "@/lib/prismic-links";
import { Badge, Buttons, Contained, type SliceContext } from "../shared";
import { VerticalVideo } from "./VerticalVideo";

type Props = SliceComponentProps<Content.TextImageSlice, SliceContext>;

/** Texte + photo / trois photos / vidéo verticale. */
export default function TextImage(props: Props) {
  const { slice } = props;
  if (slice.variation === "photoMosaic") return <PhotoMosaic slice={slice} />;
  if (slice.variation === "video") return <Video slice={slice} />;
  return <WithImage {...props} slice={slice} />;
}

function WithImage({ slice, index, slices, context }: Props & { slice: Content.TextImageSliceDefault }) {
  const p = slice.primary;
  const portrait = p.image_format === "Portrait";
  const imageLeft = p.image_position === "Gauche";
  return (
    <Contained index={index} slices={slices} context={context} id={p.anchor}>
      <AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={imageLeft ? "lg:order-2" : undefined}>
            <Badge className="mb-4">{p.badge}</Badge>
            <Title field={p.title} className="font-buzz mb-4" />
            <Text
              field={p.body}
              className="space-y-4 text-gray-700 leading-relaxed"
              paragraphClassName="text-gray-700 leading-relaxed"
              listClassName="space-y-3 text-gray-700"
            />
            <Buttons
              items={p.buttons}
              className="mt-8 flex flex-col sm:flex-row gap-3"
              classes={{
                "Orange (principal)": "bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block text-center",
                Contour: "border border-gray-300 hover:border-brand text-gray-700 hover:text-brand font-semibold px-6 py-3 rounded-lg transition-colors inline-block text-center",
                "Lien texte": "text-brand hover:underline font-medium",
              }}
            />
          </div>
          {portrait ? (
            <div className={`relative aspect-[2/3] w-full max-w-sm mx-auto ${imageLeft ? "lg:ml-0 lg:order-1" : "lg:mr-0"} rounded-2xl overflow-hidden shadow-xl`}>
              <PrismicNextImage field={p.image} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 384px" />
            </div>
          ) : (
            <div className={`relative h-80 rounded-2xl overflow-hidden shadow-lg ${imageLeft ? "lg:order-1" : ""}`}>
              <PrismicNextImage field={p.image} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          )}
        </div>
      </AnimatedSection>
    </Contained>
  );
}

function PhotoMosaic({ slice }: { slice: Content.TextImageSlicePhotoMosaic }) {
  const p = slice.primary;
  const img = "object-cover object-center hover:scale-105 transition-transform duration-700";
  return (
    <section id={p.anchor || undefined} className="py-16 bg-gray-50 scroll-mt-28">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="grid grid-cols-2 grid-rows-2 gap-3 h-[480px]">
              <div className="relative rounded-2xl overflow-hidden row-span-2">
                <PrismicNextImage field={p.image_large} fill className={img} sizes="(max-width: 1024px) 50vw, 25vw" />
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <PrismicNextImage field={p.image_top} fill className={img} sizes="(max-width: 1024px) 50vw, 20vw" />
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <PrismicNextImage field={p.image_bottom} fill className={img} sizes="(max-width: 1024px) 50vw, 20vw" />
              </div>
            </div>
            <div>
              <Badge className="mb-4">{p.badge}</Badge>
              <Title field={p.title} className="font-buzz mb-4" />
              <Text field={p.body} paragraphClassName="text-gray-600 leading-relaxed mb-6" />
              {/* Boutons pleins et contour côte à côte, liens texte en dessous. */}
              <Buttons
                items={p.buttons.filter((b) => b.style !== "Lien texte")}
                className="flex flex-col sm:flex-row gap-3 mb-6"
                icon={(href) => href.startsWith("tel:") ? <Phone className="w-4 h-4" />
                  : /canva|\.pdf/i.test(href) ? <UtensilsCrossed className="w-4 h-4" /> : null}
                classes={{
                  "Orange (principal)": "inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm",
                  Contour: "inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-brand text-gray-700 hover:text-brand font-semibold px-5 py-3 rounded-xl transition-colors text-sm",
                }}
              />
              {p.buttons.filter((b) => b.style === "Lien texte").map((b, i) => (
                <a key={i} href={linkHref(b.link)} className="inline-flex items-center gap-1.5 text-sm text-brand hover:underline font-medium">
                  {"text" in b.link ? b.link.text : null}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Video({ slice }: { slice: Content.TextImageSliceVideo }) {
  const p = slice.primary;
  return (
    <section id={p.anchor || undefined} className="py-24 bg-white overflow-hidden scroll-mt-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <Badge className="mb-5">{p.badge}</Badge>
            <Title field={p.title} className="font-buzz text-gray-900 leading-tight mb-6" />
            <Text field={p.body} paragraphClassName="text-gray-500 text-lg leading-relaxed mb-8 max-w-md mx-auto lg:mx-0" />
            <Buttons
              items={p.buttons}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              classes={{
                "Orange (principal)": "bg-brand hover:bg-brand-dark text-white font-semibold px-7 py-4 rounded-xl transition-colors shadow-lg shadow-brand/20",
                Contour: "border border-gray-200 hover:border-gray-400 text-gray-700 font-medium px-7 py-4 rounded-xl transition-colors",
                "Lien texte": "text-brand hover:underline font-medium px-2 py-4",
              }}
            />
            {p.stats.length > 0 && (
              <div className="flex gap-8 justify-center lg:justify-start mt-10">
                {p.stats.map((s, i) => (
                  <div key={i}>
                    <p className="font-buzz text-2xl">{s.value}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <VerticalVideo
              src={linkHref(p.video_url)}
              poster={p.poster.url ?? undefined}
              cornerLabel={p.corner_label ?? undefined}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
