import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Sanity utilise useEffectEvent qui n'est pas dans React 19 stable.
  // serverExternalPackages empêche webpack de bundler sanity côté serveur
  // et de tomber sur cette API manquante.
  serverExternalPackages: ["sanity", "@sanity/vision", "next-sanity"],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
    remotePatterns: [
      // Sanity CDN
      { protocol: "https", hostname: "cdn.sanity.io" },
      // Cloudinary (vidéos + images)
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async headers() {
    return [
      {
        // Security headers — toutes les routes
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Assets statiques immutables (hachés par Next.js)
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Images et fonts dans /public
        source: "/:path*.(webp|avif|jpg|png|svg|woff2|woff|otf|ico)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
};

export default nextConfig;
