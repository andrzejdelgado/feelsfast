# Session — Maya Chen, Design Engineer

> *Heuristic walkthrough. Maya-as-costume. Not field data — the actual person will react to different details than I will here.*

**Task:** Workforce-analytics dashboard redesign at Roster Analytics. Eight KPI cards, end-to-end load 1.6–3.2 s with a long tail past 5 s. NPS dropped fourteen points. Three weeks. Design crit Monday morning. Need a defensible per-card recommendation, a working React prototype for the two slowest cards, and one citation that gets the room to stop debating whether the problem is real.

**Stack:** Tailwind v4, Framer Motion, React 19, no new deps.

**Device:** Laptop primarily. Phone in the evening for one extra pass.

---

I went through the platform twice. The first pass was reading. The second was *implementing alongside* — I had a fresh Vite + React 19 sandbox open in another tab and was rebuilding pieces I liked. That changed my reading. Some patterns I read past on the first pass turned out to be the most ship-worthy; others that read well as prose turned out to be harder to translate than the writing implied.

This is going to be the longer session writeup of the five. Apologies. The crit is Monday and I am organising my thinking on the page.

## What I am taking into Monday's crit

A pattern recommendation per card type, a working prototype, a citation, and an opening sentence I can use to defuse the "this is just vibes" reaction from the lead engineer. Specifics:

**Per-card recommendations**

- *Headline KPI cards (4 of 8 — single big number with delta)*: Animated number counter, ~700 ms count-up from zero on load, ease-out cubic. Pulled from `/playground` ("Animated number counter") + `/patterns/animated-progress`. The count-up reframes the static result as a discovery. I implemented it in the sandbox; Framer Motion's `useMotionValue` + `useAnimate` does it in twelve lines. Reduced-motion check honoured by reading `useReducedMotion()`.
- *Trend cards (2 of 8 — sparkline + label)*: Content-true skeleton on first load (sparkline-shaped placeholder), then a brief opacity fade to the real path. From `/patterns/skeleton-screens` ("content-true" framing) + `/patterns/skeleton-screens` shimmer. The platform does the right thing of distinguishing simple block / content-true / shimmer / pulse — I am picking content-true + shimmer for these.
- *Tabular cards (1 of 8 — small table of 5–7 rows)*: Skeleton rows that match the final row count and column widths. Same pattern.
- *The slow card (1 of 8 — attrition forecast, 3–8 s)*: This is the one. Top-edge NProgress trickle bar, *plus* a "step X of Y" status line ("Reading historical data → projecting → rendering"). Composed from `/patterns/animated-progress` + `/patterns/time-aware-feedback`. The platform does not have a demo of these two combined; I built a quick one in the sandbox.

**The citation for the room.** Block & Zakay 1997 — "filled time has shorter retrospective duration than empty time". This is the sentence that ends the "is the problem real" debate, because the lead engineer respects citations he can look up. Block & Zakay is referenced on `/concepts/how-humans-perceive-time` and on `/patterns/skeleton-screens`. I can drop the citation in the deck and link the essay if anyone wants to dig.

**Opening sentence.** "Lighthouse can't measure the felt duration of the wait, but the wait is what NPS is reacting to." I am crediting the *spirit* of that sentence to the platform's "What is perceived performance?" section on the Home page, which makes the same point in slightly more academic language. Mine is shorter and tuned for an engineering audience.

## Hands-on with the demos

This is where the platform earned the Monday-crit win. I opened `/playground` and worked through the 100 MS – 1 S and 1 – 10 S bands one demo at a time. Reset / observe / Reset again / observe again.

The seeded synchronisation is the right call. I clocked it on the third Reset of the shimmer-skeleton demo — Off and On always finish at the same wall-clock moment. That is the *only* honest way to compare these. The platform respects the user's intelligence on this and I noticed.

The shimmer-sweep on the skeleton demo: I poked at it for a while. The sweep moves left to right, the dark band crosses each block in sync. Pulled the source. It is a `linear-gradient(90deg, var(--muted) 0%, color-mix(...) 50%, var(--muted) 100%)` with `backgroundSize: 200% 100%` and an animated `background-position` keyframe. I am stealing the technique and the timing (1400 ms cycle). The fact that all blocks share the same animation cycle (synchronised — they all hit the dark band at the same horizontal moment) is what makes the demo feel deliberate. I had this wrong in my head; my instinct was to stagger. Synchronised reads as one wait, staggered reads as many waits. The platform got it right.

The animated-counter demo has a detail I appreciated. The Off side does not snap to 847 the moment data lands; it holds "—" until the On side's count finishes, then both reveal at the same moment. That is integrity — it would have been lazy to let Off win the comparison just by snapping faster. I checked the source: the Naive timeout is `seededGamma(seed, 600) + 700` (load + count-duration). The On side does the same total time, just with the journey filled. Apples-to-apples. Good.

I stayed on the trickle-bar demo for a while because that pattern is the one I am going to use most. The bar trickles to 95 % over the first ~1.8 s, holds at 95 % with a gradient sweep inside the filled portion, then snaps to 100 %. The framing is "the user reads 'almost done' early, and the remaining wait is interpreted as polish rather than absence". I will lift that sentence into the Monday deck verbatim if I can.

