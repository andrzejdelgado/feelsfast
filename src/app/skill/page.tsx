import type { Metadata } from "next";
import { Triangle } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";

/**
 * Inline GitHub Octocat mark — the installed lucide-react (v1.14) does
 * not ship brand icons, so this is the simplest way to render the
 * canonical GitHub glyph with the same colour/stroke contract as the
 * other lucide icons on the page. Renders solid via `currentColor`.
 */
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

export const metadata: Metadata = {
  title: "Skill — AI Coding Skill for Loading State UX",
  description:
    "Install the feelsfast skill in Claude Code, Cursor, or any agent. Auto-applies loading-state UX rules: right pattern per wait length, accessible by default.",
  alternates: { canonical: "/skill" },
  keywords: [
    "claude code skill",
    "cursor skill",
    "ai coding skill",
    "loading state ux",
    "ai coding agent",
    "ai pair programmer",
    "perceived performance",
  ],
  openGraph: {
    title: "Skill — AI Coding Skill for Loading State UX",
    description:
      "Install the feelsfast skill in Claude Code, Cursor, or any agent. Auto-applies loading-state UX rules.",
    type: "website",
    url: "/skill",
    images: ["/opengraph-image"],
  },
};

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

export default function SkillPage() {
  return (
    <article className="mx-auto max-w-4xl px-8 py-12 lg:px-12 xl:px-16">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        New
      </p>
      <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
        Skill
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        A single markdown file you install in Claude Code, Cursor, Codex, or any
        AI-assisted coding tool that reads markdown skills. Once installed, the
        AI recognises the time band of every async UI it generates and applies
        the right perception pattern by default, giving you a full explanation
        of the choices it made.
      </p>

      <section className="mt-12">
        <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Install
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-4">
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
      </section>

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
    </article>
  );
}
