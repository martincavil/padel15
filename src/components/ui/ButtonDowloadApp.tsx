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
    // Exclude MacOS from iOS detection - only detect actual iOS devices
    const isIOS =
      /iphone|ipad|ipod/.test(userAgent) &&
      !/macintosh|mac os x/.test(userAgent);
    const mobileCheck = isAndroid || isIOS;

    setIsMobile(mobileCheck);

    if (isAndroid) {
      setStoreLink(
        "https://play.google.com/store/apps/details?id=com.playtomic&hl=fr"
      );
      setStoreLabel("Réserver un terrain");
    } else if (isIOS) {
      setStoreLink(
        "https://apps.apple.com/fr/app/playtomic-play-padel/id1242321076"
      );
      setStoreLabel("Réserver un terrain");
    } else {
      setStoreLink("https://playtomic.com/clubs/padel-15");
      setStoreLabel("Réserver un terrain");
    }
  }, []);

  const handleClick = () => {
    if (!storeLink) return;
    window.open(storeLink, "_blank");
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
