import type { NextRequest } from "next/server";
import { redirectToPreviewURL } from "@prismicio/next";
import { createClient, isPrismicConfigured } from "@/prismicio";

/**
 * Point d'entrée des aperçus Prismic : le bouton « Aperçu » de Prismic ouvre
 * cette adresse, qui active le mode brouillon puis redirige vers la page du
 * document.
 */
export async function GET(request: NextRequest) {
  if (!isPrismicConfigured) return new Response(null, { status: 404 });

  const client = createClient();

  return await redirectToPreviewURL({ client, request });
}
