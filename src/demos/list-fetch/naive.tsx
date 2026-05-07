"use client";

import { useSimulatedLatency } from "@/lib/use-simulated-latency";
import { items, LATENCY } from "./config";

export function NaiveListFetch() {
  const { isLoading } = useSimulatedLatency(LATENCY);

  if (isLoading) {
    return <div className="h-32" aria-hidden />;
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
