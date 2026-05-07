import type { Metadata } from "next";
import Link from "next/link";
import { essays, STATUS_LABEL, type Essay } from "@/lib/essays";

export const metadata: Metadata = {
  title: "Concepts",
  description:
    "Seven essays on the science of perceived performance — the dichotomy with objective time, the canonical thresholds (Miller, Card, Doherty), the time-perception illusions you can exploit, and where the perception layer breaks down.",
};

function EssayCard({ essay }: { essay: Essay }) {
  const isReadable = essay.status === "published";
  const className = `block rounded-lg border border-border bg-card p-5 transition-colors ${
    isReadable ? "hover:border-primary" : "opacity-70"
  }`;

  const inner = (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
          Essay · {essay.number}
        </p>
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-primary">
          {STATUS_LABEL[essay.status]}
        </p>
      </div>
      <p className="mt-2 text-lg font-medium tracking-tight">{essay.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {essay.blurb}
      </p>
      {essay.citations.length > 0 ? (
        <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
          Cites · {essay.citations.join(" · ")}
        </p>
      ) : null}
    </>
  );

  if (isReadable) {
    return (
      <Link href={`/concepts/${essay.slug}`} className={className}>
        {inner}
      </Link>
    );
  }
  return <div className={className}>{inner}</div>;
}

export default function ConceptsPage() {
  return (
    <article className="mx-auto max-w-4xl px-8 py-12 lg:px-12 xl:px-16">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        7 essays
      </p>
      <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
        Concepts
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Short, opinionated essays on how time is perceived, why the gap between objective
        and subjective performance matters, and where the canonical thresholds actually
        come from. Every claim cites a primary source.
      </p>

      <ol className="mt-12 space-y-3">
        {essays.map((essay) => (
          <li key={essay.slug}>
            <EssayCard essay={essay} />
          </li>
        ))}
      </ol>
    </article>
  );
}
