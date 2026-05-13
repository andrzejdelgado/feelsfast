"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SwipeableRow } from "@/components/SwipeableRow";
import { cn } from "@/lib/utils";
import type { Essay, EssayCategory, EssayCategoryMeta } from "@/lib/essays";

type EssayWithReadTime = Essay & { readTime: number };

type CategorizedGroup = {
  category: EssayCategoryMeta;
  items: readonly EssayWithReadTime[];
};

type FilterValue = "all" | EssayCategory;

/**
 * Client-side category filter for the Concepts index. Mirrors the
 * Scenarios index — a sticky filter pill row above sectioned groups,
 * with a label-only pill per category and a redesigned essay card.
 */
export function ConceptsCategorizedList({
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
      {/* Sticky filter bar — mirrors Scenarios + Playground. On mobile
          the pill row swipes horizontally (with edge-fade gradients) so
          the sticky bar stays one row tall instead of stacking. At md
          and above it falls back to a wrapped flex row with the fades
          disabled. */}
      <div className="sticky top-14 z-10 mt-6 border-b border-border bg-background/95 backdrop-blur md:top-0">
        <SwipeableRow
          wrapAt="md"
          role="group"
          ariaLabel="Filter essays by category"
          className="mx-auto max-w-4xl px-8 py-4 lg:px-12 xl:px-16"
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
        </SwipeableRow>
      </div>

      <div className="mx-auto mt-12 max-w-4xl space-y-12 px-8 lg:px-12 xl:px-16">
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
              {group.items.length === 1 ? " essay" : " essays"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {group.category.blurb}
            </p>
            <ol className="mt-6 space-y-3">
              {group.items.map((essay) => (
                <li key={essay.slug}>
                  <EssayCard essay={essay} />
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
        "inline-flex shrink-0 items-center rounded-full border px-3 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-wider transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

function EssayCard({ essay }: { essay: EssayWithReadTime }) {
  const isReadable = essay.status === "published";
  const className = `block rounded-lg border border-border bg-card p-5 transition-colors ${
    isReadable ? "hover:border-primary" : "opacity-70"
  }`;

  const inner = (
    <>
      <p className="text-lg font-medium tracking-tight">{essay.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {essay.blurb}
      </p>
      <p className="mt-4 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-primary">
        {essay.readTime} min read
      </p>
    </>
  );

  if (isReadable) {
    return (
      <Link href={`/concepts/${essay.slug}`} className={className}>
        {inner}
      </Link>
    );
  }
  return <div className={className}>{inner}</div>;
}
