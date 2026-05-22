import {
  Bike,
  ShowerHead,
  Sofa,
  Laptop,
  Droplets,
  Accessibility,
  ShoppingCart,
  Circle,
  Target,
  Layers,
} from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const EQUIPEMENTS = [
  { icon: ShoppingCart, label: "Raquettes en location + balles" },
  { icon: ShowerHead, label: "Vestiaires & douches" },
  { icon: Sofa, label: "Espace détente" },
  { icon: Laptop, label: "Coworking WiFi" },
  { icon: Droplets, label: "Fontaine à eau" },
  { icon: Bike, label: "Garage à vélo" },
  { icon: Accessibility, label: "Accès PMR total" },
  { icon: Circle, label: "Terrain de pétanque" },
  { icon: Target, label: "Fléchettes" },
  { icon: Layers, label: "Molki" },
];

export function PadelInfoSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand/10 text-brand border border-brand/20 mb-4">
              Équipements
            </span>
            <h2 className="font-buzz text-4xl md:text-5xl">
              Tout est prévu
            </h2>
            <p className="text-gray-500 mt-3 text-base max-w-xl mx-auto">
              Un club pensé pour que vous n&apos;ayez à vous occuper que d&apos;une chose : jouer.
            </p>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 max-w-5xl mx-auto">
            {EQUIPEMENTS.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.label}
                  className="flex flex-col items-center gap-3 bg-gray-50 hover:bg-brand/5 border border-gray-100 hover:border-brand/20 rounded-2xl p-5 text-center transition-colors"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                    <Icon className="w-6 h-6 text-brand" />
                  </div>
                  <span className="text-gray-700 text-sm font-medium leading-snug">{item.label}</span>
                </li>
              );
            })}
          </ul>
        </AnimatedSection>
      </div>
    </section>
  );
}
