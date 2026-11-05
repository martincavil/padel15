import type { ImageLoaderProps } from "next/image";

/**
 * Images Prismic (images.prismic.io) : redimensionnées par Prismic (imgix)
 * plutôt que par Vercel, pour ne pas consommer le quota d'optimisation.
 */
export function prismicImageLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set("auto", "format,compress");
  url.searchParams.set("fit", "max");
  url.searchParams.set("w", String(width));
  if (quality) url.searchParams.set("q", String(quality));
  return url.toString();
}

/** Loader à passer à next/image selon l'origine de l'image. */
export const loaderFor = (src: string) => (src.includes("images.prismic.io") ? prismicImageLoader : undefined);
