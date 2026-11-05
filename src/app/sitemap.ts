import type { MetadataRoute } from "next";
import { createClient } from "@/prismicio";
import { SITE_URL } from "@/lib/site";

/** Priorité par page (les pages ajoutées dans Prismic prennent 0,6). */
const PRIORITY: Record<string, number> = {
  "/": 1.0,
  "/terrains": 0.9,
  "/restaurant": 0.9,
  "/evenements": 0.9,
  "/coaching": 0.8,
  "/tarifs": 0.8,
  "/le-club": 0.7,
  "/contact": 0.7,
};

/**
 * Plan du site tiré de Prismic : accueil, pages et pages légales indexables
 * (celles marquées « Masquer de Google » sont exclues). La date de
 * modification est celle de la dernière publication.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();
  const [home, pages, legal] = await Promise.all([
    client.getSingle("homepage"),
    client.getAllByType("page"),
    client.getAllByType("legal_page"),
  ]);
  const entries = [
    { path: "/", date: home.last_publication_date },
    ...pages.map((p) => ({ path: `/${p.uid}`, date: p.last_publication_date })),
    ...legal.filter((p) => !p.data.noindex).map((p) => ({ path: `/${p.uid}`, date: p.last_publication_date })),
  ];
  const priority = (path: string) => PRIORITY[path] ?? 0.6;
  entries.sort((a, b) => priority(b.path) - priority(a.path));
  return entries.map(({ path, date }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: new Date(date),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: priority(path),
  }));
}
