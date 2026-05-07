type CiteProps = {
  /** Reference id — must match an `id="ref-{id}"` in the page's References list. */
  id: string;
  /** Text shown inline (e.g. "Miller 1968", "Doherty 1982"). Author-controlled. */
  label: string;
};

/**
 * Inline citation marker used inside MDX prose.
 *
 * Renders as a small mono pill that anchors to the matching entry in the
 * References list at the bottom of the article. Carries `data-cite={id}` so
 * the right-rail ReferencesPanel can scroll-spy on it later (Phase 1+).
 */
export function Cite({ id, label }: CiteProps) {
  return (
    <a
      href={`#ref-${id}`}
      data-cite={id}
      className="ml-0.5 inline-block whitespace-nowrap rounded-sm bg-secondary px-1 py-0 align-baseline font-mono text-[0.7em] font-medium text-primary no-underline hover:bg-tertiary hover:underline"
    >
      [{label}]
    </a>
  );
}
