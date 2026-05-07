import type { Metadata } from "next";
import { DemoRunner } from "@/components/DemoRunner";
import { NaiveListFetch } from "@/demos/list-fetch/naive";
import { TunedListFetch } from "@/demos/list-fetch/tuned";
import { config as listFetchConfig } from "@/demos/list-fetch/config";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Compose your own demo — chain page load + skeleton + prefetch + animated progress and watch the perception toggle apply across the whole stack.",
};

export default function PlaygroundPage() {
  return (
    <article className="mx-auto max-w-3xl px-8 py-12 lg:px-12 xl:px-16">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Sandbox
      </p>
      <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
        Playground
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Compose patterns into a single demo and toggle the perception layer across all
        of them at once. The first working demo lives below — more land in Phase 3 as
        Scenarios fill in.
      </p>

      <div className="mt-10">
        <DemoRunner
          config={listFetchConfig}
          Naive={NaiveListFetch}
          Tuned={TunedListFetch}
        />
      </div>

      <p className="mt-10 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Demo runner — proof of concept · gamma-distributed latency · Replay re-runs both
        sides · Perception toggle mirrors the naive into the right column when off
      </p>
    </article>
  );
}
