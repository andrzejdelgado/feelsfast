"use client";

import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Tuned — three generic blocks at approximate positions. They are
 * *not* shaped to match the final content (that would be the
 * content-true variant); they are just enough structure to say
 * "something is loading here, hold on." Cheap to build, cheap to
 * ship, defensible default for any card you do not have time to
 * model precisely.
 */
export function TunedSkeletonSimple({ seed = 1 }: { seed?: number }) {
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
  return loaded ? <Card /> : <Skeleton />;
}

function Skeleton() {
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
    <div className="rounded-md border border-border bg-background p-3 text-sm">
      <p className="font-medium">Q3 sprint goals</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        Ship perceived-performance demos. Migrate staging.
      </p>
    </div>
  );
}
