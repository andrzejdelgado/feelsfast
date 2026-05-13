import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CopyButton } from "@/components/CopyButton";
import { DemoRunner } from "@/components/DemoRunner";

import { essays } from "@/lib/essays";
import { scenarios } from "@/lib/scenarios";

import { NaiveAIStreaming } from "@/demos/ai-streaming/naive";
import { TunedAIStreaming } from "@/demos/ai-streaming/tuned";
import { config as aiStreamingConfig } from "@/demos/ai-streaming/config";

import { NaiveInlineCompletion } from "@/demos/ai-inline-completion/naive";
import { TunedInlineCompletion } from "@/demos/ai-inline-completion/tuned";
import { config as aiInlineCompletionConfig } from "@/demos/ai-inline-completion/config";

import { NaiveAiToolExecution } from "@/demos/ai-tool-execution/naive";
import { TunedAiToolExecution } from "@/demos/ai-tool-execution/tuned";
import { config as aiToolExecutionConfig } from "@/demos/ai-tool-execution/config";

import { NaiveAiAgenticWorkflow } from "@/demos/ai-agentic-workflow/naive";
import { TunedAiAgenticWorkflow } from "@/demos/ai-agentic-workflow/tuned";
import { config as aiAgenticWorkflowConfig } from "@/demos/ai-agentic-workflow/config";

export const metadata: Metadata = {
  title: "AI",
  description:
    "AI surfaces concentrated in one place — the two essays that establish why AI waits are different, the five scenarios that cover the surface area (chat, inline completion, tool execution, long compute, agentic workflows), and a side-by-side naive / tuned demo for each.",
};

const SKILL_INSTALL = "npx skills add andrzejdelgado/feelsfast-skill";

/**
 * Narrative ordering of the AI scenarios — by time band, smallest to
 * largest, so the reader walks from sub-second autocomplete up to
 * multi-minute agentic runs in one continuous scroll.
 */
const SCENARIO_ORDER = [
  "ai-inline-completion",
  "ai-chat-streaming-response",
  "ai-tool-execution",
  "ai-long-compute-inference",
  "ai-agentic-workflow",
] as const;

type DemoEntry = {
  Naive: React.ComponentType<{ seed?: number }>;
  Tuned: React.ComponentType<{ seed?: number }>;
  config: typeof aiStreamingConfig;
};

const SCENARIO_DEMOS: Record<string, DemoEntry> = {
  "ai-chat-streaming-response": {
    Naive: NaiveAIStreaming,
    Tuned: TunedAIStreaming,
    config: aiStreamingConfig,
  },
  "ai-long-compute-inference": {
    Naive: NaiveAIStreaming,
    Tuned: TunedAIStreaming,
    config: aiStreamingConfig,
  },
  "ai-inline-completion": {
    Naive: NaiveInlineCompletion as React.ComponentType<{ seed?: number }>,
    Tuned: TunedInlineCompletion as React.ComponentType<{ seed?: number }>,
    config: aiInlineCompletionConfig,
  },
  "ai-tool-execution": {
    Naive: NaiveAiToolExecution,
    Tuned: TunedAiToolExecution,
    config: aiToolExecutionConfig,
  },
  "ai-agentic-workflow": {
    Naive: NaiveAiAgenticWorkflow,
    Tuned: TunedAiAgenticWorkflow,
    config: aiAgenticWorkflowConfig,
  },
};

const aiEssays = essays.filter((e) => e.category === "ai");
const aiScenarios = SCENARIO_ORDER.map((slug) =>
  scenarios.find((s) => s.slug === slug),
).filter((s): s is NonNullable<typeof s> => Boolean(s));

export default function AIPage() {
  return (
    <article className="mx-auto max-w-4xl space-y-24 px-8 py-16 lg:px-12 xl:px-16">
      <Hero />
      <ConceptsSection />
      <ScenariosSection />
      <SkillSection />
      {/* Inline keyframes for the page's animated accents — single
          `<style>` block keeps the page self-contained. All animations
          collapse under prefers-reduced-motion. */}
      <PageAccentStyles />
    </article>
  );
}

/* ------------------------------- Hero ------------------------------- */

