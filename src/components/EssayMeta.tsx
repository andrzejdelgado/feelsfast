import { JsonLd, articleSchema, breadcrumbSchema } from "@/components/JsonLd";
import { essays } from "@/lib/essays";
import { getEssayReadTime } from "@/lib/read-time";
import { siteConfig } from "@/lib/site-config";

/**
 * Read-time eyebrow + structured-data block rendered immediately
 * under the h1 in each Concepts essay. The eyebrow reads the MDX
 * source server-side at build time (via `getEssayReadTime`) so the
 * value stays in sync with the prose. The JSON-LD emits `Article`
 * and `BreadcrumbList` schemas using the essay's slug → title /
 * blurb lookup in `lib/essays.ts`.
 *
 * Slug is passed explicitly from each MDX page rather than read from
 * the route, so the component can stay a server component.
 */
export function EssayMeta({ slug }: { slug: string }) {
  const readTime = getEssayReadTime(slug);
  const essay = essays.find((e) => e.slug === slug);
  const url = `${siteConfig.url}/concepts/${slug}`;

  return (
    <>
      <p className="mt-3 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {readTime} min read
      </p>
      {essay ? (
        <>
          <JsonLd
            data={articleSchema({
              title: essay.title,
              description: essay.blurb,
              url,
              datePublished: essay.publishedAt,
            })}
          />
          <JsonLd
            data={breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Concepts", path: "/concepts" },
              { name: essay.title, path: `/concepts/${slug}` },
            ])}
          />
        </>
      ) : null}
    </>
  );
}
