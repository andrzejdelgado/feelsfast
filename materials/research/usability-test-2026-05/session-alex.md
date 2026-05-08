# Session — Alex Novak, AI-assisted builder

> *Heuristic walkthrough. Alex-as-costume. Not field data. Treat as a pre-mortem for the actual run.*

**Task:** Four days. Solo. Polish the loading states on a prototype I built in Claude Code for a paying client (productivity-app startup, 5 people, design partners ship next week). Client's Loom yesterday: "the loading bits look chatGPTish". I need:
1. Prompts I can paste into AGENTS.md so Claude stops reaching for the same default
2. Working JSX that the client and I can both look at and say "less generic"
3. To not be the source of more chatGPTish prose myself

**Stack:** Next.js 16, React 19, Tailwind v4, lucide-react, deployed on Vercel.

---

ok session log, roughly chronological. starting at 14:11 monday

---

**14:11 — landing**

home page first. immediate read: this is not chatGPTish. the hero is a *working* perception demo with a 2.7s comparison. that one detail does more for trust than any amount of "in this comprehensive guide" copy would. the cadence of the home prose is hand-written. variable sentence length. opinions ("the modern reading turns the variable around"). nobody who has ever asked an LLM to write a SaaS landing page got that sentence back.

three browser tabs open. another one is the actual prototype repo. third is claude code with my repo loaded. context.

**14:14 — sidebar**

home / skill / concepts / scenarios / patterns / playground / glossary / references. clean. the "NEW" badge on Skill is the right call for me — i would have gone there first anyway but the badge confirmed it.

**14:16 — skill page**

this is the page. install command is `npx skills add andrzejdelgado/feelsfast`. there's also a direct-download option for agents that don't run skills. and the *raw skill source is on the page* under a Source heading. that is the move. before installing i want to read what i'm going to be installing into my agent's prompt.

**14:18 — reading the skill source**

skill source is markdown. couple thousand words. i'm reading for two things: does it sound like a person wrote it (or like an AI wrote it telling other AIs how to be less AI), and does it have the right level of specificity to actually shape claude's behavior.

reads like a person wrote it. there's an actual opinionated take in here ("no spinner under 1 s"). it tells the agent what to do and what not to do, in the same paragraph. the bands are framed clearly. the patterns table at the end is the kind of thing claude will reach for as a few-shot example. this will work.

i copy-pasted the install command. ran it in the prototype directory. it dropped into `.agents/skills/`. fine.

**14:31 — testing the skill**

i opened claude code in the prototype repo. skill is auto-detected. asked it: "the dashboard at /app/today loads in 1.8 s. add a perception-performance treatment." it produced a content-true skeleton component + a `useDeferredValue` for the data layer + a `prefers-reduced-motion` fallback. cited the skill. cited feelsfast.fyi by URL.

before installing the skill i had asked the same prompt and gotten a generic `<Loader2 className="animate-spin" />` and a TODO to "improve later". that is the comparison. the skill works.

i'm going to keep the skill installed and write up a short AGENTS.md addendum so my future runs default to checking the skill first before generating any loading state.

**14:48 — patterns**

now i'm reading patterns properly because i need to understand which ones to *add* to my AGENTS.md as project-specific defaults.

the page i spent the most time on: `/patterns/skeleton-screens`. demo at the top, off vs on, layout-matching skeleton on the right. i've been writing skeleton components for years and i have always done generic block skeletons. the "content-true" framing on this page is genuinely new to me. ngl this is the single thing i'm taking back to the prototype tomorrow morning. content-true skeleton for the day-summary card is going to look so much less generic.

**15:02 — image patterns**

`/patterns/image-progressive-loading` was good. there are two demo variants in the playground — the LQIP one and the predominant-colour one. i didn't realise how much of the chatGPTish look on my prototype is *the empty grey square waiting for the avatar to load*. the dominant-colour-then-fade pattern is what every native app does and what every AI-built web prototype skips. fixing this is going to land visually for the client.

i can't do the upload-time predominant-color extraction this sprint because the prototype's data is real and i don't own the upload pipeline. but i can ship a runtime version that pulls the dominant color client-side via canvas the first time, caches in indexeddb, and hits the network only on cache miss. couple hours of work tomorrow.

**15:14 — playground**

filtered to "0–100 MS" because that band has the optimistic-flip and pre-action-feedback demos. these are the two patterns the prototype is missing entirely. heart-flip on the like button. icon-flip on the bookmark. mousedown-not-click on every nav target. each is a micro-tweak that compounds.

filtered to "1 – 10 S". this is where my prototype mostly lives (the dashboard reload, the search, the focus-time aggregation). every demo here is candidate copy material. not literally — i'm not cargo-culting the JSX — but pattern material.

the ai-related demos in the 1–10 S band are interesting because my product *is* an AI-adjacent product (calendar+IDE telemetry analysis). the thinking-gradient demo. the three-dot-bounce. the pulsing orb. these are the "chatGPTish" bits the client called out, by name. it matters that the platform has *opinions* about these — they are not all interchangeable.

the platform's preference, reading between the demos: thinking-gradient > pulsing-orb > three-dot-bounce, when you have AI context to reveal *as* it streams. when there is no streaming and the AI is just thinking, the orb wins. when the surface is small and aesthetic-restraint-budget is low, the three dots are honest. that hierarchy is not stated explicitly anywhere and i had to derive it from spending five minutes with each demo.

**15:31 — i did the cross-link thing**

