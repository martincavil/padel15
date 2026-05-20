import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const sanityClient = projectId
  ? createClient({ projectId, dataset, apiVersion: "2024-01-01", useCdn: true })
  : null;

export interface SanityMenuItem {
  _id: string;
  name: string;
  category: "entree" | "plat" | "dessert" | "boisson";
  description?: string;
  price: number;
  available: boolean;
  allergens?: string[];
}

export interface SanityDailySpecial {
  _id: string;
  date: string;
  title: string;
  description?: string;
  price: number;
  isActive: boolean;
}

export interface SanityMenuFormule {
  _id: string;
  title: string;
  price: number;
  includes?: string;
  isActive: boolean;
}

export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  author?: { name: string };
  mainImage?: { asset: { _ref: string; _type: string }; alt?: string };
  categories?: Array<{ title: string }>;
  publishedAt?: string;
  body?: unknown[];
}
