'use client'
import { Button } from './ui/Button'


export default function OpeningHours() {
  return (
    <div className="container py-10 md:my-20 flex flex-col justify-center space-y-4">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-green-600 to-green-600 bg-clip-text text-transparent">
        Nos horaires d'ouverture
      </h2>
      <div className="flex items-center space-x-4">
          {/* Link to app store */}
          <Button className="bg-green-700 hover:bg-green-800">Télécharger sur iPhone</Button>
          {/* Link to google play store */}
          <Button className="bg-orange-600 hover:bg-orange-700">Télécharger sur Android</Button>
        </div>
    </div>
  )
}
