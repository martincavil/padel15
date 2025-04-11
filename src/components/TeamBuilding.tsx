'use client'

import Image from "next/image"
import { Button } from "./ui/Button"

export default function TeamBuilding() {
  return (
    <div id='events' className="scroll-mt-16 container grid grid-cols-1 md:grid-cols-2 gap-8 my-10 md:my-20">
      <div className="flex flex-col justify-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-green-600 to-green-600 bg-clip-text text-transparent">
          Team Building
        </h2>
        <p className="text-gray-700 mb-6">
          Organisez des événements de team building mémorables avec Padel15. 
          Renforcez la cohésion d'équipe tout en vous amusant sur le court !
        </p>
        <a href="#contact">
          <Button className="w-full md:w-fit">Contactez-nous</Button>
        </a>
      </div>
      <div>
        <Image 
        src="/6.jpg" 
        alt="Team Building" 
        width={1000}
        height={500}
        className="h-full rounded-lg shadow-lg" />
      </div>
    </div>
  )
}
