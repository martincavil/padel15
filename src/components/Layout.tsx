'use client'

import { usePathname } from "next/navigation";
import Navbar from './Navbar'
import { Footer } from './layout/Footer'
import { StickyMobileCTA } from './shared/StickyMobileCTA'
import { RestaurantBookingButton } from './shared/RestaurantBookingButton'
import { CookieBanner } from './shared/CookieBanner'
import type { SiteSettings } from '@/lib/settings'

export default function Layout({ children, settings }: { children: React.ReactNode; settings: SiteSettings }) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/studio");
  return (
    <div className="flex flex-col min-h-screen w-full">
      {!isStudio && <Navbar settings={settings} />}
      <main key={pathname} className="flex-1 w-full overflow-x-hidden animate-page-in">
        {children}
      </main>
      {!isStudio && <Footer settings={settings} />}
      {!isStudio && <StickyMobileCTA playtomicUrl={settings.playtomicUrl} />}
      {!isStudio && <RestaurantBookingButton />}
      {!isStudio && <CookieBanner />}
    </div>
  )
}
