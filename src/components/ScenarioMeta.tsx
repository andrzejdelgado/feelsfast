import { getScenarioReadTime } from "@/lib/read-time";

/**
 * Read-time eyebrow rendered immediately under the h1 in each Scenario
 * page. Mirrors `<EssayMeta>` for `/concepts/<slug>`.
 *
 * Slug is passed explicitly from each MDX page so the component stays a
 * server component (no `usePathname`) and the read-time computation
 * runs at build time.
 */
export function ScenarioMeta({ slug }: { slug: string }) {
  const readTime = getScenarioReadTime(slug);
  return (
    <p className="mt-3 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
      {readTime} min read
    </p>
  );
}
