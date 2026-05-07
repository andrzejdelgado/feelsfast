"use client";

import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Tuned — a primary-coloured segment ~30 % the width of the track
 * slides repeatedly from left edge to right edge over 1.1 s. Pure
 * motion, no completion claim — the bar never reaches "done" until
 * the work itself does.
 *
 * Implementation note: this is a pure CSS animation on
 * `transform: translateX()` (compositor-only). No JS animation, no
 * reflow per frame. Reduced-motion users see a static segment
 * positioned at 35 % — the visual cue stays, the motion does not.
 */
export function TunedMarqueeBar() {
  const [phase, setPhase] = useState<"loading" | "done">("loading");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () => setPhase("done"),
      gammaJitter(TOTAL_DURATION_P50_MS),
    );
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="space-y-3">
      <div
        role="progressbar"
        aria-label="Working"
        aria-valuemin={0}
        aria-valuemax={100}
        className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted/60"
      >
        {phase === "loading" ? (
          <div
            aria-hidden
            className="absolute left-0 top-0 h-full w-[30%] rounded-full bg-primary motion-reduce:animate-none"
            style={{
              animation: "marquee-slide 1100ms cubic-bezier(0.4,0,0.2,1) infinite",
            }}
          />
        ) : null}
      </div>
      <p className="text-xs text-muted-foreground">
        {phase === "loading" ? "Working…" : "Done."}
      </p>
      <style>{`
        @keyframes marquee-slide {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(333%); }
        }
      `}</style>
    </div>
  );
}
