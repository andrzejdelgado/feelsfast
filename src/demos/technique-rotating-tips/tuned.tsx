"use client";

import { Lightbulb } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import { TIPS, TIP_INTERVAL_MS, TOTAL_DURATION_P50_MS } from "./config";

/**
 * Tuned — same wall-clock wait, but the foreground fills with
 * information. A "Did you know?" card cycles through perception facts
 * every ~2.5 s. Each tip cross-fades into the next so the change is
 * registered as a *change* (not a flash).
 *
 * The retrospective duration of the wait shrinks because the wait is
 * filled (Block & Zakay 1997). The user also walks away having
 * learned something, which makes the wait worth their time rather
 * than a tax on it.
 */
export function TunedRotatingTips() {
  const [phase, setPhase] = useState<"loading" | "done">("loading");
  const [tipIdx, setTipIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () => setPhase("done"),
      gammaJitter(TOTAL_DURATION_P50_MS),
    );
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;
    const interval = setInterval(() => {
      // Fade out, swap, fade in.
      setVisible(false);
      const swap = setTimeout(() => {
        setTipIdx((i) => (i + 1) % TIPS.length);
        setVisible(true);
      }, 200);
      return () => clearTimeout(swap);
    }, TIP_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [phase]);

  if (phase === "done") {
    return <p className="text-sm text-foreground">Done.</p>;
  }

  return (
    <div className="space-y-2 rounded-md border border-border bg-background p-3">
      <div className="flex items-center gap-1.5 text-primary">
        <Lightbulb aria-hidden className="size-3.5" />
        <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider">
          Did you know?
        </span>
      </div>
      <p
        aria-live="polite"
        className="text-sm leading-relaxed text-foreground transition-opacity duration-200 ease-out motion-reduce:transition-none"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {TIPS[tipIdx]}
      </p>
    </div>
  );
}
