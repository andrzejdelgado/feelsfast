import { ArrowRight, BookOpen, FlaskConical, Layers } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CopyButton } from "@/components/CopyButton";
import { DemoRunner } from "@/components/DemoRunner";
import { HeroPerceptionDemo } from "@/components/HeroPerceptionDemo";
import { RaceCarIcon } from "@/components/RaceCarIcon";

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
    body: "is the productivity cliff. Doherty & Thadani measured terminal users across IBM and found a non-linear curve: when response times dropped under 400 ms, productivity jumped — programmer transactions per hour rose 106 % moving from 3 s to 0.3 s. 400 ms is not a round target; it is where their data measurably bends. Modern Web Vitals' INP target of 200 ms sits below that cliff with margin to spare. Every \"sub-second response\" goal you have seen in a sprint planning meeting traces back here.",
  },
  {
    label: "Nielsen 1993",
    headline: "0.1 / 1 / 10 s",
    body: "are the perception thresholds. Below 0.1 s an interaction feels instant to the user. Past 1 s flow breaks and the user notices things are being loaded for them. Past 10 s the user's attention drifts away from the task entirely. This changes how designers and engineers should address different load-times in different scenarios.",
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
    body: "The user does not notice they had to wait. In this timeframe everything feels instantaneous. This is the holy grail of load-times — rarely achievable for objective reasons. Yet if a product can make the user believe that things are instant, it gains trust and expands the chance of better revenue (in the end, everything is about the money). In the 0–100 ms territory the win comes through sneaky tactics: pre-action feedback, optimistic flips, direct-manipulation latency budgets.",
  },
  {
    label: "100 MS – 1 S",
    title: "Perceptible wait",
    body: 'This range is bearable, even though the attention span of the youngest generations is, by newer studies, shrinking dramatically. Anything that lasts up to a second is still digestible. The choice is wide: one second of staring at an information abyss, or a second filled with a helpful cue that things are progressing and will be done very soon. In this band, cues say "I\'m active, I\'m working, I\'ll be done sooner than you think" without claiming an end-point. Indeterminate spinners, marquee or infinite progress bars, three-dot bounces, oscillating, bouncing, or pulsating artefacts. The system is honest about not knowing how long this will take, yet movement makes time pass faster.',
  },
  {
    label: "1 – 10 S",
    title: "Engaged wait",
    body: "This is the territory where most perception techniques live — where designers and engineers show their craft in making the user believe that fully loaded content is just around the corner. The whole point is to make the user consciously wait for the result while cues hint at real work happening. In other words: different techniques mask the absence of the final result with content-true artefacts, their movement, their presence — static, shimmering, or pulsating skeletons or their approximations, finite progress bars, percentage counters, and more variants that reduce perceived time further in certain scenarios.",
  },
  {
    label: "10 S+",
    title: "Past the wall",
    body: "When things last more than 10 seconds, the user loses interest in the task that was put in motion. Techniques in this territory have a completely different goal: they either redirect the user's attention elsewhere, or turn the wait into a \"meaning moment.\" Patterns here are about giving them something to do or freeing them from the wait entirely — engaging copy or visuals, branded sequences, process reveals, foreground-to-background hand-offs, temporary entertainment or engagement.",
  },
] as const;

