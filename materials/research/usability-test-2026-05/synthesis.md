# Synthesis — five-persona usability test

> *This document compresses the five session writeups in this folder. The sessions are simulations in costume, not field data, so every finding here is a hypothesis to validate with real participants per the plan in `plan.md`. Confidence is qualified accordingly.*

## How to read this

Findings are organised by reach (how many participants surfaced the same issue), not by severity. A small detail that hits four out of five participants is more reliable than a major issue raised by one. Per-persona findings that did not generalise are kept separate at the bottom and are weakest-confidence.

Each finding is paired with a working hypothesis about *why* it appeared in the way it did. Recommendations follow.

## Five highest-confidence findings

### F1 — Pattern pages need a working code sample. *Reach: 4 of 5.*

Maya, Ethan, Alex said this explicitly. Sofia surfaced a related complaint (no gallery view of demos exercising a pattern) which has the same root cause: the Pattern page describes a technique and shows a single comparison demo, but does not offer a copy-pasteable implementation.

Mechanically, every participant who would actually *ship* code from this platform (Maya, Ethan, Alex) reported having to either: open the GitHub repo separately, infer the code from view-source, or re-implement from scratch. Daniel did not raise it because shipping code is not his job; if it were, he would have.

The gap is not subtle. It is the gap between "platform you read" and "platform you ship from", and right now the platform is more of the former than the latter.

**Hypothesis:** the absence of code is intentional — keeping Pattern pages framed as design / strategy artefacts rather than component libraries. If so, the *adjacent surface* is missing: a per-pattern "Implementation" page or a `<details>` block, kept visually subordinate to the framing prose.

**Recommendation:** Add a `<details>`-style code block at the bottom of every Pattern page. Open by default for power users (cookie-set). Include the React/TSX, the `prefers-reduced-motion` fallback, and the accessibility annotations. Three files per pattern at most. If full code is too much to maintain, link the source file in the repo at minimum.

### F2 — The recipe / ingredient / spice rack IA model works, but is taught by the layout, not the prose. *Reach: 3 of 5.*

Sofia, Maya, and Alex all derived the Scenario / Pattern / Playground relationship from the cross-link rails, not from any explanatory copy. All three said some version of: "once I noticed the rails, the model clicked, and I would put one explainer sentence on the Home page making this explicit". Daniel and Ethan did not raise this because they took the rails for granted — the model worked for them implicitly.

The cross-link rails are the platform's most underrated decision per Maya. Three participants made this comment unprompted. The platform earns credit on the design and pays a small comprehension tax on the framing.

**Hypothesis:** for someone arriving with a task (which is the entire audience for this platform), the IA needs a one-sentence frame in the first 5 seconds: *"Scenarios are recipes. Patterns are ingredients. Playground demos taste each ingredient on its own."* Or some variant. The current Home page tour-the-platform card describes each section but does not explain the *connection* between them.

**Recommendation:** One sentence on the Home page, prominent, between the hero and the Why-it-matters cards. Test the wording with the next research round.

### F3 — Mobile loses the side-by-side Off / On comparison. *Reach: 2 of 5 strongly, 2 of 5 weakly.*

Sofia and Maya flagged this as a real cost. Daniel and Alex noted it but accepted it. Ethan did not care. The side-by-side comparison is the platform's signature; on phones, demos stack vertically and the comparison reads as "two cards" rather than "before / after".

The home page hero perception demo is the exception — Off / On stay side-by-side at 375 px because the cells are content-light enough to fit. The Playground and Pattern-page demos are not.

**Hypothesis:** the mobile cost is structural — at 375 px no two-column comparison fits without making each column unreadable. The fix is not to force side-by-side; it is to *frame* the stacked comparison with a caption that names what the stack is doing. Right now a stacked Off / On reads as ambiguous; with a caption ("Top: Naive. Bottom: Tuned. Same wait, different filling.") it would read as a deliberate sequence.

**Recommendation:** Two changes. First, add an explicit "Naive ↑ Tuned ↓" caption between the panels on mobile only. Second, consider a horizontal-scroll comparison container with a snap point between Off and On for the Playground demos (lower priority, evaluate against effort).

