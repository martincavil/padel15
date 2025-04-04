'use client'
import { CarouselClub} from './ui/CarouselClub'

export default function Club() {
  return (
    <div className="container py-10 md:my-20 flex flex-col justify-center space-y-4">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-green-600 to-green-600 bg-clip-text text-transparent">
        Padel15 : Nos terrains, notre club et restaurant
      </h2>
     <CarouselClub />
    </div>
  )
}
