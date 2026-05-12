"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { CategoryMeta, Scenario, ScenarioCategory } from "@/lib/scenarios";

type CategorizedGroup = {
  category: CategoryMeta;
  items: readonly Scenario[];
};

type FilterValue = "all" | ScenarioCategory;

/**
 * Client-side category filter for the Scenarios index. Renders a row
 * of filter pills (All + one per category) plus the sectioned scenario
 * groups. The pill row is sticky at the top of the viewport so the
 * filter is reachable mid-scroll.
 */
export function ScenariosCategorizedList({
  groups,
}: {
  groups: readonly CategorizedGroup[];
}) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const visibleGroups = useMemo(
    () =>
      filter === "all"
        ? groups
        : groups.filter((g) => g.category.id === filter),
    [filter, groups],
  );

  return (
    <>
      <div
        className="sticky top-14 z-10 mt-10 -mx-8 border-b border-border bg-background/95 px-8 py-4 backdrop-blur md:top-0 lg:-mx-12 lg:px-12 xl:-mx-16 xl:px-16"
      >
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter scenarios by category"
        >
          <FilterPill
            label="All"
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />
          {groups.map((group) => (
            <FilterPill
              key={group.category.id}
              label={group.category.label}
              active={filter === group.category.id}
              onClick={() => setFilter(group.category.id)}
            />
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-12">
        {visibleGroups.map((group) => (
          <section
            key={group.category.id}
            aria-labelledby={`cat-${group.category.id}`}
          >
            <h2
              id={`cat-${group.category.id}`}
              className="font-mono text-xs font-medium uppercase tracking-wider text-primary"
            >
              {group.category.label} · {group.items.length}
              {group.items.length === 1 ? " scenario" : " scenarios"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {group.category.blurb}
            </p>
            <ol className="mt-6 space-y-3">
              {group.items.map((scenario) => (
                <li key={scenario.slug}>
                  <ScenarioCard scenario={scenario} />
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-wider transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const isPublished = scenario.status === "published";
  const className = `block rounded-lg border border-border bg-card p-5 transition-colors ${
    isPublished ? "hover:border-primary" : "opacity-70"
  }`;

  const inner = (
    <>
      <p className="text-right font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-primary">
        {scenario.band}
      </p>
      <p className="mt-1 text-lg font-medium tracking-tight">{scenario.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {scenario.blurb}
      </p>
      <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
        Patterns: {scenario.linkedPatterns.join(" · ")}
      </p>
    </>
  );

  if (isPublished) {
    return (
      <Link href={`/scenarios/${scenario.slug}`} className={className}>
        {inner}
      </Link>
    );
  }
  return <div className={className}>{inner}</div>;
}
