import { defineType, defineField } from "sanity";

export const dailySpecialSchema = defineType({
  name: "dailySpecial",
  title: "Suggestion du jour",
  type: "document",
  fields: [
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      initialValue: () => new Date().toISOString().split("T")[0],
    }),
    defineField({ name: "title", title: "Titre", type: "string", initialValue: "Suggestion du jour", validation: (R) => R.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "price", title: "Prix (€)", type: "number", validation: (R) => R.required().positive() }),
    defineField({ name: "isActive", title: "Actif aujourd'hui", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "title", subtitle: "price", active: "isActive" },
    prepare({ title, subtitle, active }) {
      return { title: `${active ? "✅" : "⏸️"} ${title}`, subtitle: `${subtitle}€` };
    },
  },
});
