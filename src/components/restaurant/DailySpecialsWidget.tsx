// src/components/restaurant/DailySpecialsWidget.tsx
import { getDailySpecials } from "@/sanity/queries";
import { Sparkles } from "lucide-react";

export async function DailySpecialsWidget() {
  const specials = await getDailySpecials();

  if (!specials.length) return null;

  return (
    <div className="bg-brand/5 border border-brand/20 rounded-2xl p-5 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-brand" />
        <h3 className="font-semibold text-sm text-brand uppercase tracking-wider">Suggestions du jour</h3>
      </div>
      <div className="space-y-3">
        {specials.map((special) => (
          <div key={special._id} className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-sm">{special.title}</p>
              {special.description && (
                <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{special.description}</p>
              )}
            </div>
            <span className="font-buzz text-lg text-brand flex-shrink-0">{special.price}€</span>
          </div>
        ))}
      </div>
    </div>
  );
}
