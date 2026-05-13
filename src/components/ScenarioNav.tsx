"use client";

import { ArrowLeft, ArrowRight, Layers } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories, scenarios, type Scenario } from "@/lib/scenarios";
import { cn } from "@/lib/utils";

/**
 * Prev / next pager for the bottom of an individual Scenario page.
 *
 * Mirrors `<EssayNav>` — reads the current scenario slug from
 * `usePathname`, finds its neighbours in the canonical `scenarios`
 * array, and renders a two-column grid: previous on the left, next on
 * the right.
 *
 * If the current scenario is the first or last in the canonical order,
 * the empty slot is filled with a "Back to Scenarios" card so the
 * layout stays balanced.
 */
export function ScenarioNav() {
  const pathname = usePathname() ?? "";
  const currentSlug = pathname.split("/").filter(Boolean)[1] ?? "";
  const idx = scenarios.findIndex((s) => s.slug === currentSlug);
  if (idx === -1) return null;

  const prev = idx > 0 ? scenarios[idx - 1] : null;
  const next = idx < scenarios.length - 1 ? scenarios[idx + 1] : null;

  return (
    <nav
      aria-label="Scenario navigation"
      className="not-prose mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2"
    >
      <NavCard scenario={prev} direction="prev" />
      <NavCard scenario={next} direction="next" />
    </nav>
  );
}

function NavCard({
  scenario,
  direction,
}: {
  scenario: Scenario | null;
  direction: "prev" | "next";
}) {
  if (!scenario) {
    return <BackToIndexCard direction={direction} />;
  }
  const isNext = direction === "next";
  const categoryLabel =
    categories.find((c) => c.id === scenario.category)?.label ?? "";
  return (
    <Link
      href={`/scenarios/${scenario.slug}`}
      className={cn(
        "group block rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary",
        isNext ? "text-right" : "text-left",
      )}
    >
      <p
        className={cn(
          "inline-flex items-center gap-1 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-primary",
          isNext ? "flex-row-reverse" : "flex-row",
        )}
      >
        {isNext ? (
          <ArrowRight aria-hidden className="size-3" />
        ) : (
          <ArrowLeft aria-hidden className="size-3" />
        )}
        <span>
          {isNext ? "Next" : "Previous"}
          {categoryLabel ? ` · ${categoryLabel}` : ""}
        </span>
      </p>
      <p className="mt-2 text-base font-medium leading-tight tracking-tight text-foreground">
        {scenario.title}
      </p>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
        {scenario.blurb}
      </p>
    </Link>
  );
}

function BackToIndexCard({ direction }: { direction: "prev" | "next" }) {
  const isNext = direction === "next";
  return (
    <Link
      href="/scenarios"
      className={cn(
        "group block rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary",
        isNext ? "text-right" : "text-left",
      )}
    >
      <p
        className={cn(
          "inline-flex items-center gap-1 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-primary",
          isNext ? "flex-row-reverse" : "flex-row",
        )}
      >
        <Layers aria-hidden className="size-3" />
        <span>All scenarios</span>
      </p>
      <p className="mt-2 text-base font-medium leading-tight tracking-tight text-foreground">
        Back to Scenarios
      </p>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
        {scenarios.length} scenarios across {categories.length} categories — index page with filter pills.
      </p>
    </Link>
  );
}
