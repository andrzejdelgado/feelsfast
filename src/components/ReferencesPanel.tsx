/**
 * ReferencesPanel — sticky right rail per PRD §6.3 / §10.2.
 *
 * Phase 0: placeholder. Phase 1 wires up scroll-spy on `<aside data-ref="…">`
 * tags in MDX and pins matching citations as the user scrolls.
 */
export function ReferencesPanel() {
  return (
    <div className="px-6 py-8">
      <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
        References
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Citations from the article you&apos;re reading will appear here, pinning to the
        section currently in view.
      </p>
    </div>
  );
}
