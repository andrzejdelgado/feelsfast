"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { DemoRunner, type DemoConfig } from "@/components/DemoRunner";
import { SwipeableRow } from "@/components/SwipeableRow";
import { cn } from "@/lib/utils";
import { demoContext } from "@/lib/relations";

import { config as listFetchConfig } from "@/demos/list-fetch/config";
const NaiveListFetch = dynamic(() => import("@/demos/list-fetch/naive").then((m) => m.NaiveListFetch));
const TunedListFetch = dynamic(() => import("@/demos/list-fetch/tuned").then((m) => m.TunedListFetch));

import { config as aiStreamingConfig } from "@/demos/ai-streaming/config";
const NaiveAIStreaming = dynamic(() => import("@/demos/ai-streaming/naive").then((m) => m.NaiveAIStreaming));
const TunedAIStreaming = dynamic(() => import("@/demos/ai-streaming/tuned").then((m) => m.TunedAIStreaming));

import { config as fileUploadConfig } from "@/demos/file-upload/config";
const NaiveFileUpload = dynamic(() => import("@/demos/file-upload/naive").then((m) => m.NaiveFileUpload));
const TunedFileUpload = dynamic(() => import("@/demos/file-upload/tuned").then((m) => m.TunedFileUpload));

import { config as optimisticActionsConfig } from "@/demos/optimistic-actions/config";
const NaiveOptimisticActions = dynamic(() => import("@/demos/optimistic-actions/naive").then((m) => m.NaiveOptimisticActions));
const TunedOptimisticActions = dynamic(() => import("@/demos/optimistic-actions/tuned").then((m) => m.TunedOptimisticActions));

import { config as imageGalleryConfig } from "@/demos/image-gallery/config";
const NaiveImageGallery = dynamic(() => import("@/demos/image-gallery/naive").then((m) => m.NaiveImageGallery));
const TunedImageGallery = dynamic(() => import("@/demos/image-gallery/tuned").then((m) => m.TunedImageGallery));

import { config as dataExportConfig } from "@/demos/data-export/config";
const NaiveDataExport = dynamic(() => import("@/demos/data-export/naive").then((m) => m.NaiveDataExport));
const TunedDataExport = dynamic(() => import("@/demos/data-export/tuned").then((m) => m.TunedDataExport));

import { config as realTimeUpdatesConfig } from "@/demos/real-time-updates/config";
const NaiveRealTimeUpdates = dynamic(() => import("@/demos/real-time-updates/naive").then((m) => m.NaiveRealTimeUpdates));
const TunedRealTimeUpdates = dynamic(() => import("@/demos/real-time-updates/tuned").then((m) => m.TunedRealTimeUpdates));

import { MapInteractionsCard } from "@/components/MapInteractionsCard";

import { config as toolExecutionConfig } from "@/demos/ai-tool-execution/config";
const NaiveAiToolExecution = dynamic(() => import("@/demos/ai-tool-execution/naive").then((m) => m.NaiveAiToolExecution));
const TunedAiToolExecution = dynamic(() => import("@/demos/ai-tool-execution/tuned").then((m) => m.TunedAiToolExecution));

import { config as agenticConfig } from "@/demos/ai-agentic-workflow/config";
const NaiveAiAgenticWorkflow = dynamic(() => import("@/demos/ai-agentic-workflow/naive").then((m) => m.NaiveAiAgenticWorkflow));
const TunedAiAgenticWorkflow = dynamic(() => import("@/demos/ai-agentic-workflow/tuned").then((m) => m.TunedAiAgenticWorkflow));

import { config as topBarConfig } from "@/demos/technique-top-bar/config";
const NaiveTopBar = dynamic(() => import("@/demos/technique-top-bar/naive").then((m) => m.NaiveTopBar));
const TunedTopBar = dynamic(() => import("@/demos/technique-top-bar/tuned").then((m) => m.TunedTopBar));

import { config as shimmerSkeletonConfig } from "@/demos/technique-shimmer-skeleton/config";
const NaiveShimmerSkeleton = dynamic(() => import("@/demos/technique-shimmer-skeleton/naive").then((m) => m.NaiveShimmerSkeleton));
const TunedShimmerSkeleton = dynamic(() => import("@/demos/technique-shimmer-skeleton/tuned").then((m) => m.TunedShimmerSkeleton));

