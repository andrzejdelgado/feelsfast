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
    // both sides finish at the same wall-clock moment. Reveal is
    // time-driven (not chunk-driven) so the last character lands on
    // the same wall-clock tick as the Naive panel's content snap.
    const totalMs = seededGamma(seed, TOTAL_DURATION_P50_MS);
    const thinkingMs = totalMs * THINKING_FRACTION;
    const streamMs = totalMs - thinkingMs;
    const tickMs = 32;

    const thinkingHandle = setTimeout(() => {
      if (cancelled) return;
      setPhase("streaming");
      const streamStart = performance.now();

      intervalHandle = setInterval(() => {
        if (cancelled) return;
        const elapsed = performance.now() - streamStart;
        if (elapsed >= streamMs) {
          if (intervalHandle !== null) clearInterval(intervalHandle);
          setShown(RESPONSE);
          setPhase("done");
          return;
        }
        const targetIndex = Math.floor(
          (elapsed / streamMs) * RESPONSE.length,
        );
        setShown(RESPONSE.slice(0, targetIndex));
      }, tickMs);
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
