import { sanityClient, SanityMenuItem, SanityDailySpecial, SanityMenuFormule } from "./client";

// ─── Mock fallbacks ────────────────────────────────────────────────────────────

const MOCK_DAILY_SPECIALS: SanityDailySpecial[] = [
  {
    _id: "mock-1",
    date: new Date().toISOString().split("T")[0],
    title: "Suggestion du jour",
    description: "Magret de canard, purée de patate douce, jus de cassis",
    price: 18,
    isActive: true,
  },
  {
    _id: "mock-2",
    date: new Date().toISOString().split("T")[0],
    title: "Menu végétarien",
    description: "Risotto aux champignons des bois, parmesan, huile de truffe",
    price: 15,
    isActive: true,
  },
];

const MOCK_MENU_ITEMS: SanityMenuItem[] = [
  { _id: "m1", name: "Salade César", category: "entree", description: "Romaine, parmesan, croûtons maison", price: 9, available: true },
  { _id: "m2", name: "Carpaccio de bœuf", category: "entree", description: "Roquette, copeaux de parmesan, huile d'olive", price: 12, available: true },
  { _id: "m3", name: "Entrecôte grillée", category: "plat", description: "Frites maison, sauce béarnaise", price: 22, available: true },
  { _id: "m4", name: "Saumon en croûte", category: "plat", description: "Épinards, beurre blanc citronné", price: 19, available: true },
  { _id: "m5", name: "Burger Padel 15", category: "plat", description: "Bœuf charolais, cheddar, confit d'oignons, frites", price: 17, available: true },
  { _id: "m6", name: "Fondant au chocolat", category: "dessert", description: "Cœur coulant, glace vanille", price: 8, available: true },
  { _id: "m7", name: "Tarte tatin", category: "dessert", description: "Pommes caramélisées, crème fraîche", price: 7, available: true },
  { _id: "m8", name: "Eau plate / gazeuse", category: "boisson", price: 3, available: true },
  { _id: "m9", name: "Jus de fruits frais", category: "boisson", description: "Orange ou pomme-gingembre", price: 5, available: true },
];

const MOCK_FORMULES: SanityMenuFormule[] = [
  { _id: "f1", title: "Menu du midi", price: 19, includes: "Entrée + Plat ou Plat + Dessert", isActive: true },
  { _id: "f2", title: "Menu complet", price: 24, includes: "Entrée + Plat + Dessert", isActive: true },
];

// ─── Queries ───────────────────────────────────────────────────────────────────

export async function getDailySpecials(): Promise<SanityDailySpecial[]> {
  if (!sanityClient) return MOCK_DAILY_SPECIALS;
  try {
    return await sanityClient.fetch(
      `*[_type == "dailySpecial" && isActive == true] | order(date desc) [0...5] {
        _id, date, title, description, price, isActive
      }`
    );
  } catch {
    return MOCK_DAILY_SPECIALS;
  }
}

export async function getMenuByCategory(): Promise<Record<string, SanityMenuItem[]>> {
  let items: SanityMenuItem[] = MOCK_MENU_ITEMS;
  if (sanityClient) {
    try {
      items = await sanityClient.fetch(
        `*[_type == "menuItem" && available == true] | order(name asc) {
          _id, name, category, description, price, available, allergens
        }`
      );
    } catch {
      items = MOCK_MENU_ITEMS;
    }
  }
  return items.reduce<Record<string, SanityMenuItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
}

export async function getActiveFormules(): Promise<SanityMenuFormule[]> {
  if (!sanityClient) return MOCK_FORMULES;
  try {
    return await sanityClient.fetch(
      `*[_type == "menuFormule" && isActive == true] | order(_createdAt asc) {
        _id, title, price, includes, isActive
      }`
    );
  } catch {
    return MOCK_FORMULES;
  }
}
