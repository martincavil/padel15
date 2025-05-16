'use client'

import Image from "next/image"


const items = [
  { img: '/terrain-ext-1.jpg', 
    title: 'Nos terrains',
    description: 'Nous vous proposons 2 terrains dernière génération avec toits ouvrants pour profiter en toute conditions de votre sport favori !'
   },
  { img: '/terrain-inte-1.jpg', 
    title: 'Terrain intérieur',
    description: 'Descriptipon du terrain....'
   },
]

export default function Club() {

  return (
        <section id="club" className="container">
          <div>
            <h2 className="text-2xl  font-bold text-[#FF6727] mb-6">
            Padel15 : Nos terrains, notre club et restaurant
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {items.map((item, index) => (
              <div key={index} className="group overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
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
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
              ))}
          </div>
          <div className="group overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl mx-auto w-full">
            <div className="h-80 overflow-hidden">
              <Image
                src='/rest-inte-grand-angle.jpg'
                alt='Notre restaurant'
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                width={600}
                height={400}
              />
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-xl font-semibold mb-2">Notre restaurant</h3>
              <p className="text-gray-600">Venez vous raffraichir après votre match dans notre restaurant !</p>
            </div>
          </div>
        </div>
      </section>
  )
}
