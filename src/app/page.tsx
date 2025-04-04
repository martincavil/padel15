import Club from "@/components/Club";
import Contact from "@/components/Contact";
import HeroBanner from "@/components/HeroBanner";
import OpeningHours from "@/components/OpeningHours";
import TeamBuilding from "@/components/TeamBuilding";
import Values from "@/components/Values";

export default function Home() {
  return (
   <div>
    <HeroBanner />
    <TeamBuilding />
    <Values />
    <Club />
    <OpeningHours />
    <Contact />
    <div>
      À retravailler avec Gasp :

      club : 
        -Les installations (2 terrains)
        -Le Club House (bar et restaurant)
        -Entreprises et particuliers (Ce qu’on propose avec adresse mail pour devis)
        

        -Nos tarifs 
        -Le restaurant 
        -Tournois 
        -Cours particuliers 
    </div>
   </div>
  )
}
