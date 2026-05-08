# Session — Ethan Brooks, Frontend Engineer

> *Heuristic walkthrough. Ethan-as-costume. Not field data.*

**Task:** Ten working days. One engineer (me). Two or three reusable React components for the report-builder feature. Reports take 4–12 s. Three open CS escalations on "the report just hangs". Currently `<Loader2 className="animate-spin" />` and the word "Working...".

**Stack constraint:** React 19, TS strict, Tailwind v4, no new runtime deps, `prefers-reduced-motion`, WCAG audit annual.

**Device:** Laptop only this round. Phone tomorrow on the bus, separate notes.

---

## Outcome

Walked in at 9:14. Left at 9:51. Found two of the three components I need. Did not find the third. Have enough to start writing code today. The 1-pager rationale will write itself once the components are in Storybook.

What I am building this sprint, in priority order:

1. `<TrickleProgressBar />` — Top-edge NProgress-style bar. Trickles to ~95 % over the first ~1.8 s, holds while a primary-coloured gradient sweeps inside it, snaps to 100 % on completion. Pulled directly from `/patterns/animated-progress` and `/patterns/time-aware-feedback`. Demo on `/playground` (filter: 100 MS – 1 S, "NProgress trickle bar") works exactly the way I want it to.
2. `<ContentTrueSkeleton />` — Layout-matching skeleton for the report-builder result page. Will use the same shape data the report renderer uses, so the skeleton geometry is data-driven. `/patterns/skeleton-screens` covers the framing; demo at `/playground` ("Content-true skeleton") is the visual reference. Passes through to a CSS variable for the muted color so the animation isn't expensive.
3. `<RunStatusLine />` — Multi-step progress indicator. "Reading data → aggregating → rendering". Three steps. Live region. This is the one I did not find a clean reference for and will have to compose from `pre-action-feedback` + `time-aware-feedback` + my own taste. Acceptable.

## What I went to first

`/playground` directly. Sidebar nav. Clear. Filtered to "1 – 10 S" because that's where my reports live. Twenty-ish demos. Each demo has Run / Reset buttons and "Appears in" chips below. Useful.

I did not read the Home page. I did not read the Concepts essays. I might have if I'd been less pressed for time. As shipped, the Concepts work is *required* if you want citations to defend a pattern choice — which I do, for the 1-pager — but it is *optional* for picking a pattern. I appreciated that.

The Off / On comparison is the right framing for an engineer. I do not need a paragraph telling me a skeleton is better than a blank wait. I need to see them next to each other, on identical timing. The seeded synchronization (both panels mount with the same gamma-distributed timer) is the right call — the only honest way to compare.

I clicked Reset on every demo I cared about, two or three times each, to verify the Off and On animations actually finish at the same wall-clock moment. They do. That detail is what made me trust the platform's own implementations. If they had drifted by even half a second I would have closed the tab.

## What I trusted

The Patterns pages are where I picked components. Three things made them readable:

- **Demo at the top of the page.** I do not have to scroll to find out what the pattern looks like. `/patterns/skeleton-screens` puts the comparison in the first viewport.
- **Citations as inline pills.** `[Block & Zakay 1997]` appearing in the prose without breaking flow. I clicked one to see what happened. Right-rail panel scrolled to the matching entry. Acceptable.
- **The "Used in" rail at the top of every Pattern.** I went `/patterns/skeleton-screens` and saw it lists ten Scenarios. Confirmed the pattern is general enough to ship in our design system, not just for my specific feature. That maps onto a real engineering question — "is this generic or one-off" — without anyone having to ask it.

The cross-link from a Playground demo card *back* to the Pattern page is what I'll use for the 1-pager. Click the chip, paste the URL into the doc, done.

## What I did not trust or got annoyed at

**No code.** This is the headline. Every Pattern page describes the technique. Some show a demo. None of them show the implementation. I had to open `view-source` on the Playground page and find the demo's component path (`src/demos/technique-shimmer-skeleton/tuned.tsx` — the URL slugs let me guess where they live in the repo on GitHub). For a design-engineer-focused platform, fine. For me, that was an extra step I did not expect to take.

If there is a v0.10 roadmap, "code-on-pattern-page" is the single highest-leverage addition. A `<details>` block per pattern with a copy-pasteable React/TSX implementation, accessibility notes, and the `prefers-reduced-motion` fallback. That is the lift between "platform I read" and "platform I ship from".

