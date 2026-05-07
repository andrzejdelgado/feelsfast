import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Short definitions of the terms used across feelsfast — active vs. passive phase, JND, INP, FID, LCP, TTI, FMP, optimistic UI, skeleton screen, predictive preloading, time band, and more.",
};

export default function GlossaryPage() {
  return (
    <article className="mx-auto max-w-4xl px-8 py-12 lg:px-12 xl:px-16">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        ~40 terms
      </p>
      <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
        Glossary
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Short definitions, cross-linked to Concepts and Patterns. The minimum vocabulary
        you need to talk about perceived performance precisely.
      </p>
      <p className="mt-8 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Coming in Phase 3.
      </p>
    </article>
  );
}