import { config as imageColorConfig } from "@/demos/technique-image-color/config";
const NaiveImageColor = dynamic(() => import("@/demos/technique-image-color/naive").then((m) => m.NaiveImageColor));
const TunedImageColor = dynamic(() => import("@/demos/technique-image-color/tuned").then((m) => m.TunedImageColor));

import { config as thinkingGradientConfig } from "@/demos/technique-thinking-gradient/config";
const NaiveThinkingGradient = dynamic(() => import("@/demos/technique-thinking-gradient/naive").then((m) => m.NaiveThinkingGradient));
const TunedThinkingGradient = dynamic(() => import("@/demos/technique-thinking-gradient/tuned").then((m) => m.TunedThinkingGradient));

import { config as mousedownConfig } from "@/demos/technique-mousedown/config";
const NaiveMousedown = dynamic(() => import("@/demos/technique-mousedown/naive").then((m) => m.NaiveMousedown));
const TunedMousedown = dynamic(() => import("@/demos/technique-mousedown/tuned").then((m) => m.TunedMousedown));

import { config as iconFlipConfig } from "@/demos/technique-icon-flip/config";
const NaiveIconFlip = dynamic(() => import("@/demos/technique-icon-flip/naive").then((m) => m.NaiveIconFlip));
const TunedIconFlip = dynamic(() => import("@/demos/technique-icon-flip/tuned").then((m) => m.TunedIconFlip));

import { config as trickleBarConfig } from "@/demos/technique-trickle-bar/config";
const NaiveTrickleBar = dynamic(() => import("@/demos/technique-trickle-bar/naive").then((m) => m.NaiveTrickleBar));
const TunedTrickleBar = dynamic(() => import("@/demos/technique-trickle-bar/tuned").then((m) => m.TunedTrickleBar));

import { config as marqueeBarConfig } from "@/demos/technique-marquee-bar/config";
const NaiveMarqueeBar = dynamic(() => import("@/demos/technique-marquee-bar/naive").then((m) => m.NaiveMarqueeBar));
const TunedMarqueeBar = dynamic(() => import("@/demos/technique-marquee-bar/tuned").then((m) => m.TunedMarqueeBar));

import { config as threeDotConfig } from "@/demos/technique-three-dot-bounce/config";
const NaiveThreeDotBounce = dynamic(() => import("@/demos/technique-three-dot-bounce/naive").then((m) => m.NaiveThreeDotBounce));
const TunedThreeDotBounce = dynamic(() => import("@/demos/technique-three-dot-bounce/tuned").then((m) => m.TunedThreeDotBounce));

import { config as pulsingOrbConfig } from "@/demos/technique-pulsing-orb/config";
const NaivePulsingOrb = dynamic(() => import("@/demos/technique-pulsing-orb/naive").then((m) => m.NaivePulsingOrb));
const TunedPulsingOrb = dynamic(() => import("@/demos/technique-pulsing-orb/tuned").then((m) => m.TunedPulsingOrb));

import { config as rotatingTipsConfig } from "@/demos/technique-rotating-tips/config";
const NaiveRotatingTips = dynamic(() => import("@/demos/technique-rotating-tips/naive").then((m) => m.NaiveRotatingTips));
const TunedRotatingTips = dynamic(() => import("@/demos/technique-rotating-tips/tuned").then((m) => m.TunedRotatingTips));

import { config as brandedStoryConfig } from "@/demos/technique-branded-story/config";
const NaiveBrandedStory = dynamic(() => import("@/demos/technique-branded-story/naive").then((m) => m.NaiveBrandedStory));
const TunedBrandedStory = dynamic(() => import("@/demos/technique-branded-story/tuned").then((m) => m.TunedBrandedStory));

import { config as miniGameConfig } from "@/demos/technique-mini-game/config";
const NaiveMiniGame = dynamic(() => import("@/demos/technique-mini-game/naive").then((m) => m.NaiveMiniGame));
const TunedMiniGame = dynamic(() => import("@/demos/technique-mini-game/tuned").then((m) => m.TunedMiniGame));

import { config as notifyCompleteConfig } from "@/demos/technique-notify-complete/config";
const NaiveNotifyComplete = dynamic(() => import("@/demos/technique-notify-complete/naive").then((m) => m.NaiveNotifyComplete));
const TunedNotifyComplete = dynamic(() => import("@/demos/technique-notify-complete/tuned").then((m) => m.TunedNotifyComplete));

