'use client'

import { Button } from "./ui/Button"


export default function TeamBuilding() {
  const cards = [ 
    {
      title: "Évenements d'entreprise",
      description: 'Customized team building activities with optional catering and private courts.'
    },
    {
      title: "Cours particuliers",
      description: 'Customized team building activities with optional catering and private courts.'
    },
    {
      title: "Tournois",
      description: 'Customized team building activities with optional catering and private courts.'
    },
  ]
  return (
    <section id="events" className="relative scroll-mt-24 py-12">
    <div className="absolute inset-0 bg-black opacity-70 z-10"/>
    <div
      className="absolute inset-0 bg-cover bg-center z-0"
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=Corporate%20team%20building%20event%20on%20padel%20court%2C%20diverse%20group%20of%20professionals%20in%20casual%20attire%20playing%20and%20laughing%20together%2C%20modern%20sports%20facility%20with%20glass%20walls%2C%20team%20bonding%20activity%2C%20professional%20photography%20with%20natural%20lighting%2C%20wide%20angle%20view%20capturing%20the%20group%20dynamics%20and%20energy&width=1440&height=600&seq=5&orientation=landscape')`,
      }}
    />
    <div className="container mx-auto px-4 relative z-20">
      <div className="max-w-2xl mx-auto text-center text-white">
      <h2 className="text-2xl  font-bold text-white mb-6">Team Building & Évenements</h2>
        <p className="text-lg opacity-90 mb-8">
        Organisez des événements de team building mémorables avec Padel15. 
        Renforcez la cohésion d'équipe tout en vous amusant sur le court !
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {cards.map((card, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm text-white p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
        <a href="#contact">
          <Button className="bg-[#FF6727] hover:bg-[#FF6727] hover:opacity-90 text-white px-8 py-6 text-lg !rounded-button whitespace-nowrap cursor-pointer">
            Contactez-nous
          </Button>
        </a>
      </div>
    </div>
  </section>
  )
}
