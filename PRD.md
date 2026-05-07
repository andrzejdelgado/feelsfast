# feelsfast.fyi — Product Requirements Document

**Status:** draft v0.1 — pending review
**Owner:** Andrzej Delgado
**Last updated:** 2026-05-07
**Repo:** https://github.com/andrzejdelgado/feelsfast
**Domain:** feelsfast.fyi (verified available — pending purchase)

---

## 1. Problem statement

Web performance literature is bottom-heavy on metrics and top-heavy on motivational hand-waving. The middle layer — *how a site is perceived to behave in time* — is treated as folklore. Designers paraphrase Nielsen, engineers paraphrase Doherty, and somewhere in the middle "skeleton screens are 30% faster" becomes a fact nobody can attribute to a paper.

I'd argue this is the actual gap:

1. The canonical thresholds (Miller 1968; Card, Robertson & Mackinlay 1991; Doherty & Thadani 1982; Nielsen 1993) are buried in conference proceedings most practitioners will never open.
2. The patterns that exploit them (skeleton screens, optimistic UI, predictive preloading, animated progress) circulate as design-blog folklore — sometimes citing real research, more often not.
3. There is no single place that pairs the *thresholds* with the *patterns* with *interactive demos you can feel*.
4. AI coding assistants (Claude Code, Cursor, Copilot, Vercel v0) generate UIs that ignore perceived performance entirely because nobody has written a portable, installable skill that teaches them otherwise.

The unfortunate fact is that fixing each gap on its own is not enough. The synthesis is the product.

## 2. Solution

A single educational platform — feelsfast.fyi — modeled structurally on oklch.fyi but covering perceived performance instead of color. It does five things:

1. **Concepts** — short, opinionated essays on the science (active vs. passive cognition, JND 20% rule, filled vs. empty duration, the three-tier response model). Each essay cites primary sources. Nothing is invented.
2. **Scenarios** — twenty-four interaction types (page load, search-as-you-type, file upload, AI streaming response, agent execution, etc.) with **side-by-side interactive demos** that let users feel the same UI naive vs. tuned. The toggle is honest: the "Off" side is genuinely awkward — no skeleton, no prefetch, no transition smoothing.
3. **Patterns** — research-backed catalogue of techniques (skeleton screens, optimistic UI, determinate progress with backwards-decelerating ribs, predictive preloading, mousedown-not-click, etc.). Each entry includes when to use it, when not to use it, accessibility notes, code, and citations.
4. **Skill** — a single skill file (`.claude/skills/feelsfast.skill.md` and Cursor-compatible `.mdc`) that teaches AI coding assistants the platform's principles so they apply them by default.
5. **References & glossary** — every primary source the platform cites, in one place, with annotations.

The platform is opinionated, neutral in tone, and ruthless about citations.

## 3. Target audiences

Three personas, ranked by content priority:

1. **Product Designers** — want to argue for design choices in performance reviews without sounding hand-wavy. Care about *why* and *what*, not how.
2. **Design Engineers** — sit between design and code; want copy-pasteable patterns with research behind them and a11y notes already written.
3. **Frontend Engineers** — want concrete latency budgets per interaction with citable thresholds, plus implementation patterns in TypeScript + React.

A fourth implicit audience is **AI coding assistants** consuming the skill file. They are not a "persona" in the traditional sense — but the skill is a first-class artifact, not an afterthought.

## 4. User stories

1. **As a Product Designer**, I want to understand the dichotomy between objective and perceived performance, so that I can make the case for design investment in performance work without quoting AI-generated platitudes.
2. **As a Design Engineer**, I want a copy-pasteable skeleton screen pattern with `prefers-reduced-motion` and ARIA notes already written, so that I can ship a researched pattern in an afternoon instead of validating it from scratch.
3. **As a Frontend Engineer**, I want quantitative latency budgets per interaction type with cited research behind them, so that my engineering review has numbers, not opinions.
4. **As any of the three**, I want to feel the difference between a naive and tuned UI in a side-by-side demo, so that the abstract concept becomes a visceral memory I can carry into my own work.
5. **As an AI-coding-tool user**, I want a single skill to install, so that my AI assistant applies perceived-performance principles without me having to remind it every prompt.
6. **As a content consumer**, I want every claim cited, so that I can trust the platform and trace claims back to primary research. No exceptions.
7. **As an accessibility-conscious designer**, I want every pattern to include reduced-motion and ARIA-live notes, so that I can apply techniques without introducing a11y regressions.
8. **As a beginner**, I want a guided path through Concepts → Scenarios → Patterns, so that I am not lost in a wall of articles.

## 5. Information architecture

