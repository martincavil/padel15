import { test, expect } from "@playwright/test";

const PAGES = [
  { path: "/", title: "Padel 15" },
  { path: "/terrains", title: "Terrains" },
  { path: "/restaurant", title: "Restaurant" },
  { path: "/evenements", title: "Événements" },
  { path: "/coaching", title: "Coaching" },
  { path: "/le-club", title: "Club" },
  { path: "/tarifs", title: "Tarifs" },
  { path: "/contact", title: "Contact" },
];

for (const page of PAGES) {
  test(`${page.path} — loads without errors`, async ({ page: p }) => {
    const errors: string[] = [];
    p.on("pageerror", (err) => errors.push(err.message));

    await p.goto(page.path);
    await p.waitForLoadState("networkidle");

    // No JS console errors
    expect(errors).toHaveLength(0);

    // Page has correct title
    await expect(p).toHaveTitle(new RegExp(page.title, "i"));

    // Navbar is visible
    await expect(p.locator("nav")).toBeVisible();

    // Footer is visible
    await expect(p.locator("footer")).toBeVisible();
  });
}

test("homepage — dual CTA buttons present", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /réserver un terrain/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /organiser un événement/i }).first()).toBeVisible();
});

test("homepage — Google rating visible", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("text=4,8")).toBeVisible();
});

test("terrains — Playtomic CTA link present", async ({ page }) => {
  await page.goto("/terrains");
  const playtomicLinks = page.getByRole("link", { name: /playtomic/i });
  await expect(playtomicLinks.first()).toBeVisible();
});

test("coaching — Tally form iframe present", async ({ page }) => {
  await page.goto("/coaching");
  const iframe = page.frameLocator('iframe[src*="tally.so"]');
  // Just check the iframe element exists in DOM
  await expect(page.locator('iframe[src*="tally.so"]')).toBeAttached();
});
