import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concepts",
  description:
    "Seven essays on the science of perceived performance — the dichotomy with objective time, the canonical thresholds (Miller, Card, Doherty), the time-perception illusions you can exploit, and where the perception layer breaks down.",
};

export default function ConceptsPage() {
  return (
    <article className="px-8 py-12 lg:px-12 xl:px-16">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        7 essays
      </p>
      <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
        Concepts
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Short, opinionated essays on how time is perceived, why the gap between objective
        and subjective performance matters, and where the canonical thresholds (Miller 1968,
        Card et al. 1991, Doherty 1982, Nielsen 1993) actually come from.
      </p>
      <p className="mt-8 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Coming in Phase 2 — full essays drafted in the project voice with primary citations.
      </p>
    </article>
  );
}
