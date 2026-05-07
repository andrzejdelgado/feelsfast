"use client";

import { Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import { SIMULATED_COMMIT_MS } from "./config";

/**
 * Naive — the heart only fills *after* the server confirms the like.
 * On every press the user feels the full round-trip before the icon
 * responds. The press itself feels mushy, like the page is asleep.
 */
export function NaiveIconFlip() {
  const [liked, setLiked] = useState(false);
  const [pending, setPending] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  const onClick = () => {
    if (pending) return;
    setPending(true);
    timeoutRef.current = setTimeout(() => {
      setLiked((prev) => !prev);
      setPending(false);
    }, gammaJitter(SIMULATED_COMMIT_MS));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        aria-pressed={liked}
        aria-label={liked ? "Unlike" : "Like"}
        className="inline-flex items-center gap-3 rounded-md border border-border bg-card px-6 py-4 text-base font-medium transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Heart
          className={
            liked
              ? "size-7 fill-primary text-primary"
              : "size-7 text-muted-foreground"
          }
          aria-hidden
        />
        {pending ? "Sending…" : liked ? "Liked" : "Like"}
      </button>
      <p className="text-xs text-muted-foreground">
        Click. The heart waits for the server before filling.
      </p>
    </div>
  );
}
