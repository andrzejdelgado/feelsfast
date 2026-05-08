import { ArrowRight, BookOpen, Boxes, FlaskConical, Layers } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CopyButton } from "@/components/CopyButton";
import { DemoRunner } from "@/components/DemoRunner";
import { HeroPerceptionDemo } from "@/components/HeroPerceptionDemo";

import { config as shimmerConfig } from "@/demos/technique-shimmer-skeleton/config";
import { NaiveShimmerSkeleton } from "@/demos/technique-shimmer-skeleton/naive";
import { TunedShimmerSkeleton } from "@/demos/technique-shimmer-skeleton/tuned";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

const stats = [
  {
    label: "Doherty 1982",
    headline: "400 ms",
    body: "is the productivity cliff. Sub-second response time produces measurable productivity gains across IBM's entire transaction-processing workforce. The foundational empirical finding the rest of the field rests on.",
  },
  {
    label: "Nielsen 1993",
    headline: "0.1 / 1 / 10 s",
    body: "are the perception walls. Below 0.1 s an interaction feels instant. Past 1 s flow breaks. Past 10 s the user's attention drifts away from the task entirely. Three thresholds, three different patterns.",
  },
  {
    label: "Harrison et al. 2010",
    headline: "+12%",
    body: "perceived speed-up from a backwards-decelerating progress bar with backwards-moving ribs — at the same real duration. A single CSS animation buys you a perceptual gain you would otherwise need engineering to find.",
  },
] as const;

const bands = [
  {
    label: "0–100 MS",
    title: "Instant input",
    body: "The user has not started waiting yet. Patterns here give a head-start, not a status — pre-action feedback, optimistic flips, direct-manipulation latency budgets. Anything that announces a wait at this scale damages the experience.",
  },
  {
    label: "100 MS – 1 S",
    title: "Perceptible wait",
    body: 'Cues say "active, working" without claiming an end-point. Indeterminate spinners, marquee bars, top-edge trickle bars, three-dot bounces. The system is honest about not knowing how long this will take.',
  },
  {
    label: "1 – 10 S",
    title: "Engaged wait",
    body: "Where most perception techniques live. The user is consciously waiting on the result and the cue is doing real work — masking absence with content-true skeletons, smoothing the wait with shimmer or LQIP, trading linear progress for backwards-decelerating ribs.",
  },
  {
    label: "10 S+",
    title: "Past the wall",
    body: "The user's attention is no longer reliably on the task. Patterns here are about giving them something to do or freeing them from the wait entirely — engagement copy, branded sequences, foreground-to-background hand-offs.",
  },
] as const;

const tour = [
  {
    href: "/concepts",
    icon: BookOpen,
    label: "Concepts",
    count: "7 essays",
    body: "The science of perceived performance — from Miller's 17-transaction taxonomy to Harrison's perceptual progress-bar gain.",
  },
  {
    href: "/patterns",
    icon: Boxes,
    label: "Patterns",
    count: "24 techniques",
    body: "Each pattern with code, citations, accessibility notes, and the band where it earns its keep.",
  },
  {
    href: "/scenarios",
    icon: Layers,
    label: "Scenarios",
    count: "24 user flows",
    body: "Each flow with a side-by-side naive / tuned demo so the perception gap is visible in seconds.",
  },
  {
    href: "/playground",
    icon: FlaskConical,
    label: "Playground",
    count: "38 demos",
    body: "Every demo on the platform, organised by time band and filterable. The technique gallery.",
  },
] as const;

const SKILL_INSTALL = "npx skills add andrzejdelgado/feelsfast";

