import type { MetadataRoute } from "next";
import { essays } from "@/lib/essays";
import { scenarios } from "@/lib/scenarios";
import { siteConfig } from "@/lib/site-config";

/**
 * Dynamic XML sitemap served at `/sitemap.xml`. Reads from the canonical
 * data files (`lib/essays.ts`, `lib/scenarios.ts`) so newly-published
 * content is picked up automatically on the next build.
 *
 * Priority + changeFrequency hints follow the rough hierarchy:
 *   home / install pages → fresh, highest authority
 *   index pages          → catalogues, change as content lands
 *   long-form content    → essays, scenarios, reference material
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/skill`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/concepts`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/scenarios`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/playground`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/ai`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/glossary`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/references`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const essayPages: MetadataRoute.Sitemap = essays
    .filter((e) => e.status === "published")
    .map((essay) => ({
      url: `${base}/concepts/${essay.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const scenarioPages: MetadataRoute.Sitemap = scenarios
    .filter((s) => s.status === "published")
    .map((scenario) => ({
      url: `${base}/scenarios/${scenario.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...staticPages, ...essayPages, ...scenarioPages];
}
