/**
 * Phase 2 : recopie le contenu actuel du site (scripts/prismic/content.mjs)
 * dans Prismic, en BROUILLON (release « Migration » de Prismic : rien n'est
 * publié tant qu'on ne publie pas cette release depuis Prismic).
 *
 *   node scripts/prismic/migrate-content.mjs              → vérifie tout, n'envoie rien
 *   node scripts/prismic/migrate-content.mjs --apply      → envoie
 *   … --apply --only page/terrains,settings              → seulement ces documents
 *
 * Chaque champ est d'abord vérifié par rapport aux modèles du code
 * (customtypes/, src/slices/) : la moindre erreur arrête tout avant l'envoi.
 *
 * Relançable : `migration.lock.json` garde les images déjà envoyées et l'id
 * des documents créés. Une relance met à jour les brouillons au lieu d'en
 * créer de nouveaux, et ne renvoie pas les images.
 */
import fs from "node:fs";
import path from "node:path";
import { createWriteClient } from "@prismicio/client";
import { DOCUMENTS } from "./content.mjs";

const ROOT = path.resolve(import.meta.dirname, "../..");
const APPLY = process.argv.includes("--apply");
const onlyArg = process.argv.find((a, i) => process.argv[i - 1] === "--only");
const ONLY = onlyArg ? onlyArg.split(",") : null;

// ── Modèles ───────────────────────────────────────────────────────────
const readJSON = (...p) => JSON.parse(fs.readFileSync(path.join(ROOT, ...p), "utf8"));
const types = Object.fromEntries(fs.readdirSync(path.join(ROOT, "customtypes"))
  .map((id) => [id, readJSON("customtypes", id, "index.json")]));
const slices = Object.fromEntries(fs.readdirSync(path.join(ROOT, "src/slices"))
  .filter((d) => fs.existsSync(path.join(ROOT, "src/slices", d, "model.json")))
  .map((d) => readJSON("src/slices", d, "model.json")).map((m) => [m.id, m]));

// ── Vérification ──────────────────────────────────────────────────────
const errors = [];
const warnings = [];
const assets = new Set();

function checkRichText(where, value, config) {
  if (!Array.isArray(value)) return errors.push(`${where} : texte enrichi attendu (tableau)`);
  const allowed = (config.single || config.multi || "").split(",").map((s) => s.trim());
  if (config.single && value.length > 1) errors.push(`${where} : un seul bloc autorisé`);
  for (const b of value) {
    if (!allowed.includes(b.type)) errors.push(`${where} : bloc « ${b.type} » non autorisé (${allowed.join(", ")})`);
    for (const s of b.spans || []) if (!allowed.includes(s.type)) errors.push(`${where} : « ${s.type} » non autorisé dans « ${b.text.slice(0, 30)}… »`);
  }
}

function checkField(where, value, def) {
  const { type, config = {} } = def;
  switch (type) {
    case "Text":
      if (typeof value !== "string") errors.push(`${where} : texte attendu`);
      break;
    case "StructuredText":
      checkRichText(where, value, config);
      break;
    case "Image":
      if (value && value.__asset) {
        if (!fs.existsSync(path.join(ROOT, "public", value.__asset))) errors.push(`${where} : fichier introuvable public${value.__asset}`);
        assets.add(value.__asset);
      } else if (value && Object.keys(value).length) errors.push(`${where} : image attendue`);
      break;
    case "Link":
      if (!value || !Object.keys(value).length) { errors.push(`${where} : lien vide à écrire { link_type: "Any" }`); break; }
      if (value.link_type === "Any") break; // lien vide
      if (value.link_type !== "Web" || typeof value.url !== "string") errors.push(`${where} : lien web attendu`);
      if (config.select === "media" || config.select === "document") errors.push(`${where} : ce champ n'accepte pas de lien web`);
      if ("text" in value && !config.allowText) errors.push(`${where} : ce lien n'a pas de texte`);
      if (config.allowText && !value.text) warnings.push(`${where} : lien sans texte`);
      break;
    case "Select":
      if (!config.options.includes(value)) errors.push(`${where} : « ${value} » n'est pas dans la liste (${config.options.join(" | ")})`);
      break;
    case "Boolean":
      if (typeof value !== "boolean") errors.push(`${where} : oui/non attendu`);
      break;
    case "Group":
      if (!Array.isArray(value)) { errors.push(`${where} : liste attendue`); break; }
      value.forEach((item, i) => checkFields(`${where}[${i}]`, item, config.fields));
      break;
    case "Slices":
      if (!Array.isArray(value)) { errors.push(`${where} : sections attendues`); break; }
      value.forEach((s, i) => {
        const at = `${where}[${i}] ${s.slice_type}/${s.variation}`;
        if (!config.choices[s.slice_type]) return errors.push(`${at} : section non autorisée ici`);
        const variation = slices[s.slice_type]?.variations.find((v) => v.id === s.variation);
        if (!variation) return errors.push(`${at} : variante inconnue`);
        checkFields(at, s.primary, variation.primary);
      });
      break;
    case "UID":
      break;
    default:
      errors.push(`${where} : type de champ non géré (${type})`);
  }
}

function checkFields(where, data, fields) {
  for (const [key, value] of Object.entries(data)) {
    if (!fields[key]) errors.push(`${where}.${key} : champ absent du modèle`);
    else checkField(`${where}.${key}`, value, fields[key]);
  }
  for (const key of Object.keys(fields)) {
    if (fields[key].type !== "UID" && !(key in data)) warnings.push(`${where}.${key} : laissé vide`);
  }
}

