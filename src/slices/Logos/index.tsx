import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Title } from "@/components/prismic/RichText";
import { SiteLink } from "@/components/prismic/SiteLink";
import { Badge, type SliceContext } from "../shared";

type Props = SliceComponentProps<Content.LogosSlice, SliceContext>;

/** Partenaires (cartes) ou clients (logos qui défilent). */
export default function Logos({ slice }: Props) {
  return slice.variation === "marquee" ? <Marquee slice={slice} /> : <Partners slice={slice} />;
}

function Partners({ slice }: { slice: Content.LogosSlicePartners }) {
  const p = slice.primary;
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-10">
            <Badge className="mb-4">{p.badge}</Badge>
            <Title field={p.title} className="font-buzz" />
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {p.items.map((partner, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <SiteLink
                field={partner.link}
                className="h-full group block border border-gray-200 rounded-2xl p-8 hover:border-brand hover:shadow-md transition-all text-center"
              >
                <div className="h-20 flex items-center justify-center mb-5">
                  {partner.logo.url ? (
                    <PrismicNextImage
                      field={partner.logo}
                      width={200}
                      height={80}
                      className="max-h-14 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <span className="font-buzz text-4xl text-gray-300 group-hover:text-brand transition-colors">{partner.name}</span>
                  )}
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-brand transition-colors">{partner.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{partner.description}</p>
              </SiteLink>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee({ slice }: { slice: Content.LogosSliceMarquee }) {
  const p = slice.primary;
  const rows = [
    { items: p.items.filter((c) => c.row !== "2"), anim: "animate-scroll-left", className: "relative mb-8" },
    { items: p.items.filter((c) => c.row === "2"), anim: "animate-scroll-right", className: "relative" },
  ].filter((r) => r.items.length);
  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="container mx-auto mb-12">
        <Title field={p.title} className="font-bold text-center text-brand-dark" />
      </div>
      {rows.map((row, r) => (
        <div key={r} className={row.className}>
          <div className={`flex ${row.anim}`}>
            {[...row.items, ...row.items].map((client, i) => (
              <div key={i} className="flex-shrink-0 mx-6 md:mx-8">
                <div className="w-32 h-20 md:w-40 md:h-24 flex items-center justify-center">
                  <PrismicNextImage
                    field={client.logo}
                    width={160}
                    height={80}
                    className="max-h-16 md:max-h-20 w-auto object-contain grayscale opacity-70 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
