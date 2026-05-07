"use client";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { useId, useState } from "react";
import { config, PAN_STEP } from "@/demos/map-interactions/config";
import { NaiveMapInteractions } from "@/demos/map-interactions/naive";
import { TunedMapInteractions } from "@/demos/map-interactions/tuned";
import { cn } from "@/lib/utils";

const newSeed = () => Math.floor(Math.random() * 0xffffffff);

/**
 * Bespoke card for the map demo. Unlike DemoRunner — which leaves
 * each side to manage its own input — this card owns `centerX` and
 * `centerY` and shares them with both Off and On panels via props,
 * driven by a single set of pan controls in a separate inner card
 * between the panels. One press, both panels react. The perception
 * comparison stays apples-to-apples.
 */
export function MapInteractionsCard() {
  const [centerX, setCenterX] = useState(0);
  const [centerY, setCenterY] = useState(0);
  const [seed, setSeed] = useState(newSeed);
  const headingId = useId();

  const replay = () => {
    setSeed(newSeed());
    setCenterX(0);
    setCenterY(0);
  };

  const pan = (dx: number, dy: number) => {
    setCenterX((x) => x + dx);
    setCenterY((y) => y + dy);
  };

  return (
    <section
      aria-labelledby={headingId}
      className="my-8 rounded-lg border border-border bg-card p-6"
    >
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 id={headingId} className="text-lg font-medium leading-tight">
            {config.title}
          </h3>
          {config.description ? (
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {config.description}
            </p>
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

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={replay}
          className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-secondary"
        >
          Replay
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr] md:items-start">
        <Panel label="Off">
          <NaiveMapInteractions
            centerX={centerX}
            centerY={centerY}
            seed={seed}
          />
        </Panel>

        <SharedPanControls pan={pan} />

        <Panel label="On" highlighted>
          <TunedMapInteractions
            centerX={centerX}
            centerY={centerY}
            seed={seed}
          />
        </Panel>
      </div>
    </section>
  );
}

function Panel({
  label,
  highlighted = false,
  children,
}: {
  label: "Off" | "On";
  highlighted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-md border bg-background p-4 transition-colors",
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
      <div className="mt-3" aria-live="polite" aria-busy="false">
        {children}
      </div>
    </div>
  );
}

function SharedPanControls({
  pan,
}: {
  pan: (dx: number, dy: number) => void;
}) {
  const btn =
    "inline-flex size-8 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary active:scale-[0.95]";
  return (
    <div
      className="self-center rounded-md border border-border bg-card p-3"
      role="group"
      aria-label="Pan controls (drives both panels)"
    >
      <p className="mb-2 text-center font-mono text-[0.6rem] font-medium uppercase tracking-wider text-muted-foreground">
        Pan both
      </p>
      <div className="grid grid-cols-3 gap-1">
        <span />
        <button
          type="button"
          aria-label="Pan up"
          onClick={() => pan(0, -PAN_STEP)}
          className={btn}
        >
          <ChevronUp aria-hidden className="size-4" />
        </button>
        <span />
        <button
          type="button"
          aria-label="Pan left"
          onClick={() => pan(-PAN_STEP, 0)}
          className={btn}
        >
          <ChevronLeft aria-hidden className="size-4" />
        </button>
        <span />
        <button
          type="button"
          aria-label="Pan right"
          onClick={() => pan(PAN_STEP, 0)}
          className={btn}
        >
          <ChevronRight aria-hidden className="size-4" />
        </button>
        <span />
        <button
          type="button"
          aria-label="Pan down"
          onClick={() => pan(0, PAN_STEP)}
          className={btn}
        >
          <ChevronDown aria-hidden className="size-4" />
        </button>
        <span />
      </div>
    </div>
  );
}
