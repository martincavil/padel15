'use client'

import Navbar from './Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear()

  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <div>
        {children}
      </div>
      <footer className="bg-gray-100 text-center text-sm py-4 text-gray-500">
        {/* Ajouter Réseaux sociaux et autres */}
        © {year} Padel15. Tous droits réservés.
      </footer>
    </div>
  )
}
