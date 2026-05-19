// src/components/restaurant/MenuDisplay.tsx
import { SanityMenuItem, SanityMenuFormule } from "@/sanity/client";
import { AlertCircle } from "lucide-react";

const CATEGORY_LABELS: Record<string, string> = {
  entree: "Entrées",
  plat: "Plats",
  dessert: "Desserts",
  boisson: "Boissons",
};
const CATEGORY_ORDER = ["entree", "plat", "dessert", "boisson"];

interface MenuDisplayProps {
  menuByCategory: Record<string, SanityMenuItem[]>;
  formules: SanityMenuFormule[];
}

export function MenuDisplay({ menuByCategory, formules }: MenuDisplayProps) {
  const hasData = Object.keys(menuByCategory).length > 0;

  return (
    <div className="space-y-12">
      {/* Formules */}
      {formules.length > 0 && (
        <div>
          <h3 className="font-buzz text-2xl mb-5">Formules</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formules.map((f) => (
              <div key={f._id} className="bg-brand/5 border border-brand/20 rounded-xl p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{f.title}</p>
                    {f.includes && <p className="text-gray-500 text-sm mt-1">{f.includes}</p>}
                  </div>
                  <span className="font-buzz text-2xl text-brand flex-shrink-0">{f.price}€</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Menu par catégorie */}
      {!hasData ? (
        <div className="text-center py-12 text-gray-400">
          <p>La carte est en cours de chargement.</p>
        </div>
      ) : (
        CATEGORY_ORDER.filter((cat) => menuByCategory[cat]?.length).map((cat) => (
          <div key={cat}>
            <h3 className="font-buzz text-2xl mb-5 pb-2 border-b border-gray-100">
              {CATEGORY_LABELS[cat]}
            </h3>
            <div className="space-y-4">
              {menuByCategory[cat].map((item) => (
                <div key={item._id} className="flex items-start justify-between gap-4 py-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{item.name}</p>
                      {!item.available && (
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Indisponible</span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">{item.description}</p>
                    )}
                    {item.allergens && item.allergens.length > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 text-gray-300" />
                        <p className="text-gray-400 text-xs">{item.allergens.join(", ")}</p>
                      </div>
                    )}
                  </div>
                  <span className="font-semibold text-gray-900 flex-shrink-0">{item.price}€</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      <p className="text-gray-400 text-xs text-center">
        Informez votre serveur en cas d&apos;allergie. Carte susceptible d&apos;évoluer selon les arrivages.
      </p>
    </div>
  );
}
