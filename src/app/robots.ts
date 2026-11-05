import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/studio", "/api/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
