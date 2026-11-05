import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { LightboxGallery } from "@/components/shared/LightboxGallery";
import { Title } from "@/components/prismic/RichText";
import { Contained, type SliceContext } from "../shared";

type Props = SliceComponentProps<Content.GallerySlice, SliceContext>;

/** Galerie agrandissable ou photos légendées. */
export default function Gallery(props: Props) {
  const { slice } = props;
  if (slice.variation === "captioned") {
    return (
      <Contained {...props}>
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {slice.primary.images.map((photo, i) => (
              <div key={i} className="relative h-64 rounded-2xl overflow-hidden group">
                <PrismicNextImage field={photo.image} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold text-sm">{photo.label}</p>
                  <p className="text-white/70 text-xs">{photo.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </Contained>
    );
  }
  const p = slice.primary;
  const images = p.images
    .filter((i) => i.image.url)
    .map((i) => ({ src: i.image.url as string, alt: i.image.alt ?? "" }));
  const columns = Number(p.columns ?? 3) as 2 | 3 | 4;
  return (
    <Contained {...props}>
      <AnimatedSection>
        <Title field={p.title} className="font-buzz mb-6" />
        <LightboxGallery images={images} columns={columns} />
      </AnimatedSection>
    </Contained>
  );
}
