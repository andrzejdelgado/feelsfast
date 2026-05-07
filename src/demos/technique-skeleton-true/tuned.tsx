"use client";

import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Tuned — content-true skeleton. The 32 px circle becomes a 32 px
 * circle, the name line becomes a name-width bar, the description
 * line becomes a description-width bar. When the data arrives, no
 * layout shift — the page was already itself.
 *
 * Static (no shimmer). Content shape is doing the work; motion is
 * not needed.
 */
export function TunedSkeletonTrue({ seed = 1 }: { seed?: number }) {
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

  if (loaded) return <Card />;
  return (
    <div className="flex items-start gap-2.5 rounded-md border border-border bg-background p-3">
      <div className="size-8 shrink-0 rounded-full bg-muted" />
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="h-3 w-20 rounded bg-muted" />
        <div className="mt-2 h-2.5 w-32 rounded bg-muted" />
      </div>
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
