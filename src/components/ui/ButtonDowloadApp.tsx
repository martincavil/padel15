"use client";

import { useState, useEffect } from "react";
import { Button } from "./Button";

export function ButtonDownloadApp() {
  const [isMobile, setIsMobile] = useState(false);
  const [storeLink, setStoreLink] = useState<string>("");
  const [storeLabel, setStoreLabel] = useState<string>("Réserver un terrain");

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroid = /android/.test(userAgent);
    const isIOS = /iphone|ipad|ipod|macintosh|mac os x/.test(userAgent);
    const mobileCheck = isAndroid || isIOS;

    setIsMobile(mobileCheck);

    if (isAndroid) {
      setStoreLink(
        "https://play.google.com/store/apps/details?id=com.trenicom.padel15"
      );
      setStoreLabel("Réserver un terrain");
    } else if (isIOS) {
      setStoreLink("https://apps.apple.com/fr/app/padel-15/id6738955590");
      setStoreLabel("Réserver un terrain");
    } else {
      setStoreLink("https://www.anybuddyapp.com/club-padel-15-paris");
      setStoreLabel("Réserver un terrain");
    }
  }, []);

  const handleClick = () => {
    if (!storeLink) return;

    if (isMobile) {
      window.open(storeLink, "_blank");
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <Button
      size="lg"
      className="bg-green-700 hover:bg-green-800 cursor-pointer px-8 py-6 !text-base"
      onClick={handleClick}
    >
      {storeLabel}
    </Button>
  );
}
