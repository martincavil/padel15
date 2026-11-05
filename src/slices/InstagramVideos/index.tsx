import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { InstagramSection } from "@/components/homepage/InstagramSection";
import { Title } from "@/components/prismic/RichText";
import { linkHref } from "@/lib/prismic-links";
import type { SliceContext } from "../shared";

type Props = SliceComponentProps<Content.InstagramVideosSlice, SliceContext>;

/** Colonnes de vidéos Instagram qui défilent. */
export default function InstagramVideos({ slice, context }: Props) {
  const p = slice.primary;
  const videos = p.videos.map((v) => ({
    src: linkHref(v.video_url),
    poster: v.poster.url ?? undefined,
    column: v.column,
  })).filter((v) => v.src);
  return (
    <InstagramSection
      title={<Title field={p.title} className="font-buzz mb-1" />}
      handle={p.handle ?? ""}
      instagramUrl={context.settings.instagramUrl}
      left={videos.filter((v) => v.column !== "Droite")}
      right={videos.filter((v) => v.column === "Droite")}
    />
  );
}
