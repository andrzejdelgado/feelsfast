"use client";

import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Naive — no top-edge bar. The body waits in silence until the work
 * completes. For sub-second waits this often goes unnoticed, but for
 * the longer end of this band the user starts to wonder if anything
 * is happening.
 */
export function NaiveTrickleBar({ seed = 1 }: { seed?: number }) {
  const [phase, setPhase] = useState<"loading" | "done">("loading");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () => setPhase("done"),
      seededGamma(seed, TOTAL_DURATION_P50_MS),
    );
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="grid h-full min-h-[8rem] place-items-center rounded-md border border-border bg-background p-4">
      <p className="text-xs text-muted-foreground">
        {phase === "loading" ? "Loading…" : "Done."}
      </p>
    </div>
  );
}
