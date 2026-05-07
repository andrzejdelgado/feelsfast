import type { Metadata } from "next";
import Link from "next/link";
import { CatalogFilter } from "@/components/CatalogFilter";
import { scenarios, aiScenarios, type Scenario } from "@/lib/scenarios";

export const metadata: Metadata = {
  title: "Scenarios",
  description:
    "Twenty-four interaction types, each paired with a side-by-side naive/tuned demo — page load, route navigation, form submission, search-as-you-type, file upload, AI streaming response, agent execution, and more. Filter by the AI tag to surface AI-specific scenarios.",
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
        24 scenarios · {aiScenarios.length} AI-tagged
      </p>
      <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
        Scenarios
      </h1>

      <div className="mt-10">
        <CatalogFilter
          total={scenarios.length}
          aiCount={aiScenarios.length}
          renderedAll={<ScenarioList items={scenarios} />}
          renderedAi={<ScenarioList items={aiScenarios} />}
        />
      </div>
    </article>
  );
}

function ScenarioList({ items }: { items: readonly Scenario[] }) {
  return (
    <ol className="space-y-3">
      {items.map((scenario) => (
        <li key={scenario.slug}>
          <ScenarioCard scenario={scenario} />
        </li>
      ))}
    </ol>
  );
}

function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const isPublished = scenario.status === "published";
  const className = `block rounded-lg border border-border bg-card p-5 transition-colors ${
    isPublished
      ? "hover:border-primary"
      : "opacity-70"
  }`;

  const inner = (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="flex items-center gap-2 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
          <span>Scenario · {scenario.number}</span>
          {scenario.ai ? (
            <span className="rounded-sm bg-primary/10 px-1.5 py-0 text-primary">
              AI
            </span>
          ) : null}
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
