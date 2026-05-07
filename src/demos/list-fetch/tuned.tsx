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
          <div className="h-3.5 w-32 animate-pulse rounded bg-muted motion-reduce:animate-none" />
          <div className="mt-1.5 h-3 w-48 animate-pulse rounded bg-muted/60 motion-reduce:animate-none" />
        </li>
      ))}
    </ul>
  );
}
