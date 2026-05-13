"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { seededGamma } from "@/lib/jitter";
import { ReportReady } from "./naive";
import {
  JUMP_MS,
  OBSTACLE_TRAVEL_MS,
  SPAWN_MAX_MS,
  SPAWN_MIN_MS,
  TOTAL_DURATION_P50_MS,
} from "./config";

type Obstacle = { id: number; spawnedAt: number; cleared: boolean };

/** % of panel width where the runner sits (left edge). */
const RUNNER_X_PCT = 20;
/** Obstacle x-axis travel: spawns at 100% (just off right) → -10% (off left). */
const OBSTACLE_START_PCT = 100;
const OBSTACLE_END_PCT = -10;
const OBSTACLE_TRAVEL_PCT = OBSTACLE_START_PCT - OBSTACLE_END_PCT;
/**
 * Ratio at which the obstacle's left edge crosses the runner's left
 * edge — pure geometry, not a guess. (100 - 110·r) = 20  →  r = 80/110.
 */
const SCORE_RATIO = (OBSTACLE_START_PCT - RUNNER_X_PCT) / OBSTACLE_TRAVEL_PCT;
const SCORE_WINDOW = 0.04;

let nextId = 1;

/**
 * Tuned — Chrome-dino-style runner game during a long wait. Press
 * Jump (or Space) to leap over incoming mushrooms. Time the user is
 * *spending*, not paying (Block & Zakay 1997: filled time has shorter
 * retrospective duration than empty time).
 */
export function TunedMiniGame({ seed = 1 }: { seed?: number }) {
  const [phase, setPhase] = useState<"playing" | "done">("playing");
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [score, setScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const isJumpingRef = useRef(false);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const jumpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // End game.
  useEffect(() => {
    const totalMs = seededGamma(seed, TOTAL_DURATION_P50_MS);
    const id = setTimeout(() => setPhase("done"), totalMs);
    return () => clearTimeout(id);
  }, [seed]);

  // Spawn obstacles at random intervals.
  useEffect(() => {
    if (phase !== "playing") return;
    let cancelled = false;
    let pending: ReturnType<typeof setTimeout> | null = null;
    const schedule = () => {
      const delay =
        SPAWN_MIN_MS + Math.random() * (SPAWN_MAX_MS - SPAWN_MIN_MS);
      pending = setTimeout(() => {
        if (cancelled) return;
        const fresh: Obstacle = {
          id: nextId++,
          spawnedAt: performance.now(),
          cleared: false,
        };
        obstaclesRef.current = [...obstaclesRef.current, fresh];
        setObstacles(obstaclesRef.current);
        schedule();
      }, delay);
    };
    schedule();
    return () => {
      cancelled = true;
      if (pending) clearTimeout(pending);
    };
  }, [phase]);

  // Tick: score obstacles that crossed the runner, reap exited ones.
  // Score logic lives OUTSIDE any setState updater so React StrictMode's
  // double-invocation of pure updaters cannot double-count.
  useEffect(() => {
    if (phase !== "playing") return;
    const tick = setInterval(() => {
      const now = performance.now();
      let hits = 0;
      const next: Obstacle[] = [];
      for (const o of obstaclesRef.current) {
        const ratio = (now - o.spawnedAt) / OBSTACLE_TRAVEL_MS;
        if (ratio >= 1.1) continue; // off-screen → drop
        if (
          !o.cleared &&
          ratio >= SCORE_RATIO - SCORE_WINDOW &&
          ratio <= SCORE_RATIO + SCORE_WINDOW
        ) {
          if (isJumpingRef.current) hits++;
          next.push({ ...o, cleared: true });
        } else {
          next.push(o);
        }
      }
      obstaclesRef.current = next;
      setObstacles(next);
      if (hits > 0) setScore((s) => s + hits);
    }, 50);
    return () => clearInterval(tick);
  }, [phase]);

  const jump = useCallback(() => {
    if (isJumpingRef.current) return;
    isJumpingRef.current = true;
    setIsJumping(true);
    if (jumpTimerRef.current) clearTimeout(jumpTimerRef.current);
    jumpTimerRef.current = setTimeout(() => {
      isJumpingRef.current = false;
      setIsJumping(false);
    }, JUMP_MS);
  }, []);

  // Space bar = jump while playing.
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
  }, [phase, jump]);

  if (phase === "done") {
    return (
      <div className="grid h-full min-h-[10rem] place-items-center rounded-md border border-border bg-background p-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-wider text-primary tabular-nums">
            Score: {score}
          </p>
          <ReportReady />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
          Jump the mushrooms
        </p>
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-primary tabular-nums">
          Score: {score}
        </p>
      </div>

      <div className="relative h-24 w-full overflow-hidden rounded-md border border-border bg-background">
        {/* Ground — 45° diagonal hatching (bottom-left → top-right)
            filling the 12 px strip below the ground line. */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-3"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, var(--border) 0 1px, transparent 1px 6px)",
          }}
        />
        <div
          aria-hidden
          className="absolute bottom-3 left-0 right-0 h-px bg-border"
        />
        <Rabbit isJumping={isJumping} />
        {obstacles.map((o) => (
          <Mushroom key={o.id} spawnedAt={o.spawnedAt} />
        ))}
        <style>{`
          @keyframes mushroom-roll {
            from { left: ${OBSTACLE_START_PCT}%; }
            to   { left: ${OBSTACLE_END_PCT}%; }
          }
        `}</style>
      </div>

      <button
        type="button"
        onClick={jump}
        className="flex w-full items-center justify-center gap-1.5 rounded-md border border-primary bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.97]"
      >
        Jump
        <kbd className="hidden items-center rounded-sm border border-primary-foreground/30 bg-primary-foreground/15 px-1 py-px font-mono text-[0.625rem] font-medium uppercase tracking-wider lg:inline-flex">
          Space
        </kbd>
      </button>
    </div>
  );
}

