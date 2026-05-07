"use client";

import { useSimulatedLatency } from "@/lib/use-simulated-latency";
import { RESPONSE } from "./config";

export function NaiveAIStreaming() {
  const { isLoading } = useSimulatedLatency({ p50: 5500 });

  if (isLoading) {
    return <div className="h-32" aria-hidden />;
  }

  return (
    <div className="rounded-md border border-border bg-card p-4 text-sm leading-relaxed">
      {RESPONSE}
    </div>
  );
}
