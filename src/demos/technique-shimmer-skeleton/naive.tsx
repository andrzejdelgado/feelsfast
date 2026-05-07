"use client";

import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Naive — content-true skeleton with NO animation. The boxes are in
 * roughly the right places and the right sizes, but the surface stays
 * static. Honest, but visually quiet — the eye does not register that
 * anything is happening.
 */
export function NaiveShimmerSkeleton() {
  const [loaded, setLoaded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () => setLoaded(true),
      gammaJitter(TOTAL_DURATION_P50_MS),
    );
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  return loaded ? <Card /> : <StaticSkeleton />;
}

function StaticSkeleton() {
  return (
    <div className="space-y-2.5 rounded-md border border-border bg-background p-3">
      <div className="h-3 w-32 rounded bg-muted" />
      <div className="h-2.5 w-full rounded bg-muted" />
      <div className="h-2.5 w-5/6 rounded bg-muted" />
      <div className="h-2.5 w-2/3 rounded bg-muted" />
    </div>
  );
}

function Card() {
  return (
    <div className="space-y-2.5 rounded-md border border-border bg-background p-3 text-sm">
      <p className="font-medium">Q3 sprint goals</p>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Ship perceived-performance demos. Migrate staging. Cut Q3 release branch
        on Friday.
      </p>
    </div>
  );
}
