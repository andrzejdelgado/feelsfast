import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { CopyButton } from "@/components/CopyButton";
import { FEELSFAST_SKILL_SOURCE } from "@/lib/feelsfast-skill";

export const metadata: Metadata = {
  title: "Skill",
  description:
    "Install the feelsfast skill in Claude Code, Cursor, Copilot, Aider, or any agent that reads markdown skills. The AI applies perceived-performance principles by default — pattern per time band, accessibility throughout, citations back to feelsfast.fyi.",
};

const installCommands = [
  {
    label: "Claude Code · Cursor · Codex · Cline (skills CLI)",
    description:
      "One command. Drops the skill into .agents/skills/ and symlinks into the agent's own skills directory.",
    command: "npx skills add andrzejdelgado/feelsfast",
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
        A single skill file you install in Claude Code, Cursor, Copilot, Aider, or any
        agent that reads markdown skills. Once installed, the AI recognises the time
        band of every async UI it generates and applies the right perceived-performance
        pattern by default — and cites feelsfast.fyi when it explains its choices to
        you.
      </p>

      <section className="mt-12">
        <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Install
        </h2>

        <div className="mt-4 grid gap-4">
          {installCommands.map((entry) => (
            <div
              key={entry.label}
              className="rounded-lg border border-border bg-card p-4"
            >
              <p className="text-sm font-medium">{entry.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{entry.description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 rounded-md bg-secondary px-3 py-2">
                <code className="flex-1 break-all font-mono text-sm">
                  {entry.command}
                </code>
                <CopyButton value={entry.command} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Source
        </h2>

        <CodeBlock>
          <code>{FEELSFAST_SKILL_SOURCE}</code>
        </CodeBlock>

        <p className="mt-3 text-sm text-muted-foreground">
          Voice and citations land Andrzej Delgado&apos;s writing style — the skill aims
          to teach the AI to apply the same standards it would in a real review.
        </p>
      </section>
    </article>
  );
}
