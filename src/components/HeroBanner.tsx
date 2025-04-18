'use client'

import { ButtonDownloadApp } from "./ui/ButtonDowloadApp"

export default function HeroBanner() {
 

  return (
    <div className="h-screen max-h-screen">
      <video
        className="absolute top-0 left-0 right-0 w-full h-screen md:h-fit object-cover opacity-90 z-0"
        autoPlay
        loop
        muted
        src="/bg-video-test.mp4"
      />
      <div className="relative container h-full flex flex-col justify-center space-y-6 md:space-y-10 z-10">
        <h1 className="text-5xl md:text-[200px] font-bold text-white text-center">Padel15</h1>
        <h2 className="text-lg md:text-xl text-slate-100 max-w-3xl text-center mx-auto">
        Votre club de padel au cœur de Paris, où sport, design et lifestyle se rencontrent.
        Padel 15 vous accueille dans un lieu unique, pensé pour les passionnés de sport comme pour les amateurs de détente.
        </h2>
        <div className="mx-auto">
          <ButtonDownloadApp />
        </div>
      </div>
    </div>
  )
}
