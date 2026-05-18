"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { ButtonDownloadApp } from "./ui/ButtonDowloadApp";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsScrolled(false);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    // Écoute l'événement de scroll
    window.addEventListener("scroll", handleScroll);

    // Appel initial pour définir l'état correct
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloque le scroll quand le menu est ouvert
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflowX = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflowX = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflowX = "";
    };
  }, [menuOpen]);

  // Gestion du smooth scroll pour les ancres
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full",
        "transition-all duration-300",
        isScrolled
          ? "bg-white text-black shadow-md"
          : "bg-transparent text-white"
      )}
    >
      <div className="container py-4 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={120}
            height={50}
            className={cn(
              "h-full",
              isScrolled ? "" : "filter brightness-0 invert"
            )}
          />
        </Link>

        {/* Navigation desktop */}
        <div className="hidden lg:flex items-center gap-12">
          <a
            href="#club"
            onClick={(e) => handleAnchorClick(e, "club")}
            className="hover:text-orange-600 font-medium text-lg cursor-pointer"
          >
            Le Club
          </a>
          <a
            href="#pricing"
            onClick={(e) => handleAnchorClick(e, "pricing")}
            className="hover:text-orange-600 font-medium text-lg cursor-pointer"
          >
            Les Tarifs
          </a>
          <a href="#cours" onClick={(e) => handleAnchorClick(e, "cours")}>
            <Button
              className={cn(
                "cursor-pointer",
                isScrolled
                  ? "bg-[#FF6727] hover:bg-orange-600"
                  : "bg-white text-black hover:bg-slate-100"
              )}
            >
              Cours
            </Button>
          </a>
          <a
            href="#events"
            onClick={(e) => handleAnchorClick(e, "events")}
            className="hover:text-orange-600 font-medium text-lg cursor-pointer"
          >
            Évènements
          </a>
          <a href="#contact" onClick={(e) => handleAnchorClick(e, "contact")}>
            <Button
              className={cn(
                "cursor-pointer",
                isScrolled
                  ? "bg-[#FF6727] hover:bg-orange-600"
                  : "bg-white text-black hover:bg-slate-100"
              )}
            >
              Contactez-nous
            </Button>
          </a>
          <Link href="https://www.instagram.com/padel15club/?hl=fr">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className={cn(
                isScrolled ? "text-black" : "text-white",
                "hover:text-orange-600",
                "lucide lucide-instagram-icon lucide-instagram"
              )}
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </Link>
        </div>

        {/* Bouton mobile */}
        <button
          className="lg:hidden text-orange-600 text-2xl z-[60]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <XMarkIcon className="w-6 text-[#FF6727]" />
          ) : (
            <Bars3Icon
              className={cn(
                "w-6",
                isScrolled ? "text-orange-600" : "text-white"
              )}
            />
          )}
        </button>

        {/* Menu mobile */}
        <div
          className={cn(
            "fixed top-0 right-0 h-full w-full max-w-xs text-black bg-white shadow-lg z-50",
            "flex flex-col justify-between p-6",
            "transition-transform duration-300 ease-in-out",
            "overflow-y-auto", // Scroll vertical seulement si nécessaire
            menuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col space-y-4 mt-12">
            <a
              href="#club"
              onClick={(e) => handleAnchorClick(e, "club")}
              className="hover:text-orange-600 cursor-pointer"
            >
              Le Club
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleAnchorClick(e, "pricing")}
              className="hover:text-orange-600 cursor-pointer"
            >
              Les Tarifs
            </a>
            <a
              href="#cours"
              onClick={(e) => handleAnchorClick(e, "cours")}
              className="font-semibold text-[#FF6727] cursor-pointer"
            >
              🎾 Réserver un cours
            </a>
            <a
              href="#events"
              onClick={(e) => handleAnchorClick(e, "events")}
              className="hover:text-orange-600 cursor-pointer"
            >
              Évènements
            </a>
          </div>
          <div className="flex flex-col space-y-4 pb-8">
            <a href="#contact" onClick={(e) => handleAnchorClick(e, "contact")}>
              <Button className="bg-[#FF6727] hover:bg-orange-600 w-full">
                Contactez-nous
              </Button>
            </a>
            <ButtonDownloadApp />
          </div>
        </div>

        {/* Overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300",
            menuOpen ? "opacity-100 block" : "opacity-0 hidden"
          )}
          onClick={() => setMenuOpen(false)}
        />
      </div>
    </nav>
  );
}
