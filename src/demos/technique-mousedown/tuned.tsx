"use client";

import { useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import { SIMULATED_WORK_MS } from "./config";
import { Layout } from "./naive";

/**
 * Tuned — work fires on `mousedown`, the moment the press begins. The
 * user's hold-time before release (~100–150 ms typical) overlaps with
 * the server round-trip instead of preceding it. The button visibly
 * fires faster on every press for the same actual work.
 *
 * Production caveats baked into the comment, not the demo:
 *  - On touch devices, gate `pointerdown` with a small movement
 *    threshold so a scroll-start does not fire the action.
 *  - Reserve for actions where firing earlier is safe to cancel
 *    (a Send button is fine; an "irreversible delete" is not).
 */
export function TunedMousedown() {
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [latency, setLatency] = useState<number | null>(null);
  const startedAt = useRef(0);
  const fired = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onMouseDown = () => {
    if (phase === "running" || fired.current) return;
    fired.current = true;
    startedAt.current = performance.now();
    setPhase("running");
    setLatency(null);
    timeoutRef.current = setTimeout(() => {
      setLatency(performance.now() - startedAt.current);
      setPhase("done");
      fired.current = false;
    }, gammaJitter(SIMULATED_WORK_MS));
  };

  return <Layout phase={phase} latency={latency} onMouseDown={onMouseDown} />;
}
