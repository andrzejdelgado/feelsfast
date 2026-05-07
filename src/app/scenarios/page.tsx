import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scenarios",
  description:
    "Twenty-four interaction types, each with a side-by-side naive/tuned demo you can feel — page load, route navigation, form submission, search-as-you-type, file upload, AI streaming response, agent execution, and more.",
};

export default function ScenariosPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-12">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        24 scenarios · 5 ai-tagged
      </p>
      <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
        Scenarios
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Twenty-four interaction types, each with a side-by-side demo. Toggle the perception
        layer off and on. The naive side is honestly awkward — no skeleton, no prefetch, no
        smoothing. The tuned side applies the right pattern for the dominant time band.
      </p>
      <p className="mt-8 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Coming in Phase 3 — full catalog with demos, time-band tags, and AI tag filter.
      </p>
    </article>
  );
}
