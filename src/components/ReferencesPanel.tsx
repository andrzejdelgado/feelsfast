"use client";

import { useState } from "react";
import { useReferences } from "./ReferencesProvider";
import { cn } from "@/lib/utils";

/**
 * Sticky right-rail references panel.
 *
 * Layout:
 *   1. Heading with reference count.
 *   2. Chip grid — every reference as a small label-only chip. Three
 *      visual states, listed in increasing prominence:
 *        - Inactive: outlined, muted text.
 *        - Active: scroll-spy match (a matching <Cite> is in the
 *          reader's viewport). Outlined with primary border + tinted
 *          primary background. No expansion.
 *        - Open: user clicked the chip to read the full citation. Solid
 *          primary background, primary-foreground text. Only one chip
 *          can be open at a time.
 *   3. Citation card — appears below the grid when a chip is open,
 *      animated with a snappy ~180 ms grid-row + opacity transition so
 *      the open feels caused-by-click rather than imposed.
 *
 * On pages with no registered references (home, stubs, Skill), a quiet
 * placeholder explains the panel's job.
 */
export function ReferencesPanel() {
  const { refs, activeIds } = useReferences();
  const [openId, setOpenId] = useState<string | null>(null);

  if (refs.length === 0) {
    return (
      <div className="px-6 py-8">
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
          References
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Citations from the article you&apos;re reading appear here, with the ones
          currently in view highlighted.
        </p>
      </div>
    );
  }

  const openRef = openId ? refs.find((r) => r.id === openId) ?? null : null;

  return (
    <div className="px-6 py-8">
      <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
        References · {refs.length}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {refs.map((ref) => {
          const isActive = activeIds.has(ref.id);
          const isOpen = openId === ref.id;
          return (
            <button
              key={ref.id}
              type="button"
              onClick={() => setOpenId(isOpen ? null : ref.id)}
              aria-expanded={isOpen}
              aria-label={
                isOpen
                  ? `Close ${ref.label} citation`
                  : `Open ${ref.label} citation`
              }
              className={cn(
                "inline-flex items-center rounded-sm border px-1.5 py-0.5 font-mono text-[0.625rem] font-medium uppercase tracking-wider transition-colors duration-150 ease-out motion-reduce:transition-none",
                isOpen
                  ? "border-primary bg-primary text-primary-foreground"
                  : isActive
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:border-primary hover:text-primary",
              )}
            >
              {ref.label}
            </button>
          );
        })}
      </div>

      {/* Expand/collapse panel — grid-row trick animates height
          cleanly, opacity gates content during the transition. */}
      <div
        className={cn(
          "grid transition-all duration-200 ease-out motion-reduce:transition-none",
          openRef
            ? "mt-3 grid-rows-[1fr] opacity-100"
            : "mt-0 grid-rows-[0fr] opacity-0",
        )}
        aria-hidden={!openRef}
      >
        <div className="overflow-hidden">
          {openRef ? (
            <div className="rounded-md border border-primary bg-card p-3">
              <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-primary">
                {openRef.label}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-foreground">
                {openRef.citation}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
