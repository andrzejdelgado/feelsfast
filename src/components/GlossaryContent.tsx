"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Check, Hash, Search } from "lucide-react";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/JsonLd";
import { SwipeableRow } from "@/components/SwipeableRow";
import { glossary } from "@/lib/glossary";
import { cn } from "@/lib/utils";

/**
 * The Glossary reading surface. Designed around three usability moves:
 *
 *   1. **Sticky search.** Filter by term or definition; the user types,
 *      everything narrows. Esc clears.
 *   2. **A–Z jump strip.** Letters where terms exist are tap-targets in
 *      Claude orange; empty letters dim out. Click jumps to that
 *      letter's section.
 *   3. **Per-entry copy-link.** A `#` button next to each term copies a
 *      deep link so a reader can share `/glossary#token-streaming`
 *      directly. Hover-visible on desktop, always-visible on touch.
 *
 * Visual register matches the rest of the platform: Geist Sans + Geist
 * Mono UPPERCASE eyebrows, Anthropic ivory + Claude orange, restrained
 * borders, no card treatment.
 */

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function firstLetter(term: string): string {
  const c = term.trim().charAt(0).toUpperCase();
  return /[A-Z]/.test(c) ? c : "#";
}

export function GlossaryContent() {
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return glossary;
    return glossary.filter(
      (e) =>
        e.term.toLowerCase().includes(q) ||
        e.definition.toLowerCase().includes(q),
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof glossary[number][]>();
    for (const entry of filtered) {
      const letter = firstLetter(entry.term);
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(entry);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const occupiedLetters = useMemo(
    () => new Set(grouped.map(([letter]) => letter)),
    [grouped],
  );

  function copy(id: string) {
    if (typeof window === "undefined") return;
    const href = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard
      .writeText(href)
      .then(() => {
        setCopiedId(id);
        window.setTimeout(() => setCopiedId(null), 1400);
      })
      .catch(() => {
        // Older browsers / insecure contexts — fall back to selecting.
        const url = href;
        const ta = document.createElement("textarea");
        ta.value = url;
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

  // Build the full FAQ + breadcrumb structured data once per render so
  // every term shows up as a "what is X" answer in search rich results.
  const faqData = useMemo(
    () =>
      faqSchema(
        glossary.map((entry) => ({
          question: `What is ${entry.term}?`,
          answer: entry.definition,
        })),
      ),
    [],
  );
  const breadcrumbData = useMemo(
    () =>
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Glossary", path: "/glossary" },
      ]),
    [],
  );

  return (
    <article className="py-12">
      <JsonLd data={faqData} />
      <JsonLd data={breadcrumbData} />
      <header className="mx-auto max-w-4xl px-8 lg:px-12 xl:px-16">
        <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {glossary.length} terms
        </p>
        <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
          Glossary
        </h1>
      </header>

      <div className="sticky top-14 z-10 mt-6 border-b border-border bg-background/95 backdrop-blur md:top-0">
        <div className="mx-auto max-w-4xl px-8 py-4 lg:px-12 xl:px-16">
          <label className="relative block">
            <span className="sr-only">Search glossary</span>
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
              placeholder="Search terms or definitions…"
              autoComplete="off"
              spellCheck={false}
              className="w-full rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </label>

          {/* A–Z jump strip — single swipeable row on mobile (iOS-style
              horizontal scroll with edge fades), wrapped flex row at
              md+. Mirrors the pattern used on Scenarios + Playground +
              Concepts. */}
          <SwipeableRow
            wrapAt="md"
            role="navigation"
            ariaLabel="Jump to letter"
            className="-mx-0.5 mt-2 gap-x-0.5"
          >
            {LETTERS.map((letter) => {
              const occupied = occupiedLetters.has(letter);
              return occupied ? (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded-sm px-1 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-primary transition-colors hover:bg-primary/10"
                >
                  {letter}
                </a>
              ) : (
                <span
                  key={letter}
                  aria-hidden
                  className="inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded-sm px-1 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground/40"
                >
                  {letter}
                </span>
              );
            })}
          </SwipeableRow>

          {query.trim() ? (
            <p className="mt-3 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
              {filtered.length} of {glossary.length} match · esc to clear
            </p>
          ) : null}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-4xl px-8 lg:px-12 xl:px-16">
        {grouped.length === 0 ? (
          <EmptyState query={query} onClear={() => setQuery("")} />
        ) : (
          <div className="space-y-12">
            {grouped.map(([letter, entries]) => (
              <section
                key={letter}
                id={`letter-${letter}`}
                aria-labelledby={`letter-heading-${letter}`}
                className="scroll-mt-44"
              >
                <h2
                  id={`letter-heading-${letter}`}
                  className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  {letter} · {entries.length}{" "}
                  {entries.length === 1 ? "term" : "terms"}
                </h2>
                <dl className="mt-4 space-y-7">
                  {entries.map((entry) => (
                    <div
                      key={entry.id}
                      id={entry.id}
                      className="group/entry scroll-mt-44"
                    >
                      <dt className="flex items-baseline gap-2">
                        <span className="text-lg font-medium tracking-tight text-foreground">
                          {entry.term}
                        </span>
                        <button
                          type="button"
                          onClick={() => copy(entry.id)}
                          aria-label={`Copy link to ${entry.term}`}
                          className={cn(
                            "inline-flex size-6 items-center justify-center rounded-sm text-muted-foreground transition-opacity hover:bg-primary/10 hover:text-primary focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-primary md:opacity-0 md:group-hover/entry:opacity-100",
                            copiedId === entry.id && "opacity-100",
                          )}
                        >
                          {copiedId === entry.id ? (
                            <Check aria-hidden className="size-3.5 text-primary" />
                          ) : (
                            <Hash aria-hidden className="size-3.5" />
                          )}
                        </button>
                        {copiedId === entry.id ? (
                          <span
                            aria-live="polite"
                            className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-primary"
                          >
                            Copied
                          </span>
                        ) : null}
                      </dt>
                      <dd className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground">
                        {entry.definition}
                        {entry.seeAlso ? (
                          <>
                            {" "}
                            <Link
                              href={entry.seeAlso.href}
                              className="inline-flex items-center gap-1 font-mono text-[0.75rem] font-medium uppercase tracking-wider text-primary hover:underline"
                            >
                              <span>See {entry.seeAlso.label}</span>
                              <ArrowRight aria-hidden className="size-3" />
                            </Link>
                          </>
                        ) : null}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function EmptyState({
  query,
  onClear,
}: {
  query: string;
  onClear: () => void;
}) {
  return (
    <div className="rounded-md border border-border bg-card px-6 py-12 text-center">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        No matches
      </p>
      <p className="mt-3 text-sm leading-relaxed text-foreground">
        Nothing in the glossary matches &ldquo;{query}&rdquo;.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-4 inline-flex items-center rounded-md border border-border bg-background px-3 py-1.5 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary"
      >
        Clear search
      </button>
    </div>
  );
}
