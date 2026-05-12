import type { Metadata } from "next";
import {
  categories,
  scenarios,
  scenariosByCategory,
} from "@/lib/scenarios";
import { ScenariosCategorizedList } from "@/components/ScenariosCategorizedList";

export const metadata: Metadata = {
  title: "Scenarios",
  description:
    "Twenty-four interaction types grouped by where in your product they live — navigation and loading, input and forms, content loading, file transfer, manipulation, and AI patterns. Each one paired with a side-by-side naive/tuned demo.",
};

export default function ScenariosPage() {
  const groups = categories
    .map((category) => ({
      category,
      items: scenariosByCategory(category.id),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <article className="py-12">
      <header className="mx-auto max-w-4xl px-8 lg:px-12 xl:px-16">
        <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {scenarios.length} scenarios · {categories.length} categories
        </p>
        <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
          Scenarios
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Every async surface that ships in a modern product, grouped by where it lives. Pick the category that matches the problem you are trying to solve.
        </p>
      </header>

      <ScenariosCategorizedList groups={groups} />
    </article>
  );
}