import { config as skeletonSimpleConfig } from "@/demos/technique-skeleton-simple/config";
const NaiveSkeletonSimple = dynamic(() => import("@/demos/technique-skeleton-simple/naive").then((m) => m.NaiveSkeletonSimple));
const TunedSkeletonSimple = dynamic(() => import("@/demos/technique-skeleton-simple/tuned").then((m) => m.TunedSkeletonSimple));

import { config as skeletonTrueConfig } from "@/demos/technique-skeleton-true/config";
const NaiveSkeletonTrue = dynamic(() => import("@/demos/technique-skeleton-true/naive").then((m) => m.NaiveSkeletonTrue));
const TunedSkeletonTrue = dynamic(() => import("@/demos/technique-skeleton-true/tuned").then((m) => m.TunedSkeletonTrue));

import { config as skeletonPulseConfig } from "@/demos/technique-skeleton-pulse/config";
const NaiveSkeletonPulse = dynamic(() => import("@/demos/technique-skeleton-pulse/naive").then((m) => m.NaiveSkeletonPulse));
const TunedSkeletonPulse = dynamic(() => import("@/demos/technique-skeleton-pulse/tuned").then((m) => m.TunedSkeletonPulse));

import { config as imageBrandConfig } from "@/demos/technique-image-brand/config";
const NaiveImageBrand = dynamic(() => import("@/demos/technique-image-brand/naive").then((m) => m.NaiveImageBrand));
const TunedImageBrand = dynamic(() => import("@/demos/technique-image-brand/tuned").then((m) => m.TunedImageBrand));

import { config as spinnerConfig } from "@/demos/technique-spinner/config";
const NaiveSpinner = dynamic(() => import("@/demos/technique-spinner/naive").then((m) => m.NaiveSpinner));
const TunedSpinner = dynamic(() => import("@/demos/technique-spinner/tuned").then((m) => m.TunedSpinner));

import { config as decelBarConfig } from "@/demos/technique-decel-bar/config";
const NaiveDecelBar = dynamic(() => import("@/demos/technique-decel-bar/naive").then((m) => m.NaiveDecelBar));
const TunedDecelBar = dynamic(() => import("@/demos/technique-decel-bar/tuned").then((m) => m.TunedDecelBar));

import { config as counterConfig } from "@/demos/technique-counter/config";
const NaiveCounter = dynamic(() => import("@/demos/technique-counter/naive").then((m) => m.NaiveCounter));
const TunedCounter = dynamic(() => import("@/demos/technique-counter/tuned").then((m) => m.TunedCounter));

import { config as skeletonRevealConfig } from "@/demos/technique-skeleton-reveal/config";
const NaiveSkeletonReveal = dynamic(() => import("@/demos/technique-skeleton-reveal/naive").then((m) => m.NaiveSkeletonReveal));
const TunedSkeletonReveal = dynamic(() => import("@/demos/technique-skeleton-reveal/tuned").then((m) => m.TunedSkeletonReveal));

type BandId = "instant" | "responsive" | "engaged" | "long";
type FilterValue = "all" | BandId;

type DemoEntry =
  | {
      /** Folder name under src/demos/ — drives the cross-link lookup. */
      demoKey: string;
      config: DemoConfig;
      Naive: React.ComponentType<{ seed?: number }>;
      Tuned: React.ComponentType<{ seed?: number }>;
    }
  | {
      /** Used as the React `key` and as the demoKey for cross-link lookup. */
      key: string;
      Custom: React.ComponentType<{ footer?: React.ReactNode }>;
    };

type Band = {
  id: BandId;
  label: string;
  description: string;
  demos: DemoEntry[];
};

