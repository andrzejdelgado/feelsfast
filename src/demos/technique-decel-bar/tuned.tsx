"use client";

import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Tuned — same wall-clock duration. Two perception tricks stacked:
 *   1. Eased fill: progress curve is `t^0.55`, fast at the start and
 *      slow as it approaches 100 %. The visual progress is *ahead*
 *      of the linear bar for most of the wait.
 *   2. Backwards-moving ribs: a striped repeating gradient slides
 *      against the fill direction, giving the bar a sense of
 *      forward momentum even when its width is barely changing.
 *
 * Harrison et al. 2010 measured ~11–12 % perceived speed-up vs.
 * linear at the same real duration. Two CSS tricks, one extra
 * easing call — production cost is roughly zero.
 */
export function TunedDecelBar() {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalRef = useRef(TOTAL_DURATION_P50_MS);

  useEffect(() => {
    totalRef.current = gammaJitter(TOTAL_DURATION_P50_MS);
    const start = performance.now();
    intervalRef.current = setInterval(() => {
      const elapsed = performance.now() - start;
      const tLinear = Math.min(1, elapsed / totalRef.current);
      // Backwards-decelerating: fast start, slow finish.
      const eased = Math.pow(tLinear, 0.55);
      setProgress(eased);
      if (tLinear >= 1 && intervalRef.current !== null) {
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
          className="h-full motion-reduce:bg-primary"
          style={{
            width: `${pct}%`,
            backgroundColor: "var(--primary)",
            backgroundImage:
              "repeating-linear-gradient(-45deg, color-mix(in oklch, white 18%, transparent) 0 6px, transparent 6px 12px)",
            backgroundSize: "24px 100%",
            animation: "decel-rib 700ms linear infinite",
            transition: "width 100ms ease-out",
          }}
        />
      </div>
      <p className="font-mono text-[0.6875rem] tabular-nums text-muted-foreground">
        {pct}% · eased + backward ribs (Harrison 2010, ~12% perceived gain)
      </p>
      <style>{`
        @keyframes decel-rib {
          from { background-position: 0 0; }
          to   { background-position: -24px 0; }
        }
      `}</style>
    </div>
  );
}
