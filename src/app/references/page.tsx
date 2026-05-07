import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "References",
  description:
    "Every primary source the platform cites — Miller 1968, Card et al. 1991, Doherty & Thadani 1982, Nielsen 1993, Anstis 2001/2003/2004, Myers 1985, Harrison et al. 2007/2010, and more — plus labelled industry primary sources.",
};

export default function ReferencesPage() {
  return (
    <article className="px-8 py-12 lg:px-12 xl:px-16">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Bibliography
      </p>
      <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
        References
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Every claim on the platform anchors to a citable source. Peer-reviewed academic
        work is listed first; industry primary sources (Anthropic, OpenAI, product team
        case studies, tool documentation) carry an{" "}
        <span className="font-mono text-xs uppercase tracking-wider">industry</span> label
        so readers can tell them apart.
      </p>
      <p className="mt-8 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Coming in Phase 3 — annotated bibliography with anchors back to every page that
        cites each source.
      </p>
    </article>
  );
}
