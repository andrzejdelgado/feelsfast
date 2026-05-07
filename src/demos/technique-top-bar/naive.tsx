"use client";

import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Naive — no top-edge progress bar. The "page" content area sits empty
 * for the full wall-clock duration, then the content snaps in at the
 * end. The visitor has no signal that anything is happening at all.
 */
export function NaiveTopBar() {
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
    <div className="relative h-40 overflow-hidden rounded-md border border-border bg-background">
      {/* Top-edge area (intentionally empty on the naive side). */}
      <div className="h-1 w-full bg-transparent" />

      <div className="px-4 pt-3">
        {phase === "loading" ? (
          <p className="text-xs text-muted-foreground">Loading…</p>
        ) : (
          <ContentMock />
        )}
      </div>
    </div>
  );
}

function ContentMock() {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Latest activity</p>
      <p className="text-xs text-muted-foreground">
        Maya merged a PR. Ben deployed staging. Lin opened an issue.
      </p>
      <p className="text-xs text-muted-foreground">
        Refactor the analytics module · Audit the dependency tree
      </p>
    </div>
  );
}
