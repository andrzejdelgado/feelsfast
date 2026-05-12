"use client";

import { useReferences } from "./ReferencesProvider";
import { cn } from "@/lib/utils";

/**
 * Sticky right-rail references panel.
 *
 * Two zones instead of one long scrollable list:
 *
 *   1. Active spotlight — when one or more `<Cite>` markers are in the
 *      reader's viewport, the matching references render at the top as
 *      full cards (label + citation text). The IntersectionObserver in
 *      ReferencesProvider keeps this in sync as the reader scrolls.
 *   2. Chip grid — every reference shows as a compact label-only chip
 *      below the spotlight. Active chips are filled in primary; the rest
 *      are outlined. Clicking any chip jumps to the matching entry in the
 *      inline `<ReferencesList>` at the bottom of the essay (the panel's
 *      mobile equivalent).
 *
 * The whole panel is small enough to fit in viewport even with 10+
 * references, so the sidebar no longer needs its own scroll context.
 *
 * On pages with no registered references (home, stubs, Skill), a quiet
 * placeholder explains the panel's job to a first-time reader.
 */
export function ReferencesPanel() {
  const { refs, activeIds } = useReferences();

  if (refs.length === 0) {
    return (
      <div className="px-6 py-8">
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
          References
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Citations from the article you&apos;re reading appear here, with the ones
          currently in view emphasised.
        </p>
      </div>
    );
  }

  const activeRefs = refs.filter((r) => activeIds.has(r.id));

  return (
    <div className="px-6 py-8">
      <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
        References · {refs.length}
      </p>

      {activeRefs.length > 0 ? (
        <div className="mt-3 space-y-2">
          {activeRefs.map((ref) => (
            <a
              key={ref.id}
              href={`#ref-${ref.id}`}
              className="block rounded-md border border-primary bg-card p-3 transition-colors hover:bg-secondary"
            >
              <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-primary">
                {ref.label}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-foreground">
                {ref.citation}
              </p>
            </a>
          ))}
        </div>
      ) : null}

      <div className={cn("flex flex-wrap gap-1.5", activeRefs.length > 0 ? "mt-4" : "mt-3")}>
        {refs.map((ref) => {
          const isActive = activeIds.has(ref.id);
          return (
            <a
              key={ref.id}
              href={`#ref-${ref.id}`}
              className={cn(
                "inline-flex items-center rounded-sm border px-1.5 py-0.5 font-mono text-[0.625rem] font-medium uppercase tracking-wider transition-colors",
                isActive
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:border-primary hover:text-primary",
              )}
            >
              {ref.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
