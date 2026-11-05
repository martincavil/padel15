/**
 * Petits outils pour écrire le contenu Prismic à la main (migration).
 *
 * Texte enrichi : `**gras**`, `*italique*`, `[texte](https://…)`, une ligne
 * vide sépare deux paragraphes, `\n` simple = retour à la ligne.
 */

export const SITE = "https://www.padel15.fr";

/** Spans Prismic à partir de **gras**, *italique* et [lien](url). */
function parseInline(source) {
  let text = "";
  const spans = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)/gs;
  let last = 0;
  for (const m of source.matchAll(re)) {
    text += source.slice(last, m.index);
    const start = text.length;
    if (m[1] !== undefined) { text += m[1]; spans.push({ type: "strong", start, end: text.length }); }
    else if (m[2] !== undefined) { text += m[2]; spans.push({ type: "em", start, end: text.length }); }
    else {
      text += m[3];
      const url = m[4].startsWith("/") ? SITE + m[4] : m[4];
      const data = { link_type: "Web", url };
      if (/^https?:/.test(url) && !url.startsWith(SITE)) data.target = "_blank";
      spans.push({ type: "hyperlink", start, end: text.length, data });
    }
    last = m.index + m[0].length;
  }
  text += source.slice(last);
  return { text, spans };
}

const block = (type, source) => ({ type, ...parseInline(source), direction: "ltr" });

/** Paragraphes (séparés par une ligne vide). */
export const rt = (source) => source.trim().split(/\n\s*\n/).map((p) => block("paragraph", p.trim()));

/** Un titre (champ « single »). Le gras s'affiche en orange. */
export const heading = (source, level = "heading2") => [block(level, source)];

/** Liste à puces. */
export const list = (...items) => items.map((i) => block("list-item", i));

/** Contenu libre : suite de blocs déjà construits. */
export const blocks = (...parts) => parts.flat();
export const h2 = (source) => block("heading2", source);
export const p = (source) => block("paragraph", source);

/** Image du dossier public/, envoyée dans la médiathèque à la migration. */
export const img = (publicPath, alt = "") => ({ __asset: publicPath, alt });

/** Lien avec texte (bouton). Les chemins /… visent le site. */
export function link(url, text, { blank } = {}) {
  const full = url.startsWith("/") ? SITE + url : url;
  const value = { link_type: "Web", url: full };
  if (blank ?? (/^https?:/.test(full) && !full.startsWith(SITE))) value.target = "_blank";
  if (text !== undefined) value.text = text;
  return value;
}

export const button = (url, text, style = "Orange (principal)") => ({ link: link(url, text), style });
export const outline = (url, text) => button(url, text, "Contour");
export const textLink = (url, text) => button(url, text, "Lien texte");

/** Une section (slice). */
export const slice = (slice_type, variation, primary) => ({ slice_type, variation, primary, items: [] });