The pulsing-orb demo and the three-dot-bounce demo are aesthetically related but signal different things. Both are correct for the AI thinking band. Neither is right for my dashboard. (The platform does not claim they are; my task does not need them.)

## What did not translate easily

The "Predominant-colour image" pattern is beautiful and only partially what we ship. We use real product avatars on tabular cards. Those have predominant colours, but pulling the dominant colour and inlining it as a 1×1 base64 LQIP at upload time requires a backend change we don't have time for in this sprint. The platform's pattern is honest about this — "cheap to inline as a 1-pixel data-uri at upload time" — but for our case it is a future-quarter thing. Filed for later.

The branded-image-skeleton demo is closer to what we will ship for empty-image states. The wordmark-instead-of-empty-box framing is the one I like. The platform uses "feelsfast.fyi" as the wordmark in the demo; we would use our own. Not a blocker, just noting.

The notify-on-complete demo is great in principle but we do not have a notification surface in the dashboard and adding one is out of scope. Future quarter.

## Code quality from the platform's own implementations

I read the source of four demos. Notes:

- Tailwind v4 idioms throughout (`@theme inline` in `globals.css`, custom utilities). Matches our setup.
- No Framer Motion in the source I read. Animations are CSS keyframes plus React state for phase transitions. That is a deliberate choice, I think — keeps the runtime cost predictable. I am going to mirror this in the prototype I bring to crit, *then* upgrade to Framer Motion only where I need composability or gesture support.
- `motion-reduce:animate-none` applied consistently on every animated element. Not just on the wrapper. I had been doing this less rigorously; will fix.
- Seed-keyed re-mount via `key={`naive-${runId}`}` is a clean React-19-friendly way to reset internal state without managing it from above. I will use this idiom in the prototype.

I am not going to copy the demo code wholesale — these are the platform's *exhibits*, not its components. I will compose my own component using the demos as visual reference. But seeing the source is what made me feel like the platform is built by someone who would actually have to ship this code, not just write about it.

## Where the platform tripped me up

**The Pattern pages do not give me enough working code.** Same observation as Ethan, I imagine. The demos show *what*; the prose explains *why*; the gap between them is *how*. For a Pattern page like `/patterns/animated-progress` I would put a `<details>` open / closed code block with a copy-pasteable React TSX. Maybe with a small toggle: "JS-only version" / "Framer Motion version" / "vanilla CSS version". Even if the code block was just a link to the source file in the repo, that would close the loop.

**No "patterns compose" gallery.** My slow-card design needs trickle bar + status line composed. The platform has both as separate patterns. I had to build the composition myself, which is fine — but I would have valued a "compositions" section, three or four common combinations, with a demo each. Multi-step server-side jobs are a common shape. So is "skeleton → real content → animated counter on the headline number".

**The home page Four-time-bands cards do not deep-link.** I am on the Home, I see the "1 – 10 S Engaged wait" card, I want to click it and land on the Playground filtered to that band. Can't. The card is not a link. (I checked.) I would make it one.

**The Glossary entry for "perceived performance" is the only one I felt under-served by.** Most other entries are tight. The headline term is a paragraph; I wanted the one-sentence version up top in larger type. Daniel will say the same thing in his session.

**The cross-link rails are the platform's most underrated decision.** Built from / Used in / Appears in. The model — recipe vs ingredient vs spice rack — is communicated *by the layout*, not by the prose. Once I noticed it I could not stop noticing it. I would, like Sofia, put one explainer sentence on the Home page making it explicit. Right now it rewards the visitor who has time to figure it out; on Monday with a full schedule I would not have time to figure it out.

## Mobile (evening)

Phone, 375 × 812. Re-ran the path: home → `/playground` → counter demo → animated-counter pattern page.

The Off / On stacks vertically on the demo. For the counter pattern I think it actually *helps* on mobile — because the count-up is the whole thing, and you read it sequentially in time anyway. Off snaps to 847; On counts up to 847. Stacking does not lose that. For the shimmer-skeleton it would, because the shimmer's whole pitch is the parallel comparison.

The Pattern page mobile experience is excellent. The "Used in" chips wrap. The prose flows. The demos render. The references collapse to inline. I am taking this as a tactical decision for our redesign too — content-first on mobile, panels-second-when-they-fit on desktop.

## What I would add to the platform if I had a day

In order of expected impact:

1. Code samples on every Pattern page. Either inline `<details>` or a "Source" link to the repo file. Single highest-leverage change.
2. A "patterns compose" mini-gallery, three or four worked compositions.
3. Make the Four-time-bands cards on the Home page deep-link to the Playground filter.
4. One sentence on the Home explaining the Scenario / Pattern / Playground recipe-ingredient-tasting model.
5. The Glossary first-sentence treatment for "perceived performance".

## Trust signal

I would send this to my lead engineer specifically. He is the one who said "vibes" and the one I need on side by Monday. The Concepts essay on "the anatomy of a wait" is the page I would put in the Slack DM. Not the Home page; not the Skill page. The essay. He will read it because it is short and well-cited, and that is enough.

## Closing thought

This platform is what I wish I had written internally for our last redesign and didn't have time to. The fact that someone else did the work means I get to skip the synthesis phase and go straight to making the dashboard better. That is the highest compliment I have for any reference resource: I would, after this Monday's crit, link to it as the canonical thing rather than redoing my own version.
