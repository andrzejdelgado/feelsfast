"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Check, Hash, Search } from "lucide-react";
import { ALL_CATEGORIES } from "@/lib/refs/all";
import { cn } from "@/lib/utils";

/**
 * Bibliography page. Three usability moves over the previous version:
 *
 *   1. **Search + kind filter.** A search input narrows by author /
 *      citation text; pills above ("All / Academic / Industry") swap
 *      the visible set. Empty categories drop out so the page never
 *      shows a "no results" header on its own.
 *   2. **Section jump strip.** The six categories live in a sticky
 *      navigation strip so the reader can jump straight to the one
 *      they need without scrolling.
 *   3. **Per-entry kind chip + copy-link.** Each citation declares
 *      `ACADEMIC` or `INDUSTRY` next to its `[Label]` pill, and a `#`
 *      button copies a deep link (`/references#ref-harrison-2010`) so
 *      the bibliography can be cited from outside the platform.
 *
 * Also fixes a pre-existing bug: the previous /references page rendered
 * entries via the inline `<ReferencesList>` component, which is gated
 * by `lg:hidden` because it's designed to appear at the bottom of
 * essays on mobile only. The result on desktop was a page that showed
 * the six section headers with no citations underneath. This page now
 * renders entries directly.
 */

type Kind = "all" | "academic" | "industry";

const totalRefsAcross = ALL_CATEGORIES.reduce(
  (sum, c) => sum + c.refs.length,
  0,
);

