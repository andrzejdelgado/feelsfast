import { JsonLd, articleSchema, breadcrumbSchema } from "@/components/JsonLd";
import { scenarios } from "@/lib/scenarios";
import { getScenarioReadTime } from "@/lib/read-time";
import { siteConfig } from "@/lib/site-config";

/**
 * Read-time eyebrow + structured-data block under the h1 of each
 * Scenario page. Mirrors `<EssayMeta>` for `/concepts/<slug>` — same
 * Article + BreadcrumbList JSON-LD pattern.
 */
export function ScenarioMeta({ slug }: { slug: string }) {
  const readTime = getScenarioReadTime(slug);
  const scenario = scenarios.find((s) => s.slug === slug);
  const url = `${siteConfig.url}/scenarios/${slug}`;

  return (
    <>
      <p className="mt-3 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {readTime} min read
      </p>
      {scenario ? (
        <>
          <JsonLd
            data={articleSchema({
              title: scenario.title,
              description: scenario.blurb,
              url,
            })}
          />
          <JsonLd
            data={breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Scenarios", path: "/scenarios" },
              { name: scenario.title, path: `/scenarios/${slug}` },
            ])}
          />
        </>
      ) : null}
    </>
  );
}