### F4 — No business-case material and no industry comparables. *Reach: 2 of 5 strongly, 1 of 5 weakly.*

Daniel headlined this. Maya endorsed it for the Monday-crit context. Alex noted in passing that anti-pattern examples (the bad version) would be as useful as positive examples — same family of need.

Daniel's specific complaint is sharp: the platform offers Doherty 1982, Nielsen 1993, Harrison 2010, and a handful of other peer-reviewed citations. None of them attaches a number to a *modern* product context. A PO defending a sprint to a CFO needs "Stripe Connect onboarding does X, here's the measured outcome", not "IBM productivity studies from 1982".

**Hypothesis:** the platform is positioned as an academic-feeling reference, which is the correct positioning for the design / engineering audience but undersells itself for the PO / stakeholder audience. The fix is not to dilute the academic backbone; it is to add an adjacent layer of industry comparables that sits next to the citations rather than replaces them.

**Recommendation:** Add a small "In the wild" sub-section per pattern, linking to public examples (product blogs, public design system docs, video walkthroughs). One example per pattern is enough to start. Industry-comparable does not need a measured number to be useful — a screenshot of how Stripe handles a multi-step async server job moves the conversation more than a citation does, in a CFO room.

### F5 — "What to tune" is paragraph-buried inside Scenarios. *Reach: 2 of 5 strongly, implied by 2 more.*

Daniel and Sofia raised this directly. Maya and Ethan implied it (both pulled the named techniques from prose context, which is a small extraction tax). The "Built from" rail at the top of each Scenario gives the *list* of patterns; what's missing is a "What to tune" section that says, in 3–5 bullets, *which specific UI hooks* the named techniques attach to in this scenario's flow.

**Hypothesis:** the rail communicates relationship; the prose communicates reasoning. What is missing is the *recipe step*: "for the file-upload scenario, replace the spinner at second 0–1 with `<TrickleProgressBar />`, the empty state at second 1–10 with `<ContentTrueSkeleton />`, the post-completion banner with `<NotifyOnComplete />`". A short bulleted compose-list per scenario.

**Recommendation:** Add a "What to tune" sub-section near the top of each Scenario page (after the "Built from" rail, before the prose). Three to five bullets. Each bullet links to the relevant Pattern. Each bullet names the specific UI hook in this scenario's flow.

## Per-persona findings (lower confidence; one-participant signals)

These are findings from a single session each. Worth investigating in real research; not actionable on their own.

### Sofia — visual / framing badges per pattern

Sofia wanted a small badge on each Pattern indicating whether it is a visual treatment, a framing technique, or both. Skeleton screens are both; time-aware feedback is mostly framing; animated progress is mostly visual. She would pick patterns based on which lever she is pulling. Worth probing with one more participant from the design audience.

### Sofia — "Reset re-rolls; need a freeze button"

For screenshot-into-Figma workflows, the demos' Reset button re-rolls the seed instead of pausing the comparison at a chosen moment. A "freeze" or "snapshot at moment X" affordance would help designers extract before / after artefacts. Light effort, narrow audience.

### Ethan — no `useTransition` / `useDeferredValue` references in source

The platform's demo source uses standard React 19 patterns but does not lean on the concurrent-rendering APIs in places where they would be idiomatic (notably `/patterns/stale-while-revalidate`). For a React-19-aware engineering audience this is a small credibility cost. Worth a small refactor pass on a couple of demos.

### Maya — Four-time-bands cards do not deep-link

The four cards on the Home page describing the time bands (0–100 ms / 100 ms – 1 s / 1 – 10 s / 10 S+) are static. Maya expected them to deep-link to a filtered Playground view for that band. One-line fix; high return.

### Alex — AGENTS.md / CLAUDE.md template fragment

Alex specifically wants a worked AGENTS.md template combining the installed skill with project-specific style guidance. A single example would save several hours per builder. Niche audience but high-leverage for that audience.

### Alex — anti-patterns gallery

