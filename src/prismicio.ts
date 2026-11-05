import {
  createClient as baseCreateClient,
  type ClientConfig,
} from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import prismicConfig from "../prismic.config.json";

/**
 * Dépôt Prismic propre à padel15.fr. Chaque site du client a son propre
 * dépôt, tous sur le même compte Prismic.
 *
 * Tant que `repositoryName` est vide dans `prismic.config.json`, le site ne
 * contacte jamais Prismic : pas de barre d'aperçu, et /api/preview et
 * /api/exit-preview répondent 404.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || prismicConfig.repositoryName;

export const isPrismicConfigured = repositoryName !== "";

/**
 * Client Prismic. En production, les réponses sont mises en cache sous
 * l'étiquette « prismic », vidée par le webhook de publication
 * (`src/app/api/revalidate/route.ts`). En développement, elles sont relues
 * toutes les 5 secondes.
 */
export const createClient = (config: ClientConfig = {}) => {
  const client = baseCreateClient(repositoryName, {
    routes: prismicConfig.routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
};
