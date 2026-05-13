"use client";

import { useSimulatedLatency } from "@/lib/use-simulated-latency";
import { items, LATENCY } from "./config";

export function TunedListFetch({ seed = 1 }: { seed?: number }) {
  const { isLoading } = useSimulatedLatency(LATENCY, seed);

  if (isLoading) {
    return <ListSkeleton count={items.length} />;
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item.id}
          className="rounded border border-border bg-card px-3 py-2"
        >
          <p className="text-sm font-medium">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.role}</p>
        </li>
      ))}
    </ul>
  );
}

function ListSkeleton({ count }: { count: number }) {
  return (
    <ul
      className="space-y-2"
      aria-busy="true"
      aria-label="Loading list"
    >
      {Array.from({ length: count }).map((_, i) => (
        <li
          key={i}
          className="rounded border border-border bg-card px-3 py-2"
        >
          {/* Each row matches the loaded item's two-paragraph layout
              (text-sm + text-xs) so the line-height drives the row
              height. The skeleton bars sit inside as inline-block
              ornaments — they animate but do not change the box height.
              Result: no jump when the loaded items replace the
              skeleton, just an in-place reveal. */}
          <p className="text-sm font-medium">
            <span className="inline-block h-3.5 w-32 animate-pulse rounded bg-muted align-middle motion-reduce:animate-none" />
          </p>
          <p className="text-xs text-muted-foreground">
            <span className="inline-block h-3 w-48 animate-pulse rounded bg-muted/60 align-middle motion-reduce:animate-none" />
          </p>
        </li>
      ))}
    </ul>
  );
}
