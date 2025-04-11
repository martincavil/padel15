'use client'

import { ButtonDownloadApp } from "./ui/ButtonDowloadApp"

export default function HeroBanner() {
 

  return (
    <div className="relative h-screen">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-80 z-0"
        autoPlay
        loop
        muted
        src="/bg-video-test.mp4"
      />
      <div className="relative container h-full flex flex-col justify-center space-y-6 md:space-y-12 z-10">
        <h1 className="text-3xl md:text-6xl font-bold text-white">Padel15</h1>
        <h2 className="text-lg md:text-xl text-slate-300 max-w-2xl">
          Description du padel : Join the fastest growing racket sport at PADEL15. Premium courts, professional equipment, and an amazing atmosphere.
        </h2>
        <div className="flex items-center space-x-4">
          <ButtonDownloadApp />
        </div>
      </div>
    </div>
  )
}