const bands: Band[] = [
  {
    id: "instant",
    label: "0–100 MS",
    description:
      "Instant input. The user has not started waiting yet. Anything that announces a wait at this scale damages the experience.",
    demos: [
      { demoKey: "optimistic-actions", config: optimisticActionsConfig, Naive: NaiveOptimisticActions, Tuned: TunedOptimisticActions },
      { key: "map-interactions", Custom: MapInteractionsCard },
      { demoKey: "real-time-updates", config: realTimeUpdatesConfig, Naive: NaiveRealTimeUpdates, Tuned: TunedRealTimeUpdates },
      { demoKey: "technique-mousedown", config: mousedownConfig, Naive: NaiveMousedown, Tuned: TunedMousedown },
      { demoKey: "technique-icon-flip", config: iconFlipConfig, Naive: NaiveIconFlip, Tuned: TunedIconFlip },
    ],
  },
  {
    id: "responsive",
    label: "100 MS – 1 S",
    description:
      "Cues say \"active, working\" without claiming an end-point, like indeterminate spinners, progress bars, a brief pulse or bounce.",
    demos: [
      { demoKey: "technique-spinner", config: spinnerConfig, Naive: NaiveSpinner, Tuned: TunedSpinner },
      { demoKey: "technique-trickle-bar", config: trickleBarConfig, Naive: NaiveTrickleBar, Tuned: TunedTrickleBar },
      { demoKey: "technique-marquee-bar", config: marqueeBarConfig, Naive: NaiveMarqueeBar, Tuned: TunedMarqueeBar },
      { demoKey: "technique-three-dot-bounce", config: threeDotConfig, Naive: NaiveThreeDotBounce, Tuned: TunedThreeDotBounce },
      { demoKey: "technique-pulsing-orb", config: pulsingOrbConfig, Naive: NaivePulsingOrb, Tuned: TunedPulsingOrb },
      { demoKey: "technique-counter", config: counterConfig, Naive: NaiveCounter, Tuned: TunedCounter },
    ],
  },
  {
    id: "engaged",
    label: "1 – 10 S",
    description:
      "The engaged wait. The user is consciously waiting on the result and most perception techniques live here — skeletons, progress bars, LQIPs, AI thinking cues, the Instagram-style top-edge gradient bar.",
    demos: [
      { demoKey: "list-fetch", config: listFetchConfig, Naive: NaiveListFetch, Tuned: TunedListFetch },
      { demoKey: "ai-streaming", config: aiStreamingConfig, Naive: NaiveAIStreaming, Tuned: TunedAIStreaming },
      { demoKey: "file-upload", config: fileUploadConfig, Naive: NaiveFileUpload, Tuned: TunedFileUpload },
      { demoKey: "ai-tool-execution", config: toolExecutionConfig, Naive: NaiveAiToolExecution, Tuned: TunedAiToolExecution },
      { demoKey: "technique-top-bar", config: topBarConfig, Naive: NaiveTopBar, Tuned: TunedTopBar },
      { demoKey: "technique-skeleton-simple", config: skeletonSimpleConfig, Naive: NaiveSkeletonSimple, Tuned: TunedSkeletonSimple },
      { demoKey: "technique-skeleton-true", config: skeletonTrueConfig, Naive: NaiveSkeletonTrue, Tuned: TunedSkeletonTrue },
      { demoKey: "technique-shimmer-skeleton", config: shimmerSkeletonConfig, Naive: NaiveShimmerSkeleton, Tuned: TunedShimmerSkeleton },
      { demoKey: "technique-skeleton-pulse", config: skeletonPulseConfig, Naive: NaiveSkeletonPulse, Tuned: TunedSkeletonPulse },
      { demoKey: "technique-skeleton-reveal", config: skeletonRevealConfig, Naive: NaiveSkeletonReveal, Tuned: TunedSkeletonReveal },
      { demoKey: "technique-decel-bar", config: decelBarConfig, Naive: NaiveDecelBar, Tuned: TunedDecelBar },
      { demoKey: "image-gallery", config: imageGalleryConfig, Naive: NaiveImageGallery, Tuned: TunedImageGallery },
      { demoKey: "technique-image-color", config: imageColorConfig, Naive: NaiveImageColor, Tuned: TunedImageColor },
      { demoKey: "technique-image-brand", config: imageBrandConfig, Naive: NaiveImageBrand, Tuned: TunedImageBrand },
      { demoKey: "technique-thinking-gradient", config: thinkingGradientConfig, Naive: NaiveThinkingGradient, Tuned: TunedThinkingGradient },
    ],
  },
  {
    id: "long",
    label: "10 S+",
    description:
      "Past the wall. The user's attention drifts; patterns here are about giving them something to do or freeing them entirely — engagement copy, branded sequences, foreground-to-background hand-offs.",
    demos: [
      { demoKey: "data-export", config: dataExportConfig, Naive: NaiveDataExport, Tuned: TunedDataExport },
      { demoKey: "ai-agentic-workflow", config: agenticConfig, Naive: NaiveAiAgenticWorkflow, Tuned: TunedAiAgenticWorkflow },
      { demoKey: "technique-rotating-tips", config: rotatingTipsConfig, Naive: NaiveRotatingTips, Tuned: TunedRotatingTips },
      { demoKey: "technique-branded-story", config: brandedStoryConfig, Naive: NaiveBrandedStory, Tuned: TunedBrandedStory },
      { demoKey: "technique-mini-game", config: miniGameConfig, Naive: NaiveMiniGame, Tuned: TunedMiniGame },
      { demoKey: "technique-notify-complete", config: notifyCompleteConfig, Naive: NaiveNotifyComplete, Tuned: TunedNotifyComplete },
    ],
  },
];

