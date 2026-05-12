type CiteProps = {
  /** Reference id — must match an `id="ref-{id}"` in the page's References list. */
  id: string;
  /** Text shown inline (e.g. "Miller 1968", "Doherty 1982"). Author-controlled. */
  label: string;
};

/**
 * Inline citation marker used inside MDX prose.
 *
 * Anchors to `#ref-{id}` in the page's inline ReferencesList (rendered
 * at the bottom of every essay on screens below `lg`; hidden on
 * desktop where the sticky right-rail panel does the job).
 *
 * Visual register matches the unified citation badge used by the inline
 * references list and the sidebar chips: outlined rectangle, mono
 * uppercase tracking-wider, primary text. Sized relative to surrounding
 * prose with `text-[0.7em]` so the badge integrates without
 * dominating.
 */
export function Cite({ id, label }: CiteProps) {
  return (
    <a
      href={`#ref-${id}`}
      data-cite={id}
      className="mx-0.5 inline-flex items-center whitespace-nowrap rounded-sm border border-border bg-card px-1 py-0 align-baseline font-mono text-[0.7em] font-medium uppercase tracking-wider text-primary no-underline transition-colors duration-150 ease-out hover:border-primary hover:bg-primary/10 motion-reduce:transition-none"
    >
      {label}
    </a>
  );
}
