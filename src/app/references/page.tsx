import type { Metadata } from "next";
import { ReferencesList } from "@/components/References";
import { ALL_CATEGORIES } from "@/lib/refs/all";

export const metadata: Metadata = {
  title: "References",
  description:
    "Every primary source the platform cites — Miller 1968, Card et al. 1991, Doherty & Thadani 1982, Nielsen 1993, Anstis 2001/2003/2004, Myers 1985, Harrison et al. 2007/2010, latency JND research, time-perception literature — plus labelled industry primary sources (Fitch, Eizenberg, Mishunov).",
};

export default function ReferencesPage() {
  return (
    <article className="mx-auto max-w-4xl px-8 py-12 lg:px-12 xl:px-16">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Bibliography · {totalRefs()} sources
      </p>
      <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
        References
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Every claim on the platform anchors to a citable source. Peer-reviewed academic
        work is grouped first by the kind of finding it supports; industry primary
        sources (conference talks, case studies, blog posts) are listed separately and
        carry the{" "}
        <span className="font-mono text-xs font-medium uppercase tracking-wider text-primary">
          industry
        </span>{" "}
        label so you can tell them apart at a glance.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Each entry is anchored — clicking the{" "}
        <span className="font-mono text-xs font-medium text-primary">[Label]</span>{" "}
        pill in any essay jumps you here. Use this page as the canonical source list
        when arguing about a claim.
      </p>

      <div className="mt-12 space-y-12">
        {ALL_CATEGORIES.map((category) => (
          <section key={category.id} aria-labelledby={`section-${category.id}`}>
            <h2
              id={`section-${category.id}`}
              className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground"
            >
              {category.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {category.description}
            </p>
            <ReferencesList refs={category.refs} />
          </section>
        ))}
      </div>
    </article>
  );
}

function totalRefs(): number {
  return ALL_CATEGORIES.reduce((sum, cat) => sum + cat.refs.length, 0);
}
