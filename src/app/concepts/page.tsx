import type { Metadata } from "next";
import {
  essayCategories,
  essays,
  essaysByCategory,
} from "@/lib/essays";
import { getEssayReadTime } from "@/lib/read-time";
import { ConceptsCategorizedList } from "@/components/ConceptsCategorizedList";

export const metadata: Metadata = {
  title: "Concepts — Perceived Performance Essays",
  description:
    "Essays on perceived performance and loading-state UX: how humans perceive time, the anatomy of a wait, which loading affordance to ship when, and what changes for AI.",
  alternates: { canonical: "/concepts" },
  keywords: [
    "perceived performance",
    "loading states",
    "loading state ux",
    "loading ux best practices",
    "wait time ux",
    "loading screen design",
  ],
  openGraph: {
    title: "Concepts — Perceived Performance Essays",
    description:
      "Essays on perceived performance and loading-state UX: how humans perceive time, the anatomy of a wait, which loading affordance to ship when.",
    type: "website",
    url: "/concepts",
    images: ["/opengraph-image"],
  },
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
