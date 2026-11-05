import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { asText, isFilled, NotFoundError, type ImageField } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { DEFAULT_OG_IMAGE } from "@/lib/site";
import { getSettings } from "@/lib/settings";
import { components } from "@/slices";
import type { SliceContext } from "@/slices/shared";
import { PageHero } from "@/components/shared/PageHero";
import { Text } from "@/components/prismic/RichText";

type Seo = { meta_title: string | null; meta_description: string | null; meta_image: ImageField };

/**
 * Titre, description et image de partage saisis dans l'onglet SEO, avec
 * l'adresse canonique de la page. L'Open Graph reprend les valeurs du site
 * (nom, langue) pour ne pas les perdre quand une page définit son image.
 */
export function seoMetadata(data: Seo, path: string, extra: Metadata = {}): Metadata {
  const title = data.meta_title || undefined;
  const description = data.meta_description || undefined;
  return {
    ...extra,
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: "Padel 15",
      url: path,
      title,
      description,
      images: isFilled.image(data.meta_image)
        ? [{ url: data.meta_image.url, alt: data.meta_image.alt ?? undefined }]
        : [DEFAULT_OG_IMAGE],
    },
  };
}

async function byUID<T extends "page" | "legal_page">(type: T, uid: string) {
  try {
    return await createClient().getByUID(type, uid);
  } catch (error) {
    if (error instanceof NotFoundError) notFound();
    throw error;
  }
}

export const getPage = (uid: string) => byUID("page", uid);
export const getLegalPage = (uid: string) => byUID("legal_page", uid);

export async function pageMetadata(uid: string) {
  return seoMetadata((await getPage(uid)).data, `/${uid}`);
}

export async function legalPageMetadata(uid: string) {
  const { data } = await getLegalPage(uid);
  return seoMetadata(data, `/${uid}`, data.noindex ? { robots: { index: false } } : {});
}

/** Page Prismic (type « Page ») : bandeau puis sections. */
export async function PrismicPage({ uid, containerClassName }: { uid: string; containerClassName?: string }) {
  const [page, settings] = await Promise.all([getPage(uid), getSettings()]);
  const d = page.data;
  const context: SliceContext = { settings, containerClassName };
  return (
    <>
      <PageHero
        title={asText(d.title)}
        subtitle={d.subtitle ?? undefined}
        badge={d.badge ?? undefined}
        imageSrc={d.hero_image.url ?? undefined}
        imageAlt={d.hero_image.alt ?? undefined}
        height="lg"
      />
      <SliceZone slices={d.slices} components={components} context={context} />
    </>
  );
}

/** Page légale : titre et texte. */
export async function LegalPage({ uid }: { uid: string }) {
  const { data } = await getLegalPage(uid);
  return (
    <div className="pt-24 pb-16 container mx-auto px-4 max-w-3xl">
      <h1 className="font-buzz text-4xl mb-8">{asText(data.title)}</h1>
      <Text
        field={data.content}
        className="prose prose-gray max-w-none text-gray-700 space-y-1 [&>h2]:mt-8 [&>h2:first-child]:mt-0 [&>p+p]:mt-1 [&>ul]:mb-4"
        listClassName="list-none space-y-1 mt-2"
        itemClassName=""
        checks={false}
      />
    </div>
  );
}
