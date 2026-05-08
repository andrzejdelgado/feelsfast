# Persona: Maya Chen — Design Engineer

**Role:** Design Engineer at a fast-growing SaaS company  
**Experience:** 5 years in product design and frontend development  
**Primary tools:** Figma, React, Next.js, Tailwind, Framer Motion, Vercel, Claude Code

## Background

Maya works on product onboarding, dashboards, and data-heavy user interfaces. Her team already optimizes technical performance, but users still complain that the product “feels slow” during loading, saving, filtering, and navigation.

She wants to understand how to design interfaces that feel responsive even when real loading time cannot be fully eliminated.

## Goals

Maya wants to:

- Understand the difference between **real performance** and **perceived performance**
- Learn which UI patterns work best for different wait times
- Choose between skeletons, spinners, optimistic UI, progress indicators, transitions, and placeholders
- Improve user trust during loading, saving, and error states
- Use AI-assisted coding tools to implement better loading experiences faster

## Pain Points

Maya struggles with:

- Knowing when to use a spinner versus a skeleton screen
- Making slow API responses feel less frustrating
- Explaining perceived performance decisions to PMs and engineers
- Finding practical examples instead of abstract UX theory
- Implementing polished loading states under tight deadlines

## Motivation

Maya believes performance is not only a technical metric. It is part of the user experience. She wants users to feel that the product is fast, reliable, and thoughtfully designed.

## Typical Use Case

Maya visits the platform while redesigning a dashboard that takes several seconds to load. She explores interactive demos for short, medium, and long wait times, then uses code examples and AI prompts to implement skeleton loading, optimistic updates, and progressive disclosure in her product.

## Quote

> “I don’t just want the app to be faster. I want it to feel faster, clearer, and less frustrating for users.”

## Current task

Maya is leading the redesign of the workforce-analytics dashboard at Roster Analytics, a 120-person HR-analytics SaaS. The dashboard is the product's most-used surface — eight KPI cards that each hit a different downstream API. End-to-end load is gamma-distributed between 1.6 s and 3.2 s, with a long tail past 5 s when one of the slow services (attrition forecasting) is involved.

Last quarter the dashboard's NPS dropped fourteen points. The qualitative comments are unambiguous: "feels broken", "I don't know if it's loading or hung", "wait, did it work?". Lighthouse is green. Core Web Vitals are green. Maya knows the gap is perceived, not measured.

She has three weeks until the redesign ships. Her PM keeps using the word "delight" without saying what it means. Her lead engineer thinks perception work is "vibes" — he has said this in standup, more than once. She has a design crit on Monday and needs to walk in with a position.

What she needs to walk out of crit with:

- A defensible recommendation for which loading pattern goes on which card type, broken out by time band
- A working in-React prototype for at least the two slowest cards, so the lead engineer can see it run on actual data and stop calling it vibes
- One to two citations she can drop into the deck so the room stops debating whether the problem is real

She wants implementations she can ship in Tailwind v4 + Framer Motion against a React 19 codebase. No new dependencies. Reduced-motion support is non-negotiable; the company sells to enterprise HR teams and accessibility comes up in every procurement review.

## Sensitivities

Maya uses Claude Code and ChatGPT every day, so she is not anti-AI. She is fluent at recognising AI-generated *writing* — em-dash overload, the "in this guide we'll explore" cadence, balanced "while X, on the other hand Y" hedging, the four-bullet summary at the bottom of every section. The moment a doc smells synthetic she stops reading and bins the source. If she's going to cite something at design crit, the prose needs to read like a human wrote it on purpose.
