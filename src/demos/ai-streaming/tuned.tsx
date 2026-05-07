"use client";

import { useEffect, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { RESPONSE, THINKING_FRACTION, TOTAL_DURATION_P50_MS } from "./config";

type Phase = "thinking" | "streaming" | "done";

export function TunedAIStreaming({ seed = 1 }: { seed?: number }) {
  const [phase, setPhase] = useState<Phase>("thinking");
  const [shown, setShown] = useState("");

  useEffect(() => {
    let intervalHandle: ReturnType<typeof setInterval> | null = null;
    let cancelled = false;

    // Carve up the same total Naive uses (same seed → same total) into
    // a brief "thinking" pre-token state and the streaming reveal, so
    // both sides finish at the same wall-clock moment.
    const totalMs = seededGamma(seed, TOTAL_DURATION_P50_MS);
    const thinkingMs = totalMs * THINKING_FRACTION;
    const streamMs = totalMs - thinkingMs;
    const charIntervalMs = Math.max(8, streamMs / RESPONSE.length);

    const thinkingHandle = setTimeout(() => {
      if (cancelled) return;
      setPhase("streaming");

      let index = 0;
      intervalHandle = setInterval(() => {
        if (cancelled) return;
        if (index >= RESPONSE.length) {
          if (intervalHandle !== null) clearInterval(intervalHandle);
          setPhase("done");
          return;
        }
        const chunkSize = Math.random() < 0.7 ? 1 : 2;
        index = Math.min(index + chunkSize, RESPONSE.length);
        setShown(RESPONSE.slice(0, index));
      }, charIntervalMs);
    }, thinkingMs);

    return () => {
      cancelled = true;
      clearTimeout(thinkingHandle);
      if (intervalHandle !== null) clearInterval(intervalHandle);
    };
  }, [seed]);

  return (
    <div
      className="min-h-[8rem] rounded-md border border-border bg-card p-4 text-sm leading-relaxed"
      aria-live="polite"
      aria-busy={phase !== "done"}
    >
      {phase === "thinking" ? <ThinkingDots /> : (
        <span>
          {shown}
          {phase === "streaming" ? (
            <span
              aria-hidden
              className="ml-0.5 inline-block h-3.5 w-1 translate-y-0.5 bg-primary motion-safe:animate-pulse"
            />
          ) : null}
        </span>
      )}
    </div>
  );
}

function ThinkingDots() {
  return (
    <span
      className="inline-flex items-center gap-1 text-muted-foreground"
      aria-label="Thinking"
    >
      <Dot delay={0} />
      <Dot delay={200} />
      <Dot delay={400} />
    </span>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      aria-hidden
      className="size-1.5 rounded-full bg-muted-foreground motion-safe:animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}
