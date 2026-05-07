import type { Metadata } from "next";
import { CatalogFilter } from "@/components/CatalogFilter";
import { patterns, type Pattern } from "@/lib/patterns";

export const metadata: Metadata = {
  title: "Patterns",
  description:
    "Twenty-four research-backed techniques — skeleton screens, optimistic UI, determinate progress, view transitions, route prefetching, token-by-token streaming, tool-call transparency, and more. Every pattern cites a primary source. Filter by the AI tag to surface AI-specific patterns.",
};

const statusLabel: Record<Pattern["status"], string> = {
  published: "Read",
  drafting: "Drafting",
  planned: "Planned",
};

const aiPatterns = patterns.filter((p) => p.ai);
const aiVariantCount = patterns.filter((p) => p.hasAiVariant).length;

export default function PatternsPage() {
  return (
    <article className="mx-auto max-w-4xl px-8 py-12 lg:px-12 xl:px-16">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        24 patterns · {aiPatterns.length} AI-tagged · {aiVariantCount} with AI variants
      </p>
      <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
        Patterns
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Research-backed techniques with code, when-to-use guidance, accessibility notes,
        and citations. No invented &quot;best practices&quot; — every claim points to a
        primary source or a labelled industry case.
      </p>

      <div className="mt-10">
        <CatalogFilter
          total={patterns.length}
          aiCount={aiPatterns.length}
          renderedAll={<PatternList items={patterns} />}
          renderedAi={<PatternList items={aiPatterns} />}
        />
      </div>
    </article>
  );
}

function PatternList({ items }: { items: readonly Pattern[] }) {
  return (
    <ol className="space-y-3">
      {items.map((pattern) => (
        <li key={pattern.slug}>
          <PatternCard pattern={pattern} />
        </li>
      ))}
    </ol>
  );
}

function PatternCard({ pattern }: { pattern: Pattern }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 opacity-90">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="flex items-center gap-2 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
          <span>Pattern · {pattern.number}</span>
          {pattern.ai ? (
            <span className="rounded-sm bg-primary/10 px-1.5 py-0 text-primary">
              AI
            </span>
          ) : null}
          {pattern.hasAiVariant ? (
            <span className="rounded-sm border border-primary/40 px-1.5 py-0 text-primary">
              + AI variant
            </span>
          ) : null}
        </p>
        <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
          {statusLabel[pattern.status]}
        </span>
      </div>
      <p className="mt-2 text-lg font-medium tracking-tight">{pattern.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {pattern.blurb}
      </p>
      <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
        Cites · {pattern.primaryCitation}
      </p>
    </div>
  );
}
