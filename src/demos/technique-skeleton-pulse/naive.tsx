"use client";

import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Naive — content-true skeleton with no animation. The skeleton is
 * honest but the page reads as "frozen" rather than "loading."
 */
export function NaiveSkeletonPulse() {
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
      <div className="h-4 w-1/2 rounded bg-muted" />
      <div className="h-3 w-full rounded bg-muted" />
      <div className="h-3 w-5/6 rounded bg-muted" />
      <div className="h-3 w-2/3 rounded bg-muted" />
    </div>
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