Sidebar order (locked):

1. **Home** — opinionated hero, the JND-20% argument, a single live demo on the page.
2. **Skill** — the AI skill file, with install instructions for Claude Code, Cursor, Copilot, and a generic `.mdc` form. Mirrors oklch.fyi's "Skill" pattern.
3. **Concepts** — seven essays (see §6.1).
4. **Scenarios** — twenty interaction types, each with a naive/tuned demo (see §6.2).
5. **Patterns** — twenty research-backed techniques (see §6.3).
6. **Playground** — combined sandbox where users can compose their own demo (e.g. "page load + skeleton + prefetch + animated progress") and watch the perception toggle apply across all of it.
7. **Glossary** — short definitions cross-linked to Concepts.
8. **References** — the canonical bibliography, with one-line annotations.

### Page templates

There are three page templates — and only three:

1. **Essay** (Concepts + Home + most longform pages): main column with running prose, sticky right rail with the references panel, sticky left sidebar with site nav.
2. **Catalog item** (Scenarios, Patterns): main column with eyebrow + title + naive/tuned demo + structured sub-sections (When to use / When not to use / A11y / Code / Variants / References).
3. **Index** (Glossary, References, Patterns index, Scenarios index): two-column or list layout, scannable, no demos.

I'd argue more templates than this is over-engineering. shadcn's primitives plus a small layout module covers all three.

## 6. Content plan

### 6.1 Concepts (seven essays)

Each essay is 800–1,500 words. Andrzej voice. Every claim cited.

