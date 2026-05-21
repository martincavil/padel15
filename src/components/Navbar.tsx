"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/terrains", label: "Terrains" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/coaching", label: "Coaching" },
  { href: "/evenements", label: "Événements" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/le-club", label: "Le Club" },
  // { href: "/blog", label: "Blog" }, // à activer quand les premiers articles sont publiés
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Initialisation correcte : transparent sur home (scroll=0), blanc ailleurs
  // Évite le flash blanc→transparent sur la homepage au premier rendu
  const [isScrolled, setIsScrolled] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
      return;
    }
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    document.body.dataset.menuOpen = menuOpen ? "true" : "";
    return () => {
      document.body.style.overflow = "";
      document.body.dataset.menuOpen = "";
    };
  }, [menuOpen]);

  const textColor = isScrolled ? "text-black" : "text-white";
  const logoFilter = isScrolled ? "" : "filter brightness-0 invert";

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full animate-page-in transition-all duration-300",
        isScrolled ? "pt-3 px-4" : "",
      )}
    >
      <div
        className={cn(
          "container flex justify-between items-center transition-all duration-300 rounded-2xl",
          isScrolled
            ? " bg-white/80 backdrop-blur-xl shadow-lg shadow-black/[0.06] py-3 px-6"
            : "py-4",
        )}
      >
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Padel 15"
            width={100}
            height={40}
            className={cn("h-auto", logoFilter)}
          />
        </Link>

        {/* Desktop nav links */}
        <div className={cn("hidden xl:flex items-center gap-5", textColor)}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-medium hover:text-brand transition-colors",
                pathname === link.href && "text-brand",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden xl:flex items-center gap-2">
          <a
            href="https://playtomic.com/clubs/padel-15"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="sm"
              className={cn(
                "cursor-pointer",
                isScrolled
                  ? "bg-brand hover:bg-brand-dark text-white"
                  : "bg-white text-black hover:bg-gray-100",
              )}
            >
              Réserver un terrain
            </Button>
          </a>
          <Link href="/evenements">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "cursor-pointer",
                isScrolled
                  ? "border-brand text-brand hover:bg-brand hover:text-white"
                  : "border-white text-white bg-transparent hover:bg-white hover:text-brand",
              )}
            >
              Organiser un événement
            </Button>
          </Link>
          <a
            href="https://www.instagram.com/padel15club/?hl=fr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Padel 15"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(textColor, "hover:text-brand transition-colors")}
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
        </div>

        {/* Mobile hamburger — affiche uniquement les barres, la croix est dans le drawer */}
        <button
          className="xl:hidden p-1"
          onClick={() => setMenuOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <Bars3Icon className={cn("w-6", isScrolled ? "text-gray-800" : "text-white")} />
        </button>
      </div>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile drawer — EN DEHORS du container backdrop-blur */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[85vw] max-w-sm z-50",
          "flex flex-col bg-white",
          "transition-transform duration-300 ease-in-out",
          menuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header drawer */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <Image src="/logo.svg" alt="Padel 15" width={80} height={32} className="h-auto" />
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer le menu"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "flex items-center justify-between px-3 py-3.5 rounded-xl text-base font-medium transition-colors",
                pathname === link.href
                  ? "bg-brand/8 text-brand"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              )}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="px-6 py-6 border-t border-gray-100 flex flex-col gap-3">
          <a
            href="https://playtomic.com/clubs/padel-15"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-3.5 rounded-xl text-center text-sm transition-colors"
          >
            Réserver un terrain
          </a>
          <Link
            href="/evenements"
            onClick={() => setMenuOpen(false)}
            className="w-full border border-brand text-brand hover:bg-brand hover:text-white font-semibold py-3.5 rounded-xl text-center text-sm transition-colors"
          >
            Organiser un événement
          </Link>
          <a
            href="https://www.instagram.com/padel15club/?hl=fr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-gray-400 hover:text-gray-600 text-sm transition-colors pt-1"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            @padel15club
          </a>
        </div>
      </div>
    </nav>
  );
}