/**
 * Rabbit runner. Filled silhouette in `--primary` with a single
 * background-coloured eye dot so the figure reads as a profile head
 * even at 24 px. Position is fixed at `RUNNER_X_PCT`; the jump is a
 * translateY transition on the wrapping div.
 */
function Rabbit({ isJumping }: { isJumping: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute bottom-3 size-6 origin-bottom transition-transform duration-300 ease-out motion-reduce:transition-none",
        isJumping ? "-translate-y-12" : "translate-y-0",
      )}
      style={{ left: `${RUNNER_X_PCT}%` }}
    >
      <svg viewBox="0 0 24 24" className="size-full text-primary">
        {/* Ears — two tall ovals, slightly leaned outward. */}
        <ellipse
          cx="9"
          cy="6"
          rx="1.6"
          ry="4.5"
          fill="currentColor"
          transform="rotate(-8 9 6)"
        />
        <ellipse
          cx="14"
          cy="6"
          rx="1.6"
          ry="4.5"
          fill="currentColor"
          transform="rotate(8 14 6)"
        />
        {/* Body — large rounded oval covering torso + haunch. */}
        <ellipse cx="11" cy="17" rx="7" ry="5.5" fill="currentColor" />
        {/* Head — sits forward of the body, blends into it. */}
        <circle cx="15" cy="13" r="4" fill="currentColor" />
        {/* Eye — single background-coloured dot on the head. */}
        <circle cx="16.2" cy="12" r="0.7" fill="var(--background)" />
      </svg>
    </div>
  );
}

/**
 * Mushroom obstacle. Position animated via CSS keyframes on `left`
 * (panel-relative %), so the geometry matches `SCORE_RATIO` exactly
 * at every viewport — no dependency on viewport width.
 *
 * `animation-delay` is captured at mount via `useMemo([])` so the
 * animation phase is fixed for the lifetime of the obstacle; without
 * this the per-render `performance.now()` call would reset the CSS
 * animation on every state change.
 */
function Mushroom({ spawnedAt }: { spawnedAt: number }) {
  const animationDelay = useMemo(
    () => `-${(performance.now() - spawnedAt) / 1000}s`,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 20"
      className="absolute bottom-3 size-5 motion-reduce:animate-none"
      style={{
        left: `${OBSTACLE_START_PCT}%`,
        animation: `mushroom-roll ${OBSTACLE_TRAVEL_MS}ms linear forwards`,
        animationDelay,
      }}
    >
      {/* Stem — cream/secondary, flat top, rounded base. */}
      <path
        d="M5 11 H11 V17 Q11 19 8 19 Q5 19 5 17 Z"
        fill="var(--secondary)"
      />
      {/* Cap — primary, dome shape. */}
      <path d="M1 12 A7 8 0 0 1 15 12 Z" fill="var(--primary)" />
      {/* Spots on the cap. */}
      <circle cx="4.2" cy="9.5" r="1.3" fill="var(--secondary)" />
      <circle cx="10.5" cy="6.5" r="1.6" fill="var(--secondary)" />
      <circle cx="12.5" cy="10" r="0.9" fill="var(--secondary)" />
    </svg>
  );
}
