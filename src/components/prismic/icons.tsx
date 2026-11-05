import {
  Accessibility, Activity, Banknote, Bike, Briefcase, Calendar, Check, Circle, ClipboardList,
  Clock, Droplets, Laptop, Layers, Leaf, type LucideIcon, Puzzle, ShoppingCart, ShowerHead,
  Smartphone, Smile, Sofa, Star, Target, Trophy, Users, Utensils, Wine,
} from "lucide-react";

/** Icônes proposées dans Prismic (champ « Icône »), dans l'ordre du modèle. */
const ICONS: Record<string, LucideIcon> = {
  Horloge: Clock,
  Calendrier: Calendar,
  Smartphone,
  Billets: Banknote,
  Panier: ShoppingCart,
  Vélo: Bike,
  Douche: ShowerHead,
  Canapé: Sofa,
  Ordinateur: Laptop,
  "Goutte d'eau": Droplets,
  Accessibilité: Accessibility,
  "Pétanque (cercle)": Circle,
  "Fléchettes (cible)": Target,
  "Molkky (couches)": Layers,
  Trophée: Trophy,
  Couverts: Utensils,
  Feuille: Leaf,
  Verre: Wine,
  Mallette: Briefcase,
  "Sport (activité)": Activity,
  Liste: ClipboardList,
  Étoile: Star,
  Groupe: Users,
  Puzzle,
  Sourire: Smile,
  Coche: Check,
};

export function Icon({ name, className }: { name: string | null | undefined; className?: string }) {
  const Component = (name && ICONS[name]) || Check;
  return <Component className={className} />;
}
