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
    <ol className="mt-6 list-none pl-0">
      {refs.map((ref, i) => (
        <li
          key={ref.id}
          id={`ref-${ref.id}`}
          className={`scroll-mt-24 py-8 ${i > 0 ? "border-t border-border" : ""}`}
        >
          <span className="inline-flex w-fit items-center whitespace-nowrap rounded-sm bg-secondary px-1.5 py-0.5 font-mono text-[0.75rem] font-medium text-primary">
            [{ref.label}]
          </span>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            {typeof ref.citation === "string" ? (
              <CitationText text={ref.citation} />
            ) : (
              ref.citation
            )}
          </p>
        </li>
      ))}
    </ol>
  );
}

/** Inline parser for asterisk-italics in citation strings. */
function CitationText({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
          <em key={i}>{part.slice(1, -1)}</em>
        ) : (
          part
        ),
      )}
    </>
  );
}
