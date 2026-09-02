/**
 * Authentification à l'API tierce partie Playtomic.
 *
 * L'ancienne API (api.playtomic.io + x-api-key) a été fermée le 15/07/2026.
 * La nouvelle utilise OAuth : on échange client_id + secret contre un token
 * Bearer valable 1 h.
 *
 * Le token est mis en cache au niveau du module : sans ça, chaque visiteur
 * déclencherait un appel d'authentification et on brûlerait le quota
 * (400 requêtes / 10 min) en quelques dizaines de visites.
 */

export const PLAYTOMIC_API_BASE = "https://thirdparty.playtomic.io/api/v1";
export const TENANT_ID = "1191f8b5-ea25-4153-89fb-997b6ec5b053";

interface CachedToken {
  token: string;
  expiresAt: number;
}

let cached: CachedToken | null = null;
// Verrou : évite N appels d'auth simultanés quand plusieurs requêtes
// arrivent en même temps sur une instance froide.
let inFlight: Promise<string | null> | null = null;

// Marge de sécurité : on renouvelle 5 min avant l'expiration réelle.
const REFRESH_MARGIN_MS = 5 * 60 * 1000;

async function requestToken(): Promise<string | null> {
  const clientId = process.env.PLAYTOMIC_CLIENT_ID;
  const secret = process.env.PLAYTOMIC_SECRET;

  if (!clientId || !secret) {
    console.error(
      "[playtomic] PLAYTOMIC_CLIENT_ID ou PLAYTOMIC_SECRET manquant",
    );
    return null;
  }

  try {
    const res = await fetch(`${PLAYTOMIC_API_BASE}/oauth/token`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ client_id: clientId, secret }),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("[playtomic] auth échouée", res.status, await res.text());
      return null;
    }

    const data: { token?: string; expires_in?: number } = await res.json();
    if (!data.token) {
      console.error("[playtomic] réponse d'auth sans token");
      return null;
    }

    const ttlMs = (data.expires_in ?? 3600) * 1000;
    cached = {
      token: data.token,
      expiresAt: Date.now() + ttlMs - REFRESH_MARGIN_MS,
    };
    return data.token;
  } catch (err) {
    console.error("[playtomic] auth exception", err);
    return null;
  }
}

/** Renvoie un token valide, depuis le cache si possible. null si l'auth échoue. */
export async function getAccessToken(): Promise<string | null> {
  if (cached && Date.now() < cached.expiresAt) return cached.token;
  if (inFlight) return inFlight;

  inFlight = requestToken().finally(() => {
    inFlight = null;
  });
  return inFlight;
}