const docs = DOCUMENTS.filter((d) => !ONLY || ONLY.includes(d.key));
if (ONLY) for (const k of ONLY) if (!DOCUMENTS.some((d) => d.key === k)) errors.push(`--only : document inconnu ${k}`);
for (const doc of docs) {
  const model = types[doc.type];
  if (!model) { errors.push(`${doc.key} : type inconnu ${doc.type}`); continue; }
  if (model.repeatable && !doc.uid) errors.push(`${doc.key} : uid manquant`);
  const fields = Object.assign({}, ...Object.values(model.json));
  checkFields(doc.key, doc.data, fields);
}

console.log(`${docs.length} documents, ${assets.size} images.`);
if (warnings.length) console.log(`\nChamps laissés vides (normal s'ils sont facultatifs) :\n  ${warnings.join("\n  ")}`);
if (errors.length) {
  console.error(`\n${errors.length} erreur(s) — rien n'a été envoyé :\n  ${errors.join("\n  ")}`);
  process.exit(1);
}
console.log("\nContenu conforme aux modèles.");
if (!APPLY) { console.log("Vérification seule. Relancer avec --apply pour envoyer en brouillon."); process.exit(0); }

// ── Envoi ─────────────────────────────────────────────────────────────
const { repositoryName } = readJSON("prismic.config.json");
const env = Object.fromEntries(fs.readFileSync(path.join(ROOT, ".env.local"), "utf8").split("\n")
  .filter((l) => /^[A-Z_]+=/.test(l))
  .map((l) => { const i = l.indexOf("="); return [l.slice(0, i), l.slice(i + 1).trim().replace(/^["']|["']$/g, "")]; }));
const writeToken = process.env.PRISMIC_WRITE_TOKEN || env.PRISMIC_WRITE_TOKEN;
if (!repositoryName || !writeToken) { console.error("Il manque le nom du dépôt ou PRISMIC_WRITE_TOKEN."); process.exit(1); }
const client = createWriteClient(repositoryName, { writeToken });

const LOCK = path.join(ROOT, "scripts/prismic/migration.lock.json");
const lock = fs.existsSync(LOCK) ? readJSON("scripts/prismic/migration.lock.json") : { assets: {}, documents: {} };
const saveLock = () => fs.writeFileSync(LOCK, JSON.stringify(lock, null, 2) + "\n");

// Prismic exige des dimensions ; certains SVG n'en déclarent pas à l'envoi :
// on les lit dans le fichier (viewBox, sinon width/height).
function svgSize(file) {
  const svg = fs.readFileSync(path.join(ROOT, "public", file), "utf8").match(/<svg[^>]*>/s)?.[0] ?? "";
  const vb = svg.match(/viewBox="\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)/);
  if (vb) return { width: Math.round(+vb[1]), height: Math.round(+vb[2]) };
  const w = svg.match(/\swidth="([\d.]+)/), h = svg.match(/\sheight="([\d.]+)/);
  return w && h ? { width: Math.round(+w[1]), height: Math.round(+h[1]) } : { width: 300, height: 100 };
}
// Prismic ne reconnaît un SVG comme image que s'il commence par <svg (sans
// en-tête XML ni DOCTYPE) : on les retire de la copie envoyée, et on y
// déclare width et height.
function readForUpload(file) {
  const buf = fs.readFileSync(path.join(ROOT, "public", file));
  if (!file.endsWith(".svg")) return buf;
  const { width, height } = svgSize(file);
  const source = buf.toString("utf8");
  return Buffer.from(source.slice(source.indexOf("<svg")).replace(/<svg\b[^>]*>/s, (tag) =>
    tag.replace(/\s(width|height)="[^"]*"/g, "").replace(/^<svg/, `<svg width="${width}" height="${height}"`)));
}

// Images : envoyées une seule fois.
for (const file of [...assets].sort()) {
  if (lock.assets[file]) continue;
  const asset = await client.createAsset(readForUpload(file), path.basename(file), {
    notes: `Importé depuis le site (public${file}).`,
  });
  lock.assets[file] = { id: asset.id, url: asset.url.split("?")[0], width: asset.width ?? null, height: asset.height ?? null };
  saveLock();
  console.log(`  ✓ image ${file}`);
}

for (const [file, a] of Object.entries(lock.assets)) {
  if (!a.width || !a.height) Object.assign(a, file.endsWith(".svg") ? svgSize(file) : { width: 1, height: 1 });
}
saveLock();

// Remplace les images par le format attendu par Prismic.
function resolve(value) {
  if (Array.isArray(value)) return value.map(resolve);
  if (value && typeof value === "object") {
    if (value.__asset) {
      const a = lock.assets[value.__asset];
      return { id: a.id, url: a.url, dimensions: { width: a.width, height: a.height },
        edit: { x: 0, y: 0, zoom: 1, background: "transparent" }, alt: value.alt || null, copyright: null };
    }
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, resolve(v)]));
  }
  return value;
}

const lang = (await client.getRepository()).languages[0].id;
for (const doc of docs) {
  const payload = { type: doc.type, uid: doc.uid, lang, tags: [], data: resolve(doc.data) };
  const id = lock.documents[doc.key];
  if (id) {
    await client.updateDocument(id, { ...payload, documentTitle: doc.title });
    console.log(`  ✓ mis à jour ${doc.key}`);
  } else {
    const created = await client.createDocument(payload, doc.title);
    lock.documents[doc.key] = created.id;
    saveLock();
    console.log(`  ✓ créé ${doc.key}`);
  }
}
console.log("\nTerminé : les documents sont dans la release « Migration » de Prismic, non publiés.");
