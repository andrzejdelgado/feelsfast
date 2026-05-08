# Session — Daniel Weber, Product Owner

> *This is a heuristic walkthrough by Daniel-as-costume, not field data. Treat as pre-mortem. The plan in this folder is what to run with the actual person.*

**Task brought into the session:** Build a one-page case for the QBR in eleven days. The Onboarding "save settings" flow shows a 7–10 s spinner. CSAT for the page is at 3.9, down from 4.4. CFO has said any UX-only sprint needs a number attached. Cannot touch the KYC vendor or any backend.

**Device:** Laptop (1440 × 900), then phone (375 × 812).

---

## TLDR

I would walk into the QBR with this site backing me up, but only on roughly half the points I need backing on. The Concepts essays gave me citations I can use without embarrassing myself. The Patterns pages gave me names for the things I want to do. The Playground let me show what the change looks like, which is going to matter more than the citations when I'm in the room with M. (the CFO).

What I did not get from the platform: numbers. I have a CSAT delta of 0.5 and I am supposed to project what a perception change might move. The platform tells me what good looks like and why, but it does not tell me "expect a 3–7 percentage-point lift on task-success rate" or anything I could put a confidence interval on. I will need to source that elsewhere or commit to a measurement plan rather than a projection. That is the headline gap.

The site does not read as AI-written. I noticed because I was watching for it; the prose has the kind of opinionated edges that AI prose smooths out. Good. That made me trust the citations more than I would have otherwise.

## Bottom-line for the QBR

What I am putting in the memo, in order:

