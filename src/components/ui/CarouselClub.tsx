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
      src: "/rest-inte-grand-angle.jpg",
      alt: "Club 1",
    },
    {
      id: 2,
      src: "/rest-inte-terrain.jpg",
      alt: "Club 3",
    },
    {
      id: 3,
      src: "/rest-ext.jpg",
      alt: "Club 4",
    },
    {
      id: 4,
      src: "/rest-inte-bar.jpg",
      alt: "Club 2",
    },
  ]

  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{ loop: true }}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {medias?.map((img, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2">
            <div className="p-1 w-full">
              <Image 
                src={img.src}
                alt="Padel15" 
                width={1000}
                height={500}
                className="h-full w-full rounded-lg shadow-lg" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
