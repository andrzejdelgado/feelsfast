"use client";

import { useSimulatedLatency } from "@/lib/use-simulated-latency";
import { cn } from "@/lib/utils";
import { items, LATENCY } from "./config";

export function NaiveListFetch({ seed = 1 }: { seed?: number }) {
  const { isLoading } = useSimulatedLatency(LATENCY, seed);

  // Render the same list structure in both states — during loading the
  // items are `invisible` (visibility: hidden) so they reserve their
  // final layout height without painting. When the data lands, the
  // items become visible in place. No height jump, naive's "wait
  // silently" effect is preserved: the user sees empty space, then the
  // items snap in.
  return (
    <ul className="space-y-2" aria-busy={isLoading}>
      {items.map((item) => (
        <li
          key={item.id}
          className={cn(
            "rounded border border-border bg-card px-3 py-2",
            isLoading && "invisible",
          )}
        >
          <p className="text-sm font-medium">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.role}</p>
        </li>
      ))}
    </ul>
  );
}
