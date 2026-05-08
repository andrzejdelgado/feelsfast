# Persona: Daniel Weber — Product Owner

**Role:** Product Owner at a digital product company  
**Experience:** 6 years in product ownership and agile delivery  
**Primary tools:** Jira, Confluence, Miro, Figma, Productboard, Google Analytics, Vercel Analytics

## Background

Daniel owns a customer-facing web product used by thousands of users each week. His team monitors performance metrics, conversion rates, support tickets, and user feedback, but he often sees a disconnect between technical performance scores and user satisfaction.

Even when the product performs reasonably well on paper, users may still describe it as slow, unclear, or frustrating. Daniel wants to understand how perceived performance can improve user experience, retention, and business outcomes without always requiring major backend investments.

## Goals

Daniel wants to:

- Understand why perceived performance matters for product success
- Prioritize UX improvements that make the product feel faster
- Translate perceived performance issues into backlog items
- Choose the right loading and feedback patterns for key user journeys
- Align designers, engineers, and stakeholders around performance-related decisions
- Measure the impact of perceived performance improvements on user behavior

## Pain Points

Daniel struggles with:

- Deciding whether performance issues are technical, design-related, or both
- Justifying perceived performance work against feature delivery pressure
- Turning vague user complaints like “it feels slow” into actionable tasks
- Estimating the business value of better loading states and feedback
- Communicating performance priorities to non-technical stakeholders
- Avoiding quick fixes that create inconsistent UX across the product

## Motivation

Daniel believes that users judge product quality by how the experience feels, not only by what metrics report. He wants the product to feel responsive, trustworthy, and professional at every step of the journey.

## Typical Use Case

Daniel visits the platform while preparing a roadmap discussion about improving activation and retention. He uses the educational content to understand perceived performance principles, reviews scenario-based demos, and turns relevant patterns into backlog items for designers and frontend engineers.

## Quote

> “When users say the product feels slow, I need to understand what that means, why it matters, and what my team can actually do about it.”

## Current task

Daniel owns the Onboarding product at a payments company (small-business merchant onboarding; the surface where new merchants connect a bank account, configure payouts, and toggle which payment methods they accept). The product has a "save settings" flow that runs validation, an external KYC check, and a settings write across three internal services. End-to-end it takes 7–10 seconds in p50 and shows a spinner labelled "Saving" for the whole thing.

CSAT for that specific page dropped from 4.4 to 3.9 last quarter. Open-ended responses cluster around two themes: "I clicked Save and didn't know if it worked" and "the Save button just sits there forever". Some users click Save again, which is harmless on the backend but gets logged as a duplicate intent in their analytics.

The QBR is in eleven days. The CFO's specific words last quarter, paraphrased and forwarded to Daniel by his director: "if we're spending an engineering sprint on UX, attach a number to it". Daniel has been told he can have one sprint to fix this if he can defend it. He cannot have backend changes; the KYC vendor is not in scope.

What he needs to walk into the QBR with:

- A one-page memo that says: this is the problem, this is the size of the problem, this is the proposed change, this is what we expect to move on it, here is the evidence the change works
- Three concrete backlog tickets engineering can pick up without further design — a determinate-style progress treatment, a status-line that explains *which* of the three steps the system is currently doing, and a success state that acknowledges the save with more than the spinner just disappearing
- One or two citations the CFO would accept as not made up. Doherty 1982 and Nielsen 1993 are the names he keeps hearing in the design-system Slack channel; he wants to know what those actually say so he doesn't get caught quoting them wrong
- A measurement plan. If they ship this, what does success look like? CSAT? Duplicate-save rate? Time-on-page? He needs to commit to a metric before the sprint starts or the CFO will pick the metric for him

## Sensitivities

Daniel uses ChatGPT to draft first passes of QBR memos and reads the output before sending. He has caught himself sending AI-cadence prose more than once and watched the room glaze over. He is now hyper-aware of the tells — the listicle structure, the "key takeaways" bullets at the end of every section, the bland adjectives ("comprehensive", "robust", "powerful"), the symmetric "while improving X, we also need to consider Y" hedging. If a source he wants to cite reads that way, he assumes it's content marketing rather than research and finds another source.
