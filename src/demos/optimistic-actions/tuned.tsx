"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import { COMMIT_LATENCY_P50_MS, FAILURE_RATE } from "./config";

export function TunedOptimisticActions() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(42);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    const previous = liked;
    const next = !previous;
    // Flip immediately — the optimistic moment.
    setLiked(next);
    setCount((c) => c + (next ? 1 : -1));
    setError(null);

    // Background commit; the user has already moved on.
    await new Promise((resolve) =>
      setTimeout(resolve, gammaJitter(COMMIT_LATENCY_P50_MS)),
    );

    if (Math.random() < FAILURE_RATE) {
      // Honest visible rollback.
      setLiked(previous);
      setCount((c) => c + (next ? -1 : 1));
      setError("Couldn't save — try again");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6">
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={liked}
        className="inline-flex items-center gap-3 rounded-md border border-border bg-card px-6 py-4 text-base font-medium transition-colors hover:bg-secondary active:scale-[0.97]"
      >
        <Heart
          aria-hidden
          className={`size-7 transition-colors ${liked ? "fill-primary text-primary" : "text-muted-foreground"}`}
        />
        <span className="text-lg tabular-nums">{count}</span>
      </button>
      <p
        role="alert"
        aria-hidden={!error}
        className={`font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-destructive transition-opacity ${error ? "opacity-100" : "opacity-0"}`}
      >
        {error ?? "Couldn't save — try again"}
      </p>
    </div>
  );
}