1. The problem statement, citing Doherty 1982 (the platform's "Why does it matter?" section gave me the stat: 400 ms response cliff, IBM productivity study, n is large enough for a CFO to not raise an eyebrow).
2. The Nielsen 1993 0.1 / 1 / 10 s thresholds. Our 7–10 s save flow sits in the second-worst band — past the 1 s flow break, approaching the 10 s attention wall. That is the sentence I will read out loud.
3. The proposed change — three of them, drawn from the Patterns I navigated to: a determinate-style progress treatment (`/patterns/determinate-progress`), a status-line that explains *which* of the three steps is currently running ("validating ↓ checking KYC ↓ saving"), and a success affordance that does more than make the spinner disappear.
4. A measurement plan. We commit to CSAT, duplicate-save rate, and a small qualitative read. We explicitly do not commit to a projection — I am going to say to M., "we don't have an internal benchmark, here are the comparable industry findings, and we will measure it before / after."

If M. asks why we are not picking the Harrison 2010 backwards-decelerating progress bar (the +12 % perceived speed-up — the platform mentions it three times, fairly), the answer is: that finding is for a *single* progress bar of fixed length. Our flow has three sequential server-side steps, so the framing is closer to a multi-step progress + status-line case. The Patterns page for animated-progress (`/patterns/animated-progress`) actually concedes this in its prose — I appreciated that.

## What worked

**The Concepts → References path is the first thing I trusted.** I went Concepts → "How humans perceive time" → looked at the right-rail references panel. It listed the actual papers (Block & Zakay 1997, Ornstein 1969). The references panel scrolls in lockstep with the citations in the body, which I clocked because I was reading and looking up papers at the same time. That is the experience I would want from any research-cited resource. Whoever built that panel has read research-cited resources before.

I cross-checked one citation against my own memory (Nielsen's three thresholds) and the platform got it right. That matters. The amount of "cited" content on the open web that paraphrases Nielsen wrong, or attributes the thresholds to the wrong paper, is non-trivial. This site got it right on the first try.

**The Scenarios page mapped onto a real product surface I could point at.** When I landed on `/scenarios/form-submission` and saw "Built from: Animated progress, Determinate progress bars, Optimistic UI, Pre-action feedback, Time-aware feedback" in a single rail at the top, the recipe-vs-ingredient model I have been trying to articulate for my team finally had a name. I am stealing that framing for the memo.

**The Playground is where I will get the screenshot for the Jira ticket.** I filtered to the 1–10 S band and the 10 S+ band. Four demos jumped out as relevant to my flow: `Notification on complete`, `Branded story sequence`, `Determinate progress bars`, and the "trickle bar" / NProgress one. The Off / On comparison reads instantly — I did not need to read any prose to understand which side of the comparison was the recommendation. The "Appears in" chip strip below each demo took me back to the Patterns and Scenarios pages I had just been on. That is loop closure.

## Where I slowed down or got annoyed

**No numbers I can defend in a CFO room.** I will say this twice because it is the headline. Doherty's productivity-cliff stat is the only finding on the platform with a clean number attached, and it is from 1982 in a context (mainframe transaction processing) that my CFO is going to be too smart to let me wave around as a direct comparable. Harrison 2010's +12 % is great but it is not for my exact case. Everything else is qualitative.

The platform should consider: a small "industry comparable" section per pattern. Stripe's Connect onboarding does X. Linear's command palette does Y. With percentages or measured load times if possible. I would walk into the QBR with a Stripe screenshot faster than I would with any number that came from a 40-year-old paper.

**The Skill page exists and I could not figure out who it is for.** I looked at it because the sidebar item has a "NEW" badge and I assumed it was the most important page on the platform. Then I saw "npx skills add andrzejdelgado/feelsfast" and bounced. I do not run npx commands. That is fine — clearly the page is not aimed at me. But the Home page promises me Concepts, Patterns, Scenarios, Playground — and a Skill, with no preceding context. The first time I see "Skill" with a NEW badge I assumed it was the new educational unit, not a thing I install in my coding agent. I would suggest the homepage tour-the-platform card for Skill names *who* it is for. Maya and Alex would feel seen by this page; I felt accidentally onboarded onto a page that is not for me.

**The "What to tune" sections in scenarios are buried.** I went looking for what specifically to recommend — what the engineer should actually build — and found it inside paragraph six of `/scenarios/form-submission`. It is in there, but it is not pulled out as a list. I would put a "What to tune" subsection in every Scenario page, three or four bullets, with each bullet linking to the Pattern. The "Built from" rail at the top goes 90 % of the way; a "What to tune" bullet list would close the last 10 %.

**The Glossary did not help me defend.** I went looking for "perceived performance" as a term I could quote in the memo and the Glossary entry is a paragraph, not a sentence. A PO writing a QBR is going to lift the first sentence and put it in a footnote. The first sentence currently is: *"The gap between what the clock says about a wait and what the user feels about it."* That is good. I would put it on the page in larger type. As of right now I had to scroll-find-and-quote-extract.

## Mobile (twenty minutes on phone)

I re-ran the Concepts → essay → references-panel path on my phone in a coffee shop simulation (kettle on, family in the next room, three browser tabs open — my normal QBR-prep state). Findings:

- The right-rail references panel is *not* on mobile. It is replaced by the inline "References" list at the bottom of the essay, which is fine because I scrolled there anyway. The two patterns are honest with each other.
- The mobile sheet for the sidebar nav is good. Hamburger top-right, sheet slides in, NEW badge on Skill, current section highlighted.
- The Off / On demo comparison on mobile *stacks vertically* — Off on top, On below. For the Playground demos this is a real cost. I lost the simultaneity of the comparison; reading "On is better than Off" required me to scroll between them. On the home page hero demo it works because Off is empty (a deliberate void) and the contrast is obvious. For something like the shimmer-skeleton comparison, stacking removes the *whole point* of the demo.

If you are not going to fix the stacked-on-mobile issue, you should at least caption each demo so I know what I am supposed to be seeing. As of right now the Off / On stacks read as "two cards", not "before / after".

## Outstanding questions before the QBR

Things I still need that the platform did not give me:

- A Stripe / Notion / Linear / Square comparable for the multi-step async-server-side-job pattern I am about to recommend. Probably I'll find this in product-team blog posts.
- A worked example of a "did the click register?" affordance for a button that takes 7 s to complete. The platform's `pre-action-feedback` pattern is about the *first* 100 ms; my problem is about minute one of the wait, not millisecond one of the wait. There is a vocabulary gap here.
- A measurement plan template. Not the platform's job, probably, but I would have liked one.

## Trust signal

I would send the platform link to two people on my team this week: K. (my director, who is going to want to read the same Concepts essays I just did before signing off) and L. (my designer counterpart, who is going to use it as a reference doc more than as reading material). I would not send it to M. (the CFO) — the prose is too good for him; he wants slides with numbers, not essays with citations.

## Closing thought

The platform punches above its weight on craft and undersells itself on business case. A PO walking in cold is going to want one more layer of "here's what changed when somebody shipped this" before they fully bet a sprint on it. Right now I am betting a sprint anyway, but I will be honest in the memo about where the platform's confidence ends and mine begins.
