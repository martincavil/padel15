/**
 * Envoie les modèles Prismic du site (types de documents et slices) dans le
 * dépôt, via l'API Custom Types.
 *
 * Les modèles du code sont la référence : `customtypes/<id>/index.json` et
 * `src/slices/<Nom>/model.json` (format Slice Machine).
 *
 *   node scripts/prismic/push-models.mjs           → affiche ce qui changerait
 *   node scripts/prismic/push-models.mjs --apply   → envoie les changements
 *   … --apply --prune                              → supprime aussi dans Prismic
 *                                                    les modèles absents du code
 *
 * Jeton : PRISMIC_WRITE_TOKEN dans .env.local (jamais sur Vercel).
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../..");
const APPLY = process.argv.includes("--apply");
const PRUNE = process.argv.includes("--prune");

const { repositoryName } = JSON.parse(fs.readFileSync(path.join(ROOT, "prismic.config.json"), "utf8"));
const env = Object.fromEntries(
  fs.readFileSync(path.join(ROOT, ".env.local"), "utf8").split("\n")
    .filter((l) => /^[A-Z_]+=/.test(l))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i), l.slice(i + 1).trim().replace(/^["']|["']$/g, "")]; }),
);
const token = process.env.PRISMIC_WRITE_TOKEN || env.PRISMIC_WRITE_TOKEN;
if (!repositoryName || !token) {
  console.error("Il manque le nom du dépôt (prismic.config.json) ou PRISMIC_WRITE_TOKEN (.env.local).");
  process.exit(1);
}

const API = "https://customtypes.prismic.io";
const headers = { repository: repositoryName, Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
async function call(method, url, body) {
  const res = await fetch(API + url, { method, headers, body: body ? JSON.stringify(body) : undefined });
  if (!res.ok) throw new Error(`${method} ${url} → ${res.status} ${await res.text()}`);
  const t = await res.text();
  return t ? JSON.parse(t) : null;
}

const readDir = (dir, file) => fs.readdirSync(path.join(ROOT, dir))
  .filter((d) => fs.existsSync(path.join(ROOT, dir, d, file)))
  .map((d) => JSON.parse(fs.readFileSync(path.join(ROOT, dir, d, file), "utf8")));

const localSlices = readDir("src/slices", "model.json");
const localTypes = readDir("customtypes", "index.json");
const [remoteSlices, remoteTypes] = await Promise.all([call("GET", "/slices"), call("GET", "/customtypes")]);

// Comparaison indépendante de l'ordre des clés (Prismic les réordonne) et sans
// les champs que Prismic ajoute de son côté.
const canon = (v) => Array.isArray(v) ? v.map(canon)
  : v && typeof v === "object"
    ? Object.fromEntries(Object.keys(v).filter((k) => !["imageUrl", "hash"].includes(k)).sort().map((k) => [k, canon(v[k])]))
    : v;
const strip = (m) => JSON.stringify(canon(m));
const plan = [];
function diff(kind, base, local, remote) {
  const byId = new Map(remote.map((m) => [m.id, m]));
  for (const m of local) {
    const r = byId.get(m.id);
    if (!r) plan.push({ action: "créer", kind, id: m.id, run: () => call("POST", `${base}/insert`, m) });
    else if (strip(r) !== strip(m)) plan.push({ action: "mettre à jour", kind, id: m.id, run: () => call("POST", `${base}/update`, m) });
  }
  if (PRUNE) for (const r of remote) if (!local.some((m) => m.id === r.id))
    plan.push({ action: "supprimer", kind, id: r.id, run: () => call("DELETE", `${base}/${r.id}`) });
}
// Les slices avant les types qui les utilisent ; les suppressions de types avant celles de slices.
diff("slice", "/slices", localSlices, remoteSlices);
diff("type", "/customtypes", localTypes, remoteTypes);
plan.sort((a, b) => {
  const rank = (p) => (p.action === "supprimer" ? (p.kind === "type" ? 2 : 3) : p.kind === "slice" ? 0 : 1);
  return rank(a) - rank(b);
});

if (!plan.length) { console.log(`Dépôt ${repositoryName} : déjà à jour.`); process.exit(0); }
console.log(`Dépôt ${repositoryName} :`);
for (const p of plan) console.log(`  ${p.action.padEnd(14)} ${p.kind.padEnd(6)} ${p.id}`);
if (!APPLY) { console.log("\nSimulation. Relancer avec --apply pour envoyer."); process.exit(0); }
for (const p of plan) { await p.run(); console.log(`  ✓ ${p.action} ${p.kind} ${p.id}`); }
