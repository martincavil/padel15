import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { Text } from "@/components/prismic/RichText";
import { Contained, type SliceContext } from "../shared";

type Props = SliceComponentProps<Content.RichTextSlice, SliceContext>;

/** Texte libre : titres, paragraphes, listes, liens. */
export default function RichText(props: Props) {
  return (
    <Contained {...props}>
      <Text
        field={props.slice.primary.content}
        className="max-w-3xl space-y-4 text-gray-700 leading-relaxed"
        listClassName="list-disc list-inside space-y-1"
        itemClassName=""
        checks={false}
      />
    </Contained>
  );
}
