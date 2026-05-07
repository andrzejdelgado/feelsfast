"use client";

import { useReferences } from "./ReferencesProvider";
import { cn } from "@/lib/utils";

/**
 * Sticky right-rail references panel per PRD §6.3 / §10.2.
 *
 * Reads from the ReferencesProvider context: the active article registers
 * its reference list via <RegisterReferences>, the provider's
 * IntersectionObserver tracks which `<Cite>` is in the reading zone, and
 * this component renders the list with the active ones emphasised.
 *
 * On pages without registered references (the home page, stub indexes,
 * the Skill page), it falls back to a quiet placeholder explaining itself.
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

  return (
    <div className="px-6 py-8">
      <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
        References
      </p>
      <ol className="mt-3 space-y-4">
        {refs.map((ref) => {
          const isActive = activeIds.has(ref.id);
          return (
            <li
              key={ref.id}
              className={cn(
                "text-xs leading-relaxed transition-opacity duration-200",
                isActive ? "opacity-100" : "opacity-50",
              )}
            >
              <a
                href={`#ref-${ref.id}`}
                className="block hover:opacity-100"
              >
                <p
                  className={cn(
                    "font-mono text-[0.6875rem] font-medium uppercase tracking-wider",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {ref.label}
                </p>
                <p
                  className={cn(
                    "mt-1",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {ref.citation}
                </p>
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
