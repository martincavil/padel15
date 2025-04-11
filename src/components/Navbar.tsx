'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from './ui/Button'
import { ButtonDownloadApp } from "./ui/ButtonDowloadApp"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-orange-600">Padel <span className='text-green-700'>15</span></Link>
        <button 
          className="lg:hidden text-orange-600 text-3xl" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <div className="hidden lg:flex space-x-4">
          <Link href="#club" className="hover:text-orange-600">Le Club</Link>
          <Link href="#pricing" className="hover:text-orange-600">Les Tarifs</Link>
          <Link href="#events" className="hover:text-orange-600">Évènements</Link>
          <ButtonDownloadApp />
          <Link href='#contact'>
            <Button className='bg-orange-500 hover:bg-orange-600'>Contactez-nous</Button>
          </Link>
        </div>
      </div>
      {menuOpen && (
        <div className="fixed top-0 right-0 h-full w-3/4 bg-white shadow-lg z-50 flex flex-col p-6 space-y-4">
          <button 
            className="self-end text-orange-600 text-3xl" 
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          <Link href="#club" className="hover:text-orange-600" onClick={() => setMenuOpen(false)}>Le Club</Link>
          <Link href="#pricing" className="hover:text-orange-600" onClick={() => setMenuOpen(false)}>Les Tarifs</Link>
          <Link href="#events" className="hover:text-orange-600" onClick={() => setMenuOpen(false)}>Évènements</Link>
          <ButtonDownloadApp />
          <Link href='#contact' onClick={() => setMenuOpen(false)}>
            <Button className='bg-orange-500 hover:bg-orange-600'>Contactez-nous</Button>
          </Link>
        </div>
      )}
    </nav>
  )
}
