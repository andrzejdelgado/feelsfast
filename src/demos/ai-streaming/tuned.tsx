"use client";

import { useEffect, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import {
  RESPONSE,
  RESPONSE_MOBILE,
  THINKING_FRACTION,
  TOTAL_DURATION_P50_MS,
} from "./config";

type Phase = "thinking" | "streaming" | "done";

export function TunedAIStreaming({ seed = 1 }: { seed?: number }) {
  const [phase, setPhase] = useState<Phase>("thinking");
  const [shown, setShown] = useState("");
  const [response, setResponse] = useState<string>(RESPONSE);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setResponse(mq.matches ? RESPONSE_MOBILE : RESPONSE);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

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
          setShown(response);
          setPhase("done");
          return;
        }
        const targetIndex = Math.floor(
          (elapsed / streamMs) * response.length,
        );
        setShown(response.slice(0, targetIndex));
      }, tickMs);
    }, thinkingMs);

    return () => {
      cancelled = true;
      clearTimeout(thinkingHandle);
      if (intervalHandle !== null) clearInterval(intervalHandle);
    };
  }, [seed, response]);

  // The card pre-reserves space for the full response in every phase
  // by rendering an `invisible` sibling that spans the un-shown tail.
  // Thinking: dots overlay an entirely-invisible response (full size
  // reserved). Streaming: visible head + invisible tail. Done: visible
  // full response. The card's box never resizes.
  return (
    <div
      className="relative rounded-md border border-border bg-card p-4 text-sm leading-relaxed"
      aria-live="polite"
      aria-busy={phase !== "done"}
    >
      <span className={phase === "thinking" ? "invisible" : undefined}>
        {shown}
        {phase === "streaming" ? (
          <span
            aria-hidden
            className="ml-0.5 inline-block h-3.5 w-1 translate-y-0.5 bg-primary motion-safe:animate-pulse"
          />
        ) : null}
        {phase !== "done" && shown.length < response.length ? (
          <span className="invisible">{response.slice(shown.length)}</span>
        ) : null}
      </span>
      {phase === "thinking" ? (
        <span className="pointer-events-none absolute inset-0 flex items-start p-4">
          <ThinkingDots />
        </span>
      ) : null}
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