**Skill page is for AI agents, not me.** I read the install command. `npx skills add andrzejdelgado/feelsfast`. Useful for someone running Claude Code as their primary editor. I run Cursor with Copilot autocomplete; the skill probably installs into Cursor too but the install instructions are framed around Claude Code first. This is a small thing. I would lead with "any agent that reads markdown skills" before the Claude-specific install. The page does say that, but the visual hierarchy puts Claude first.

**The "Glossary" entries are useful and almost discoverable.** I did not click into the Glossary until I was forty minutes in. When I did, "perceived performance" was a short paragraph. I would add a glossary term *to every Pattern page sidebar* — three to five linked terms, on the right rail. Right now the glossary lives by itself.

**Real-time-updates demo Off panel does nothing visible until events arrive.** Filed mentally as a small thing. The empty Off panel does not communicate "events are coming, the system is just being honest". On a phone it could read as "the demo broke". Probably worth a one-line "(Naive panel intentionally empty)" caption or a `aria-live="polite"` placeholder text.

## On `prefers-reduced-motion`

Spot-checked. Set my OS to reduced-motion, reloaded `/playground`. Spinner demo: spinner stops spinning, gets a static placeholder. Shimmer demo: keeps the gradient as a static fill, no sweep. NProgress trickle: stops the gradient sweep, holds at the trickle width. All correct. Some demos still have small transitions that could be tightened — the icon-flip demo had a brief opacity transition I could see — but nothing breaking. This is a passing grade for an annual WCAG audit. I will copy the motion-reduce conventions into our design system.

## On the React-19-ness

Looked at one demo's source by URL pattern. `useEffect` with seed-keyed deps for re-mount on Reset. Standard. Nothing here uses `useTransition` or `useDeferredValue` in places I would want to see them used (`/patterns/stale-while-revalidate` is a candidate). Not a blocker — the demos are about visual/perceptual patterns, not React-specific concurrent-rendering patterns. But for the 1-pager I will note that the pattern of "render stale content immediately, refresh in the background" maps onto `useDeferredValue` cleanly, and that mapping is mine to write.

## What's missing for my specific task

The component I cannot find a reference for is the multi-step status line. ("Reading data → aggregating → rendering"). The platform has all the building blocks — pre-action-feedback for the click, time-aware-feedback for the "step 2 of 3" framing, animation-timing for the transitions between steps — but no composed example. Daniel will run into the same gap; the form-submission scenario also has a multi-step async server job and the "what to tune" section in the prose does not give a worked example.

This is fine. I will compose it. But for the platform: a small "patterns combine" gallery, three or four common compositions, would close this gap. Multi-step server job. Cancellable streaming. Optimistic-with-rollback. Each one is two or three named patterns combined, with a worked demo.

## Mobile (next morning)

Re-ran on phone (375 × 812).

- Off / On panels in the Playground stack vertically. For my use case (engineer scanning for a component to ship) the stacking is acceptable; I am reading them sequentially anyway. For Maya or Sofia it is a real loss.
- The "Appears in" chips wrap into multiple rows below each demo card. Tappable targets are large enough to hit at thumb-distance.
- Hamburger nav opens a sidebar sheet. Standard. Sidebar items have icons. Fine.
- The right-rail references panel is gone on mobile, replaced by the inline references list at the bottom of essay pages. The lg breakpoint cutoff was the right call. (Spot-checked one essay; the inline list renders.)
- The Skill install command wraps onto two lines on mobile. The Copy button stays on the right. Fine. I copied it to verify the clipboard hit; the command came out intact, no soft-wrap artifacts in the clipboard payload.

One small thing: tapping a "Pattern" chip in the "Appears in" strip on mobile sometimes scrolled the page rather than navigating. Could have been my fat thumb. Worth verifying with a real device.

## Trust signal

I will send this to two people. The other FE on my team (because she is going to implement the next perception-perf component after this sprint and I am not going to re-explain Block & Zakay to her). And our designer counterpart on the Reports squad — same reason as Sofia would; she is going to build the spec for the *next* slow surface and the framework here will save her a week.

## What I leave with

Two named components, one citation each, two demos worth screenshotting into the 1-pager. The component I have to compose myself is the third one and that is normal. The platform did its job for me; the only blocker on shipping is the lack of code samples on the Pattern pages, which I worked around. Worth fixing for the next person.
