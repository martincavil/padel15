// import Club from "@/components/Club";
// import Clients from "@/components/Clients";
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
      <div className="space-y-10 md:space-y-20 md:mt-20 mt-10">
        {/* <Club  /> */}
        {/* <Clients /> */}
        <Club2 />
        <OpeningHours />
        <Values />
        <TeamBuilding />
        <Contact />
      </div>
    </>
  );
}
