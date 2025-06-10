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
      <head>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet"></link>
      </head>
      <body className="scroll-smooth font-sans">
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