const tour = [
  {
    href: "/concepts",
    icon: BookOpen,
    label: "Concepts",
    count: "10 essays",
    body: "The science of perceived performance — from Miller's 17-transaction taxonomy to the decision rule for which loading affordance to show in which time band, and what changes when the wait is AI.",
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
          Learn how to engineer user experiences that feel{" "}
          <span className="whitespace-nowrap">
            fast
            <RaceCarIcon
              className="ml-4 inline-block h-[1em] w-[2em]"
              style={{ verticalAlign: "-0.15em" }}
            />
          </span>
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
          Perceived performance is the gap between the actual time a user has to
          wait for a piece of software to load and what the user feels about that
          wait. Two products can render the same data in 2.7 seconds; one feels
          snappy and the other feels slow. The gap between those two perceptions
          is the territory a designer and engineer can conquer.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          The classical literature treats response time as the dependent variable
          — Miller 1968, Card et al. 1991, Doherty 1982, Nielsen 1993. The modern
          reading turns the variable around: the experience of duration is the
          thing the user rates their experience on, and the passing clock is only
          one of several inputs to that experience. Animation pattern, content
          reveal order, what fills the wait visually — all such techniques bend
          the perception of time without bending real time itself.
        </p>
      </section>

      {/* WHY */}
      <section>
        <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-primary">
          Why does it matter?
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-foreground">
          Three anthropological / psychological findings that drive the user's
          perception. Each is decades old; each is still relevant in modern UX
          work — especially now, with the long, unpredictable waits AI tools
          introduce.
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
          What Nielsen and his peers coined in the 90s is now divided into four
          time bands, each determining (with exceptions) which technique most
          effectively reduces the perceived load-time. The choice of the right
          cue depends on how long the user has to wait. The platform organises
          everything around these four bands. Users love when things happen
          instantly, but they can suffer through a 10 s+ wait if (a) it's worth
          it, and (b) it &ldquo;doesn&rsquo;t hurt&rdquo; too much.
        </p>
        <div className="mt-8 space-y-3">
          {bands.map((band, i) => (
            <div
              key={band.label}
              className="rounded-lg border border-border bg-card p-5"
            >
              <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-primary">
                {band.label}
              </p>
              <div className="mt-2 flex items-center gap-4">
                <p className="text-lg font-medium tracking-tight text-foreground">
                  {band.title}
                </p>
                <BandTitleAnim index={i} />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {band.body}
              </p>
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
          Three sections, one canon. Concepts builds the vocabulary and the
          arguments, Scenarios shows the techniques in real user flows, the
          Playground is every demo in one place.
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

function BandTitleAnim({ index }: { index: number }) {
  return (
    <span aria-hidden className="shrink-0 leading-none">
      {index === 0 ? <SnapDot /> : null}
      {index === 1 ? <BounceDots /> : null}
      {index === 2 ? <ShimmerBar /> : null}
      {index === 3 ? <RadarPing /> : null}
      <style>{`
        @keyframes band-title-snap {
          0%, 70%, 100% { transform: scale(1);    opacity: 1;   }
          80%           { transform: scale(0.55); opacity: 0.5; }
        }
        @keyframes band-title-bounce {
          0%, 100% { transform: translateY(0);    opacity: 0.45; }
          50%      { transform: translateY(-3px); opacity: 1;    }
        }
        @keyframes band-title-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes band-title-ping {
          0%   { transform: scale(1);   opacity: 0.7; }
          80%  { transform: scale(2.6); opacity: 0;   }
          100% { transform: scale(2.6); opacity: 0;   }
        }
        @keyframes band-title-pulse {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 1;    }
        }
      `}</style>
    </span>
  );
}

function SnapDot() {
  return (
    <span
      className="block size-2.5 rounded-full bg-primary motion-reduce:animate-none"
      style={{ animation: "band-title-snap 1600ms ease-in-out infinite" }}
    />
  );
}

function BounceDots() {
  return (
    <span className="flex items-end gap-1">
      {[0, 160, 320].map((delay) => (
        <span
          key={delay}
          className="size-1.5 rounded-full bg-primary motion-reduce:animate-none"
          style={{
            animation: "band-title-bounce 900ms ease-in-out infinite",
            animationDelay: `${delay}ms`,
          }}
        />
      ))}
    </span>
  );
}

function ShimmerBar() {
  return (
    <span
      className="block h-1.5 w-12 rounded motion-reduce:animate-none"
      style={{
        backgroundImage:
          "linear-gradient(90deg, var(--muted) 0%, color-mix(in oklch, var(--muted) 60%, var(--primary)) 50%, var(--muted) 100%)",
        backgroundSize: "200% 100%",
        animation: "band-title-shimmer 1400ms linear infinite",
      }}
    />
  );
}

function RadarPing() {
  return (
    <span className="relative grid size-3 place-items-center">
      <span
        aria-hidden
        className="absolute inset-0 rounded-full border border-primary motion-reduce:animate-none"
        style={{ animation: "band-title-ping 2400ms ease-out infinite" }}
      />
      <span
        className="relative block size-2 rounded-full bg-primary motion-reduce:animate-none"
        style={{ animation: "band-title-pulse 2400ms ease-in-out infinite" }}
      />
    </span>
  );
}

