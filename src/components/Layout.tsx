'use client'

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from './Navbar'
import { Footer } from './layout/Footer'
import { StickyMobileCTA } from './shared/StickyMobileCTA'
import { CookieBanner } from './shared/CookieBanner'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex-1 w-full overflow-x-hidden"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <StickyMobileCTA />
      <CookieBanner />
    </div>
  )
}
