# Persona: Ethan Brooks — Frontend Engineer

**Role:** Frontend Engineer at a product-led SaaS company  
**Experience:** 5 years building web applications  
**Primary tools:** React, Next.js, TypeScript, Tailwind, Framer Motion, Storybook, Vercel, Chrome DevTools, GitHub Copilot

## Background

Ethan builds user-facing interfaces for dashboards, onboarding flows, settings pages, search experiences, and data-heavy product screens. His team already tracks performance metrics such as Core Web Vitals, but users still complain that some parts of the product feel slow, blocked, or unresponsive.

He understands technical performance, but wants more practical guidance on how frontend implementation choices affect perceived speed. He is especially interested in patterns that make loading, saving, filtering, navigation, and background updates feel smooth and trustworthy.

## Goals

Ethan wants to:

- Understand how perceived performance differs from real technical performance
- Implement loading states that match different wait-time scenarios
- Choose between skeleton screens, optimistic UI, spinners, progress indicators, streaming, prefetching, and transitions
- Build reusable perceived-performance patterns into the frontend codebase
- Improve responsiveness without always relying on backend changes
- Use AI-assisted coding tools to generate better loading-state implementations
- Collaborate better with designers and product owners on performance-related UX decisions

## Pain Points

Ethan struggles with:

- Product requirements that say “make it feel faster” without clear implementation guidance
- Generic loading states that are reused in the wrong situations
- APIs that are sometimes fast, sometimes slow, and hard to design around
- Balancing polish, accessibility, maintainability, and delivery speed
- Knowing when to use optimistic updates versus waiting for server confirmation
- Making perceived performance patterns consistent across many components
- Explaining frontend UX trade-offs to non-technical stakeholders

## Motivation

Ethan wants the product to feel responsive, stable, and professional even when network conditions or backend responses are imperfect. He sees perceived performance as a frontend craft skill that combines engineering, interaction design, accessibility, and product thinking.

## Typical Use Case

Ethan visits the platform while improving a slow-feeling reporting dashboard. He compares demos for short, medium, and long waits, studies implementation examples, and adapts patterns like skeleton loading, optimistic filtering, background refresh, and progressive rendering into reusable React components.

## Quote

> “I can’t always make the API faster, but I can make the interface feel more responsive, honest, and useful while users wait.”

## Current task

Ethan is FE lead on the Reports squad at a financial-data product (sells to investment-research teams; reports run aggregations across multi-million-row datasets). The report-builder feature lets users drag fields into a layout and click "Generate". The actual generation runs server-side and takes 4–12 seconds depending on the report. Today the UI shows a centred spinner with the word "Working..." for the entire duration.

Customer Success has three open escalations this quarter. All three say the same thing in different words: "the report just hangs". Two of those customers tested whether the click registered by clicking again, generating duplicate jobs and getting an error toast that confused them further. The PM has filed it as a P1 bug for next sprint.

Ethan has one sprint — ten working days — and one engineer to do this. The engineer is him. The design system has a spinner component and nothing else. There is no skeleton component. There is no progress component. There is no streaming component.

What he needs to ship:

- Two or three React components that he can write, document in Storybook, and roll into the report-builder this sprint. Reusable so the rest of the org gets value too
- A pattern selection that doesn't require lying to the user about progress (the backend doesn't expose intermediate signal, so any "12% / 28%" UI would be fiction)
- React 19 compatible. TypeScript strict. No new runtime dependencies. The bundle is already too big
- `prefers-reduced-motion` honoured. Keyboard accessible. The product gets WCAG audited annually

What he needs *to write*:

- A 1-page pattern-selection rationale that explains why these specific components for this specific wait, with citations, so when the EM asks "why not just a better spinner?" the answer is in the doc and not in his head

## Sensitivities

Ethan uses GitHub Copilot for boilerplate and Claude Code for refactors. He likes both. He does not like AI-generated technical writing — he can spot it within a paragraph and most of his complaint is the same: it's confidently wrong about API surfaces and reads like a SEO blog post that mistakes itself for documentation. The MDN-style "this is what this thing does, with the gotcha that bit me last week" voice is what he trusts. The "in this comprehensive guide we'll explore..." voice is what he closes the tab on.
