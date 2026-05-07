"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { seededGamma } from "@/lib/jitter";
import {
  JUMP_MS,
  OBSTACLE_TRAVEL_MS,
  SPAWN_MAX_MS,
  SPAWN_MIN_MS,
  TOTAL_DURATION_P50_MS,
} from "./config";

type Obstacle = { id: number; spawnedAt: number; cleared: boolean };

let nextId = 1;

/**
 * Tuned — a Chrome-dino-style runner game. Press Jump (or hit the
 * Space bar) to leap over incoming obstacles. The wait fills with
 * gameplay: time the user is *spending*, not paying.
 *
 * Mechanics:
 *   - Obstacles spawn at random intervals from the right edge and
 *     travel to the left over `OBSTACLE_TRAVEL_MS`.
 *   - The runner has a fixed x position; pressing Jump fires a jump
 *     animation that lifts the runner for `JUMP_MS`.
 *   - An obstacle scores when its x crosses the runner's x while the
 *     runner is airborne; otherwise it counts as missed.
 *   - The game ends when the seeded total duration elapses.
 */
export function TunedMiniGame({ seed = 1 }: { seed?: number }) {
  const [phase, setPhase] = useState<"playing" | "done">("playing");
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const isJumpingRef = useRef(false);
  const jumpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // End game.
  useEffect(() => {
    const totalMs = seededGamma(seed, TOTAL_DURATION_P50_MS);
    const id = setTimeout(() => setPhase("done"), totalMs);
    return () => clearTimeout(id);
  }, [seed]);

  // Spawn obstacles.
  useEffect(() => {
    if (phase !== "playing") return;
    let cancelled = false;
    let pending: ReturnType<typeof setTimeout> | null = null;
    const schedule = () => {
      const delay =
        SPAWN_MIN_MS + Math.random() * (SPAWN_MAX_MS - SPAWN_MIN_MS);
      pending = setTimeout(() => {
        if (cancelled) return;
        setObstacles((prev) => [
          ...prev,
          { id: nextId++, spawnedAt: performance.now(), cleared: false },
        ]);
        schedule();
      }, delay);
    };
    schedule();
    return () => {
      cancelled = true;
      if (pending) clearTimeout(pending);
    };
  }, [phase]);

  // Score / miss when each obstacle passes the runner; reap exited.
  useEffect(() => {
    if (phase !== "playing") return;
    const tick = setInterval(() => {
      const now = performance.now();
      setObstacles((prev) => {
        let changed = false;
        const next = prev.map((o) => {
          if (o.cleared) return o;
          const t = (now - o.spawnedAt) / OBSTACLE_TRAVEL_MS;
          // The obstacle "crosses" the runner ~80 % of the travel
          // (runner sits ~20 % from the left).
          if (t >= 0.78 && t <= 0.86) {
            changed = true;
            if (isJumpingRef.current) {
              setScore((s) => s + 1);
            } else {
              setMissed((m) => m + 1);
            }
            return { ...o, cleared: true };
          }
          return o;
        });
        const filtered = next.filter(
          (o) => now - o.spawnedAt < OBSTACLE_TRAVEL_MS,
        );
        return changed || filtered.length !== prev.length ? filtered : prev;
      });
    }, 50);
    return () => clearInterval(tick);
  }, [phase]);

  const jump = () => {
    if (phase !== "playing" || isJumpingRef.current) return;
    isJumpingRef.current = true;
    setIsJumping(true);
    if (jumpTimerRef.current) clearTimeout(jumpTimerRef.current);
    jumpTimerRef.current = setTimeout(() => {
      isJumpingRef.current = false;
      setIsJumping(false);
    }, JUMP_MS);
  };

  // Space bar = jump.
  useEffect(() => {
    if (phase !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (phase === "done") {
    return (
      <div className="grid min-h-[10rem] place-items-center rounded-md border border-border bg-background">
        <p className="text-sm text-foreground">
          Done.{" "}
          <span className="text-muted-foreground">
            Cleared {score} · missed {missed}
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
          Jump the obstacles while you wait
        </p>
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-primary tabular-nums">
          Cleared · {score}
        </p>
      </div>

      <div className="relative h-24 w-full overflow-hidden rounded-md border border-border bg-background">
        <div
          aria-hidden
          className="absolute bottom-3 left-0 right-0 h-px bg-border"
        />
        <div
          aria-hidden
          className={cn(
            "absolute bottom-3 size-6 origin-bottom rounded-sm bg-primary transition-transform duration-300 ease-out motion-reduce:transition-none",
            isJumping ? "-translate-y-12" : "translate-y-0",
          )}
          style={{ left: "20%" }}
        />
        {obstacles.map((o) => (
          <div
            key={o.id}
            aria-hidden
            className="absolute bottom-3 size-4 rounded-sm bg-muted-foreground motion-reduce:animate-none"
            style={{
              right: 0,
              animation: `dino-roll ${OBSTACLE_TRAVEL_MS}ms linear`,
            }}
          />
        ))}
        <style>{`
          @keyframes dino-roll {
            from { transform: translateX(2rem); }
            to   { transform: translateX(-100vw); }
          }
        `}</style>
      </div>

      <button
        type="button"
        onClick={jump}
        className="w-full rounded-md border border-primary bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.97]"
      >
        Jump (or press Space)
      </button>
    </div>
  );
}
