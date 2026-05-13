import {
  ArrowRight,
  BookOpen,
  FlaskConical,
  Layers,
  Sparkles,
  Triangle,
  WandSparkles,
} from "lucide-react";
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
    body: "is the productivity cliff. Sub-second response time produces measurable productivity gains. It's the foundational empirical finding the rest of the field rests on.",
  },
  {
    label: "Nielsen 1993",
    headline: "0.1 / 1 / 10 s",
    body: "are the perception thresholds. Below 0.1 s feels instant to the user. Past 1 s flow breaks, making the user notice the loading. Past 10 s the user's attention drifts away from the task entirely.",
  },
] as const;

const bands = [
  {
    label: "0–100 MS",
    title: "Instant",
    body: "In such a timeframe everything happens instantaneously. Making things happen in an instant creates trust. This perception of time can be achieved through sneaky tactics: pre-action feedback, optimistic flips, direct-manipulation latency budgets.",
  },
  {
    label: "100 MS – 1 S",
    title: "Responsive",
    body: "This range is bearable, even with the shrinking attention span of the youngest generations. The choice is: one second of staring at the information abyss, or one second filled with a helpful cue. This is the territory of indeterminate spinners, infinite progress bars, oscillating, bouncing or pulsating load artefacts.",
  },
  {
    label: "1 – 10 S",
    title: "Engaged",
    body: "The range where designers and engineers can show their craft and skill in making the user believe that fully loaded content is just around the corner. Content-true artefacts: static, shimmering, or pulsating skeletons, finite progress bars, percentage counters, with many more variants.",
  },
  {
    label: "10 S+",
    title: "Long",
    body: 'In this territory the user loses interest or attention to the task. The goal is to redirect them onto something else, or to turn the wait into a "meaning moment." Hence the usage of engaging copy or visuals, process unveiling, foreground-to-background hand-offs, providing temporary entertainment or engagement.',
  },
] as const;

const tour = [
  {
    href: "/concepts",
    icon: BookOpen,
    label: "Concepts",
    count: "10 essays",
    body: "Miller's transaction taxonomy, Doherty's 400 ms threshold, the decision rule for which loading affordance fits which time band — and what changes when the wait is AI.",
  },
  {
    href: "/scenarios",
    icon: Layers,
    label: "Scenarios",
    count: "24 user flows",
    body: "Real flows — navigation, forms, search, upload, chat — each with a side-by-side naive / tuned demo so the perception gap is visible in seconds.",
  },
  {
    href: "/ai",
    icon: Sparkles,
    label: "AI",
    count: "2 essays · 5 flows",
    body: "AI surfaces in one cut — chat, inline completion, tool execution, long compute, agentic workflows — with the essays on why AI waits are different.",
  },
  {
    href: "/playground",
    icon: FlaskConical,
    label: "Playground",
    count: "32 demos",
    body: "Every demo on the platform in one place, organised by time band. The reference gallery — pick a pattern, see it in action.",
  },
] as const;

const installCommands = [
  {
    label: "Claude Code · Cursor · Codex · Cline (skills CLI)",
    description:
      "One command. Drops the skill into .agents/skills/ and symlinks into the agent's own skills directory.",
    command: "npx skills add andrzejdelgado/feelsfast-skill",
  },
  {
    label: "Direct download",
    description:
      "Download the raw markdown and place it where your agent reads skills (most use .claude/skills/feelsfast/SKILL.md or similar).",
    command: "curl -L https://feelsfast.fyi/feelsfast.skill.md -o feelsfast.skill.md",
  },
];

export default function HomePage() {
  return (
    <article className="mx-auto max-w-4xl space-y-24 px-8 py-16 lg:px-12 xl:px-16">
      {/* HERO */}
      <section className="text-center">
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-primary">
          Perceived performance
        </p>
        <h1 className="mt-5 text-5xl font-medium leading-[0.95] tracking-tight text-foreground sm:text-6xl">
          Engineer Experiences{" "}
          <span className="lg:block">That Feel Fast</span>
        </h1>
        <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-foreground">
          {siteConfig.description}
        </p>
        <Link
          href="/skill"
          className="group mt-10 inline-flex items-center gap-2.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
        >
          <WandSparkles aria-hidden className="size-4 text-primary" />
          <span>Introducing Skill</span>
          <ArrowRight
            aria-hidden
            className="size-4 text-muted-foreground transition-colors duration-200 group-hover:text-primary"
          />
        </Link>
      </section>

      {/* WHAT */}
      <section>
        <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-primary">
          What is perceived performance?
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-foreground">
          Perceived performance is the gap between the actual load-time a user
          has to wait and what the user feels about it. The same data can
          render in 2.7 seconds — one feels snappy, the other feels slow. The
          perception of time is what users rate as their experience.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Animation patterns, content reveal order, filling the wait visually
          — all such techniques bend the perception of time, and should be
          exploited by designers and engineers for better user experience.
        </p>
        <div className="mt-10">
          <HeroPerceptionDemo />
        </div>
      </section>

      {/* WHY */}
      <section>
        <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-primary">
          Why does it matter?
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-foreground">
          Two anthropological / psychological findings that drive the user's
          perception. Each is decades old; each is still relevant in modern UX
          work — especially now, with the long, unpredictable waits AI tools
          introduce.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
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
          An evolution of those 90s thresholds. The platform organises
          everything around them. Users love when things happen instantly, but
          they can suffer through a 10 s+ wait if it's worth it and it
          &ldquo;doesn&rsquo;t hurt&rdquo; too much.
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
          Four sections, one canon. Concepts builds the vocabulary, Scenarios
          shows the techniques in real user flows, AI cuts across both for the
          surfaces where waits stretch hardest, and the Playground is every
          demo in one place.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {tour.map((entry) => (
            <Link
              key={entry.href}
              href={entry.href}
              className="group relative flex items-start gap-3 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary"
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
                <p className="pointer-events-none absolute bottom-5 right-5 inline-flex items-center gap-1 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-primary opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100">
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
        <div className="mt-8 grid grid-cols-1 gap-4">
          {installCommands.map((entry) => (
            <div
              key={entry.label}
              className="rounded-lg border border-border bg-card p-4"
            >
              <p className="text-sm font-medium">{entry.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{entry.description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 rounded-md bg-secondary px-3 py-2">
                <code className="scrollbar-thin block min-w-0 flex-1 overflow-x-auto whitespace-pre pb-1.5 font-mono text-sm">
                  {entry.command}
                </code>
                <CopyButton value={entry.command} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            type="button"
            disabled
            aria-disabled="true"
            title="Pending skills.sh listing"
            className="inline-flex cursor-not-allowed items-center justify-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-muted-foreground opacity-60"
          >
            <Triangle aria-hidden className="size-4 fill-current" />
            <span>Skills.sh</span>
            <span className="rounded-sm bg-muted-foreground/10 px-1.5 py-0 font-mono text-[0.6rem] font-medium uppercase tracking-wider text-muted-foreground">
              Soon
            </span>
          </button>
          <a
            href="https://github.com/andrzejdelgado/feelsfast-skill"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <GithubMark className="size-4" />
            <span>GitHub</span>
          </a>
        </div>
      </section>
    </article>
  );
}

function GithubMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M12 0a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.31-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.87.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.29 0 .32.21.7.83.58A12 12 0 0 0 12 0z" />
    </svg>
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

