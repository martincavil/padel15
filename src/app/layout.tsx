import '@/styles/globals.css'
import type { Metadata } from 'next'
import Layout from '@/components/Layout'

export const metadata: Metadata = {
  title: 'Padel15 - Vos terrains de padel à Paris',
  description: 'Padel 15 - Réservation de terrains de padel dans le 15ème arrondissement de Paris',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="scroll-smooth">
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
