import type { Metadata } from "next";
import Link from "next/link";
import {
  categories,
  scenarios,
  scenariosByCategory,
  type Scenario,
} from "@/lib/scenarios";

export const metadata: Metadata = {
  title: "Scenarios",
  description:
    "Twenty-four interaction types grouped by where in your product they live — navigation and loading, input and forms, content loading, file transfer, direct manipulation, and AI patterns. Each one paired with a side-by-side naive/tuned demo.",
};

const statusLabel: Record<Scenario["status"], string> = {
  published: "Read",
  drafting: "Drafting",
  planned: "Planned",
};

export default function ScenariosPage() {
  return (
    <article className="mx-auto max-w-4xl px-8 py-12 lg:px-12 xl:px-16">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {scenarios.length} scenarios · {categories.length} categories
      </p>
      <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
        Scenarios
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Every async surface that ships in a modern product, grouped by where it lives. Pick the category that matches the problem you are trying to solve.
      </p>

      <div className="mt-12 space-y-12">
        {categories.map((category) => {
          const items = scenariosByCategory(category.id);
          if (items.length === 0) return null;
          return (
            <section key={category.id} aria-labelledby={`cat-${category.id}`}>
              <h2
                id={`cat-${category.id}`}
                className="font-mono text-xs font-medium uppercase tracking-wider text-primary"
              >
                {category.label} · {items.length}
                {items.length === 1 ? " scenario" : " scenarios"}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {category.blurb}
              </p>
              <ol className="mt-6 space-y-3">
                {items.map((scenario) => (
                  <li key={scenario.slug}>
                    <ScenarioCard scenario={scenario} />
                  </li>
                ))}
              </ol>
            </section>
          );
        })}
      </div>
    </article>
  );
}

function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const isPublished = scenario.status === "published";
  const className = `block rounded-lg border border-border bg-card p-5 transition-colors ${
    isPublished ? "hover:border-primary" : "opacity-70"
  }`;

  const inner = (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
          Scenario · {scenario.number}
        </p>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-primary">
            {scenario.band}
          </span>
          <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
            {statusLabel[scenario.status]}
          </span>
        </div>
      </div>
      <p className="mt-2 text-lg font-medium tracking-tight">{scenario.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {scenario.blurb}
      </p>
      <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
        Patterns · {scenario.linkedPatterns.join(" · ")}
      </p>
    </>
  );

  if (isPublished) {
    return (
      <Link href={`/scenarios/${scenario.slug}`} className={className}>
        {inner}
      </Link>
    );
  }
  return <div className={className}>{inner}</div>;
}