every demo card has an "Appears in" strip linking to the relevant scenario(s) and pattern(s). i clicked one. it took me to the pattern page. the pattern page has "Used in" rails linking to scenarios. the scenario pages have "Built from" rails linking back to patterns. i went around this loop three times.

the IA model is recipe / ingredient / spice rack. once you see it, every page makes sense. it's not stated on the home page in those words. it should be. i'd add a sentence to the home tour. but the layout itself communicates the model after about ten minutes of poking.

**15:48 — concepts (skim)**

i am not going to read every concept essay. i don't have time. but i sampled "the anatomy of a wait" because daniel and sofia are both probably going to cite it (vibes from the prose: this is the essay people will steal a sentence from). it is a four-phase framework — pre-action / response / animation / completion — which maps cleanly onto a `useEffect` + state-machine in react. tomorrow i'll write that mapping into AGENTS.md as a comment so future claude runs structure their loading state machines the same way.

**16:04 — what i'm putting in AGENTS.md**

draft, will refine tomorrow:

```
## perceived performance

we install the feelsfast skill into .agents/skills/. before generating
any loading state, async surface, or wait UI, claude must:

1. classify the wait into one of the four bands:
   - 0–100 ms: optimistic / pre-action / direct-manipulation
   - 100 ms – 1 s: indeterminate active cue (no claim of progress)
   - 1 – 10 s: content-true skeleton OR shimmer OR top-edge trickle
   - 10 s+: engaging / branded / hand-off-to-background

2. for each band, prefer the patterns named in the skill source.

3. NEVER ship `<Loader2 className="animate-spin" />` as the only
   loading affordance for a 1+ s wait. the spinner is acceptable
   for the 100 ms – 1 s band only, and only if no determinate
   signal is available.

4. always honour prefers-reduced-motion. always include aria-busy
   on the parent of any loading region.

5. when explaining a choice in a comment or commit message, link
   the relevant pattern URL on feelsfast.fyi.
```

that's the kernel. i'll iterate.

**16:18 — prose check**

ok meta thing. i was watching the platform's prose for AI tells the entire time. one twitch on the home hero ("Learn how to engineer user experiences that feel fast") — that sentence is right at the line where SaaS marketing copy lives. but every step deeper into the platform the prose got more opinionated, not less. by the time i was reading "anatomy of a wait" i was no longer flagging anything.

the reason this matters for me is *practical*: i copy-paste from this site into AGENTS.md, and AGENTS.md gets read by claude, and what claude reads it imitates. if the site sounded like ChatGPT, my prototype's comments would sound like ChatGPT, my client's Loom would still complain. it doesn't, so they won't.

**16:31 — what's missing**

things i wanted and didn't find:

1. **a "claude.md / agents.md template"**. the skill is good. but a *worked example* of an AGENTS.md fragment that combines the skill with a project-specific style guide would save me two hours. half my prompt-engineering is figuring out how much context to give claude before it starts being useful.

2. **before/after JSX for patterns**. ethan and maya will say the same thing. each pattern page should have a `<details>` block with the JSX. for me specifically: i would also love the *bad* version — what claude would generate by default, side-by-side with the recommended version. negative examples teach claude as well as positive ones.

3. **a way to filter patterns by stack**. tailwind / framer motion / vanilla css. i ended up on patterns that assume CSS keyframes are fine, which they are for me, but if i were a framer-motion-only shop i would want to know which patterns translate cleanly.

4. **a small "anti-patterns" gallery**. the chatGPTish thing the client called out is real and has tells: spinner-without-context, blank-card-while-loading, "loading..." text with no animation, abrupt content-snap. naming these in a small page would help me identify them in my own prototype faster than vibing.

**16:42 — mobile pass**

phone test. on the bus simulation (15 minutes, distracted, one-handed).

home page reads. sidebar nav opens as a sheet, hamburger top-right. fine. playground demos stack the Off / On comparison vertically — for my use case (skim while distracted), this is fine because i'm not really comparing carefully on a phone anyway. for sofia and maya it's a real loss but for the way *i* actually use the platform on mobile (verifying a reference name, screenshotting a chip, copying a pattern URL into a slack DM), the mobile experience is fine.

skill page on mobile: install command wraps onto two lines. i tapped Copy. command copied intact. no soft-wrap artifacts. tested by pasting into a different note. clean.

**16:51 — done**

going to start tomorrow with two things:

1. install the skill (already done)
2. polish pass:
   - day-summary card → content-true skeleton
   - calendar list → shimmer skeleton (if matching content-true is too expensive given the source data shape)
   - focus-time aggregator (the slow one) → top-edge trickle bar + status line
   - avatar list → predominant-colour client-side cache
   - any 100 ms – 1 s wait → mousedown-not-click + optimistic flip wherever applicable
3. push AGENTS.md update so future claude runs default to these
4. record a loom for the client showing before / after

**trust signal**

i would send the platform link to two people:
- the friend i mentioned in the persona file (senior designer who said the prototype looks AI-built). she's going to want to keep this URL on hand.
- two other indie builders i know who ship vercel prototypes. they will all bounce off the academic-ness *unless* they install the skill first. that is the order.

**closing**

the platform's bet is that the audience can be fluent in the literature *and* the implementation. i think the bet pays off for me. for the average vercel-prototype builder it pays off only if they install the skill. without the skill, they'd skim home, skim playground, get the vibes, leave with nothing pasted into anything. with the skill, claude becomes the bridge between the literature and the prototype, and that's the version of this platform that actually ships changes into other people's products.

ok bed.
