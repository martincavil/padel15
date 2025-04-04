'use client'

import Image from 'next/image'

export default function Values() {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 py-10 md:my-20">
      <div>
        <Image 
          src="/7.jpg" 
          alt="Team Building" 
          width={1000}
          height={500}
          className="h-full rounded-lg shadow-lg" />
      </div>
        <div className='flex flex-col justify-center space-y-4'>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-green-600 to-green-600 bg-clip-text text-transparent">
          Nos Valeurs
        </h2>
        <p className="text-gray-700 mb-6">
          Chez Padel15, nous croyons en la passion, l'inclusion et le respect. 
          Rejoignez-nous pour vivre ces valeurs sur le terrain !
        </p>
      </div>
    </div>
  )
}
