"use client";

import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Naive — empty card. The wait reads as absence; the user does not
 * know whether anything is loading at all.
 */
export function NaiveSkeletonSimple({ seed = 1 }: { seed?: number }) {
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
  return loaded ? <Card /> : <Empty />;
}

function Empty() {
  return <div className="min-h-[6rem] rounded-md border border-border bg-background" />;
}

function Card() {
  return (
    <div className="flex min-h-[6rem] flex-col justify-center rounded-md border border-border bg-background p-3 text-sm">
      <p className="font-medium">Q3 sprint goals</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        Ship perceived-performance demos. Migrate staging.
      </p>
    </div>
  );
}
