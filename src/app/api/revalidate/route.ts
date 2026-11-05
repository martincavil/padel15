import { revalidateTag } from "next/cache";

/**
 * Appelé par le webhook Prismic à chaque publication ou dépublication : les
 * contenus Prismic en cache sont marqués périmés et chaque page se met à jour
 * à sa visite suivante.
 *
 * Le webhook envoie dans le corps le secret choisi à sa création. Il doit
 * correspondre à `PRISMIC_WEBHOOK_SECRET`, sinon n'importe qui pourrait vider
 * le cache. Si la variable manque, la route répond 503.
 */
export async function POST(request: Request) {
  const secret = process.env.PRISMIC_WEBHOOK_SECRET;
  if (!secret) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const body: unknown = await request.json().catch(() => null);
  const received =
    body && typeof body === "object" && "secret" in body
      ? body.secret
      : undefined;
  if (received !== secret) {
    return Response.json({ error: "invalid_secret" }, { status: 401 });
  }

  revalidateTag("prismic");

  return Response.json({ revalidated: true, now: Date.now() });
}
