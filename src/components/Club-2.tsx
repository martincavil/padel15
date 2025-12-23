"use client";

import Image from "next/image";
import { CarouselClub } from "./ui/CarouselClub";

const items = [
  {
    img: "/rest-inte-grand-angle.jpg",
    title: "Notre restaurant",
    description:
      "Ouvert 7j/7 en service continu, du petit-déjeuner au dîner, avec des produits frais et de saison. Un cadre chaleureux pour se détendre après un match… ou organiser vos séminaires, afterworks et événements privés dans un lieu unique au cœur de Paris.",
  },
  {
    img: "/guinguette.webp",
    title: "Terrasse & Guinguette",
    description: (
      <div>
        <p>Un espace à ciel ouvert au cœur de Paris :</p>
        <ul className="list-none">
          <li className="py-1">
            🌿 Terrasse végétalisée, guinguette colorée, espaces lounge et
            terrain de pétanque.
          </li>
          <li className="py-1">
            L’endroit idéal pour se détendre, partager un verre et profiter
            d’une ambiance conviviale et dépaysante.
          </li>
          <li className="py-1">
            👉 Ouvert tous les jours – Privatisez l’espace pour vos événements.
          </li>
        </ul>
      </div>
    ),
  },
];

export default function Club() {
  return (
    <section id="club" className="container">
      <div>
        <h2 className="text-2xl  font-bold text-[#FF6727] mb-6">
          Padel15 : Nos terrains, notre club et restaurant
        </h2>
        <CarouselClub />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="h-80 overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  width={600}
                  height={400}
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <div className="text-sm text-gray-600">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
