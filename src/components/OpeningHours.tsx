'use client'
import Image from 'next/image'
import { Card} from './ui/Card'
import { ButtonDownloadApp } from './ui/ButtonDowloadApp'


export default function OpeningHours() {
  return (
    <div id='pricing' className="scroll-mt-16 container flex flex-col justify-center space-y-6">
      <h2 className="text-2xl  font-bold text-[#FF6727]">
        Nos horaires d&apos;ouverture & Tarifs
      </h2>
      <div className='flex flex-col space-y-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
          <Image 
            src="/padel-ext.jpg" 
            alt="Team Building" 
            width={800}
            height={500}
            className="h-full rounded-lg shadow-lg" />
          <Card>
            <h3 className='text-lg font-medium'>Horaires d’ouverture</h3>
            <ul className='mb-2'>
              <li className="font-medium">🕗 7j/7, de 8h à 22h</li>
              <li className="font-medium">Location de raquettes et vente de balles disponibles sur place.</li>
              <li className="font-medium">2 Terrains Indoor/Outdoor</li>
            </ul>
            <h3 className='text-lg font-medium'>Prix : </h3>
            <ul>
              <li className="font-medium">50€/heure en heure creuse (8h-12h et 14h-16h du lundi au vendredi) </li>
              <li className="font-medium">60€/heure (12h/14h, 16h/22h et week-end) </li>
            </ul>
            <ButtonDownloadApp />
          </Card>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12'>
          <div className='order-1 md:order-0'>
          <Card>
            <ul>
              <li>🚲 Garage à vélo sécurisé</li>
              <li>🚿 Vestiaires, douches et toilettes à disposition</li>
              <li>🛋️ Espace détente intérieur/Restaurant/Terrasse/Guinguette</li>
              <li>💻 Coin coworking pour télétravailler dans une ambiance </li>
              <li>💧 Fontaine à eau en libre-service</li>
              <li>♿ Site entièrement accessible aux personnes à mobilité réduite</li>
            </ul>
          </Card>
          </div>
          <Image 
            src="/raquettes-1.jpg" 
            alt="Team Building" 
            width={600}
            height={400}
            className="h-[500px] rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  )
}
