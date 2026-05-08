# Persona: Sofia Martinez — Product Designer

**Role:** Product Designer at a B2B SaaS company  
**Experience:** 4 years in UX/UI design  
**Primary tools:** Figma, FigJam, Notion, Linear, Maze, ChatGPT, Vercel previews

## Background

Sofia designs user flows, dashboards, onboarding experiences, and feature interactions for a complex web product. Her team tracks technical performance metrics, but she often notices a gap between what the metrics say and how users describe the experience.

Users sometimes say the product feels slow, confusing, or unresponsive, even when the actual loading time is acceptable. Sofia wants to understand how design decisions can make waiting feel shorter, clearer, and less frustrating.

## Goals

Sofia wants to:

- Understand the difference between **real performance** and **perceived performance**
- Learn how loading states affect user trust and confidence
- Choose the right UX pattern for different wait times
- Design better empty states, skeletons, progress indicators, and transitions
- Communicate perceived performance decisions to PMs and engineers
- Add perceived performance principles to her design system

## Pain Points

Sofia struggles with:

- Knowing which loading pattern is appropriate for each scenario
- Designing for slow states before engineering begins implementation
- Explaining why a spinner may not be enough
- Balancing visual polish with product deadlines
- Making complex workflows feel responsive and predictable
- Finding practical examples made for product teams, not only engineers

## Motivation

Sofia believes that speed is not only about milliseconds. It is also about clarity, feedback, and user confidence. She wants users to feel that the product is responsive, reliable, and thoughtfully designed.

## Typical Use Case

Sofia visits the platform while designing a new analytics dashboard. She explores demos for short, medium, and long wait times, compares skeleton screens with progress indicators, and uses the examples to create better loading-state designs in Figma.

## Quote

> “I want users to feel like the product is working with them, not making them wait without explanation.”

## Current task

Sofia is the lead designer on the new bulk-import flow at her legal-ops SaaS company (around 60 people, sells to in-house legal teams at mid-market enterprises). The flow imports customer-record CSVs, typically 2,000–8,000 rows. Validation, dedup against existing accounts, and insert run server-side in a single async job. Total time depends on file shape: 30 seconds for a clean small file, almost two minutes for a messy 8k-row file with conflict resolution.

She is shipping the v2 spec on Friday. Engineering wrote "spinner" into the JIRA acceptance criteria during sprint planning, while she was on parental leave. She has read the spec and there is no other loading treatment proposed. A single spinner from second 0 to second 90+.

Sofia knows this is wrong but she also knows how that argument lands. The lead engineer on this team is sharp and protective of his sprint commitments. If she shows up Friday saying "the spinner is wrong" with no alternative and no evidence, she will be the difficult designer slowing the sprint down. She has done that before. It does not work.

What she needs by Friday:

- Vocabulary she can use to point out *which* second of the wait the spinner stops being acceptable, so the conversation stops being "you don't like spinners" and becomes "this is a 90-second wait and the literature on engaged-band waits says X"
- Two or three named techniques she can put into the spec, each tied to a part of the import flow's timeline (the first ten seconds, the engaged middle, the past-the-wall tail)
- One citation per technique. If she can drop names — Nielsen, Miller, Doherty, Harrison, anyone the engineering lead would recognise as not made up — the conversation gets easier
- A short comparable. "Stripe does this when you import 10k charges" carries more weight than any abstract argument

She does not need a Figma file by Friday. She needs the *argument* by Friday. The Figma file follows once the eng team agrees it is worth doing.

## Sensitivities

Sofia uses ChatGPT to draft first passes of UX copy and to summarise long PMs' Slack threads. She knows what its prose sounds like. She is allergic to that voice in anything she would cite at work — the hedging, the four-item summaries, the "Furthermore" / "Moreover" sequencing, the symmetric pro/con framing of every choice. If a source reads like ChatGPT, she assumes it was written for Google rankings rather than for designers and stops trusting its specifics.
