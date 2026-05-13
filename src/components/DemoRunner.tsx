"use client";

import { Play, RefreshCw } from "lucide-react";
import { useId, useRef, useState } from "react";
import { CollapsibleDescription } from "@/components/CollapsibleDescription";
import { cn } from "@/lib/utils";

export type DemoConfig = {
  /** Title shown above the demo. */
  title: string;
  /** Short framing line under the title. Optional. */
  description?: string;
  /** Time-band tag rendered top-right (mono uppercase). e.g. `"1 – 10 S"`. */
  timeBand?: string;
  /**
   * "auto"   — demos render and run as soon as the card mounts (default).
   * "manual" — demos sit idle until the visitor presses Run; both Off and
   *             On then mount in lock-step, share one seed, and finish
   *             together. Reset returns the card to idle.
   */
  runMode?: "auto" | "manual";
  /**
   * Tailwind utility(ies) that override the default `min-h-24
   * md:min-h-32` floor of each panel's content area. Use this on demos
   * whose loaded content is taller than the default, so the idle
   * placeholder reserves the same height and the card doesn't jump
   * when Run is pressed. Example: `"min-h-[11rem] md:min-h-[18rem]"`.
   */
  panelMinHeight?: string;
};

/**
 * Both Off and On sides of every demo receive the same `seed` on each
 * run. Pair this with `seededGamma(seed, p50)` from `lib/jitter` inside
 * the demo so both sides finish at the same wall-clock moment — the
 * difference between Off and On should be in *how* the wait fills, not
 * in *how long* the wait is.
 *
 * Demos that intentionally show a timing difference (mousedown vs
 * click, optimistic flips, top-edge progress bar's 100 % overshoot)
 * can ignore the seed and roll their own randomness as before.
 */
export type DemoSideProps = { seed?: number };

type DemoRunnerProps = {
  config: DemoConfig;
  /** The naive ("Off") component — no skeleton, no prefetch, no smoothing. */
  Naive: React.ComponentType<DemoSideProps>;
  /** The tuned ("On") component — applies the relevant perception patterns. */
  Tuned: React.ComponentType<DemoSideProps>;
  /** Optional footer content (e.g. "Appears in" strip) rendered inside
   *  the card below the panels, separated by an edge-to-edge divider. */
  footer?: React.ReactNode;
};

const newSeed = () => Math.floor(Math.random() * 0xffffffff);

/**
 * DemoRunner — the canonical wrapper for every Scenario demo (PRD §8).
 *
 * Two run modes:
 *
 *   "auto" (default)
 *     Both panels mount as soon as the card lands and run their
 *     animations through. Reset re-rolls the seed and remounts both
 *     sides; the demo plays again.
 *
 *   "manual"
 *     Both panels start in an idle state. A primary "Run" button on
 *     the far left mounts both sides simultaneously with a fresh
 *     seed — the same seed for both, so they finish together. Reset
 *     unmounts and returns to idle. Use this for demos where the
 *     animation is short or where the visitor benefits from
 *     deciding when to watch.
 *
 * Buttons:
 *   - Run   (left, primary)  — manual mode only, before/after a run
 *   - Reset (right)          — always shown; restarts (auto) or
 *                               un-runs (manual)
 *
 * Accessibility: ARIA live regions on each side, keyboard-operable
 * controls, motion-reduce honoured by child demos.
 */
export function DemoRunner({
  config,
  Naive,
  Tuned,
  footer,
}: DemoRunnerProps) {
  const isManual = config.runMode === "manual";
  const [runId, setRunId] = useState(isManual ? 0 : 1);
  const [seed, setSeed] = useState(newSeed);
  const headingId = useId();
  const sectionRef = useRef<HTMLElement | null>(null);

  const isRunning = runId > 0;

  /**
   * Center the demo in the viewport so Run + both panels are visible
   * at once. Mobile UX win — without this, clicking Run from the top
   * of the card leaves panel 2 below the fold and the animation
   * starts before the user is looking at it.
   *
   * `setTimeout(0)` lets React render the new state before we scroll;
   * `prefers-reduced-motion` users get an instant jump instead of the
   * smooth glide.
   */
  const scrollIntoCenter = () => {
    setTimeout(() => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      sectionRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? "instant" : "smooth",
        block: "center",
      });
    }, 0);
  };

  const start = () => {
    setSeed(newSeed());
    setRunId((id) => id + 1);
    scrollIntoCenter();
  };

  const reset = () => {
    if (isManual) {
      setRunId(0);
      // No scroll on manual reset — the user is clearing the demo,
      // not re-running it.
    } else {
      setSeed(newSeed());
      setRunId((id) => id + 1);
      scrollIntoCenter();
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby={headingId}
      className="my-8 rounded-lg border border-border bg-card p-6"
    >
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 id={headingId} className="text-lg font-medium leading-tight">
            {config.title}
          </h3>
          {config.description ? (
            <CollapsibleDescription text={config.description} />
          ) : null}
        </div>
        {config.timeBand ? (
          <span
            className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-primary"
            aria-label={`Time band: ${config.timeBand}`}
          >
            {config.timeBand}
          </span>
        ) : null}
      </header>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {isManual ? (
          <button
            type="button"
            onClick={start}
            className="inline-flex items-center gap-1.5 rounded-md border border-primary bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.97]"
          >
            <Play aria-hidden className="size-3.5" />
            Run
          </button>
        ) : (
          <span
            className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground"
            aria-label="Interactive demo — activate it inside the cards"
          >
            Interactive
          </span>
        )}
        <button
          type="button"
          onClick={reset}
          className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-secondary"
        >
          <RefreshCw aria-hidden className="size-3.5" />
          Reset
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DemoSide label="Off" minHeightClass={config.panelMinHeight}>
          {isRunning ? (
            <Naive key={`naive-${runId}`} seed={seed} />
          ) : (
            <IdlePlaceholder />
          )}
        </DemoSide>
        <DemoSide
          label="On"
          highlighted
          minHeightClass={config.panelMinHeight}
        >
          {isRunning ? (
            <Tuned key={`tuned-${runId}`} seed={seed} />
          ) : (
            <IdlePlaceholder />
          )}
        </DemoSide>
      </div>

      {footer ? (
        <div className="-mx-6 mt-6 border-t border-border px-6 pt-4">
          {footer}
        </div>
      ) : null}
    </section>
  );
}

function IdlePlaceholder() {
  return (
    <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground/70">
      Press Run to start
    </p>
  );
}

function DemoSide({
  label,
  highlighted = false,
  minHeightClass,
  children,
}: {
  label: "Off" | "On";
  highlighted?: boolean;
  /** Override for the panel content's min-height. When unset, the
   *  default `min-h-24 md:min-h-32` floor applies. */
  minHeightClass?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-md border bg-background p-4 transition-colors",
        highlighted ? "border-primary" : "border-border",
      )}
    >
      <p
        className={cn(
          "font-mono text-[0.6875rem] font-medium uppercase tracking-wider",
          highlighted ? "text-primary" : "text-muted-foreground",
        )}
      >
        {label}
      </p>
      <div
        className={cn(
          "mt-3 flex flex-1 flex-col",
          minHeightClass ?? "min-h-24 md:min-h-32",
        )}
        aria-live="polite"
        aria-busy="false"
      >
        {children}
      </div>
    </div>
  );
}
