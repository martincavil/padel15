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
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const textColor = isScrolled ? "text-black" : "text-white";
  const logoFilter = isScrolled ? "" : "filter brightness-0 invert";

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 animate-page-in",
        isScrolled ? "bg-white shadow-md" : "bg-transparent",
      )}
    >
      <div className="container py-4 flex justify-between items-center">
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

        {/* Mobile hamburger */}
        <button
          className="xl:hidden z-[60]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? (
            <XMarkIcon className="w-6 text-brand" />
          ) : (
            <Bars3Icon
              className={cn("w-6", isScrolled ? "text-brand" : "text-white")}
            />
          )}
        </button>

        {/* Mobile drawer */}
        <div
          className={cn(
            "fixed top-0 right-0 h-full w-full max-w-xs bg-white text-black shadow-lg z-50",
            "flex flex-col justify-between p-6 overflow-y-auto",
            "transition-transform duration-300 ease-in-out",
            menuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex flex-col space-y-5 mt-14">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "text-lg font-medium hover:text-brand transition-colors",
                  pathname === link.href && "text-brand font-semibold",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3 pb-8">
            <a
              href="https://playtomic.com/clubs/padel-15"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <Button className="bg-brand hover:bg-brand-dark text-white w-full cursor-pointer">
                Réserver un terrain
              </Button>
            </a>
            <Link href="/evenements" onClick={() => setMenuOpen(false)}>
              <Button
                variant="outline"
                className="border-brand text-brand w-full cursor-pointer"
              >
                Organiser un événement
              </Button>
            </Link>
          </div>
        </div>

        {/* Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </div>
    </nav>
  );
}
