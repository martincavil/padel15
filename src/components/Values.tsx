'use client'
import { UserGroupIcon, PuzzlePieceIcon, FaceSmileIcon } from '@heroicons/react/24/solid'

export default function Values() {
  const values = [
    {
      title: "Communauté",
      description:<p>Chez <span className='font-semibold'>Padel 15</span>, on ne vient pas juste jouer, on vient <span className='font-semibold'>vivre</span> quelque chose ensemble. Un lieu où les passionné·e·s de padel, les amateur·rice·s de détente et les ami·e·s de passage se croisent, partagent un moment et créent du lien.</p>,
      icon: <UserGroupIcon className="w-10 h-10" />,
      bgClass: "bg-orange-500/10",
      textClass: "text-orange-500"
    },
    {
      title: "Inclusif",
      description:
      <p>
        Notre club est <span className='font-semibold'>ouvert à tou·te·s</span>, sans barrière.
        Terrains accessibles, services pensés pour le confort de chacun·e, lieux inclusifs et faciles d’accès — <span className='font-semibold'>en plein cœur de Paris.</span>
      </p>,
      icon: <PuzzlePieceIcon className="w-10 h-10" />,
      bgClass: "bg-green-600/10",
      textClass: "text-green-600"
    },
    {
      title: "Fair Play",
      description: 
      <p>
        Le jeu, toujours dans le respect.
        Que ce soit sur le terrain ou en terrasse, <span className='font-semibold'>l’esprit fair play, la bienveillance et la bonne humeur</span> sont les fondations de l’expérience Padel 15.
      </p>,
      icon: <FaceSmileIcon className="w-10 h-10" />,
      bgClass: "bg-orange-500/10",
      textClass: "text-orange-500"
    },
  ]

  return (
    <section id="values" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl  font-bold text-[#FF6727] mb-6">Nos Valeurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {values.map((value, index) => (
            <div className="text-center group" key={index}>
              <div className="mb-6 text-5xl flex justify-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${value.bgClass} ${value.textClass}`}>
                  {value.icon}
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3">{value.title}</h3>
              <div className="text-gray-600">{value.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
