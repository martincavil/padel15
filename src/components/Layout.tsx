'use client'

import { usePathname } from "next/navigation";
import Navbar from './Navbar'
import { Footer } from './layout/Footer'
import { StickyMobileCTA } from './shared/StickyMobileCTA'
import { CookieBanner } from './shared/CookieBanner'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/studio");
  return (
    <div className="flex flex-col min-h-screen w-full">
      {!isStudio && <Navbar />}
      <main key={pathname} className="flex-1 w-full overflow-x-hidden animate-page-in">
        {children}
      </main>
      {!isStudio && <Footer />}
      {!isStudio && <StickyMobileCTA />}
      {!isStudio && <CookieBanner />}
    </div>
  )
}
