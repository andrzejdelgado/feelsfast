import type { Metadata } from "next";
import { DemoRunner } from "@/components/DemoRunner";
import { NaiveListFetch } from "@/demos/list-fetch/naive";
import { TunedListFetch } from "@/demos/list-fetch/tuned";
import { config as listFetchConfig } from "@/demos/list-fetch/config";
import { NaiveSearchAsYouType } from "@/demos/search-as-you-type/naive";
import { TunedSearchAsYouType } from "@/demos/search-as-you-type/tuned";
import { config as searchConfig } from "@/demos/search-as-you-type/config";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Compose your own demo — chain page load + skeleton + prefetch + animated progress and watch the perception toggle apply across the whole stack.",
};

export default function PlaygroundPage() {
  return (
    <article className="mx-auto max-w-4xl px-8 py-12 lg:px-12 xl:px-16">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Sandbox
      </p>
      <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
        Playground
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Compose patterns into a single demo and toggle the perception layer across all
        of them at once. Working demos live below — more land in Phase 3 as Scenarios
        fill in.
      </p>

      <div className="mt-10 space-y-6">
        <DemoRunner
          config={listFetchConfig}
          Naive={NaiveListFetch}
          Tuned={TunedListFetch}
        />
        <DemoRunner
          config={searchConfig}
          Naive={NaiveSearchAsYouType}
          Tuned={TunedSearchAsYouType}
        />
      </div>

      <p className="mt-10 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Demo runner · gamma-distributed latency · Replay re-runs both sides · Perception
        toggle mirrors the naive into the right column when off
      </p>
    </article>
  );
}
