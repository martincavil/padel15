import { exitPreview } from "@prismicio/next";
import { isPrismicConfigured } from "@/prismicio";

/** Quitte l'aperçu Prismic : appelé par la barre d'outils Prismic. */
export function GET() {
  if (!isPrismicConfigured) return new Response(null, { status: 404 });

  return exitPreview();
}
