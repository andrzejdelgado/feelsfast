"use client";

import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Naive — just the status line, no visual progress affordance. The
 * user reads "Working…" and wonders if the page is stuck — there's
 * no motion to confirm anything is actually happening.
 */
export function NaiveMarqueeBar({ seed = 1 }: { seed?: number }) {
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
    <p className="text-xs text-muted-foreground">
      {phase === "loading" ? "Working…" : "Done."}
    </p>
  );
}
