# Persona: Alex Novak — AI-Assisted Coding User

**Role:** Product-minded builder using AI-assisted coding tools  
**Experience:** 3 years building web products, prototypes, and internal tools  
**Primary tools:** Claude Code, Cursor, Vercel, GitHub Copilot, ChatGPT, React, Next.js, Tailwind

## Background

Alex builds web interfaces quickly with the help of AI coding tools. They often create landing pages, dashboards, onboarding flows, SaaS prototypes, and product experiments.

AI helps Alex move fast, but the generated interfaces often use generic loading states, basic spinners, or no feedback at all. Alex wants better prompts, examples, and implementation patterns that help AI tools generate UIs that feel fast, responsive, and polished.

## Goals

Alex wants to:

- Understand perceived performance well enough to guide AI coding tools
- Use better prompts for loading states, transitions, skeletons, optimistic UI, and progress feedback
- Generate frontend code that handles different wait-time scenarios properly
- Avoid generic spinners and unclear waiting experiences
- Build interfaces that feel more professional with less manual refinement
- Learn reusable patterns that can be applied across projects

## Pain Points

Alex struggles with:

- AI-generated UIs that look complete but feel slow or unfinished
- Knowing how to describe perceived performance requirements in prompts
- Choosing the right loading pattern for each interaction
- Reviewing whether AI-generated loading states are actually good UX
- Creating consistent waiting experiences across pages and components
- Turning UX principles into concrete frontend implementation instructions

## Motivation

Alex wants AI-assisted coding to produce product-quality interfaces, not just functional screens. They see perceived performance as a way to make AI-generated products feel more thoughtful, reliable, and ready for real users.

## Typical Use Case

Alex visits the platform while building a SaaS dashboard with Claude Code or Cursor. They browse scenario-based demos, copy AI-ready prompts, and use implementation examples to generate skeleton screens, optimistic updates, progressive loading, and better delay feedback.

## Quote

> “AI can generate the interface fast, but I need to teach it how to make the product feel fast too.”

## Current task

Alex is contracting for a paying client — an early-stage productivity startup (5 people, pre-Series A, building a focus-time tracker that pulls from calendar + IDE telemetry). They are shipping the second prototype to a small set of design partners next week. Alex built the whole thing in Claude Code over the last two weeks. Vercel deploy. Next.js 16 / React 19 / Tailwind v4. Real customer data, not fixtures.

Load times across the prototype range from 800 ms (cached daily summary) to 3.5 s (weekly aggregation across two weeks of data). Every async surface currently shows the same `<Loader2 className="animate-spin" />` from lucide-react.

The client did a Loom yesterday with one comment that stung: "the loading bits look chatGPTish, can we make it look less generic". Alex showed it to a friend who is a senior designer and the friend said the same thing in slightly more diplomatic words. The product looks AI-built. The loading states are why.

Alex has four working days. They are working alone. They use Claude Code for everything that isn't design judgement, and Claude Code is currently producing exactly the generic loading states the client is complaining about. The instinct is to ship the polish pass *and* update their AGENTS.md / CLAUDE.md so future Claude sessions stop producing the same default.

What they need:

- A short list of pattern names matched to time bands they can paste into AGENTS.md, so when they say "skeleton this surface" Claude reaches for the right thing
- Working code examples per pattern that Claude can imitate. Not pseudo-code. Actual JSX they can hand to Claude as a few-shot example
- A way to teach Claude *not* to do what it does by default. Negative examples are as useful as positive ones for steering it
- An honest read on which patterns the client is going to think of as "less generic". The Loom comment was about *looking* less ChatGPT — the polish pass needs to land visually, not just behaviourally

## Sensitivities

Alex builds with AI all day and is grateful for it. They are also more sensitive to AI prose than almost anyone they know — they read it constantly and are tired of the cadence. The "comprehensive guide" / "key takeaways" / em-dash-every-clause / falsely balanced "X is great because A, B, C; however, you should also consider Y" rhythm reads to them as filler, and filler in a documentation source is a signal that the source itself was generated rather than written. They will close a tab fast. The reason this matters is practical: anything Alex pastes into AGENTS.md gets imitated by Claude in their actual product code, so a synthetic-sounding source becomes a synthetic-feeling product.
