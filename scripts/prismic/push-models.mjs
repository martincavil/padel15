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
 * Vignettes : `src/slices/<Nom>/screenshot-<variante>.jpg` (voir
 * screenshots.mjs) sont déposées dans la médiathèque Prismic puis reliées à
 * leur variante. `screenshots.lock.json` garde leur adresse : une capture
 * n'est renvoyée que si elle a changé.
 *
 * Jeton : PRISMIC_WRITE_TOKEN dans .env.local (jamais sur Vercel).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

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

// Vignettes des variantes.
const LOCK = path.join(ROOT, "scripts/prismic/screenshots.lock.json");
const lock = fs.existsSync(LOCK) ? JSON.parse(fs.readFileSync(LOCK, "utf8")) : {};
const pascal = (id) => id.replace(/(^|_)(\w)/g, (_, __, c) => c.toUpperCase());
const uploads = [];
for (const s of localSlices) for (const v of s.variations) {
  const file = path.join(ROOT, "src/slices", pascal(s.id), `screenshot-${v.id}.jpg`);
  if (!fs.existsSync(file)) continue;
  const key = `${s.id}/${v.id}`;
  const sha = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
  if (lock[key]?.sha === sha) v.imageUrl = lock[key].url;
  else uploads.push({ key, file, sha, variation: v });
}
async function upload({ key, file, sha, variation }) {
  const form = new FormData();
  form.append("file", new Blob([fs.readFileSync(file)], { type: "image/jpeg" }), `slice-${key.replace("/", "-")}.jpg`);
  form.append("notes", `Vignette du modèle (slice ${key}). Ne pas supprimer.`);
  const res = await fetch("https://asset-api.prismic.io/assets", {
    method: "POST", headers: { repository: repositoryName, Authorization: `Bearer ${token}` }, body: form,
  });
  if (!res.ok) throw new Error(`Envoi de la vignette ${key} → ${res.status} ${await res.text()}`);
  const { url } = await res.json();
  variation.imageUrl = url.split("?")[0];
  lock[key] = { sha, url: variation.imageUrl };
  fs.writeFileSync(LOCK, JSON.stringify(Object.fromEntries(Object.entries(lock).sort()), null, 2) + "\n");
}
const localTypes = readDir("customtypes", "index.json");
const [remoteSlices, remoteTypes] = await Promise.all([call("GET", "/slices"), call("GET", "/customtypes")]);

// Comparaison indépendante de l'ordre des clés (Prismic les réordonne).
const canon = (v) => Array.isArray(v) ? v.map(canon)
  : v && typeof v === "object"
    ? Object.fromEntries(Object.keys(v).filter((k) => k !== "hash").sort().map((k) => [k, canon(v[k])]))
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
function buildPlan() {
  plan.length = 0;
  diff("slice", "/slices", localSlices, remoteSlices);
  diff("type", "/customtypes", localTypes, remoteTypes);
  plan.sort((a, b) => {
    const rank = (p) => (p.action === "supprimer" ? (p.kind === "type" ? 2 : 3) : p.kind === "slice" ? 0 : 1);
    return rank(a) - rank(b);
  });
}
buildPlan();

if (!plan.length && !uploads.length) { console.log(`Dépôt ${repositoryName} : déjà à jour.`); process.exit(0); }
console.log(`Dépôt ${repositoryName} :`);
for (const u of uploads) console.log(`  ${"envoyer".padEnd(14)} ${"image".padEnd(6)} ${u.key}`);
for (const p of plan) console.log(`  ${p.action.padEnd(14)} ${p.kind.padEnd(6)} ${p.id}`);
if (!APPLY) { console.log("\nSimulation. Relancer avec --apply pour envoyer."); process.exit(0); }
for (const u of uploads) { await upload(u); console.log(`  ✓ envoyer image ${u.key}`); }
// Les adresses des vignettes changent les slices : on recalcule le plan.
if (uploads.length) buildPlan();
for (const p of plan) { await p.run(); console.log(`  ✓ ${p.action} ${p.kind} ${p.id}`); }
