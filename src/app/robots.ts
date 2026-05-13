import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * `/robots.txt` served at the site root. Allows all reputable crawlers
 * by default and points them at the canonical sitemap so they don't
 * have to discover it. Block the demo runtime artifacts that exist
 * only for hot-reload.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
