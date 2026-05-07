import type { Reference } from "./ReferencesProvider";

/**
 * Bibliography list rendered at the bottom of an essay or scenario page.
 *
 * Visually consistent with `<Cite>` — each entry leads with the same `[Label]`
 * pill (mono primary-color on a secondary surface) followed by the citation
 * text. Anchored to `id="ref-{id}"` so inline `<Cite>` jumps land here.
 *
 * Accepts asterisk-italics in the citation string (e.g. `*Vision Research*`)
 * and renders them as `<em>` so journal names and book titles can be set in
 * italics without forcing the data file to be `.tsx`.
 */
export function ReferencesList({ refs }: { refs: readonly Reference[] }) {
  return (
    <ol className="mt-6 list-none space-y-3 pl-0">
      {refs.map((ref) => (
        <li
          key={ref.id}
          id={`ref-${ref.id}`}
          className="grid scroll-mt-24 gap-2 sm:grid-cols-[auto_1fr] sm:gap-4"
        >
          <span className="inline-flex h-fit shrink-0 items-center self-start whitespace-nowrap rounded-sm bg-secondary px-1.5 py-0.5 font-mono text-[0.75rem] font-medium text-primary">
            [{ref.label}]
          </span>
          <span className="text-sm leading-relaxed text-foreground">
            {typeof ref.citation === "string" ? (
              <CitationText text={ref.citation} />
            ) : (
              ref.citation
            )}
          </span>
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
