import { getEssayReadTime } from "@/lib/read-time";

/**
 * Read-time eyebrow rendered immediately under the h1 in each Concepts
 * essay. Reads the MDX source server-side at build time (via
 * `getEssayReadTime`) so the value stays in sync with the prose.
 *
 * Slug is passed explicitly from each MDX page rather than read from
 * the route, so the component can stay a server component (no
 * `usePathname`) and the read-time call runs at build time.
 */
export function EssayMeta({ slug }: { slug: string }) {
  const readTime = getEssayReadTime(slug);
  return (
    <p className="mt-3 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
      {readTime} min read
    </p>
  );
}
