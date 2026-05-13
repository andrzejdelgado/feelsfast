"use client";

import { useEffect, useState } from "react";
import { useSimulatedLatency } from "@/lib/use-simulated-latency";
import { RESPONSE, RESPONSE_MOBILE, TOTAL_DURATION_P50_MS } from "./config";

export function NaiveAIStreaming({ seed = 1 }: { seed?: number }) {
  const { isLoading } = useSimulatedLatency({ p50: TOTAL_DURATION_P50_MS }, seed);
  const [response, setResponse] = useState<string>(RESPONSE);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setResponse(mq.matches ? RESPONSE_MOBILE : RESPONSE);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Always render the same card so the height stays constant. During
  // loading the text is `invisible` (visibility: hidden) — it still
  // reserves its final layout space; only the painted content flips.
  return (
    <div className="rounded-md border border-border bg-card p-4 text-sm leading-relaxed">
      <span className={isLoading ? "invisible" : undefined}>{response}</span>
    </div>
  );
}