export default function HomePage() {
  return (
    <article className="mx-auto max-w-4xl space-y-24 px-8 py-16 lg:px-12 xl:px-16">
      {/* HERO */}
      <section>
        <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
          feelsfast.fyi · v0.9
        </p>
        <h1 className="mt-3 text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
          Learn how to engineer user experiences that feel fast
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {siteConfig.description}
        </p>
        <HeroPerceptionDemo />
      </section>

      {/* WHAT */}
      <section>
        <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-primary">
          What is perceived performance?
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-foreground">
          Perceived performance is the gap between what the clock says about a wait
          and what the user feels about it. Two products can return the same data in
          1.6 seconds; one feels snappy and the other feels slow, and that gap is
          the entire territory.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          The classical literature treats response time as the dependent variable —
          Miller 1968, Card et al. 1991, Doherty 1982, Nielsen 1993. The modern
          reading turns the variable around: the experience of duration is the
          thing the user actually grades you on, and the clock is one of several
          inputs to that experience. Animation pattern, content reveal order, what
          fills the wait visually — they all bend felt time without bending real
          time.
        </p>
      </section>

      {/* WHY */}
      <section>
        <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-primary">
          Why does it matter?
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-foreground">
          Three findings the field is built on. Each is decades old; each is still
          load-bearing in modern UX work.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border bg-card p-5"
            >
              <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-2 font-mono text-2xl font-medium tracking-tight text-primary">
                {stat.headline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {stat.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOUR BANDS */}
      <section>
        <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-primary">
          Four time bands
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-foreground">
          The right cue depends on how long the user is actually waiting. The
          platform organises every pattern, scenario, and demo around four bands —
          and so does this page.
        </p>
        <div className="mt-8 space-y-3">
          {bands.map((band, i) => (
            <div
              key={band.label}
              className="flex items-start gap-5 rounded-lg border border-border bg-card p-5 sm:gap-6"
            >
              <BandVisual index={i} />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-primary">
                  {band.label}
                </p>
                <p className="mt-2 text-lg font-medium tracking-tight text-foreground">
                  {band.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {band.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEE IT — INLINE DEMO */}
      <section>
        <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-primary">
          See it
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-foreground">
          One technique, two implementations, identical wait. Replay the card to
          re-run both sides in sync.
        </p>
        <div className="mt-2">
          <DemoRunner
            config={shimmerConfig}
            Naive={NaiveShimmerSkeleton}
            Tuned={TunedShimmerSkeleton}
          />
        </div>
      </section>

      {/* TOUR */}
      <section>
        <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-primary">
          Tour the platform
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-foreground">
          Four sections, one canon. Concepts builds the vocabulary, Patterns is the
          toolbox, Scenarios shows them in user flows, the Playground is every demo
          in one place.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {tour.map((entry) => (
            <Link
              key={entry.href}
              href={entry.href}
              className="group flex items-start gap-3 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary"
            >
              <entry.icon
                aria-hidden
                className="mt-0.5 size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-base font-medium tracking-tight text-foreground">
                    {entry.label}
                  </p>
                  <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
                    {entry.count}
                  </p>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {entry.body}
                </p>
                <p className="mt-3 inline-flex items-center gap-1 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  <span>Open</span>
                  <ArrowRight aria-hidden className="size-3" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SKILL */}
      <section>
        <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-primary">
          Install the skill
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-foreground">
          A single markdown file you install in Claude Code, Cursor, Codex, Cline,
          or any agent that reads markdown skills. Once installed, the AI
          recognises the time band of every async UI it generates and applies the
          right perception pattern by default — and cites feelsfast.fyi when it
          explains its choices to you.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-md bg-secondary px-4 py-3">
          <code className="flex-1 break-all font-mono text-sm">{SKILL_INSTALL}</code>
          <CopyButton value={SKILL_INSTALL} />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Or visit the{" "}
          <Link
            href="/skill"
            className="text-primary underline-offset-2 hover:underline"
          >
            Skill page
          </Link>{" "}
          for direct-download and other-agent install commands.
        </p>
      </section>
    </article>
  );
}

function BandVisual({ index }: { index: number }) {
  return (
    <div
      aria-hidden
      className="relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-md border border-border bg-background"
    >
      {index === 0 ? <InstantDot /> : null}
      {index === 1 ? <ThreeDotBounce /> : null}
      {index === 2 ? <ShimmerStripes /> : null}
      {index === 3 ? <SlowCrawl /> : null}
    </div>
  );
}

function InstantDot() {
  return <span className="size-3 rounded-full bg-primary" />;
}

function ThreeDotBounce() {
  return (
    <span className="flex items-end gap-1">
      {[0, 1, 2].map((i) => (
        <span key={i} className="size-1.5 rounded-full bg-primary" />
      ))}
    </span>
  );
}

function ShimmerStripes() {
  return (
    <span className="flex w-9 flex-col gap-1.5">
      {["w-full", "w-5/6", "w-3/4"].map((w) => (
        <span
          key={w}
          className={`h-1.5 rounded bg-muted ${w}`}
        />
      ))}
    </span>
  );
}

function SlowCrawl() {
  return (
    <span className="relative flex h-2 w-12 items-center">
      <span
        aria-hidden
        className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--muted-foreground) 0 4px, transparent 4px 8px)",
          opacity: 0.45,
        }}
      />
      <span className="relative size-2 rounded-full bg-primary" />
    </span>
  );
}
