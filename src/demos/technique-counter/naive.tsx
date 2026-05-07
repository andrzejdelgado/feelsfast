"use client";

import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import {
  COUNT_DURATION_MS,
  TARGET_VALUE,
  TOTAL_DURATION_P50_MS,
} from "./config";

/**
 * Naive — number snaps to the final value once data lands. The reveal
 * is delayed by COUNT_DURATION_MS so it lands at the same wall-clock
 * moment Tuned's counter reaches TARGET_VALUE — apples-to-apples on
 * arrival time, different in *how* the number arrives (snap vs count).
 */
export function NaiveCounter({ seed = 1 }: { seed?: number }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    ref.current = setTimeout(
      () => setLoaded(true),
      seededGamma(seed, TOTAL_DURATION_P50_MS) + COUNT_DURATION_MS,
    );
    return () => {
      if (ref.current !== null) clearTimeout(ref.current);
    };
  }, [seed]);

  return (
    <div className="grid min-h-[5rem] place-items-center rounded-md border border-border bg-background">
      <div className="text-center">
        <p className="font-mono text-3xl font-medium tabular-nums text-foreground">
          {loaded ? TARGET_VALUE.toLocaleString() : "—"}
        </p>
        <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
          Results found
        </p>
      </div>
    </div>
  );
}
