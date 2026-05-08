# Session — Sofia Martinez, Product Designer

> *Heuristic walkthrough by Sofia-as-costume. Not field data. Useful as input to the protocol.*

**Task brought into the session:** The bulk-import flow handoff is Friday. Engineering put "spinner" in the JIRA acceptance criteria during my parental leave. I need to argue them out of it without being the difficult designer for the sprint.

**Device:** Laptop, 1440 × 900. Phone afterwards.

---

I want to be clear about what I came here for, because it shaped everything I read. I did not come here to learn perceived performance. I came here to find an argument I can use on Friday. The platform is clearly written by someone who knows the field. The question for me is whether it is also useful to someone who needs to *win an argument* in the field — those are different jobs.

The short answer is: yes, mostly. I am leaving with three quotes I can put in the spec, two named techniques per phase of the import flow, and a citation each that the engineering lead will not be able to dismiss. That is more than I expected. Where the platform fell short for me is on visual-comparison artefacts — I did not find a single before / after I could screenshot directly into the Figma file without recropping. That is solvable, but I was hoping the Playground would be the answer to that, and it almost is.

## How I read the platform

I went home → Concepts → Scenarios → Patterns → Playground, in that order. Roughly forty minutes. I was looking for vocabulary first, citations second, technique names third. I did not visit the Skill page, because it was clearly not for me — when I saw the install command on it, I confirmed I had read the room right and went back to Patterns.

The Concepts essay that did the most work for me was *"The anatomy of a wait"*. The four-phase decomposition (pre-action signal → response → animation → completion) is exactly the framing I needed for a 30-second-to-2-minute import. Engineering's "spinner" is a single visual that runs across all four phases. Pointing out that the four phases want four different cues is a way of arguing out of the spinner *without* arguing against the engineer's judgement. They put a spinner in JIRA because the spec did not give them anything else to put. That is on me. The four-phase model lets me put four things in there now.

The essay's voice helped. I read enough articles a week to know the difference between "this is what someone learned" and "this is what someone summarised about what someone else wrote". The anatomy essay is the first kind. I caught one sentence I will steal verbatim: *"The weakest phase is probably where your perception budget is being burned."* That is going in the spec.

## What I am putting in Friday's spec

In order of where they sit in the import flow:

**Pre-action and the first 100 ms — `/patterns/pre-action-feedback`.** When the user clicks Import, the button needs to register the press in the same animation frame, before any backend round-trip. The pattern page cites Fitch's mousedown research and gives a 100–150 ms median hold time as the budget for "I clicked but the click hasn't registered yet". I had not seen that number sourced cleanly before. It will be in the spec.

**Seconds 1 to 30 — `/patterns/skeleton-screens` and `/patterns/streaming-ssr`.** The import flow currently navigates to a "results" page that does not exist yet. We can stream the layout of that page in *as the import is processing*, with skeleton rows that match the table the user is about to see. The "content-true skeleton" framing on `/patterns/skeleton-screens` is the language I needed — generic blocks are honest about not knowing the shape of what is loading, content-true blocks tell the user the shape is known and the data is on its way. The Patterns page leans on Block & Zakay 1997 for "filled time has shorter retrospective duration than empty time". That is the citation. (Block & Zakay is also one of those names that I know engineers are more likely to take seriously than Norman or Krug — no shade to either, but the room is what it is.)

**Seconds 30 to 90 — `/patterns/animated-progress` and `/patterns/time-aware-feedback`.** This is the engaged-band middle of the wait. Harrison 2010's +12 % perceived speed-up from backwards-decelerating ribs is the citation everyone has heard if they have read anything; we do not have a determinate progress signal because the import time is variable, so the animated-progress treatment cannot use a real percent — but the Pattern page is honest about that and recommends a *time-aware* surface ("step 2 of 3: deduplicating") instead. That nuance is what I needed.

**Seconds 90+ (long-tail messy file) — `/patterns/engaging-loading` and `/patterns/background-sync`.** Past the 10 s wall the user's attention has left the tab. The Pattern page for engaging-loading is restrained about this — does not promise mini-games, does promise a way to give the user something to do or a way to free them. The right move for our case is probably background-sync: foreground the success state, let them go do other things, surface the result via a banner when they come back. I would not have proposed that on Friday without this page.

That is four bands × two patterns × one citation. It is more material than I expected. I came in worried I would have to either undersell the proposal or invent half of it.

## Where the cross-link IA earned the time it took to ship

I am the audience for this — somebody who needs to start at "the import flow" and end at "the named techniques for it". The Scenario page for `/scenarios/form-submission` (which is the closest match to my flow on the platform) opened with a "Built from" rail listing five patterns. I clicked through three of them in the next ten minutes. Then on each Pattern page I noticed the "Used in" rail at the top — and that is where it clicked. The Pattern is an ingredient, the Scenario is a recipe, and the Playground is where you taste the ingredient on its own.