function Hero() {
  return (
    <section>
      <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-primary">
        The AI cut
      </p>

      <h1 className="mt-5 text-5xl font-medium leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
        Building an
        <br />
        AI product?
      </h1>

      <p className="mt-10 max-w-2xl text-lg leading-relaxed text-foreground">
        AI waits are not the deterministic page-load waits the rest of the
        platform is tuned for. Duration spans two orders of magnitude. The
        shape is conversational, not navigational. The answer arrives
        mid-wait. Same toolbox, different problem.
      </p>

      <ThinkingMorph />
    </section>
  );
}

/**
 * Hero thinking artifact — a single path that morphs through
 * dot → six-arm star → hexagon → dot → repeat. Implementation: SVG
 * SMIL `<animate>` interpolating between three paths that all share
 * the same 12-point structure, so the morph is a true vertex-to-vertex
 * tween (no stacked shapes, no cross-fade). 2.7 s per cycle, three
 * 900 ms transitions, eased in and out on each leg.
 *
 * Path construction:
 *   - All three paths have 12 points placed at 30° increments around
 *     the centre (12, 12) — so the SMIL interpolator can match each
 *     vertex to its counterpart on the next shape.
 *   - Dot: every point on a small radius (≈3). The 12-gon reads as a
 *     filled circle at this size.
 *   - Star: outer points (radius 11) at 0° / 60° / … / 300° alternate
 *     with inner notches (radius 4) at 30° / 90° / … / 330°.
 *   - Hexagon (flat-top): vertices at 30° / 90° / … / 330° (radius
 *     11) alternate with edge midpoints at 0° / 60° / … / 300° (radius
 *     = apothem 9.526 = 11·cos 30°).
 */
function ThinkingMorph() {
  const DOT =
    "M12 9 L13.5 9.4 L14.6 10.5 L15 12 L14.6 13.5 L13.5 14.6 L12 15 L10.5 14.6 L9.4 13.5 L9 12 L9.4 10.5 L10.5 9.4 Z";
  const STAR =
    "M12 6 L13.1 10.09 L17.2 9 L14.2 12 L17.2 15 L13.1 13.91 L12 18 L10.9 13.91 L6.8 15 L9.8 12 L6.8 9 L10.9 10.09 Z";
  const HEX =
    "M12 6.8 L15 6.8 L16.5 9.4 L18 12 L16.5 14.6 L15 17.2 L12 17.2 L9 17.2 L7.5 14.6 L6 12 L7.5 9.4 L9 6.8 Z";

  return (
    <div className="mt-10 flex items-center gap-3 text-primary">
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="size-6"
        fill="currentColor"
      >
        <path d={DOT}>
          <animate
            attributeName="d"
            dur="0.9s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;0.33;0.66;1"
            keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
            values={`${DOT};${STAR};${HEX};${DOT}`}
          />
        </path>
      </svg>
      <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Thinking…
      </span>
    </div>
  );
}

/* ----------------------- Section heading primitive ----------------------- */

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
}) {
  return (
    <header>
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {/* Thin gradient underline — primary fading to transparent. The page's
          accent ornament; lives directly under each section h2. */}
      <span
        aria-hidden
        className="mt-3 block h-px w-24"
        style={{
          background:
            "linear-gradient(to right, var(--primary), transparent)",
        }}
      />
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {body}
      </p>
    </header>
  );
}

/* ---------------------------- Concepts section ---------------------------- */

function ConceptsSection() {
  return (
    <section>
      <SectionHeading
        eyebrow={`Concepts · ${aiEssays.length}`}
        title={
          <>
            AI-specific perceived
            <br className="hidden lg:inline" /> performance in two reads
          </>
        }
        body="Why AI waits behave differently from web waits, and where perception engineering on these surfaces crosses into deception."
      />
      <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {aiEssays.map((essay) => (
          <li key={essay.slug}>
            <EssayCard essay={essay} />
          </li>
        ))}
      </ol>
    </section>
  );
}

/**
 * Essay card — mirrors the EssayCard pattern from
 * `ConceptsCategorizedList` so the AI page presents the same shape the
 * Concepts index uses for the same essays.
 */
