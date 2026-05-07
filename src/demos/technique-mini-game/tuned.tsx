"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { gammaJitter } from "@/lib/jitter";
import {
  DOT_INTERVAL_MS,
  DOT_LIFETIME_MS,
  TOTAL_DURATION_P50_MS,
} from "./config";

type Dot = { id: number; x: number; y: number; bornAt: number };

let nextDotId = 1;

/**
 * Tuned — a tap-the-dot widget runs during the wait. Dots spawn at
 * random positions every ~900 ms and live for 1.5 s; tapping one
 * scores a point and pops it off the board. The user's score is
 * shown in the header.
 *
 * The mechanism is the same as FIFA's loading-screen kick-the-ball
 * (Eli Fitch's canonical engaging-loading example): the wait stops
 * being something the user is enduring and becomes something they
 * are *spending*. Block & Zakay 1997 says retrospective duration of
 * filled time shrinks dramatically vs. empty time of the same
 * length.
 *
 * Reduced-motion users still get the game — only the dot's spawn
 * scale-in animation is suppressed.
 */
export function TunedMiniGame() {
  const [phase, setPhase] = useState<"loading" | "done">("loading");
  const [dots, setDots] = useState<Dot[]>([]);
  const [score, setScore] = useState(0);
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
    const spawn = setInterval(() => {
      setDots((prev) => {
        const now = performance.now();
        const alive = prev.filter((d) => now - d.bornAt < DOT_LIFETIME_MS);
        return [
          ...alive,
          {
            id: nextDotId++,
            x: 8 + Math.random() * 84,
            y: 12 + Math.random() * 72,
            bornAt: now,
          },
        ];
      });
    }, DOT_INTERVAL_MS);
    const reaper = setInterval(() => {
      setDots((prev) => {
        const now = performance.now();
        return prev.filter((d) => now - d.bornAt < DOT_LIFETIME_MS);
      });
    }, 200);
    return () => {
      clearInterval(spawn);
      clearInterval(reaper);
    };
  }, [phase]);

  if (phase === "done") {
    return (
      <div className="grid min-h-[10rem] place-items-center rounded-md border border-border bg-background">
        <p className="text-sm text-foreground">
          Done.{" "}
          <span className="text-muted-foreground">Final score: {score}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
          Tap the dots while you wait
        </p>
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-primary tabular-nums">
          Score · {score}
        </p>
      </div>
      <div className="relative h-[10rem] w-full overflow-hidden rounded-md border border-border bg-background">
        {dots.map((dot) => (
          <button
            key={dot.id}
            type="button"
            onClick={() => {
              setDots((prev) => prev.filter((d) => d.id !== dot.id));
              setScore((s) => s + 1);
            }}
            aria-label="Tap dot"
            className={cn(
              "absolute size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-sm transition-transform hover:scale-110 motion-safe:animate-[dot-pop_220ms_ease-out]",
            )}
            style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
          />
        ))}
        <style>{`
          @keyframes dot-pop {
            from { transform: translate(-50%, -50%) scale(0.4); opacity: 0; }
            to   { transform: translate(-50%, -50%) scale(1);   opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}
