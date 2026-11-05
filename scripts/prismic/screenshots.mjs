/**
 * Capture, sur le site en ligne, la section qui correspond à chaque variante
 * de slice, et l'enregistre dans `src/slices/<Nom>/screenshot-<variante>.jpg`.
 * `push-models.mjs` les envoie ensuite dans Prismic (vignettes de l'éditeur).
 *
 *   node scripts/prismic/screenshots.mjs [adresse du site]
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const ROOT = path.resolve(import.meta.dirname, "../..");
const SITE = (process.argv[2] || "https://www.padel15.fr").replace(/\/$/, "");
const MAX_HEIGHT = 1300;

// slice, variante, page, élément à capturer (sélecteur Playwright).
const h2 = (t) => `h2:has-text("${t}")`;
const SHOTS = [
  ["TextImage", "default", "/le-club", `${h2("Notre histoire")} >> xpath=ancestor::div[contains(@class,"grid")][1]`],
  ["TextImage", "photoMosaic", "/", `section:has(${h2("Le plaisir du Padel")})`],
  ["TextImage", "video", "/evenements", `section:has(${h2("en images")})`],
  ["FeatureGrid", "tiles", "/", `section:has(${h2("Tout est prévu")})`],
  ["FeatureGrid", "list", "/terrains", `${h2("Équipements")} >> xpath=..`],
  ["FeatureGrid", "bookingInfo", "/terrains", `${h2("Réservez votre terrain")} >> xpath=ancestor::div[contains(@class,"lg:grid-cols-2")][1]`],
  ["FeatureGrid", "strip", "/", `section:has-text("Créneaux en temps réel")`],
  ["FeatureGrid", "values", "/le-club", `section#values`],
  ["Pricing", "cards", "/tarifs", `${h2("Location de terrains")} >> xpath=..`],
  ["Pricing", "list", "/tarifs", `h2:text-is("Coaching") >> xpath=..`],
  ["OfferCards", "default", "/evenements", `${h2("Nos Formules")} >> xpath=../..`],
  ["Gallery", "default", "/terrains", `h2:text-is("Galerie") >> xpath=..`],
  ["Gallery", "captioned", "/le-club", `xpath=//p[normalize-space()="Coworking"]/ancestor::div[contains(@class,"md:grid-cols-3")][1]`],
  ["Logos", "partners", "/", `section:has(${h2("Nos partenaires")})`],
  ["Logos", "marquee", "/", `section:has(${h2("Ils nous font confiance")})`],
  ["CtaBanner", "default", "/le-club", `${h2("Venez découvrir")} >> xpath=..`],
  ["CtaBanner", "dark", "/tarifs", `${h2("Événements d")} >> xpath=..`],
  ["CtaBanner", "image", "/restaurant", `${h2("Privatisez notre espace")} >> xpath=ancestor::div[contains(@class,"rounded-2xl")][last()]`],
  ["B2bHighlight", "default", "/", `section:has(${h2("Team Building")})`],
  ["CourseBooking", "default", "/coaching", `section#cours`],
  ["InstagramVideos", "default", "/", `section:has(${h2("Vivez l")})`],
  ["Widget", "default", "/", `section:has(${h2("Prochains tournois")})`],
  ["RichText", "default", "/mentions-legales", `h1:has-text("Mentions légales") >> xpath=..`],
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
let current = "";
// Regroupées par page pour ne charger chaque page qu'une fois.
SHOTS.sort((a, b) => a[2].localeCompare(b[2]));
for (const [slice, variation, url, selector] of SHOTS) {
  if (url !== current) {
    await page.goto(SITE + url, { waitUntil: "load" });
    await page.waitForTimeout(2000);
    // Pas de navbar, bandeau cookies ni boutons flottants ; sections déjà
    // apparues ; images chargées sans attendre le défilement.
    await page.addStyleTag({ content: `
      .fixed { visibility: hidden !important; }
      [style*="opacity"] { opacity: 1 !important; transform: none !important; }
    ` });
    await page.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = "eager"; }));
    current = url;
  }
  const el = page.locator(selector).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForLoadState("networkidle", { timeout: 4000 }).catch(() => {});
  await el.evaluate((node) => Promise.all([...node.querySelectorAll("img")].map((i) =>
    i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
  await page.waitForTimeout(800);
  const box = await el.boundingBox();
  const file = path.join(ROOT, "src/slices", slice, `screenshot-${variation}.jpg`);
  if (box.height > MAX_HEIGHT) {
    // Section très haute : on garde le haut, en coordonnées de la page entière.
    const scrollY = await page.evaluate(() => window.scrollY);
    await page.screenshot({ path: file, type: "jpeg", quality: 80, fullPage: true,
      clip: { x: box.x, y: box.y + scrollY, width: box.width, height: MAX_HEIGHT } });
  } else {
    await el.screenshot({ path: file, type: "jpeg", quality: 80 });
  }
  console.log(`✓ ${slice}/${variation}  ${Math.round(box.width)}×${Math.round(Math.min(box.height, MAX_HEIGHT))}  ${Math.round(fs.statSync(file).size / 1024)} Ko`);
}
await browser.close();
