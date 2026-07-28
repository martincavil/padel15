import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
    remotePatterns: [
      // Cloudinary (vidéos + images)
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/entreprises",
        destination: "/evenements",
        permanent: true,
      },
    ];
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
      {
        // Vidéos dans /public — cache 1 an immutable.
        // ⚠️ Le nom de fichier DOIT être versionné (…-v2.mp4, …-v3.mp4) à chaque
        // remplacement : sans changement d'URL, les visiteurs conservent
        // l'ancienne vidéo en cache pendant un an.
        source: "/:path*.(mp4|webm)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
