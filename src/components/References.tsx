import { ArrowUpRight } from "lucide-react";
import type { Reference } from "./ReferencesProvider";

/**
 * Bibliography list rendered at the bottom of an essay or scenario page.
 *
 * Visually consistent with `<Cite>` — each entry leads with the same `[Label]`
 * pill (mono primary-color on a secondary surface) followed by the citation
 * text. Anchored to `id="ref-{id}"` so inline `<Cite>` jumps land here.
 *
 * Each entry uses the same vertical rhythm as the Glossary page: `border-t`
 * separators, `py-8` per entry, no left indent on the citation.
 *
 * Accepts asterisk-italics in the citation string (e.g. `*Vision Research*`)
 * and renders them as `<em>` so journal names and book titles can be set in
 * italics without forcing the data file to be `.tsx`.
 */
export function ReferencesList({ refs }: { refs: readonly Reference[] }) {
  return (
    <section className="not-prose mt-16 lg:hidden" aria-label="References">
      <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
        References · {refs.length}
      </p>
      <ol className="mt-6 list-none space-y-6 pl-0">
        {refs.map((ref) => (
          <li
            key={ref.id}
            id={`ref-${ref.id}`}
            className="scroll-mt-24"
          >
            <span className="inline-flex w-fit items-center whitespace-nowrap rounded-sm border border-border bg-card px-1.5 py-0.5 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-primary">
              {ref.label}
            </span>
            <p className="mt-2 text-xs leading-relaxed text-foreground">
              {typeof ref.citation === "string" ? (
                <CitationText text={ref.citation} />
              ) : (
                ref.citation
              )}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/**
 * Inline parser for citation strings. Handles two micro-formats:
 *   - `*foo*` → `<em>foo</em>` for journal / book titles
 *   - bare `https://example.com/path` → `<a href>` so PDFs and source pages
 *     are clickable straight from the bibliography
 */
function CitationText({ text }: { text: string }) {
  const tokens = text.split(/(\*[^*]+\*|https?:\/\/[^\s)]+)/g);
  return (
    <>
      {tokens.map((token, i) => {
        if (
          token.startsWith("*") &&
          token.endsWith("*") &&
          token.length > 2
        ) {
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
