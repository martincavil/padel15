'use client'

import Link from 'next/link'
import { Button } from './ui/Button'

export default function Navbar() {
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-orange-600">Padel <span className='text-green-700'>15</span></Link>
        <div className="space-x-4">
          <Link href="#" className="hover:text-orange-600">Ancre 1</Link>
          <Link href="#" className="hover:text-orange-600">Ancre 2</Link>
          <Link href="#" className="hover:text-orange-600">Ancre 3</Link>
          {/* Button to download app */}
          <Button>Réserver un terrain</Button>
        </div>
      </div>
    </nav>
  )
}
