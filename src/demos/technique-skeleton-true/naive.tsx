"use client";

import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Naive — generic block skeleton (the "simple" variant). The boxes
 * are *some* boxes, but they do not match the final layout. When
 * content arrives, the layout shifts visibly because the skeleton
 * misrepresented what was coming.
 */
export function NaiveSkeletonTrue({ seed = 1 }: { seed?: number }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    ref.current = setTimeout(
      () => setLoaded(true),
      seededGamma(seed, TOTAL_DURATION_P50_MS),
    );
    return () => {
      if (ref.current !== null) clearTimeout(ref.current);
    };
  }, []);
  return loaded ? <Card /> : <SimpleSkeleton />;
}

function SimpleSkeleton() {
  return (
    <div className="space-y-2 rounded-md border border-border bg-background p-3">
      <div className="h-4 w-2/3 rounded bg-muted" />
      <div className="h-3 w-full rounded bg-muted" />
      <div className="h-3 w-3/4 rounded bg-muted" />
    </div>
  );
}

function Card() {
  return (
    <div className="flex items-start gap-2.5 rounded-md border border-border bg-background p-3">
      <div className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/15 font-mono text-[0.625rem] font-medium uppercase tracking-wider text-primary">
        MC
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-[0.8125rem] font-medium leading-none text-foreground">
          Maya Chen
        </p>
        <p className="mt-2 truncate text-[0.6875rem] leading-none text-muted-foreground">
          Migrated the staging DB
        </p>
      </div>
    </div>
  );
}
