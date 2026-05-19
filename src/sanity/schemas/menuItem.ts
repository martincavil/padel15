import { defineType, defineField } from "sanity";

export const menuItemSchema = defineType({
  name: "menuItem",
  title: "Carte du restaurant",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nom du plat", type: "string", validation: (R) => R.required() }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Entrée", value: "entree" },
          { title: "Plat", value: "plat" },
          { title: "Dessert", value: "dessert" },
          { title: "Boisson", value: "boisson" },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({ name: "price", title: "Prix (€)", type: "number", validation: (R) => R.required().positive() }),
    defineField({ name: "available", title: "Disponible", type: "boolean", initialValue: true }),
    defineField({
      name: "allergens",
      title: "Allergènes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "Gluten", "Crustacés", "Œufs", "Poisson", "Arachides",
          "Soja", "Lait", "Fruits à coque", "Céleri", "Moutarde",
          "Graines de sésame", "Sulfites", "Lupin", "Mollusques",
        ],
      },
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category", description: "price" },
    prepare({ title, subtitle, description }) {
      return { title, subtitle: `${subtitle} — ${description}€` };
    },
  },
});
