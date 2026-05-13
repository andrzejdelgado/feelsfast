"use client";

import { Send } from "lucide-react";
import { useRef, useState } from "react";
import { NAIVE_LATENCY_FACTOR, SIMULATED_WORK_MS } from "./config";

/**
 * Naive — work fires on `click`, which only fires after the user
 * releases the mouse. The press itself was a wasted ~100–150 ms; the
 * server round-trip starts late.
 *
 * Uses a fixed simulated work time (no jitter) so the only difference
 * between Off and On is the user's hold-time — guaranteeing the On
 * (mousedown) round-trip is always faster.
 */
export function NaiveMousedown() {
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [latency, setLatency] = useState<number | null>(null);
  const startedAt = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onClick = () => {
    if (phase === "running") return;
    startedAt.current = performance.now();
    setPhase("running");
    setLatency(null);
    timeoutRef.current = setTimeout(() => {
      setLatency(performance.now() - startedAt.current);
      setPhase("done");
    }, SIMULATED_WORK_MS * NAIVE_LATENCY_FACTOR);
  };

  return <Layout phase={phase} latency={latency} onClick={onClick} />;
}

function Layout({
  phase,
  latency,
  onClick,
  onMouseDown,
}: {
  phase: "idle" | "running" | "done";
  latency: number | null;
  onClick?: () => void;
  onMouseDown?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
      <button
        type="button"
        onClick={onClick}
        onMouseDown={onMouseDown}
        disabled={phase === "running"}
        className="inline-flex items-center gap-3 rounded-md border border-border bg-card px-6 py-4 text-base font-medium transition-colors hover:bg-secondary active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="size-6" aria-hidden />
        Send
      </button>

      {phase === "idle" ? (
        <p className="text-xs text-muted-foreground">
          Press the button. Hold a beat before releasing.
        </p>
      ) : phase === "running" ? (
        <p className="text-xs text-muted-foreground">Sending…</p>
      ) : (
        <p className="text-xs text-foreground">
          Done · round-trip{" "}
          <span className="font-mono tabular-nums text-primary">
            {Math.round(latency ?? 0)} ms
          </span>
        </p>
      )}
    </div>
  );
}

export { Layout };
