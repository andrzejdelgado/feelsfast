import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Compose your own demo — chain page load + skeleton + prefetch + animated progress and watch the perception toggle apply across the whole stack.",
};

export default function PlaygroundPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-12">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Sandbox
      </p>
      <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
        Playground
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Compose patterns into a single demo and toggle the perception layer across all of
        them at once. Useful for the moment when you want to feel several techniques stacking
        together, not just each one in isolation.
      </p>
      <p className="mt-8 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Coming in Phase 4.
      </p>
    </article>
  );
}
