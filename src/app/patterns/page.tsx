import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patterns",
  description:
    "Twenty-four research-backed techniques — skeleton screens, optimistic UI, determinate progress, view transitions, route prefetching, token-by-token streaming, tool-call transparency, and more. Every pattern cites a primary source.",
};

export default function PatternsPage() {
  return (
    <article className="mx-auto max-w-4xl px-8 py-12 lg:px-12 xl:px-16">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        24 patterns · 4 ai-tagged · 2 with ai variants
      </p>
      <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
        Patterns
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Research-backed techniques with code, when-to-use guidance, accessibility notes, and
        citations. No invented &quot;best practices&quot; — every claim points to a primary
        source or a labelled industry case.
      </p>
      <p className="mt-8 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Coming in Phase 3 — full library with TS + React code and a11y notes.
      </p>
    </article>
  );
}
