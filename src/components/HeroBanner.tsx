'use client'

import { ButtonDownloadApp } from "./ui/ButtonDowloadApp"
import Image from "next/image"
export default function HeroBanner() {
 

  return (
    <div className="h-screen max-h-screen">
      <video
        className="absolute top-0 left-0 right-0 w-full h-screen md:h-fit object-cover z-10"
        autoPlay
        loop
        muted
        src="/bg-video-test.mp4"
      />
      <div className="relative container h-full flex flex-col justify-center space-y-6 md:space-y-8 z-10">
        <div className="relative">
          <Image
            src="/logo.svg"
            alt='Logo Padel 15'
            width={500}
            height={500}
            className="mx-auto filter brightness-0 invert"
          />
        </div>
        <h2 className="text-lg text-slate-100 max-w-3xl text-center mx-auto">
        <span className="font-medium">
          L’art de vivre le padel à Paris.
        </span>
        <br />
        <span className="font-medium">
        Un club d’exception où sport, élégance et convivialité se rencontrent.
        </span>
        <br />
          Dans un écrin végétalisé en plein cœur de la capitale, jouez, partagez, détendez-vous… et savourez chaque instant.
          Terrains couvert et haut de gamme, terrasse guinguette, pétanque, fléchettes, bar et restaurant
        </h2>
        <div className="mx-auto">
          <ButtonDownloadApp />
        </div>
      </div>
    </div>
  )
}
