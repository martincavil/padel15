/**
 * Compare le texte visible de chaque page entre deux versions du site
 * (ex. production actuelle et version Prismic en local), sur ordinateur et
 * sur mobile. Sert à vérifier que la migration ne change pas le contenu.
 *
 *   node scripts/prismic/compare-text.mjs https://www.padel15.fr http://localhost:3000
 */
import { chromium } from "@playwright/test";

const [BEFORE = "https://www.padel15.fr", AFTER = "http://localhost:3000"] = process.argv.slice(2);
const PAGES = ["/", "/terrains", "/restaurant", "/coaching", "/evenements", "/le-club", "/tarifs", "/contact", "/mentions-legales", "/confidentialite"];
const VIEWPORTS = { ordinateur: { width: 1280, height: 900 }, mobile: { width: 390, height: 844 } };

async function textOf(page, url) {
  await page.goto(url, { waitUntil: "load" });
  await page.waitForTimeout(1500);
  return page.evaluate(() => {
    // Hors contenus dynamiques (tournois, avis, newsletters, créneaux) qui
    // changent d'un chargement à l'autre.
    const clone = document.body.cloneNode(true);
    clone.querySelectorAll("script,style,noscript,iframe,[data-dynamic]").forEach((n) => n.remove());
    const lines = (document.body.innerText || "").split("\n");
    return lines.map((l) => l.replace(/\s+/g, " ").trim()).filter(Boolean);
  });
}

function diff(a, b) {
  const setB = new Map(); b.forEach((l) => setB.set(l, (setB.get(l) || 0) + 1));
  const setA = new Map(); a.forEach((l) => setA.set(l, (setA.get(l) || 0) + 1));
  const missing = [...setA].filter(([l, n]) => (setB.get(l) || 0) < n).map(([l]) => l);
  const added = [...setB].filter(([l, n]) => (setA.get(l) || 0) < n).map(([l]) => l);
  return { missing, added };
}

const browser = await chromium.launch();
let total = 0;
for (const [name, viewport] of Object.entries(VIEWPORTS)) {
  const page = await browser.newPage({ viewport });
  for (const path of PAGES) {
    const before = await textOf(page, BEFORE + path);
    const after = await textOf(page, AFTER + path);
    const { missing, added } = diff(before, after);
    total += missing.length + added.length;
    const status = missing.length + added.length === 0 ? "identique" : `${missing.length} ligne(s) en moins, ${added.length} en plus`;
    console.log(`\n[${name}] ${path} — ${before.length} lignes — ${status}`);
    for (const l of missing) console.log(`   - ${l}`);
    for (const l of added) console.log(`   + ${l}`);
  }
  await page.close();
}
await browser.close();
console.log(`\n${total} différence(s) au total.`);
