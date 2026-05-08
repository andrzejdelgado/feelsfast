import Link from "next/link";
import {
  patternsForScenario,
  scenariosForPattern,
} from "@/lib/relations";

type Kind = "scenario" | "pattern";

type RelatedRailProps = {
  /** "scenario" → render the patterns this scenario is built from. "pattern" → render the scenarios this pattern is used in. */
  kind: Kind;
  /** The slug of the current scenario or pattern. */
  of: string;
};

/**
 * Cross-link rail that appears near the top of every Scenario and
 * Pattern page.
 *
 *   - On a Scenario page: "Built from" → links to each Pattern this
 *     scenario composes.
 *   - On a Pattern page: "Used in" → links to each Scenario that
 *     references this pattern.
 *
 * Establishes the two-axis model up front (Scenario = recipe,
 * Pattern = ingredient) so the reader doesn't have to discover it from
 * a bullet list buried under the prose.
 */
export function RelatedRail({ kind, of }: RelatedRailProps) {
  const items =
    kind === "scenario" ? patternsForScenario(of) : scenariosForPattern(of);

  if (items.length === 0) return null;

  const label = kind === "scenario" ? "Built from" : "Used in";
  const hrefBase = kind === "scenario" ? "/patterns/" : "/scenarios/";

  return (
    <aside
      aria-label={label}
      className="not-prose my-6 rounded-lg border border-border bg-card p-4"
    >
      <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-primary">
        {label}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`${hrefBase}${item.slug}`}
              className="inline-flex items-center rounded-md border border-border bg-background px-2.5 py-1 text-xs leading-tight text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