const totalDemos = bands.reduce((sum, b) => sum + b.demos.length, 0);

export function PlaygroundContent() {
  const [filter, setFilter] = useState<FilterValue>("all");

  const visibleBands = useMemo(
    () => (filter === "all" ? bands : bands.filter((b) => b.id === filter)),
    [filter],
  );

  return (
    <article className="py-12">
      <header className="mx-auto max-w-4xl px-8 lg:px-12 xl:px-16">
        <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {totalDemos} demos
        </p>
        <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
          Playground
        </h1>
      </header>

      <div className="sticky top-14 z-10 mt-6 border-b border-border bg-background/95 backdrop-blur md:top-0">
        <SwipeableRow
          wrapAt="md"
          role="group"
          ariaLabel="Filter demos by time band"
          className="mx-auto max-w-4xl px-8 py-4 lg:px-12 xl:px-16"
        >
          <FilterPill
            label="All"
            active={filter === "all"}
            onClick={() => {
              setFilter("all");
              setTimeout(
                () => window.scrollTo({ top: 0, behavior: "smooth" }),
                0,
              );
            }}
          />
          {bands.map((band) => (
            <FilterPill
              key={band.id}
              label={band.label}
              active={filter === band.id}
              onClick={() => {
                setFilter(band.id);
                setTimeout(() => {
                  document
                    .getElementById(`band-${band.id}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 0);
              }}
            />
          ))}
        </SwipeableRow>
      </div>

      <div className="mx-auto mt-12 max-w-4xl space-y-12 px-8 lg:px-12 xl:px-16">
        {visibleBands.map((band) => (
          <section key={band.id} aria-labelledby={`band-${band.id}`}>
            <h2
              id={`band-${band.id}`}
              className="scroll-mt-24 font-mono text-xs font-medium uppercase tracking-wider text-primary"
            >
              {band.label} · {band.demos.length}{" "}
              {band.demos.length === 1 ? "demo" : "demos"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {band.description}
            </p>

            <div className="mt-8 space-y-14">
              {band.demos.map((demo) => {
                const demoKey = "Custom" in demo ? demo.key : demo.demoKey;
                const ctx = demoContext(demoKey);
                const footer =
                  ctx.scenarios.length > 0 ? (
                    <AppearsInStrip demoKey={demoKey} />
                  ) : null;
                return (
                  <div key={demoKey}>
                    {"Custom" in demo ? (
                      <demo.Custom footer={footer} />
                    ) : (
                      <DemoRunner
                        config={demo.config}
                        Naive={demo.Naive}
                        Tuned={demo.Tuned}
                        footer={footer}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border px-3 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-wider transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

/**
 * Cross-link strip that points each demo back into the scenarios it
 * appears in. Pattern chips removed when the Patterns section was
 * dismantled; the scenario chip is sufficient to back-pointer into the
 * prose.
 */
function AppearsInStrip({ demoKey }: { demoKey: string }) {
  const ctx = demoContext(demoKey);
  if (ctx.scenarios.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
        Appears in
      </span>
      {ctx.scenarios.map((s) => (
        <Link
          key={`s-${s.slug}`}
          href={`/scenarios/${s.slug}`}
          className="inline-flex items-center rounded-md border border-border bg-card px-2 py-0.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          {s.title}
        </Link>
      ))}
    </div>
  );
}
