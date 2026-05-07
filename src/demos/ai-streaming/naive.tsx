"use client";

import { useSimulatedLatency } from "@/lib/use-simulated-latency";
import { RESPONSE, TOTAL_DURATION_P50_MS } from "./config";

export function NaiveAIStreaming({ seed = 1 }: { seed?: number }) {
  const { isLoading } = useSimulatedLatency({ p50: TOTAL_DURATION_P50_MS }, seed);

  if (isLoading) {
    return <div className="h-32" aria-hidden />;
  }

  return (
    <div className="rounded-md border border-border bg-card p-4 text-sm leading-relaxed">
      {RESPONSE}
    </div>
  );
}
