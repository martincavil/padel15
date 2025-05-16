// import Club from "@/components/Club";
import Club2 from "@/components/Club-2";
import Contact from "@/components/Contact";
import HeroBanner from "@/components/HeroBanner";
import OpeningHours from "@/components/OpeningHours";
import TeamBuilding from "@/components/TeamBuilding";
import Values from "@/components/Values";

export default function Home() {
  return (
   <>
    <HeroBanner />
    <div className="space-y-10 md:space-y-20">
    {/* <Club  /> */}
    <Club2 />
    <OpeningHours />
    <Values />
    <TeamBuilding />
    <Contact />
    </div>
   </>
  )
}


// TODO :

// Ajouter transition smooth au clic ancre navbar
// Ajouter SEO
// Mobile
// Ajouter sections photos restaurants
// ne pas trop surcharger
// trouver un moyen pour détecter l'appareil et le rediriger vers le store de l'utilisateur