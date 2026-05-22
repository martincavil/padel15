import { getDailySpecials } from "@/sanity/queries";
import { ChalkboardSpecials } from "./ChalkboardSpecials";

export async function DailySpecialsWidget() {
  const specials = await getDailySpecials();
  return <ChalkboardSpecials specials={specials} />;
}
