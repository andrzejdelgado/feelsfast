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

const statusLabel: Record<Scenario["status"], string> = {
  published: "Read",
  drafting: "Drafting",
  planned: "Planned",
};

/**
 * Client-side category filter for the Scenarios index. Renders a row
 * of filter pills (All + one per category) plus the sectioned scenario
 * groups. Selecting a pill narrows the visible sections to that
 * category; "All" shows every section, in canonical order.
 */
export function ScenariosCategorizedList({
  groups,
  total,
}: {
  groups: readonly CategorizedGroup[];
  total: number;
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
        className="mt-10 flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filter scenarios by category"
      >
        <FilterPill
          label="All"
          count={total}
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        {groups.map((group) => (
          <FilterPill
            key={group.category.id}
            label={group.category.label}
            count={group.items.length}
            active={filter === group.category.id}
            onClick={() => setFilter(group.category.id)}
          />
        ))}
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

function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const isPublished = scenario.status === "published";
  const className = `block rounded-lg border border-border bg-card p-5 transition-colors ${
    isPublished ? "hover:border-primary" : "opacity-70"
  }`;

  const inner = (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
          Scenario · {scenario.number}
        </p>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-primary">
            {scenario.band}
          </span>
          <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
            {statusLabel[scenario.status]}
          </span>
        </div>
      </div>
      <p className="mt-2 text-lg font-medium tracking-tight">{scenario.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {scenario.blurb}
      </p>
      <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
        Patterns · {scenario.linkedPatterns.join(" · ")}
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
