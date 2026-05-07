"use client";

import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Tuned — every skeleton block pulses opacity from 0.5 to 1 and back
 * over 1.4 s, in sync. No horizontal sweep, no gradient — just a
 * breath. Lower visual cost than shimmer; preferred when the
 * surrounding surface (sidebar, navigation) already has motion of
 * its own.
 */
export function TunedSkeletonPulse() {
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

  if (loaded) return <Card />;
  return (
    <div className="space-y-2 rounded-md border border-border bg-background p-3">
      <Block className="h-4 w-1/2" />
      <Block className="h-3 w-full" />
      <Block className="h-3 w-5/6" />
      <Block className="h-3 w-2/3" />
      <style>{`
        @keyframes skeleton-pulse {
          0%, 100% { opacity: 0.5; }
          50%      { opacity: 1;   }
        }
      `}</style>
    </div>
  );
}

function Block({ className }: { className: string }) {
  return (
    <div
      className={`rounded bg-muted motion-reduce:animate-none ${className}`}
      style={{ animation: "skeleton-pulse 1400ms ease-in-out infinite" }}
    />
  );
}

function Card() {
  return (
    <div className="rounded-md border border-border bg-background p-3 text-sm">
      <p className="font-medium">Project status</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        Three open PRs awaiting review. One blocking issue on the database
        migration. Sprint review is Friday at 14:00.
      </p>
    </div>
  );
}
