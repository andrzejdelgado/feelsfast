"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { essays, type Essay } from "@/lib/essays";
import { cn } from "@/lib/utils";

/**
 * Prev / next pager for the bottom of an individual Concepts essay.
 *
 * Reads the current essay slug from `usePathname` and finds its
 * neighbours in the canonical `essays` array. Renders a two-column
 * grid of cards — left for the previous essay, right for the next —
 * with the essay number, title, and one-line blurb so the visitor can
 * decide whether to keep going.
 *
 * The first essay has only a "Next →" card on the right; the last has
 * only a "← Previous" card on the left. The slot for the missing side
 * stays empty so the layout does not jump.
 *
 * Sits between the body of the essay and the References list — the
 * MDX files render `<EssayNav />` immediately before `<ReferencesList />`.
 */
export function EssayNav() {
  const pathname = usePathname();
  const currentSlug = pathname.split("/").filter(Boolean)[1] ?? "";
  const idx = essays.findIndex((e) => e.slug === currentSlug);
  if (idx === -1) return null;

  const prev = idx > 0 ? essays[idx - 1] : null;
  const next = idx < essays.length - 1 ? essays[idx + 1] : null;

  return (
    <nav
      aria-label="Essay navigation"
      className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2"
    >
      <NavCard essay={prev} direction="prev" />
      <NavCard essay={next} direction="next" />
    </nav>
  );
}

function NavCard({
  essay,
  direction,
}: {
  essay: Essay | null;
  direction: "prev" | "next";
}) {
  if (!essay) {
    // Empty slot keeps the two-column layout stable for the first /
    // last essay.
    return <div aria-hidden />;
  }
  const isNext = direction === "next";
  return (
    <Link
      href={`/concepts/${essay.slug}`}
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
        <span>{isNext ? "Next" : "Previous"} · Essay {essay.number}</span>
      </p>
      <p className="mt-2 text-base font-medium leading-tight tracking-tight text-foreground">
        {essay.title}
      </p>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
        {essay.blurb}
      </p>
    </Link>
  );
}