That model is not in the prose, exactly. It is in the *layout*. I would put a one-sentence explainer on the Home page making this explicit, because I had to figure it out from the rails rather than be told. Worth saying aloud, because I think it is the platform's most underrated decision. Most of these sites bury this connection.

What I could not do was scrub through the demo comparisons on the Patterns pages without losing my place. The DemoRunner at the top of `/patterns/skeleton-screens` is good — same fetch, same gamma-distributed latency, naive blank-box on the left, layout-matching skeleton on the right. I clicked Reset four or five times. The thing I wanted next was to *pause* the comparison at a moment I could screenshot. The Reset re-rolls the seed; there is no "freeze" button. For a designer trying to put a side-by-side image into Figma, this is a real friction. I ended up taking a screenshot mid-animation that mostly captured the right moment.

## Where it failed for me

**No vocabulary for "this is the visual treatment, that is the framing technique."** I have a habit of asking: are we changing what the screen looks like, or are we changing what the user expects? Most of the patterns conflate these. Skeleton screens are both visual and framing. Time-aware feedback is mostly framing. Animated progress is mostly visual. I would have liked a small badge on each Pattern page — visual / framing / both — so I could pick patterns based on which lever I am pulling. As of now I have to make this judgement myself.

**The Playground "Appears in" strips do not link the right way for me.** When I am on a demo card and want to know which Scenario it lives inside, I get a chip. Good. But when I am on a Pattern page and want a *gallery view of every demo that exercises this pattern*, that view does not exist. The Pattern page shows one demo. I would have preferred a small "More demos" row below it linking into the relevant Playground demos with their thumbnails. I am going to need to send the engineering lead a slide of three skeletons side by side; right now I screenshot three demos individually and arrange them in Figma.

**"What to tune" inside scenarios is paragraph-buried.** I think Daniel and I will say the same thing on this. The named techniques are in the prose, not in a sidebar list. For a designer building a spec, they want to be in a sidebar list. That is on me to extract, but it is also a small platform fix.

**The prose is opinionated and that is a feature, except in one place.** The Home page hero copy reads as marketing. *"Learn how to engineer user experiences that feel fast"* — fine, but reads in the same cadence as a SaaS landing page. Inside the platform the prose has more edges. I would push the Home page tone closer to the inside-the-platform tone. Right now there is a smell-test mismatch between the front door and the rooms.

That is also where my AI-prose alarm twitched, faintly, but only on the home hero. Inside the essays I never thought it. The hero is one of those places where the temptation is to land safely; I would push it harder.

## Mobile

Twenty minutes on the phone. I re-ran the path: home → `/scenarios/form-submission` → `/patterns/skeleton-screens` → demo.

The mobile experience on the *prose* is excellent. The "Built from" rail wraps cleanly into a column of chips. The essay reads like a Notion doc opened on a phone. The references collapse to inline at the bottom rather than the right-rail panel — that is the right call.

The demo experience on mobile is where I think I would push back if I were running this study. The Off / On panels stack vertically. The signature visual of this platform — the side-by-side comparison — does not exist on phones. For the technique demos this matters less, because they are short and you can hold both in working memory. For the longer scenario demos (image gallery, file upload), the loss is real. I would consider a horizontal-scroll comparison container on mobile, with a snap point between Off and On. That would preserve the side-by-side framing without crashing into the 375 px width.

I also noticed that the perception-demo on the home page hero *does* render Off and On side by side at 375 px. I think that is because the cells are narrower-content (one avatar, two skeleton lines, no full-fledged demo). It works there because it is restrained. The Playground demos with more content do not get that luxury and probably need their own mobile-specific layout.

## What I'd actually do on Friday

I'm going to go in with a one-page spec annotation. Three columns: "Phase of the wait" — "What we are doing today" — "What we are proposing instead". Each row links to a feelsfast Pattern page. I will reference Block & Zakay, Harrison, and Fitch by name once each. I will not show the engineering lead the "Built from" rail, because that is for me, not for him — but I will use the recipe-vs-ingredient framing in the meeting if I have to.

The most useful thing the platform gave me is permission to argue from a literature, not from taste. I have done both kinds of designer-vs-engineer arguments and the literature-backed kind goes better.

## A note that won't fit anywhere else

I noticed the platform has an installable AI skill. I did not click into it. I would, eventually — not this week. If it ends up being a way to give Cursor or Claude a vocabulary that matches what is in this site's Patterns, I would absolutely use it next quarter when we pull this work into the design system at the component level. The fact that the platform comes with an "instruct your AI to think this way" artefact is interesting on its own, even if it is not why I came here.
