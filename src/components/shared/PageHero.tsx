// src/components/shared/PageHero.tsx
import Image from "next/image";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  imageSrc?: string;
  imageAlt?: string;
  height?: "md" | "lg";
}

export function PageHero({
  title,
  subtitle,
  badge,
  imageSrc,
  imageAlt,
  height = "md",
}: PageHeroProps) {
  const heightClass = height === "lg" ? "h-80 md:h-[520px]" : "h-64 md:h-96";

  return (
    <div className={`relative ${heightClass} overflow-hidden`}>
      {imageSrc ? (
        <>
          <Image
            src={imageSrc}
            alt={imageAlt ?? title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/55" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-900">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-brand/10 blur-3xl" />
        </div>
      )}
      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-8 text-white px-4 text-center">
        {badge && (
          <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-brand/20 text-brand border border-brand/30">
            {badge}
          </span>
        )}
        <h1 className="font-buzz text-4xl md:text-6xl mb-3">{title}</h1>
        {subtitle && (
          <p className="text-white/80 max-w-xl text-lg">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
