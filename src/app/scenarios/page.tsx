import type { Metadata } from "next";
import {
  categories,
  scenarios,
  scenariosByCategory,
} from "@/lib/scenarios";
import { ScenariosCategorizedList } from "@/components/ScenariosCategorizedList";

export const metadata: Metadata = {
  title: "Scenarios — Loading State Patterns by Use Case",
  description:
    "Twenty-four loading-state scenarios with side-by-side demos: navigation, forms, file upload, search, AI chat, drag-and-drop, optimistic UI, and more.",
  alternates: { canonical: "/scenarios" },
  keywords: [
    "loading state ux",
    "loading state examples",
    "loading state patterns",
    "skeleton screen examples",
    "progress bar examples",
    "ui loading patterns",
  ],
  openGraph: {
    title: "Scenarios — Loading State Patterns by Use Case",
    description:
      "Twenty-four loading-state scenarios with side-by-side demos: navigation, forms, file upload, search, AI chat, drag-and-drop, optimistic UI.",
    type: "website",
    url: "/scenarios",
    images: ["/opengraph-image"],
  },
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
      </header>

      <ScenariosCategorizedList groups={groups} />
    </article>
  );
}
