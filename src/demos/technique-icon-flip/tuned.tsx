"use client";

import { Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { gammaJitter } from "@/lib/jitter";
import { FAILURE_RATE, SIMULATED_COMMIT_MS } from "./config";

/**
 * Tuned — the heart flips *immediately* on press; the server commit
 * runs in the background. At the demo's ~10 % failure rate the icon
 * visibly rolls back when the commit rejects, with a brief alert
 * region announcing the failure.
 *
 * Production note: the rollback is the load-bearing trust mechanism.
 * Optimistic UI without an honest failure path quietly desyncs the
 * client from the server, which is worse than a slow but honest UI.
 */
export function TunedIconFlip() {
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  const onClick = () => {
    const optimistic = !liked;
    setLiked(optimistic);
    setError(null);

    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const failed = Math.random() < FAILURE_RATE;
      if (failed) {
        setLiked(!optimistic);
        setError("Server rejected the change. Try again.");
      }
    }, gammaJitter(SIMULATED_COMMIT_MS));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
      <button
        type="button"
        onClick={onClick}
        aria-pressed={liked}
        aria-label={liked ? "Unlike" : "Like"}
        className="inline-flex items-center gap-3 rounded-md border border-border bg-card px-6 py-4 text-base font-medium transition-colors hover:bg-secondary active:scale-[0.97]"
      >
        <Heart
          className={cn(
            "size-7 transition-[fill,color]",
            liked ? "fill-primary text-primary" : "text-muted-foreground",
          )}
          aria-hidden
        />
        {liked ? "Liked" : "Like"}
      </button>
      <p
        role={error ? "alert" : undefined}
        className={cn(
          "text-xs transition-colors",
          error ? "text-primary" : "text-muted-foreground",
        )}
      >
        {error ??
          "Click rapidly. The heart flips on press; ~10 % of the time the server rejects and you'll see a visible rollback."}
      </p>
    </div>
  );
}
