"use client";

import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Tuned — a small primary-coloured orb that breathes. Two CSS
 * animations stacked: a subtle scale (1 → 1.15 → 1) and a paired
 * opacity (0.7 → 1 → 0.7), both running on a 1.6 s cycle. Calmer
 * than a spinner, communicates "the agent is here" between turns.
 *
 * Used in modern AI surfaces (Claude desktop, ChatGPT voice mode)
 * where a spinner would be too aggressive for what is often a brief
 * pause.
 *
 * Reduced-motion fallback: a static dot at full opacity. The
 * presence cue stays; the breath does not.
 */
export function TunedPulsingOrb({ seed = 1 }: { seed?: number }) {
  const [loaded, setLoaded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () => setLoaded(true),
      seededGamma(seed, TOTAL_DURATION_P50_MS),
    );
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="space-y-2">
      {loaded ? (
        <p className="text-sm leading-relaxed text-foreground">
          Yes — that&apos;s exactly the right framing.
        </p>
      ) : (
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="block size-2.5 rounded-full bg-primary motion-reduce:animate-none"
            style={{ animation: "orb-breath 1600ms ease-in-out infinite" }}
          />
          <span className="sr-only">Working</span>
        </div>
      )}
      <style>{`
        @keyframes orb-breath {
          0%, 100% { transform: scale(1);    opacity: 0.65; }
          50%      { transform: scale(1.25); opacity: 1;    }
        }
      `}</style>
    </div>
  );
}
