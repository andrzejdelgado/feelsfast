"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type FilterValue = "all" | "ai";

type CatalogFilterProps = {
  /** Total count of items in the catalog. */
  total: number;
  /** Count of items carrying the `AI` tag. */
  aiCount: number;
  /** Pre-rendered list of all items (server-rendered ReactNode). */
  renderedAll: ReactNode;
  /** Pre-rendered list of AI-tagged items (server-rendered ReactNode). */
  renderedAi: ReactNode;
};

/**
 * Two-state pill filter for the Scenarios + Patterns indexes.
 *
 * Both lists are pre-rendered on the server and passed as ReactNode props,
 * so this Client Component only owns the toggle state — no functions cross
 * the Server → Client boundary.
 *
 * Phase 1 carries just the AI tag; the structure makes adding more tags
 * trivial without changing the index pages.
 */
export function CatalogFilter({
  total,
  aiCount,
  renderedAll,
  renderedAi,
}: CatalogFilterProps) {
  const [active, setActive] = useState<FilterValue>("all");

  return (
    <div>
      <div
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filter catalog"
      >
        <Pill
          label="All"
          count={total}
          active={active === "all"}
          onClick={() => setActive("all")}
        />
        <Pill
          label="AI"
          count={aiCount}
          active={active === "ai"}
          onClick={() => setActive("ai")}
        />
      </div>
      <div className="mt-6">
        {active === "all" ? renderedAll : renderedAi}
      </div>
    </div>
  );
}

function Pill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-wider transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground",
      )}
    >
      <span>{label}</span>
      <span
        className={cn("tabular-nums", active ? "opacity-80" : "opacity-60")}
      >
        {count}
      </span>
    </button>
  );
}
