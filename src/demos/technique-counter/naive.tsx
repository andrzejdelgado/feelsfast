"use client";

import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import { TARGET_VALUE, TOTAL_DURATION_P50_MS } from "./config";

/**
 * Naive — number snaps to the final value the moment data lands. The
 * result reads as a label. Honest, but flat.
 */
export function NaiveCounter() {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    ref.current = setTimeout(
      () => setLoaded(true),
      gammaJitter(TOTAL_DURATION_P50_MS),
    );
    return () => {
      if (ref.current !== null) clearTimeout(ref.current);
    };
  }, []);

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