function EssayCard({
  essay,
}: {
  essay: (typeof essays)[number];
}) {
  return (
    <Link
      href={`/concepts/${essay.slug}`}
      className="block h-full rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary"
    >
      <p className="text-lg font-medium tracking-tight">{essay.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {essay.blurb}
      </p>
      {essay.citations.length > 0 ? (
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {essay.citations.map((cite) => (
            <span
              key={cite}
              className="inline-flex items-center rounded-sm border border-border bg-background px-1.5 py-0.5 font-mono text-[0.625rem] font-medium uppercase tracking-wider text-muted-foreground"
            >
              {cite}
            </span>
          ))}
        </div>
      ) : null}
    </Link>
  );
}

/* --------------------------- Scenarios section --------------------------- */

function ScenariosSection() {
  return (
    <section>
      <SectionHeading
        eyebrow={`Scenarios · ${aiScenarios.length}`}
        title="See it on every surface"
        body="Five places AI shows up in product UIs today, ordered by time-band — from sub-second autocomplete to multi-minute agentic runs. Each card carries the scenario card from /scenarios; the demo lives directly below it."
      />
      <ol className="mt-10 space-y-16">
        {aiScenarios.map((scenario) => {
          const demo = SCENARIO_DEMOS[scenario.slug];
          return (
            <li key={scenario.slug}>
              <ScenarioCard scenario={scenario} />
              {demo ? (
                <div className="mt-5">
                  <DemoRunner
                    config={demo.config}
                    Naive={demo.Naive}
                    Tuned={demo.Tuned}
                  />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/**
 * Scenario card — same shape as the cards on /scenarios. Adds a small
 * primary "live" dot next to the band tag to signal that the demo
 * directly below is interactive.
 */
function ScenarioCard({
  scenario,
}: {
  scenario: (typeof scenarios)[number];
}) {
  return (
    <Link
      href={`/scenarios/${scenario.slug}`}
      className="relative block rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary"
    >
      <span className="absolute right-4 top-4 inline-flex items-center gap-1 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-primary">
        <span>Scenario</span>
        <ArrowUpRight aria-hidden className="size-3.5" />
      </span>
      <p className="pr-24 text-lg font-medium tracking-tight">
        {scenario.title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {scenario.blurb}
      </p>
    </Link>
  );
}

/* ------------------------------- Skill CTA ------------------------------- */

function SkillSection() {
  return (
    <section>
      <SectionHeading
        eyebrow="Skill"
        title="Bake this into your AI codegen"
        body="Once installed in your AI-assisted coding tool, the skill recognises which AI surface it is generating and ships the right pattern by default."
      />
      <div className="relative mt-10 rounded-lg border border-primary bg-card p-6 sm:p-8">
        {/* Top-right pulsing dot — a small "live" cue echoing the scenario
            cards, marking this block as the page's primary call-to-action. */}
        <span
          aria-hidden
          className="absolute right-4 top-4 size-2 rounded-full bg-primary motion-reduce:animate-none"
          style={{ animation: "ai-live-pulse 1800ms ease-in-out infinite" }}
        />
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-primary">
          Install
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground">
          One markdown file in Claude Code, Cursor, Codex, or any agent that
          reads skills. Once installed, your tool recognises the AI surface
          it&rsquo;s generating — chat, inline completion, tool execution,
          long compute, agentic — and applies the right pattern by default:
          deliberate token cadence, motion-safe thinking state, tool-call
          transparency, honest cancellation. Without the skill, your AI
          generates loaders by vibes.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-md bg-secondary px-4 py-3">
          <code className="flex-1 break-all font-mono text-sm">
            {SKILL_INSTALL}
          </code>
          <CopyButton value={SKILL_INSTALL} />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Or visit the{" "}
          <Link
            href="/skill"
            className="text-primary underline-offset-2 hover:underline"
          >
            Skill page
          </Link>{" "}
          for direct-download and other-agent install commands.
        </p>
      </div>
    </section>
  );
}

/* -------------------------- Keyframe declarations ------------------------- */

function PageAccentStyles() {
  return (
    <style>{`
      @keyframes ai-live-pulse {
        0%, 100% { opacity: 0.55; transform: scale(1);    }
        50%      { opacity: 1;    transform: scale(1.25); }
      }
    `}</style>
  );
}