export function ReferencesContent() {
  const [query, setQuery] = useState("");
  const [kindFilter, setKindFilter] = useState<Kind>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const visibleCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_CATEGORIES.map((category) => {
      const refs = category.refs.filter((ref) => {
        if (kindFilter !== "all" && ref.kind !== kindFilter) return false;
        if (!q) return true;
        return (
          ref.label.toLowerCase().includes(q) ||
          ref.citation.toLowerCase().includes(q) ||
          ref.id.toLowerCase().includes(q)
        );
      });
      return { ...category, refs };
    }).filter((c) => c.refs.length > 0);
  }, [query, kindFilter]);

  const visibleCount = useMemo(
    () => visibleCategories.reduce((sum, c) => sum + c.refs.length, 0),
    [visibleCategories],
  );

  function copy(id: string) {
    if (typeof window === "undefined") return;
    const href = `${window.location.origin}${window.location.pathname}#ref-${id}`;
    navigator.clipboard
      .writeText(href)
      .then(() => {
        setCopiedId(id);
        window.setTimeout(() => setCopiedId(null), 1400);
      })
      .catch(() => {
        const ta = document.createElement("textarea");
        ta.value = href;
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          setCopiedId(id);
          window.setTimeout(() => setCopiedId(null), 1400);
        } finally {
          document.body.removeChild(ta);
        }
      });
  }

  return (
    <article className="py-12">
      <header className="mx-auto max-w-4xl px-8 lg:px-12 xl:px-16">
        <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Bibliography · {totalRefsAcross} sources
        </p>
        <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
          References
        </h1>
      </header>

      <div className="sticky top-14 z-10 mt-6 border-b border-border bg-background/95 backdrop-blur md:top-0">
        <div className="mx-auto max-w-4xl px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative block flex-1">
              <span className="sr-only">Search references</span>
              <Search
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setQuery("");
                }}
                placeholder="Search by author, year, or citation text…"
                autoComplete="off"
                spellCheck={false}
                className="w-full rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </label>

            <div
              className="flex flex-wrap items-center gap-2"
              role="group"
              aria-label="Filter by source kind"
            >
              <FilterPill
                label="All"
                active={kindFilter === "all"}
                onClick={() => setKindFilter("all")}
              />
              <FilterPill
                label="Academic"
                active={kindFilter === "academic"}
                onClick={() => setKindFilter("academic")}
              />
              <FilterPill
                label="Industry"
                active={kindFilter === "industry"}
                onClick={() => setKindFilter("industry")}
              />
            </div>
          </div>

          {query.trim() || kindFilter !== "all" ? (
            <p className="mt-3 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
              {visibleCount} of {totalRefsAcross} match
              {query.trim() ? " · esc to clear" : ""}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-4xl px-8 lg:px-12 xl:px-16">
        {visibleCategories.length === 0 ? (
          <EmptyState
            query={query}
            kind={kindFilter}
            onClear={() => {
              setQuery("");
              setKindFilter("all");
            }}
          />
        ) : (
          <div className="space-y-24">
            {visibleCategories.map((category) => (
              <section
                key={category.id}
                id={`section-${category.id}`}
                aria-labelledby={`heading-${category.id}`}
                className="scroll-mt-48"
              >
                <h2
                  id={`heading-${category.id}`}
                  className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  {category.title} · {category.refs.length}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
                <ol className="mt-6 list-none space-y-6 pl-0">
                  {category.refs.map((ref) => (
                    <li
                      key={ref.id}
                      id={`ref-${ref.id}`}
                      className="group/entry scroll-mt-48"
                    >
                      <div className="flex flex-wrap items-baseline gap-2">
                        <KindChip kind={ref.kind} />
                        <span className="inline-flex w-fit items-center whitespace-nowrap rounded-sm border border-border bg-card px-1.5 py-0.5 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-primary">
                          {ref.label}
                        </span>
                        <button
                          type="button"
                          onClick={() => copy(ref.id)}
                          aria-label={`Copy link to ${ref.label}`}
                          className={cn(
                            "inline-flex size-6 items-center justify-center rounded-sm text-muted-foreground transition-opacity hover:bg-primary/10 hover:text-primary focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-primary md:opacity-0 md:group-hover/entry:opacity-100",
                            copiedId === ref.id && "opacity-100",
                          )}
                        >
                          {copiedId === ref.id ? (
                            <Check
                              aria-hidden
                              className="size-3.5 text-primary"
                            />
                          ) : (
                            <Hash aria-hidden className="size-3.5" />
                          )}
                        </button>
                        {copiedId === ref.id ? (
                          <span
                            aria-live="polite"
                            className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-primary"
                          >
                            Copied
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-foreground">
                        <CitationText text={ref.citation} />
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        )}
      </div>
    </article>
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

function KindChip({ kind }: { kind: "academic" | "industry" }) {
  const isIndustry = kind === "industry";
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center whitespace-nowrap rounded-sm border px-1.5 py-0.5 font-mono text-[0.625rem] font-medium uppercase tracking-wider",
        isIndustry
          ? "border-primary/40 bg-primary/10 text-primary"
          : "border-border bg-background text-muted-foreground",
      )}
      aria-label={isIndustry ? "Industry source" : "Academic source"}
      title={
        isIndustry
          ? "Industry primary source — talk, case study, or blog post"
          : "Peer-reviewed academic source"
      }
    >
      {isIndustry ? "Industry" : "Academic"}
    </span>
  );
}

function EmptyState({
  query,
  kind,
  onClear,
}: {
  query: string;
  kind: Kind;
  onClear: () => void;
}) {
  const reason = query.trim()
    ? `"${query}"${kind !== "all" ? ` in ${kind} sources` : ""}`
    : `${kind} sources only`;
  return (
    <div className="rounded-md border border-border bg-card px-6 py-12 text-center">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        No matches
      </p>
      <p className="mt-3 text-sm leading-relaxed text-foreground">
        No references match {reason}.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-4 inline-flex items-center rounded-md border border-border bg-background px-3 py-1.5 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary"
      >
        Reset filters
      </button>
    </div>
  );
}

/**
 * Inline parser for citation strings.
 *   - `*foo*` → `<em>foo</em>`
 *   - bare `https://...` → `<a href>` so PDFs are clickable
 */
function CitationText({ text }: { text: string }) {
  const tokens = text.split(/(\*[^*]+\*|https?:\/\/[^\s)]+)/g);
  return (
    <>
      {tokens.map((token, i) => {
        if (token.startsWith("*") && token.endsWith("*") && token.length > 2) {
          return <em key={i}>{token.slice(1, -1)}</em>;
        }
        if (/^https?:\/\//.test(token)) {
          return (
            <a
              key={i}
              href={token}
              target="_blank"
              rel="noreferrer"
              className="break-all text-primary underline-offset-2 hover:underline"
            >
              {token}
              <ArrowUpRight
                aria-hidden
                className="ml-0.5 inline-block size-[0.85em] -translate-y-[0.05em] align-baseline"
              />
            </a>
          );
        }
        return <span key={i}>{token}</span>;
      })}
    </>
  );
}

