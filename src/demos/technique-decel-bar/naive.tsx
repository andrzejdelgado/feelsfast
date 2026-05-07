"use client";

import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Naive — linear fill, no rib pattern. Honest, fine, but leaves
 * Harrison's ~12 % perceptual gain on the table.
 */
export function NaiveDecelBar() {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalRef = useRef(TOTAL_DURATION_P50_MS);

  useEffect(() => {
    totalRef.current = gammaJitter(TOTAL_DURATION_P50_MS);
    const start = performance.now();
    intervalRef.current = setInterval(() => {
      const elapsed = performance.now() - start;
      const t = Math.min(1, elapsed / totalRef.current);
      setProgress(t);
      if (t >= 1 && intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 50);
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, []);

  const pct = Math.round(progress * 100);
  return (
    <div className="space-y-2">
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        className="h-2 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className="h-full bg-primary transition-[width] duration-100 ease-linear"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="font-mono text-[0.6875rem] tabular-nums text-muted-foreground">
        {pct}% · linear fill
      </p>
    </div>
  );
}
