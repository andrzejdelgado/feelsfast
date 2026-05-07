"use client";

import { useEffect, useRef, useState } from "react";
import { gammaJitter, seededGamma } from "./jitter";

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
 * Pass `seed` (from `DemoSideProps`) to make Off and On finish at the same
 * wall-clock moment. Without a seed, each call rolls independently.
 *
 * @param profile Latency profile (currently just `p50`).
 * @param seed    Optional deterministic seed shared between Off and On.
 */
export function useSimulatedLatency(
  profile: LatencyProfile,
  seed?: number,
): SimulatedLatencyState {
  const [isLoading, setIsLoading] = useState(true);
  const [durationMs, setDurationMs] = useState<number | null>(null);
  const startedAt = useRef<number>(
    typeof performance !== "undefined" ? performance.now() : Date.now(),
  );

  useEffect(() => {
    const ms =
      seed != null ? seededGamma(seed, profile.p50) : gammaJitter(profile.p50);
    const handle = setTimeout(() => {
      setIsLoading(false);
      const now =
        typeof performance !== "undefined" ? performance.now() : Date.now();
      setDurationMs(now - startedAt.current);
    }, ms);
    return () => clearTimeout(handle);
  }, [profile.p50, seed]);

  return { isLoading, durationMs };
}