Alex's client said the prototype "looks chatGPTish". Alex wanted a gallery of anti-patterns named explicitly: "spinner without context", "blank card while loading", "abrupt content snap". Naming these would help builders recognise the problem in their own work. Possibly an essay or a small Concepts page rather than a Pattern page.

## Things the platform got right (preserve at all costs)

These are decisions that worked silently. Worth naming so they do not get changed in a future redesign without thought.

- **Seeded Off / On synchronisation in every demo.** Both panels mount with the same gamma-distributed timer. Multiple participants noticed this only by inference (Reset / observe / Reset / observe), and the discovery earned the platform's credibility. Maya and Ethan both said some version of: this is the only honest way to compare these. Do not change it.
- **The right-rail references panel that scroll-spies on inline citations.** Daniel called this out as the moment he started trusting the platform. Maya implied. Below the lg breakpoint the panel collapses to inline references at the bottom of the essay; the two patterns are honest with each other. Preserve both.
- **The cross-link rails (Built from / Used in / Appears in).** Three of five participants spontaneously noticed and praised this design. The model is communicated by the layout. Adding the explainer sentence (F2) makes this *more* visible without changing what is working.
- **The prose voice on the inside-the-platform pages.** Every participant in this round was sampled for AI-prose sensitivity. None flagged the Concepts essays, the Pattern pages, or the Scenario prose as AI-cadence. Two participants (Sofia and Alex) flagged the Home hero as right at the edge — see F6 below — but the deeper pages held up.

## F6 — borderline finding

The Home hero copy ("Learn how to engineer user experiences that feel fast") sits at the boundary of SaaS-landing-page cadence. Two participants noted it; both of them noted it as the *only* place on the platform where they had any AI-prose hesitation. Inside the platform the prose has more edges and reads as deliberately written. The mismatch between the front-door tone and the inside-the-rooms tone is the smell.

**Recommendation:** push the home hero half a step closer to the inside-the-platform tone. Concrete language change; light effort.

## Three changes to ship in priority order

1. **Code samples on Pattern pages (F1).** Highest impact across the audience that most directly converts to shipped work. Estimated effort: medium-high. Estimated impact: high.
2. **One-sentence IA explainer on Home (F2).** Lowest effort, broadest reach. Estimated effort: low. Estimated impact: medium-high.
3. **"What to tune" bullet list on each Scenario page (F5).** Closes the last 10 % of the recipe-vs-ingredient model. Estimated effort: medium. Estimated impact: medium.

The "industry comparables" sub-section per Pattern (F4) is a separate decision because it changes the platform's positioning slightly. Worth a separate scoping conversation rather than a tactical fix.

## Open questions for the next research round

These are the gaps where a five-participant simulation cannot give a confident answer.

1. **Does mobile horizontal-scroll comparison actually solve the F3 stacking issue, or does it introduce a different friction (gesture discovery, snap-point reliability)?** Build a prototype, test with two participants, commit.
2. **Would a PO actually trust an "in the wild" Stripe screenshot more than a Doherty 1982 citation?** Test with two POs from non-overlapping contexts. Daniel-as-costume said yes; one real Daniel could disagree, and that signal would change the recommendation in F4.
3. **Who is the Skill page audience when they arrive cold?** The current Skill page is intelligible to people who know what an "agent skill" is. Test with a Sofia-like participant who has heard of Claude Code but never installed a skill — does the page onboard them, or do they bounce?

These three questions are scoped to ~2-participant follow-ups each and would close the highest-uncertainty gaps from this round.

## What this study cannot tell us

- Whether the Skill installs cleanly across Cursor, Aider, Codex, or only Claude Code (separate technical test required).
- Whether the platform's citations are correct (separate research-rigor audit; spot-checks in this study were favourable).
- Whether any of the perceived-performance recommendations actually move user metrics in production (separate longitudinal study, not a usability test).
- Anything about visitors who are *not* in one of the five archetypes covered (e.g., an academic researcher, a CTO, a marketing lead). The personas were chosen deliberately; broadening will require a separate study.

End of synthesis. The session writeups in this folder are the source material; this document is the compression.
