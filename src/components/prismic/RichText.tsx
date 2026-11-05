import { PrismicRichText, type RichTextComponents } from "@prismicio/react";
import { isFilled, type RichTextField } from "@prismicio/client";
import { Check } from "lucide-react";
import Link from "next/link";
import type { ElementType } from "react";
import { resolveLink } from "@/lib/prismic-links";

const hyperlink: RichTextComponents["hyperlink"] = ({ node, children }) => {
  const link = resolveLink(node.data);
  if (!link) return <>{children}</>;
  const className = "text-brand hover:underline";
  return link.internal ? (
    <Link href={link.href} className={className}>{children}</Link>
  ) : (
    <a href={link.href} className={className} {...(link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
};

/**
 * Titre Prismic : le texte en gras s'affiche en orange.
 * `inline` remplace les retours à la ligne par des espaces (ex. titre sur une
 * seule ligne sur ordinateur).
 */
export function Title({
  field, as: Tag = "h2", className, highlightClassName = "text-brand", inline = false,
}: {
  field: RichTextField | null | undefined;
  as?: ElementType;
  className?: string;
  highlightClassName?: string;
  inline?: boolean;
}) {
  if (!isFilled.richText(field)) return null;
  const value = inline
    ? (field.map((b) => ("text" in b ? { ...b, text: b.text.replace(/\n/g, " ") } : b)) as RichTextField)
    : field;
  const block = ({ children }: { children: React.ReactNode }) => <Tag className={className}>{children}</Tag>;
  return (
    <PrismicRichText
      field={value}
      components={{
        heading1: block, heading2: block, heading3: block, paragraph: block,
        strong: ({ children }) => <span className={highlightClassName}>{children}</span>,
      }}
    />
  );
}

/**
 * Texte enrichi. Les listes à puces s'affichent avec des coches orange
 * (`checks`) ou en liste simple.
 */
export function Text({
  field, className, paragraphClassName, listClassName = "space-y-3", itemClassName = "flex items-center gap-3",
  checkClassName = "w-4 h-4 text-brand flex-shrink-0", checkBadgeClassName, checks = true,
}: {
  field: RichTextField | null | undefined;
  className?: string;
  paragraphClassName?: string;
  listClassName?: string;
  itemClassName?: string;
  checkClassName?: string;
  /** Pastille autour de la coche (ex. rond orange clair). */
  checkBadgeClassName?: string;
  checks?: boolean;
}) {
  if (!isFilled.richText(field)) return null;
  const rendered = (
    <PrismicRichText
      field={field}
      components={{
        paragraph: ({ children }) => <p className={paragraphClassName}>{children}</p>,
        heading2: ({ children }) => <h2 className="font-semibold text-gray-900 mb-3">{children}</h2>,
        heading3: ({ children }) => <h3 className="font-semibold text-gray-900 mb-2">{children}</h3>,
        list: ({ children }) => <ul className={listClassName}>{children}</ul>,
        oList: ({ children }) => <ol className={`list-decimal list-inside ${listClassName}`}>{children}</ol>,
        listItem: ({ children }) => {
          if (!checks) return <li className={itemClassName}>{children}</li>;
          const check = <Check className={checkClassName} />;
          return (
            <li className={itemClassName}>
              {checkBadgeClassName ? <span className={checkBadgeClassName}>{check}</span> : check}
              <span>{children}</span>
            </li>
          );
        },
        hyperlink,
      }}
    />
  );
  return className ? <div className={className}>{rendered}</div> : rendered;
}

/** Texte brut d'un champ (ex. pour un attribut alt ou un titre de page). */
export { asText } from "@prismicio/client";
