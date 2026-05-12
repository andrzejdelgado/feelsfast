import type { Metadata } from "next";
import {
  essayCategories,
  essays,
  essaysByCategory,
} from "@/lib/essays";
import { ConceptsCategorizedList } from "@/components/ConceptsCategorizedList";

export const metadata: Metadata = {
  title: "Concepts",
  description:
    "Seven essays on the science of perceived performance — the dichotomy with objective time, the canonical thresholds (Miller, Card, Doherty), the time-perception illusions you can exploit, and where the perception layer breaks down.",
};

export default function ConceptsPage() {
  const groups = essayCategories
    .map((category) => ({
      category,
      items: essaysByCategory(category.id),
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
