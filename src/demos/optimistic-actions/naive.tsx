"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import { COMMIT_LATENCY_P50_MS } from "./config";

export function NaiveOptimisticActions() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(42);
  const [pending, setPending] = useState(false);

  const handleClick = async () => {
    if (pending) return;
    setPending(true);
    // Wait for the "server" before updating the UI.
    await new Promise((resolve) =>
      setTimeout(resolve, gammaJitter(COMMIT_LATENCY_P50_MS)),
    );
    setLiked((prev) => {
      const next = !prev;
      setCount((c) => c + (next ? 1 : -1));
      return next;
    });
    setPending(false);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6">
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        aria-pressed={liked}
        className="inline-flex items-center gap-3 rounded-md border border-border bg-card px-6 py-4 text-base font-medium transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Heart
          aria-hidden
          className={`size-7 ${liked ? "fill-primary text-primary" : "text-muted-foreground"}`}
        />
        <span className="text-lg tabular-nums">{count}</span>
      </button>
      {pending ? (
        <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
          Saving…
        </span>
      ) : null}
    </div>
  );
}
