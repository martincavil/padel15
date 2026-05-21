"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
}

interface LightboxGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}

export function LightboxGallery({ images, columns = 3 }: LightboxGalleryProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  const openAt = (index: number) => {
    setActiveIndex(index);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, prev, next]);

  const colClass = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  }[columns];

  return (
    <>
      {/* Grid */}
      <div className={`grid ${colClass} gap-3`}>
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => openAt(i)}
            className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand hover:border-2 hover:border-brand transition-all duration-300"
            aria-label={`Voir ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes={
                columns === 2 ? "(max-width: 640px) 50vw, 50vw"
                : columns === 4 ? "(max-width: 640px) 50vw, 25vw"
                : "(max-width: 640px) 50vw, 33vw"
              }
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center" />
          </button>
        ))}
      </div>

      {/* Lightbox — rendu via portal au niveau document.body pour éviter
          le containing block créé par transform CSS des parents (AnimatedSection) */}
      {mounted && createPortal(
        <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={() => setOpen(false)}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              onClick={() => setOpen(false)}
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {activeIndex + 1} / {images.length}
            </div>

            {/* Prev */}
            <button
              className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Photo précédente"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[85vh] w-full mx-16"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                width={1200}
                height={800}
                className="object-contain w-full max-h-[85vh] rounded-lg"
              />
              {images[activeIndex].alt && (
                <p className="text-white/60 text-sm text-center mt-3">
                  {images[activeIndex].alt}
                </p>
              )}
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Photo suivante"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dot strip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(i);
                  }}
                  className={`rounded-full transition-all ${i === activeIndex ? "w-5 h-1.5 bg-brand" : "w-1.5 h-1.5 bg-white/40"}`}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
