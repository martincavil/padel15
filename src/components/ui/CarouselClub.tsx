'use client'
import * as React from "react"

import Autoplay from "embla-carousel-autoplay"


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './Carousel'
import Image from "next/image"


export function CarouselClub() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000})
  )

  const medias = [
    {
      id: 1,
      src: "/terrain-ext-1.jpg",
      alt: "Club 1",
    },
    {
      id: 2,
      src: "/terrain-inte-1.jpg",
      alt: "Club 2",
    },
  ]

  return (
    <div className="rounded-lg shadow-lg bg-card overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        opts={{ loop: true }}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="">
          {medias?.map((img, index) => (
            <CarouselItem key={index} className="pl-1">
              <div className="p-1 w-full">
                <Image 
                  src={img.src}
                  alt="Padel15" 
                  width={560}
                  height={372}
                  className="h-[560px] w-full aspect-ratio rounded-t-lg" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">Nos terrains</h3>
        <p className="text-gray-600">
        2 terrains dernière génération, full panoramiques, entièrement couverts et hermétiques, jouables par tous les temps. Toits ouvrants pour profiter du soleil quand il est là ! Location de raquettes et vente de balles disponibles sur place.
        </p>
      </div>
    </div>

  )
}
