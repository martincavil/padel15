import type { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import HeroBanner from "@/components/HeroBanner";
import { Title, Text } from "@/components/prismic/RichText";
import { fetchGoogleRating } from "@/lib/google-places";
import { createClient } from "@/prismicio";
import { getSettings, type NavLink } from "@/lib/settings";
import { resolveLink } from "@/lib/prismic-links";
import { seoMetadata } from "@/lib/prismic-pages";
import { components } from "@/slices";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await createClient().getSingle("homepage");
  return seoMetadata(data);
}

/** Contenu : document « Accueil » dans Prismic. */
export default async function HomePage() {
  const [home, settings, raw] = await Promise.all([
    createClient().getSingle("homepage"),
    getSettings(),
    fetchGoogleRating(),
  ]);
  const d = home.data;
  const googleRating = raw ? { rating: raw.rating, count: raw.userRatingCount } : undefined;
  const buttons = d.hero_buttons
    .map((b): NavLink | null => {
      const l = resolveLink(b.link);
      return l ? { href: l.href, label: l.text ?? "", internal: l.internal, newTab: l.newTab } : null;
    })
    .filter((b): b is NavLink => !!b);

  return (
    <>
      <HeroBanner
        googleRating={googleRating}
        titleDesktop={
          <Title field={d.hero_title} as="h1" inline className="font-buzz text-6xl xl:text-7xl text-white leading-none tracking-tight" />
        }
        titleMobile={<Title field={d.hero_title} as="h1" className="font-buzz text-5xl text-white leading-none" />}
        text={<Text field={d.hero_text} paragraphClassName="text-white/70" />}
        tagline={d.hero_tagline ?? ""}
        videoUrl={resolveLink(d.hero_video_url)?.href ?? ""}
        posterUrl={d.hero_poster.url ?? "/images/terrains/terrain-ext-jour.webp"}
        mainCta={buttons[0] ?? null}
        ctas={buttons.slice(1)}
        appStoreUrl={settings.appStoreUrl}
        googlePlayUrl={settings.googlePlayUrl}
      />
      <SliceZone slices={d.slices} components={components} context={{ settings }} />
    </>
  );
}
