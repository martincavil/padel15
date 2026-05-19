import { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://padel15.fr";

const STATIC_ROUTES = [
  { url: BASE_URL, priority: 1.0, changeFrequency: "weekly" as const },
  { url: `${BASE_URL}/terrains`, priority: 0.9, changeFrequency: "monthly" as const },
  { url: `${BASE_URL}/restaurant`, priority: 0.9, changeFrequency: "monthly" as const },
  { url: `${BASE_URL}/evenements`, priority: 0.9, changeFrequency: "monthly" as const },
  { url: `${BASE_URL}/coaching`, priority: 0.8, changeFrequency: "monthly" as const },
  { url: `${BASE_URL}/tarifs`, priority: 0.8, changeFrequency: "monthly" as const },
  { url: `${BASE_URL}/le-club`, priority: 0.7, changeFrequency: "monthly" as const },
  { url: `${BASE_URL}/contact`, priority: 0.7, changeFrequency: "yearly" as const },
  { url: `${BASE_URL}/blog`, priority: 0.7, changeFrequency: "weekly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_ROUTES.map((route) => ({
    url: route.url,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
