import { siteConfig } from "@/lib/site-config";

/**
 * Inline `<script type="application/ld+json">` for structured data.
 * Pass a typed Schema.org object; serialised via `JSON.stringify`.
 *
 * Defensive escape: `<` → `<` and `>` → `>` in the JSON
 * payload so that any field value containing `</script>` (or HTML
 * comment patterns) can't break out of the script tag. Today all
 * inputs are static and trusted, but the cost is one regex per render
 * — cheaper than retrofitting the day user-generated content enters
 * the schema.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const payload = JSON.stringify(data)
    .replace(/</g, "\\u003C")
    .replace(/>/g, "\\u003E");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: payload }}
    />
  );
}

/**
 * `Article` schema for essays. Includes author + publisher so search
 * results can show the byline and the site's brand.
 */
export function articleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  // Omit datePublished entirely when not provided — Google prefers a
  // missing field to a misleading one. Same for dateModified.
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    image: `${siteConfig.url}/opengraph-image`,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

/**
 * `BreadcrumbList` schema. Pass crumbs in order from root to current
 * page; the function fills in positions and absolute URLs.
 */
export function breadcrumbSchema(
  crumbs: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${siteConfig.url}${c.path}`,
    })),
  };
}

/**
 * `FAQPage` schema for glossary-style "what is X" content. Each entry
 * becomes a Question / Answer pair search engines can surface as a
 * rich result.
 */
export function faqSchema(
  entries: { question: string; answer: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

/**
 * `WebSite` schema for the homepage. Includes a SearchAction so search
 * engines learn where to send `site:` queries.
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
  };
}
