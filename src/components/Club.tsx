'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { CarouselClub } from './ui/CarouselClub'

const images = [
  { src: '/terrain-ext-1.jpg', alt: 'Terrain extérieur' },
  { src: '/terrain-inte-1.jpg', alt: 'Terrain intérieur' },
  { src: '/terrain-inte-filet.jpg', alt: 'Terrain intérieur avec filet' },
  { src: '/terrain-match-1.jpg', alt: 'Match en cours' },
]

export default function Club2() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <div id='club' className="scroll-mt-16 container flex flex-col justify-center space-y-4">
      <h2 className="text-2xl  font-bold text-[#FF6727]">
        Padel15 : Nos terrains, notre club et restaurant
      </h2>
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-semibold mb-6 md:mb-20">Nos terrains</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 justify-self-center gap-4 md:gap-12">
          {images.map((img, index) => (
            <Dialog key={img.src}>
              <DialogTrigger asChild>
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  onClick={() => setSelectedImage(img.src)}
                  className={`w-full h-full rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-all duration-200 ${
                    index % 2 !== 0 ? 'md:-mt-12' : ''
                  }`}
                />
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
                <Image
                  src={selectedImage ?? ''}
                  alt="Zoom image"
                  width={1600}
                  height={1200}
                  className="!w-screen h-full rounded-lg"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl md:text-2xl font-semibold mb-12">Notre club house et restaurant</h3>
        <CarouselClub />
      </div>
    </div>
  )
}
