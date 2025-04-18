'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from './ui/Button'
import { ButtonDownloadApp } from "./ui/ButtonDowloadApp"
import Image from 'next/image'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky transform transition-all duration-300 top-0 z-50 ${isScrolled ? 'bg-white text-black shadow-md' : 'bg-transparent text-white'}`}>
      <div className="container py-4 flex justify-between items-center">
        <Link href="/" >
          <Image 
          src="../logo.svg" 
          alt="Logo" 
          width={120}
          height={50}
          className='h-full' />
        </Link>
        <div className="hidden lg:flex items-center">
          <div className='flex items-center space-x-12'>
            <Link href="#club" className="hover:text-orange-600 font-medium text-lg">Le Club</Link>
            <Link href="#pricing" className="hover:text-orange-600 font-medium text-lg">Les Tarifs</Link>
            <Link href="#events" className="hover:text-orange-600 font-medium text-lg">Évènements</Link>
          </div>
        </div>
        <div className='hidden lg:flex items-center'>
          <Link href='#contact'>
            <Button className={`${isScrolled ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white text-orange-500 hover:bg-slate-100'} cursor-pointer`}>Contactez-nous</Button>
          </Link>
        </div>
          {/* mobile */}
          <button
            className={`lg:hidden text-orange-600 text-3xl z-[60] ${menuOpen ? 'fixed top-6 right-10' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5">
              <span
                className={`absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out 
                  ${menuOpen ? 'rotate-45 top-2.5' : 'top-0'}`}
              />
              <span
                className={`absolute h-0.5 w-full bg-current transition-all duration-300 ease-in-out 
                  ${menuOpen ? 'opacity-0' : 'top-2.5'}`}
              />
              <span
                className={`absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out 
                  ${menuOpen ? '-rotate-45 bottom-2.5' : 'bottom-0'}`}
              />
            </div>
          </button>
          {menuOpen && (
          <div className="fixed top-0 right-0 rounded h-screen w-3/4 text-black bg-white shadow-lg z-50 flex flex-col justify-between p-6">
            <div className='flex flex-col space-y-4 mt-12'>
              <Link href="#club" className="hover:text-orange-600" onClick={() => setMenuOpen(false)}>Le Club</Link>
              <Link href="#pricing" className="hover:text-orange-600" onClick={() => setMenuOpen(false)}>Les Tarifs</Link>
              <Link href="#events" className="hover:text-orange-600" onClick={() => setMenuOpen(false)}>Évènements</Link>
            </div>
            <div className='flex flex-col space-y-4'>
              <Link href='#contact' onClick={() => setMenuOpen(false)}>
                <Button className='bg-orange-500 hover:bg-orange-600 w-full'>Contactez-nous</Button>
              </Link>
              <ButtonDownloadApp />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
