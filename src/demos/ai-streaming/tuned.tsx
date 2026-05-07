"use client";

import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import { RESPONSE } from "./config";

type Phase = "thinking" | "streaming" | "done";

export function TunedAIStreaming() {
  const [phase, setPhase] = useState<Phase>("thinking");
  const [shown, setShown] = useState("");

  useEffect(() => {
    let intervalHandle: ReturnType<typeof setInterval> | null = null;
    let cancelled = false;

    // Phase 1: brief "thinking" state before the first token.
    // Models call this the time-to-first-token; here it is the only honest
    // signal that something is happening. Without it, the user wonders
    // whether their input registered.
    const thinkingMs = gammaJitter(600);
    const thinkingHandle = setTimeout(() => {
      if (cancelled) return;
      setPhase("streaming");

      // Phase 2: stream characters in 1- or 2-char chunks at ~30 ms each.
      // The variance keeps the cadence from feeling robotic. Tokenisers in
      // production stream tokens, not characters — but the perceptual rule
      // is the same: pace the reveal to a natural reading rhythm.
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
      }, 30);
    }, thinkingMs);

    return () => {
      cancelled = true;
      clearTimeout(thinkingHandle);
      if (intervalHandle !== null) clearInterval(intervalHandle);
    };
  }, []);

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
