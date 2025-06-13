'use client'

import Navbar from './Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear()

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      
      <main className="flex-1 w-full overflow-x-hidden">
        {children}
      </main>

      <footer className="bg-gray-100 text-center text-sm py-4 text-gray-500 w-full">
        © {year} Padel15. Tous droits réservés.
      </footer>
    </div>
  )
}