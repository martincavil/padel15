'use client'

import { useState, useEffect } from 'react';
import { Button } from './Button';

export function ButtonDownloadApp() {
  const [storeLink, setStoreLink] = useState<string>("")
  const [storeLabel, setStoreLabel] = useState<string>("Réserver un terrain")

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor

    if (/android/i.test(userAgent)) {
      setStoreLink("https://play.google.com/store/apps/details?id=com.trenicom.padel15&hl=fr_UY&pli=1") // 🔁 remplace par ton lien Play Store
      setStoreLabel("Réserver un terrain")
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      setStoreLink("https://apps.apple.com/fr/app/padel-15/id6738955590?l=fr-FR") // 🔁 remplace par ton lien App Store
      setStoreLabel("Réserver un terrain")
    } else {
      setStoreLink("https://padel15.com") // 🔁 remplace par ton lien de réservation
      setStoreLabel("Réserver un terrain") 
    }
  }, [])

  return (
    <Button
      size='lg'
      className="bg-green-700 hover:bg-green-800 cursor-pointer"
      onClick={() => window.location.href = storeLink}
    >
      {storeLabel}
    </Button>
  )
}
