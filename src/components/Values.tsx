"use client";
import {
  UserGroupIcon,
  PuzzlePieceIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/solid";

export default function Values() {
  const values = [
    {
      title: "Communauté",
      description: (
        <p>
          Chez <span className="font-semibold">Padel 15</span>, on ne vient pas
          juste jouer, on vient <span className="font-semibold">vivre</span>{" "}
          quelque chose ensemble. Un lieu où les passionné·e·s de padel, les
          amateur·rice·s de détente et les ami·e·s de passage se croisent,
          partagent un moment et créent du lien.
        </p>
      ),
      icon: <UserGroupIcon className="w-6 h-6" />,
      bgClass: "bg-orange-500/10",
      textClass: "text-orange-500",
    },
    {
      title: "Inclusif",
      description: (
        <p>
          Notre club est{" "}
          <span className="font-semibold">ouvert à tou·te·s</span>, sans
          barrière. Terrains accessibles, services pensés pour le confort de
          chacun·e, lieux inclusifs et faciles d'accès —{" "}
          <span className="font-semibold">en plein cœur de Paris.</span>
        </p>
      ),
      icon: <PuzzlePieceIcon className="w-6 h-6" />,
      bgClass: "bg-green-600/10",
      textClass: "text-green-600",
    },
    {
      title: "Fair Play",
      description: (
        <p>
          Le jeu, toujours dans le respect. Que ce soit sur le terrain ou en
          terrasse,{" "}
          <span className="font-semibold">
            l'esprit fair play, la bienveillance et la bonne humeur
          </span>{" "}
          sont les fondations de l'expérience Padel 15.
        </p>
      ),
      icon: <FaceSmileIcon className="w-6 h-6" />,
      bgClass: "bg-orange-500/10",
      textClass: "text-orange-500",
    },
  ];

  return (
    <section id="values" className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-buzz mb-4 font-bold text-[#FF6727]">
          Nos Valeurs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div className="text-center group" key={index}>
              <div className="mb-4 flex justify-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${value.bgClass} ${value.textClass}`}
                >
                  {value.icon}
                </div>
              </div>
              <h3 className="font-semibold mb-2">{value.title}</h3>
              <div className="text-gray-600 text-sm">{value.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
