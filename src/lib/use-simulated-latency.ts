"use client";

import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "./jitter";

export type LatencyProfile = {
  /** Target median latency in ms. */
  p50: number;
};

export type SimulatedLatencyState = {
  /** True until the simulated wait completes. */
  isLoading: boolean;
  /** Actual elapsed time once the wait finishes; null while loading. */
  durationMs: number | null;
};

/**
 * Simulate one network-like wait with gamma-distributed jitter (PRD §8).
 *
 * The wait kicks off when the hook mounts and runs once. To re-run, remount
 * the consuming component — typically by passing a `key` from the demo runner
 * that increments on Replay.
 *
 * @param profile Latency profile (currently just `p50`).
 */
export function useSimulatedLatency(
  profile: LatencyProfile,
): SimulatedLatencyState {
  const [isLoading, setIsLoading] = useState(true);
  const [durationMs, setDurationMs] = useState<number | null>(null);
  const startedAt = useRef<number>(
    typeof performance !== "undefined" ? performance.now() : Date.now(),
  );

  useEffect(() => {
    const ms = gammaJitter(profile.p50);
    const handle = setTimeout(() => {
      setIsLoading(false);
      const now =
        typeof performance !== "undefined" ? performance.now() : Date.now();
      setDurationMs(now - startedAt.current);
    }, ms);
    return () => clearTimeout(handle);
  }, [profile.p50]);

  return { isLoading, durationMs };
}