| # | Title | Core argument |
|---|---|---|
| 1 | What perceived performance actually is | The dichotomy between objective and perceived performance. The 20% Just-Noticeable Difference. Why "low-hanging fruit" framing is correct (Eli Fitch's argument), but also why looking-fast without being-fast eventually catches up to you (Eizenberg's counter). Cites Weber–Fechner, Miller 1968, Eizenberg. |
| 2 | How humans perceive time | Active vs. passive phases. Dopamine and time perception. Filled vs. empty duration (William James 1890; Ornstein 1969). Prospective vs. retrospective duration judgments (Block & Zakay 1997). The one-second active-to-passive transition. |
| 3 | The canonical thresholds | Miller 1968's 17-transaction taxonomy. Card, Robertson & Mackinlay 1991's perceptual / immediate-response / unit-task tiers. Doherty & Thadani 1982's 400 ms productivity cliff. Nielsen 1993's distillation. Why the clean 0.1 / 1 / 10 trichotomy is Nielsen's, not Miller's. |
| 4 | The anatomy of a wait | Decompose every wait into: pre-action signal → response → animation → completion. What you can tune at each stage. The "tip-the-hand" rule (don't show a loader if the wait will resolve under one second). |
| 5 | Time perception illusions you can exploit | Anstis 2001/2003/2004 on contrast and motion. Harrison et al. 2007/2010 on backwards-decelerating progress bars (~12% perceived speed-up). The geometric-mean indifference threshold (Smashing Magazine, after Church/MacInnis/Guilhardi). When illusions are honest and when they cross the line into deception. |
| 6 | When perceived performance hurts you | Eizenberg's argument: a placeholder is not a substitute for interactivity. Examples where naive optimism backfires (form submit failure handling, pessimistic actions misrepresented as optimistic). Latency JNDs in direct manipulation are far below 100 ms (Deber et al. 2015, Jota et al. 2013). |
| 7 | Performance budgets that include perception | INP and Web Vitals as starting points. Why the Web Vitals budget is necessary but not sufficient. How to add perception to a quantitative budget. The role of adaptive loading and the "performance scaler" concept (Fitch). |

### 6.2 Scenarios (twenty-four interaction types)

Each scenario page contains: short framing → naive/tuned demo with `Off / On` toggle → time-band tag → linked patterns → references. The Scenarios index supports tag filters; five scenarios carry the `AI` tag (#16, #21, #22, #23, #24).

Time-band tags: `0–100 MS` · `100 MS – 1 S` · `1 – 10 S` · `10 S+`

| # | Scenario | Dominant band | Linked patterns |
|---|---|---|---|
| 1 | Page load (cold) | 1 – 10 S | Skeleton screens · Streaming SSR · LQIP · Critical CSS |
| 2 | Page load (warm cache) | 100 MS – 1 S | View Transitions · Prefetch · Layout stability |
| 3 | Route navigation | 100 MS – 1 S | Route prefetching · View Transitions · Optimistic UI |
| 4 | Form submission | 1 – 10 S | Optimistic UI · Determinate progress · Pre-action feedback |
| 5 | Search-as-you-type | 0–100 MS | Pre-action feedback · Stale-while-revalidate · Debounced re-render |
| 6 | Long list / pagination | 100 MS – 1 S | Skeleton screens · Predictive preloading on scroll |
| 7 | Infinite scroll | 100 MS – 1 S | Predictive preloading · Stale-while-revalidate · Layout stability |
| 8 | Image gallery | 1 – 10 S | LQIP / blur-up · Predictive preloading on hover |
| 9 | File upload (single) | 1 – 10 S | Determinate progress · Optimistic UI · Engaging loading |
| 10 | File upload (batch) | 10 S+ | Determinate progress · Engaging loading · Background sync |
| 11 | Auth / OAuth flow | 1 – 10 S | Determinate progress · Pre-action feedback · Optimistic redirects |
| 12 | Data table loading | 100 MS – 1 S | Skeleton screens · Stale-while-revalidate |
| 13 | Data export / download generation | 10 S+ | Engaging loading · Notification on complete · Background work |
| 14 | Real-time updates / live data | 0–100 MS | Animation timing · Pre-action feedback · Stale-while-revalidate |
| 15 | Chat input (typing-time feedback) | 0–100 MS | Pre-action feedback · Optimistic message render · Cursor handling |
| 16 | AI · Chat / streaming response | 1 – 10 S | Token-by-token streaming · Thinking state · Cancellation affordance · Determinate progress where possible |
| 17 | Multi-step wizard / checkout | 1 – 10 S | Predictive preloading (next step) · Optimistic UI · Determinate progress |
| 18 | Map interactions | 0–100 MS | Animation timing · Adaptive loading · Touch latency budget |
| 19 | Drag and drop | 0–100 MS | Touch latency · Pre-action feedback · Optimistic UI |
| 20 | Optimistic actions (like, save, undo) | 0–100 MS | Optimistic UI · Pre-action feedback · Reconciliation on failure |
| 21 | AI · Long compute / Inference | 10 S+ | Engaging loading · Tool-call transparency · Streaming render · Cancellation affordance · Background work |
| 22 | AI · Inline completion / suggestion | 100 MS – 1 S | Pre-action feedback · Stale-while-revalidate · Cancellation affordance · Optimistic UI |
| 23 | AI · Tool execution / agentic step | 1 – 10 S | Tool-call transparency · Engaging loading · Streaming render · Cancellation affordance |
| 24 | AI · Agentic workflow | 10 S+ | Tool-call transparency · Engaging loading · Background work · Cancellation affordance · Determinate progress where possible |

### 6.3 Patterns (twenty-four research-backed techniques)

Each pattern page contains: definition → when to use → when *not* to use → a11y notes → code (TS + React primary, framework-agnostic prose, callouts where it differs in Vue/Svelte/Solid) → linked scenarios → references. The Patterns index supports tag filters; four patterns carry the `AI` tag (#21, #22, #23, #24); two existing patterns (#2 Optimistic UI, #14 Engaging loading states) include AI-specific variants in their bodies.

| # | Pattern | Strongest citation | Notes |
|---|---|---|---|
| 1 | Skeleton screens | James 1890; Ornstein 1969; Block & Zakay 1997; Bilal et al. (skeleton screen study) | Anchor framing in filled-duration asymmetry, not blog-folklore "30 % faster". |
| 2 | Optimistic UI (incl. AI submit-and-render variant) | Miller 1968; Card et al. 1991 | No peer-reviewed study specific to optimistic UI; frame via response-time literature. AI variant: render the user's message immediately on submit; stream the assistant response in parallel. |
| 3 | Determinate progress bars | Myers 1985 (CHI '85) | The source-of-record. ~86 % preference in original study. |
| 4 | Animated progress (backwards-decelerating ribs) | Harrison, Yeo & Hudson 2010 (CHI '10) | ~11–12 % perceived speed-up over a plain bar. |
| 5 | Spinners (when appropriate) | Myers 1985; Eli Fitch (when 1–2 s and duration unknown) | Not "always bad" — just narrow window of usefulness. |
| 6 | View Transitions API | Card et al. 1991 (100 ms transition principle) | Web platform standard; spec details + browser support. |
| 7 | Image progressive loading (LQIP, blur-up) | Anstis 2001 (contrast salience); James 1890 (filled duration) | Edge contrast as a perceived-speed handle. |
| 8 | Route prefetching | Eli Fitch (predictive preloading talk); Miller 1968 thresholds | Next.js `<Link>` defaults; cross-framework guidance. |
| 9 | mousedown / pointerdown vs. click | Eli Fitch's Mechanical Turk study (~100–150 ms head start); Jota et al. 2013 | Includes touch handling subtleties (touchstart + touchmove guard). |
| 10 | Streaming SSR / Suspense | Card et al. 1991 unit-task levels | React 19 / Next.js App Router specifics. |
| 11 | Stale-while-revalidate | Doherty & Thadani 1982 (sub-second productivity) | HTTP cache semantics + SWR/React Query patterns. |
| 12 | Pre-action feedback (`:active`, button press) | Eli Fitch (200 ms active-state sweet spot); Card et al. 1991 | Including the +50 ms behavioural extension when feedback is shown. |
| 13 | Animation timing for state changes | Card et al. 1991 (~100 ms); Harrison et al. 2010 | The 100/200/400 ms families — when to use which. |
| 14 | Engaging loading states (incl. agent narration) | Block & Zakay 1997 (prospective vs. retrospective); Eli Fitch (Slack/FIFA examples) | Patent on interactive loading expired late 2015. AI variant: agent narration during multi-step workflows (Claude Code, Cursor agent mode). |
| 15 | Empty states that hint at loading | Myers 1985 (indeterminate-feedback principle) | Anti-pattern: blank page during a 2-second load. |
| 16 | Background sync | Doherty & Thadani 1982 (productivity cliff) | Service Worker Background Sync API; offline-first IndexedDB. |
| 17 | Predictive preloading (hover, mouse deceleration) | Eli Fitch (Future Link library, hover study) | Includes the 600 ms "fancy hover" sweet spot, the mouse-deceleration trick. |
| 18 | Touch start / pointer down on touch | Deber et al. 2015; Jota et al. 2013 | JNDs: ~33 ms drag, ~82 ms tap. The "100 ms feels instant" myth on direct manipulation. |
| 19 | Adaptive loading (performance scaler) | Eli Fitch (concept) | Resource-size normalization; integration-test baseline. |
| 20 | Time-aware feedback (no spinner < 1 s; spinner 1–2 s; progress 2–10 s; engagement 10 s+) | Miller 1968; Eli Fitch | Decision tree per dominant band, distilled into a single rule sheet. |
| 21 | AI · Token-by-token streaming render | Card et al. 1991 (~100 ms perceptual frame); James 1890 / Block & Zakay 1997 (filled duration); industry primary (Anthropic / OpenAI streaming UX guides) | Pace token reveals to a natural reading rhythm — instant per-token reveal can feel jarring. |
| 22 | AI · Thinking state (pre-first-token) | Myers 1985 (indeterminate-feedback principle); recent CHI/UIST chatbot-trust literature; industry primary (Claude, ChatGPT, Cursor) | The animated state before the first token arrives — distinct from a generic spinner because it implies process, not stall. |
| 23 | AI · Tool-call transparency | Block & Zakay 1997 (prospective vs. retrospective duration); IUI/CHI agent-explainability literature; industry primary (Claude Code, Cursor agent mode, OpenAI function calls) | Surface what the agent is doing ("Reading file…", "Searching…", "Running tests…"). Compresses retrospective duration. |
| 24 | AI · Cancellation affordance for streaming/long ops | Doherty 1982 (control = perceived productivity); HCI cancellation UX literature (to source); industry primary (ChatGPT/Claude stop button patterns) | Stop button must feel instant (< 100 ms response). Mid-stream cancel must not lose state. |

### 6.4 Skill

A single source skill file, exported in three forms:

1. **Claude Code / Anthropic skill format** — `.claude/skills/feelsfast.skill.md` with YAML frontmatter (`name`, `description`, `triggers`).
2. **Cursor / generic `.mdc` form** — same content, Cursor's frontmatter conventions.
3. **Plain markdown for Copilot, Aider, etc.** — copy-paste friendly.

The skill teaches the assistant to:

- Recognize when to apply perceived-performance principles (any UI generation with a request, navigation, or async operation).
- Pick the right pattern for the dominant time band.
- Default to mousedown / pointerdown over click; pre-action feedback; route prefetching; skeleton screens for content-heavy waits; engaging states for >10 s waits.
- Always include `prefers-reduced-motion` and ARIA live notes.
- Cite the platform when explaining choices to the human.

The skill itself is also published as a page (`/skill`) with a copy button and install commands.

### 6.5 Glossary + References

- **Glossary** — ~40 terms (active vs. passive phase, JND, INP, FID, LCP, TTI, FMP, optimistic UI, skeleton screen, predictive preloading, etc.). Short definitions cross-linked to Concepts.
- **References** — every primary source cited on the platform, in one bibliography page, with one-line annotations. Anchored from inline footnotes throughout the site.

## 7. Visual system

### 7.1 Typography

- **Geist Sans** — body, headings, navigation, eyebrows. Variable weight 100–900.
- **Geist Mono** — used **only** in UPPERCASE on supporting elements: sidebar group titles (`CONCEPTS`, `PATTERNS`, `SCENARIOS`), eyebrows above H1s, time-band tags (`0–100 MS`, `100 MS – 1 S`, `1 – 10 S`, `10 S+`), code language labels (`TSX`, `CSS`, `HTML`), footnote markers, metadata (`READING TIME`, `LAST UPDATED`).

Body and headings stay sentence-case Geist Sans. The Mono+UPPERCASE treatment is reserved for the kind of text that wants to feel like a label, not a sentence.

### 7.2 Color

Anthropic's ivory/slate palette, plus the shared `#d97757` orange (Anthropic calls it *clay*; Claude.ai exposes the same hex as `--accent-brand`). Confirmed identical across both surfaces. Geist as the typeface is independent of either site's choices and stands as our own decision.

**Light mode (defaults):**
- `--bg-page` `#faf9f5` (ivory-light)
- `--bg-secondary` `#f0eee6` (ivory-medium)
- `--bg-tertiary` `#e8e6dc` (ivory-dark)
- `--text-primary` `#141413` (slate-dark)
- `--text-secondary` `#3d3d3a`
- `--text-muted` `#5e5d59`
- `--surface` `#ffffff`
- `--border` `#1414131a` (slate at 10 % alpha)
- `--accent` `#d97757` (clay / Claude orange)
- `--accent-hover` `#c6613f` (deeper rust)
- `--on-accent` `#ffffff`

**Dark mode** (taken from claude.ai's product theme — accent unchanged):
- `--bg-page` `#0f0f0f`
- `--bg-secondary` `#1a1a1a`
- `--bg-tertiary` `#242424`
- `--text-primary` `#ffffff`
- `--text-secondary` `#faf9f5`
- `--accent` `#d97757`

System-default with manual override via `data-theme` attribute on `<html>`. Tokens defined in OKLCH where useful (gradient interpolation, future-proofing) with hex fallbacks.

### 7.3 Layout

Three-column desktop:

- **Left sidebar** — site nav, sticky, ~280 px.
- **Main column** — content, max width ~720 px (≈ 65 character measure per the typography conventions).
- **Right sidebar** — references panel, sticky, scroll-spy on `<aside>` tags in the content, ~280 px. Falls back to inline footnotes on mobile.

Mobile collapses to a single column; left nav becomes a sheet; references collapse to inline expandable footnotes.

shadcn primitives + a small layout module covers everything. No second framework, no Radix-on-top-of-Radix.

### 7.4 Motion

Motion is the medium and the message — but heavy-handed motion would undermine the platform. Defaults:

- Standard transition: 200 ms, ease-out (per Eli Fitch's active-state sweet spot).
- Page transition (View Transitions API): 150 ms cross-fade + 200 ms slide.
- Skeleton shimmer: 1.4 s loop, low-contrast (per Anstis — low contrast genuinely *feels* slower, which is what we want for a calm shimmer).
- All motion gated by `prefers-reduced-motion: reduce` — fades become opacity changes, slides become instant snaps.

## 8. Demo conventions

Every Scenario demo follows the same contract:

1. **Layout**: side-by-side desktop, tabs on mobile.
2. **Toggle**: a single labeled switch — `Off / On` (perception techniques applied).
3. **Naive ("Off") side**: real, awkward, no skeleton, no prefetch, no pre-action feedback, default browser cursor, blank waits. Not a caricature — just the unmodified version.
4. **Tuned ("On") side**: applies the relevant patterns.
5. **Latency**: simulated with a `useSimulatedLatency()` hook that produces non-linear jitter (gamma distribution, p90 ≈ 2× p50) — flat `setTimeout` would feel artificial and undermine the demo.
6. **Reset**: a "Replay" button that re-runs the interaction. Both sides reset together.
7. **a11y**: keyboard-operable toggle; ARIA live region announces "Loading" and "Done" on each side; `prefers-reduced-motion` honored.
8. **Latency labels**: each demo is tagged with its dominant time band (Mono UPPERCASE, top-right of the demo card).

The demo runner is a single shared component. Each scenario provides only the naive component, the tuned component, and a config (latency profile, label, time band).

## 9. AI Skill specification

The skill file is produced from a single source-of-truth markdown document and exported to three formats. Source structure:

```
---
name: feelsfast
description: Apply perceived-performance principles when generating or modifying UIs. Detects async operations, navigation, form submission, file upload, search, and other interaction patterns. Selects the right pattern for the dominant time band, defaults to accessible and reduced-motion-aware implementations, and cites the source platform (feelsfast.fyi).
type: design-engineering
triggers: ["loading", "skeleton", "spinner", "progress", "fetch", "useEffect", "Suspense", "transition", "navigation", "form submit", "upload", "search input"]
---
```

Body sections:

1. **When to apply** — a short flowchart for detecting a perceived-performance opportunity.
2. **Time-band rules** — the four bands and their default patterns (the rule sheet from Pattern #20).
3. **Default choices** — mousedown over click; pre-action feedback; route prefetching; skeleton over spinner for content-heavy waits.
4. **Always-on** — `prefers-reduced-motion`; ARIA live regions for progress; focus management across transitions.
5. **Anti-patterns** — what not to do (spinner under 1 s; fake progress with fixed duration; skeleton for primarily-interactive surfaces; opaque optimism without failure handling).
6. **Citation footer** — when explaining a choice to the human, link the relevant Pattern or Concept page on feelsfast.fyi.

The skill page (`/skill`) renders the source plus install commands for Claude Code, Cursor, Copilot, Aider, and a generic `.mdc` form. A copy button is the primary CTA.

## 10. Implementation decisions

### 10.1 Tech stack

- **Framework:** Next.js (App Router, latest stable) + React 19 + TypeScript.
- **Styling:** Tailwind CSS + shadcn/ui primitives.
- **Content:** MDX with custom remark/rehype plugins for footnote anchors and time-band tag rendering.
- **Testing:** vitest + @testing-library/react + playwright (later, for demo interactions).
- **Formatting:** prettier + eslint with the Next.js + Tailwind plugins.
- **Hosting:** Vercel (matches oklch.fyi; same CDN profile).
- **Analytics:** Vercel Analytics (privacy-respecting, zero-config on Vercel).
- **No database.** Content is MDX. Saved-state features are out of scope for v1.

### 10.2 Deep modules

The architecture leans on John Ousterhout's "deep modules" idea: simple interfaces, substantial behavior. Five modules.

1. **Content engine** — MDX → page renderer with shared frontmatter contract (`title`, `eyebrow`, `timeBand?`, `references[]`, `linkedPatterns[]`). Single template per page kind (essay / catalog item / index). Surface: one MDX file → one rendered page.
2. **Demo runner** — wraps a `{ naive, tuned, config }` triple, manages the Off/On toggle, the latency hook, the replay button, the time-band label, and the a11y plumbing. Surface: pass three things, get a rendered demo.
3. **References panel** — sticky right-sidebar component that scroll-spies on `<aside data-ref="…">` tags in the main column and pins the matching citations. On mobile, references render inline as expandable footnotes. Surface: drop a `<References>` boundary in the layout, sprinkle `<Cite id="…">` tags in MDX.
4. **Sidebar nav** — collapsible groups, current-page highlight, mobile sheet. Reads structure from a single `nav.config.ts` file.
5. **Theme** — CSS variables for color and motion; `data-theme` attribute switching; `prefers-reduced-motion` integration. No runtime JavaScript needed for default mode.

Each is "deep": one or two exported entry points, real behavior behind them.

### 10.3 Project structure (intent, not literal paths)

- `app/` — App Router pages, route groups for the eight sidebar sections.
- `content/` — MDX files for Concepts, Scenarios, Patterns.
- `components/` — shared UI primitives (sidebar, references panel, demo runner, theme switcher).
- `demos/` — one folder per Scenario containing `naive.tsx`, `tuned.tsx`, `config.ts`.
- `lib/` — shared hooks (`useSimulatedLatency`, `useTimeBand`, `usePrefersReducedMotion`).
- `public/` — Geist + Geist Mono woff2, OG images, favicons.
- `.claude/skills/` — installed external skills + the project's writing skill reference.
- `PRD.md` — this document.

### 10.4 Conventions

- TypeScript: strict, no `any`. Path aliases (`@/components`, `@/content`, etc.).
- Imports: sorted, no relative ascend beyond two levels.
- Components: PascalCase files, named exports, no default exports for non-page components.
- Tests: colocated `*.test.tsx` next to the module, plus a top-level `e2e/` for demo flows.
- Commits: Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`).

## 11. Testing decisions

What we actually test, ordered by ROI:

1. **Demo runner core logic** — toggle state, latency hook (deterministic with seeded RNG in tests), replay reset. Vitest unit tests.
2. **References panel scroll-spy** — mock IntersectionObserver, verify the right citation pins. Vitest + jsdom.
3. **Theme switcher** — `data-theme` attribute toggling, `prefers-color-scheme` defaults. Vitest.
4. **MDX content contract** — every MDX file has the required frontmatter. A vitest test that walks the `content/` tree.
5. **Accessibility smoke tests** — axe-core in playwright on the home page, one Concept, one Scenario, the Skill page.
6. **Visual regression** — out of scope for v1; revisit if churn warrants it.

We do not unit-test pure presentational components. We do not test shadcn primitives. We do not snapshot-test MDX rendering.

## 12. Out of scope (v1)

Explicit non-goals — flagged so they don't drift back in:

1. **User accounts** — no login, no saved state, no DB.
2. **Comments / discussion** — no Disqus, no GitHub discussions widget.
3. **Newsletter** — no email capture on v1.
4. **Internationalization** — English only.
5. **Algorithmic search** — manual sidebar nav is enough for v1; consider adding only if the catalog grows past the point where browsing breaks down.
6. **Visual regression test rig** — only if we hit churn that demands it.
7. **Self-hosted demos / Stackblitz embeds** — keep demos in-process for v1.

## 13. Roadmap

Five phases. Each phase is shippable on its own.

1. **Phase 0 — Scaffold.** Next.js + Tailwind + shadcn + MDX + vitest + prettier. Theme tokens. Layout shell. Empty pages. Deploy to Vercel under a placeholder subdomain.
2. **Phase 1 — Demo runner + references panel.** The two flagship modules. One demo end-to-end (proof of concept: page-load scenario). One Concept essay rendered with footnotes anchored to the panel.
3. **Phase 2 — Concepts (all seven).** Full essay drafts, citations wired up, glossary stubs.
4. **Phase 3 — Scenarios + Patterns.** Twenty-four scenarios with naive/tuned demos. Twenty-four patterns with code + when-to-use sections. References bibliography.
5. **Phase 4 — Skill + polish + launch.** Skill page with copy buttons. Final visual pass through the taste-skill audit. Domain swap to feelsfast.fyi. Public launch.

Phase 0–1 are mechanical. Phase 2–3 are the bulk of the writing work. Phase 4 is editorial.

## 14. Research gaps and open questions

Real gaps surfaced during the source review — listed so they don't quietly become folklore in our own platform:

1. **Mobify article (#4 of the source list) is unreachable.** `dev.mobify.com` returns ECONNREFUSED; `mobify.com` returns 403; archive.org is blocked from the agent environment. Will need direct retrieval (Wayback, author's republished version, or contact).
2. **Doherty & Thadani 1982 IBM technical report.** Cited everywhere; the actual document is harder to find than the secondary citations suggest. We have a candidate PDF host — needs verification.
3. **The 3-second abandonment number** circulates without a clean primary citation. Akamai/Forrester 2009 and Google/SOASTA 2017 are the likeliest sources; we should pick one and cite it precisely (or hedge).
4. **Skeleton screens "30 % faster than spinners"** is folklore. The peer-reviewed work (Bilal et al.) is more nuanced. We will cite it with the actual numbers, not the inflated blog-folklore figure.
5. **"Optimistic UI"** has no peer-reviewed paper specifically about it. We will frame it through Miller 1968 / Card et al. 1991 / Doherty 1982 — the underlying response-time literature — rather than as a standalone empirical result.
6. **Spinners "are bad"** is similarly imprecise. The literature says: indeterminate is better than nothing; determinate is better than indeterminate when duration can be estimated; *animation behaviour* matters more than the bar/spinner shape. We will write Pattern #5 (Spinners) accordingly.

### Resolved (2026-05-07)

- **Q1.** Concepts essay #1 stays bundled — JND-20 % rule and Eizenberg counter together.
- **Q2.** Chat scenario split into two — typing-time feedback (#15) and streaming response (#16). Subsequent scenarios renumbered 17–21.
- **Q3.** Skill page hosted demo — no for v1. Pure copy-button installation.
- **Q4.** Namco patent mention — stay neutral, no editorializing.
- **Q5.** Analytics — Vercel Analytics.

### Resolved (2026-05-07, second batch — AI scope)

- **AI scope.** Both apps consuming AI APIs and AI coding/agent tools (Claude Code, Cursor, Copilot, v0, Lovable) are in scope.
- **AI integration.** Tag-based, not a separate sidebar group — the underlying science (Miller, Card, Anstis) applies equally to AI surfaces. Five scenarios (#16, #21, #22, #23, #24) and four patterns (#21, #22, #23, #24) carry the `AI` tag. Two existing patterns (#2 Optimistic UI, #14 Engaging loading states) include AI-specific variants in their bodies.
- **Citation policy.** Widened to permit industry primary sources (Anthropic, OpenAI, Google DeepMind UX research; product team case studies; tool documentation) where peer-reviewed AI-UX literature is thin. All industry sources are labeled `industry` in the references panel so readers can distinguish them from peer-reviewed academic work.
- **Naming.** Specific products named in walkthroughs (Claude Code, Cursor, ChatGPT, Copilot, v0, Lovable) — readers think in tools.

## 15. Citation reference list (canonical sources)

The seed bibliography. Every claim on the platform anchors to one of these — or we hedge.

**Foundational HCI response-time research**

- Miller, R. B. (1968). Response time in man-computer conversational transactions. *AFIPS Fall Joint Computer Conference*, 33(I), 267–277. DOI: 10.1145/1476589.1476628.
- Card, S. K., Robertson, G. G., & Mackinlay, J. D. (1991). The information visualizer, an information workspace. *CHI '91*, 181–188. DOI: 10.1145/108844.108874.
- Card, S. K., Moran, T. P., & Newell, A. (1983). *The Psychology of Human-Computer Interaction*. Lawrence Erlbaum.
- Doherty, W. J., & Thadani, A. J. (1982). The Economic Value of Rapid Response Time. IBM Technical Report GE20-0752-0.
- Nielsen, J. (1993). Response Times: The 3 Important Limits. Excerpt from *Usability Engineering*, Ch. 5. Morgan Kaufmann.

**Progress indicators**

- Myers, B. A. (1985). The importance of percent-done progress indicators for computer-human interfaces. *CHI '85*, 11–17. DOI: 10.1145/317456.317459.
- Harrison, C., Amento, B., Kuznetsov, S., & Bell, R. (2007). Rethinking the progress bar. *UIST '07*, 115–118.
- Harrison, C., Yeo, Z., & Hudson, S. E. (2010). Faster Progress Bars: Manipulating Perceived Duration with Visual Augmentations. *CHI '10*, 1545–1548.

**Latency JNDs**

- Arapakis, I., Bai, X., & Cambazoglu, B. B. (2014). Impact of response latency on user behavior in web search. *SIGIR '14*, 103–112. DOI: 10.1145/2600428.2609627.
- Jota, R., Ng, A., Dietz, P., & Wigdor, D. (2013). How fast is fast enough? A study of the effects of latency in direct-touch pointing tasks. *CHI '13*, 2291–2300.
- Ng, A., Lepinski, J., Wigdor, D., Sanders, S., & Dietz, P. H. (2012). Designing for low-latency direct-touch input. *UIST '12*, 453–464.
- Deber, J., Jota, R., Forlines, C., & Wigdor, D. (2015). How much faster is fast enough? *CHI '15*, 1827–1836. DOI: 10.1145/2702123.2702300.

**Time perception and motion**

- James, W. (1890). The Perception of Time. *The Principles of Psychology*, Ch. 15.
- Ornstein, R. E. (1969). *On the Experience of Time*. Penguin Books.
- Block, R. A., & Zakay, D. (1997). Prospective and retrospective duration judgments: A meta-analytic review. *Psychonomic Bulletin & Review*, 4(2), 184–197.
- Anstis, S. M. (2001). Footsteps and inchworms: Illusions show that contrast modulates motion salience. *Perception*, 30(7), 785–794.
- Anstis, S. M. (2003). Moving objects appear to slow down at low contrasts. *Neural Networks*, 16(5), 933–938.
- Anstis, S. M. (2004). Factors affecting footsteps: contrast can change the apparent speed, amplitude and direction of motion. *Vision Research*, 44(18), 2171–2178.

**Industry primary sources** (all labeled `industry` in the references panel)

- Eli Fitch — *Perceived Performance: The Only Kind That Really Matters* (conference talk transcript). The platform's secondary anchor for predictive preloading, mousedown-vs-click, performance scaler, fancy hovers, and the Slack/FIFA examples.
- Eight pre-read articles (Marvel, Treehouse, KeyCDN, Mobify [pending recovery], Smashing, Coding Horror, NN/g, Eizenberg) — used as secondary citations when they trace cleanly to primary research.
- **Anthropic** engineering and UX research — Claude Code documentation, published skill files, agent-tool-transparency notes.
- **OpenAI** engineering and cookbook — published guidance on streaming UX, function calls, conversational latency.
- **Google DeepMind / Google Research** — UX-relevant publications on agent UX and conversational systems.
- **Product team case studies** — Cursor, GitHub Copilot, v0, Lovable engineering and design posts that document UX conventions on their AI surfaces.
- **Tool documentation that establishes a pattern** — Claude Code skill files, Cursor Rules, similar — cited where the documentation defines a UX convention rather than a feature.

---

*End of PRD v0.1.*
