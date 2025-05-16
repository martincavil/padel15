'use client'
import Image from 'next/image'
import { Card} from './ui/Card'
import { ButtonDownloadApp } from './ui/ButtonDowloadApp'


export default function OpeningHours() {
  return (
    <div id='pricing' className="scroll-mt-16 container flex flex-col justify-center space-y-6">
      <h2 className="text-2xl  font-bold text-[#FF6727]">
        Nos horaires d'ouverture & Tarifs
      </h2>
      <div className='flex flex-col space-y-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12'>
          <Image 
            src="/padel-ext.jpg" 
            alt="Team Building" 
            width={800}
            height={500}
            className="h-full rounded-lg shadow-lg" />
          <Card>
            <h3 className='text-lg font-medium'>Horaires d’ouverture</h3>
            <div>
              <p className="font-medium">Lundi au Dimanche</p>
              <p className="font-medium">8H - 22H</p>
              <p className="font-medium">2 Terrains Indoor/Outdoor</p>
            </div>
            <ButtonDownloadApp />
          </Card>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12'>
          <Card>
            <h3 className='text-lg font-medium'>Tarifs</h3>
            <div>
              <p className="font-medium">60€ / 1 heure</p>
              <p className="font-medium">Location de raquettes et de balles sur place</p>
            </div>
            <ButtonDownloadApp />
          </Card>
          <Image 
            src="/raquettes-1.jpg" 
            alt="Team Building" 
            width={800}
            height={500}
            className="h-full rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  )
}
