import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Concepts",
  description:
    "Seven essays on the science of perceived performance — the dichotomy with objective time, the canonical thresholds (Miller, Card, Doherty), the time-perception illusions you can exploit, and where the perception layer breaks down.",
};

const essays = [
  {
    slug: "perceived-performance",
    number: "01",
    title: "What perceived performance actually is",
    blurb:
      "The dichotomy between objective and perceived performance, the 20 % just-noticeable difference, and where looking-fast stops being a substitute for being-fast.",
    citations: ["Miller 1968", "Nielsen 1993", "Doherty 1982", "Weber–Fechner", "Eizenberg"],
    status: "published" as const,
  },
  {
    slug: "how-humans-perceive-time",
    number: "02",
    title: "How humans perceive time",
    blurb:
      "Active vs. passive phases, the dopamine pathway, filled vs. empty duration, prospective vs. retrospective duration judgments, and the one-second active-to-passive transition.",
    citations: ["James 1890", "Ornstein 1969", "Block & Zakay 1997", "Fitch", "Myers 1985"],
    status: "published" as const,
  },
  {
    slug: "canonical-thresholds",
    number: "03",
    title: "The canonical thresholds",
    blurb:
      "Miller 1968's 17-transaction taxonomy, Card et al. 1991's perceptual / immediate-response / unit-task tiers, Doherty's 400 ms productivity cliff, and Nielsen's 1993 distillation. Why the clean 0.1 / 1 / 10 trichotomy is Nielsen's framing, not Miller's.",
    citations: [
      "Miller 1968",
      "Card, Moran & Newell 1983",
      "Card et al. 1991",
      "Doherty 1982",
      "Nielsen 1993",
    ],
    status: "published" as const,
  },
  {
    slug: "anatomy-of-a-wait",
    number: "04",
    title: "The anatomy of a wait",
    blurb:
      "Decompose every wait into pre-action signal → response → animation → completion. What you can tune at each stage. The tip-the-hand rule.",
    citations: [],
    status: "planned" as const,
  },
  {
    slug: "time-perception-illusions",
    number: "05",
    title: "Time perception illusions you can exploit",
    blurb:
      "Anstis on contrast and motion. Harrison et al. on backwards-decelerating progress bars. The geometric-mean indifference threshold. When illusions are honest and when they cross into deception.",
    citations: ["Anstis 2001", "Anstis 2003", "Anstis 2004", "Harrison et al. 2010"],
    status: "planned" as const,
  },
  {
    slug: "when-perceived-performance-hurts-you",
    number: "06",
    title: "When perceived performance hurts you",
    blurb:
      "Eizenberg's argument, latency JNDs in direct manipulation, and where polished placeholders become polished lies.",
    citations: ["Eizenberg", "Deber et al. 2015", "Jota et al. 2013"],
    status: "planned" as const,
  },
  {
    slug: "performance-budgets-with-perception",
    number: "07",
    title: "Performance budgets that include perception",
    blurb:
      "INP and Web Vitals as a starting point. How to add perception to a quantitative budget. The role of adaptive loading and the performance scaler.",
    citations: ["Eli Fitch"],
    status: "planned" as const,
  },
];

type EssayStatus = "published" | "drafting" | "planned";

const statusLabel: Record<EssayStatus, string> = {
  published: "Read",
  drafting: "Drafting",
  planned: "Planned",
};

type Essay = (typeof essays)[number];

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
          {statusLabel[essay.status]}
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
