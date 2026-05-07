"use client";

import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { COUNT_DURATION_MS, TARGET_VALUE, TOTAL_DURATION_P50_MS } from "./config";

/**
 * Tuned — once the data lands, the displayed value animates up from
 * 0 to TARGET_VALUE over ~700 ms with an ease-out curve. The user
 * reads the count as the system *arriving* at the answer rather
 * than a value that was always there.
 *
 * Reduced-motion users see the final value immediately — the
 * discovery framing degrades to the same end state, no animation.
 */
export function TunedCounter({ seed = 1 }: { seed?: number }) {
  const [display, setDisplay] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const loadRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    loadRef.current = setTimeout(() => {
      setLoaded(true);
      // Tween from 0 → TARGET_VALUE.
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setDisplay(TARGET_VALUE);
        return;
      }
      const start = performance.now();
      const tick = () => {
        const elapsed = performance.now() - start;
        const t = Math.min(1, elapsed / COUNT_DURATION_MS);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(Math.round(eased * TARGET_VALUE));
        if (t < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }, seededGamma(seed, TOTAL_DURATION_P50_MS));

    return () => {
      if (loadRef.current !== null) clearTimeout(loadRef.current);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="grid min-h-[5rem] place-items-center rounded-md border border-border bg-background">
      <div className="text-center">
        <p className="font-mono text-3xl font-medium tabular-nums text-foreground">
          {loaded ? display.toLocaleString() : "—"}
        </p>
        <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
          Results found
        </p>
      </div>
    </div>
  );
}
