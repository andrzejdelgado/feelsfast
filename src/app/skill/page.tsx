import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skill",
  description:
    "Install the feelsfast skill in Claude Code, Cursor, Copilot, or any agent that supports markdown skill files. The AI applies perceived-performance principles by default.",
};

export default function SkillPage() {
  return (
    <article className="px-8 py-12 lg:px-12 xl:px-16">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        New
      </p>
      <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
        Skill
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        A single skill file you install in Claude Code, Cursor, Copilot, Aider, and any
        other agent that reads markdown skills. Once installed, the AI recognises the
        time band of every async UI it generates and applies the right perceived-performance
        pattern by default.
      </p>
      <p className="mt-8 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Coming in Phase 4 — installation commands, source viewer, and per-pattern citations.
      </p>
    </article>
  );
}
