"use client";

import Image from "next/image";
import { Button } from "./ui/Button";

export default function Clients() {
  // Liste des clients organisée par ligne
  const clientsRow1 = [
    { id: 1, name: "Club Med", logo: "/logos/clubmed.svg" },
    { id: 2, name: "AXA", logo: "/logos/axa.svg" },
    { id: 3, name: "Big Mamma", logo: "/logos/big-mamma.jpeg" },
    { id: 4, name: "Sander & Partners", logo: "/logos/sander.svg" },
    { id: 5, name: "BlackRock", logo: "/logos/blackrock.svg" },
    { id: 6, name: "MUFG", logo: "/logos/mufg.svg" },
    { id: 7, name: "BNP Paribas", logo: "/logos/bnp.svg" },
    { id: 8, name: "Boston Consulting Group", logo: "/logos/bcg.svg" },
    { id: 9, name: "ASICS", logo: "/logos/asics.svg" },
    { id: 10, name: "Cupra", logo: "/logos/cupra.svg" },
  ];

  const clientsRow2 = [
    { id: 12, name: "EDF", logo: "/logos/edf.svg" },
    { id: 13, name: "Air Liquide", logo: "/logos/airliquide.svg" },
    { id: 14, name: "Siemens", logo: "/logos/siemens.svg" },
    { id: 15, name: "Linkt", logo: "/logos/linkt.svg" },
    { id: 16, name: "DEEL", logo: "/logos/deel.svg" },
    { id: 17, name: "HubSpot", logo: "/logos/hubspot.svg" },
    { id: 18, name: "American Vintage", logo: "/logos/americanvintage.png" },
    { id: 19, name: "HEC", logo: "/logos/hec.png" },
    { id: 20, name: "Pompiers de Paris", logo: "/logos/pompiers.jpeg" },
    { id: 21, name: "Kering", logo: "/logos/kering.svg" },
    { id: 22, name: "LFP", logo: "/logos/lfp.png" },
  ];

  return (
    <section className="py-12 overflow-hidden">
      <div className="container mx-auto mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#FF6727]">
          Ils nous font confiance
        </h2>
      </div>

      {/* Première ligne - défilement de gauche à droite */}
      <div className="relative mb-8">
        <div className="flex animate-scroll-left">
          {[...clientsRow1, ...clientsRow1].map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="flex-shrink-0 mx-6 md:mx-8"
            >
              <div className="w-32 h-20 md:w-40 md:h-24 flex items-center justify-center">
                <Image
                  src={client.logo}
                  alt={`Logo ${client.name}`}
                  width={160}
                  height={80}
                  className="max-h-16 md:max-h-20 w-auto object-contain grayscale opacity-70 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deuxième ligne - défilement de droite à gauche */}
      <div className="relative">
        <div className="flex animate-scroll-right">
          {[...clientsRow2, ...clientsRow2].map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="flex-shrink-0 mx-6 md:mx-8"
            >
              <div className="w-32 h-20 md:w-40 md:h-24 flex items-center justify-center">
                <Image
                  src={client.logo}
                  alt={`Logo ${client.name}`}
                  width={160}
                  height={80}
                  className="max-h-16 md:max-h-20 w-auto object-contain grayscale opacity-70 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto mt-12 text-center">
        <p className="text-lg mb-6 text-gray-700">
          Rejoignez les entreprises qui nous font confiance pour leurs
          événements
        </p>
        <a href="/contact-entreprise">
          <Button className="bg-[#FF6727] hover:bg-[#FF6727] hover:opacity-90 text-white px-8 py-6 !rounded-button whitespace-nowrap cursor-pointer">
            Organiser mon événement
          </Button>
        </a>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
