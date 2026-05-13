import type { Metadata } from "next";
import {
  essayCategories,
  essays,
  essaysByCategory,
} from "@/lib/essays";
import { getEssayReadTime } from "@/lib/read-time";
import { ConceptsCategorizedList } from "@/components/ConceptsCategorizedList";

export const metadata: Metadata = {
  title: "Concepts",
  description:
    "Short, opinionated essays on the science of perceived performance — how humans perceive time, the canonical thresholds (Miller, Card, Doherty, Nielsen), the illusions you can exploit, where the perception layer breaks down, the decision rule for which loading affordance to ship at which time band, and what changes when the wait is AI.",
};

export default function ConceptsPage() {
  const groups = essayCategories
    .map((category) => ({
      category,
      items: essaysByCategory(category.id).map((essay) => ({
        ...essay,
        readTime: getEssayReadTime(essay.slug),
      })),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <article className="py-12">
      <header className="mx-auto max-w-4xl px-8 lg:px-12 xl:px-16">
        <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {essays.length} essays · {essayCategories.length} categories
        </p>
        <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
          Concepts
        </h1>
      </header>

      <ConceptsCategorizedList groups={groups} />
    </article>
  );
}
