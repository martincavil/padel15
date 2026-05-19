import { defineType, defineField } from "sanity";

export const menuFormuleSchema = defineType({
  name: "menuFormule",
  title: "Formules du jour",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nom de la formule", type: "string", initialValue: "Menu du midi", validation: (R) => R.required() }),
    defineField({ name: "price", title: "Prix (€)", type: "number", validation: (R) => R.required().positive() }),
    defineField({ name: "includes", title: "Contenu de la formule", type: "text", rows: 2, placeholder: "Entrée + Plat + Dessert" }),
    defineField({ name: "isActive", title: "Active", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "title", subtitle: "price", active: "isActive" },
    prepare({ title, subtitle, active }) {
      return { title: `${active ? "✅" : "⏸️"} ${title}`, subtitle: `${subtitle}€` };
    },
  },
});
