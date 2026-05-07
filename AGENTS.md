<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# feelsfast.fyi — agent instructions

## Source of truth

The Product Requirements Document at [`./PRD.md`](./PRD.md) is the canonical source for IA, content plan, visual system, citation policy, and roadmap. Do not invent scenarios, patterns, or thresholds that are not in the PRD or backed by a citation.

## Voice for prose drafted under Andrzej's name

When writing essays, scenario walkthroughs, pattern docs, the Skill page content, marketing copy, or any prose intended for the live site, follow the writing-style skill at:

```
/Users/adelgado/Code/Andrzej Delgado Writing Style Skill/SKILL.md
```

Read it directly at the start of any content-drafting session. Core principles: analytical, em-dash heavy, opinionated but justified, mix long analytical sentences with short punches, numbered lists for structure, no AI-slop phrases ("comprehensive guide", "in today's fast-paced world", "game-changer", etc.).

## Citation rule

Every claim on the platform must be backed by a citable source — peer-reviewed paper, foundational HCI research, or named authoritative report. Industry primary sources (Anthropic, OpenAI, Google DeepMind UX research, product team case studies, tool documentation) are permitted but must be labeled `industry` in the references panel. No invented "best practices."

## Stack

- **Next.js 16** (App Router) — read `node_modules/next/dist/docs/` for new APIs. Notable: `unstable_instant` for instant navigation (read `01-app/02-guides/instant-navigation.mdx` before touching route nav).
- **React 19** — built-in to App Router.
- **Tailwind CSS v4** — config lives in `src/app/globals.css` via `@theme inline`, not `tailwind.config.ts`. Custom utilities via `@utility` directive.
- **MDX** via `@next/mdx` for content (`content/concepts/`, `content/scenarios/`, `content/patterns/`).
- **vitest** for unit tests — colocated `*.test.tsx` next to source.
- **prettier** for formatting — config in `.prettierrc.json`.

## Project structure

- `src/app/` — App Router pages, route groups for the eight sidebar sections (Home, Skill, Concepts, Scenarios, Patterns, Playground, Glossary, References).
- `src/components/` — shared UI primitives (Sidebar, ReferencesPanel, DemoRunner, ThemeProvider).
- `src/demos/` — one folder per Scenario containing `naive.tsx`, `tuned.tsx`, `config.ts`.
- `src/lib/` — shared hooks (`useSimulatedLatency`, `useTimeBand`, `usePrefersReducedMotion`), helpers, `site-config.ts`.
- `src/test/` — test setup (`setup.ts`).
- `content/` — MDX files for Concepts, Scenarios, Patterns.
- `public/` — Geist + Geist Mono woff2, OG images, favicons.
- `.claude/skills/` — installed external skills (taste-skill, design-skill/redesign, to-prd).
- [`PRD.md`](./PRD.md) — product spec; the source of truth.

## File conventions

- Components: PascalCase, named exports, no default exports for non-page components.
- TypeScript: strict, no `any`. Path aliases `@/*` → `src/*`.
- Tests: `*.test.tsx` colocated with source; setup in `src/test/setup.ts`.
- Commits: Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`).

## Demo convention (PRD §8)

Every Scenario demo follows the same contract:

1. Side-by-side desktop, tabs on mobile.
2. Toggle labeled `Off / On`.
3. Naive ("Off") side: real, awkward, no skeleton, no prefetch — not a caricature, just unmodified.
4. Latency simulated via `useSimulatedLatency()` with non-linear jitter (gamma distribution, p90 ≈ 2× p50).
5. Replay resets both sides together.
6. Keyboard-operable; ARIA live region; `prefers-reduced-motion` honored.

## Visual system (PRD §7)

- **Fonts:** Geist Sans for body and headings; Geist Mono UPPERCASE only for supporting elements (sidebar group titles, eyebrows, time-band tags, code language labels, footnote markers, metadata labels).
- **Colors:** Anthropic ivory/slate + Claude orange `#d97757` (light + dark mode). Defined in `src/app/globals.css`.
- **Layout (desktop):** 3-column — left sidebar nav | main content | sticky right references panel.
- **Layout (mobile):** stacked; left nav becomes a sheet; references collapse to inline expandable footnotes.
- **Motion:** 200 ms ease-out default; 150 ms cross-fade + 200 ms slide for view transitions; 1.4 s loop low-contrast skeleton shimmer; all gated by `prefers-reduced-motion`.

## Out of scope (v1)

- User accounts / authentication
- Comments / discussion
- Newsletter
- Internationalization (English only)
- Algorithmic search (manual sidebar nav for v1)
- Visual regression test rig
- Self-hosted demo embeds (Stackblitz etc.)

## Tone of pull requests and commit messages

Sharp, factual, no marketing language. Reference the PRD section that motivates the change.
