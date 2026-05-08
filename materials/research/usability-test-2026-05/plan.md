# Usability test — feelsfast.fyi

**Status:** Plan, ready to run with real participants
**Author:** Research lead (notes for whoever is moderating)
**Drafted:** May 2026
**Builds on:** v0.9 of the platform (cross-link rails between Scenario, Pattern, and Playground shipped)

This is the plan for a five-session moderated usability study of feelsfast.fyi. It is paired with five simulated walkthroughs in the same folder (`session-*.md`) — those are a pre-mortem in costume, not field data. Read the plan first; the simulated runs are useful as input to the protocol but should not be cited as findings.

## 1. Why we are running this

The platform's audience is five distinct roles. They each arrive with a different urgency, a different vocabulary, and a different definition of "useful". The site's information architecture — Concepts, Skill, Scenarios, Patterns, Playground, Glossary, References — was designed top-down from the literature, not from any of those roles. We have no evidence yet that the IA reads the way each role needs it to read in the moment they actually need it.

The triggering question is concrete: when a Product Designer or Frontend Engineer or PO arrives with a real problem at work, can they extract what they came for inside one session, without bouncing? If the answer is no, *where specifically* does the bounce happen — is it the IA, the prose voice, the demo selection, the citation density, or something else?

## 2. What we want to learn

Five things, in priority order.

1. **Wayfinding under task pressure.** Each participant arrives with a real assignment. Do they end up on the surface that actually answers their question, or do they get stuck on a surface that is adjacent to their question?
2. **Whether the cross-link IA is doing work.** The Scenario / Pattern / Playground triple was redesigned recently to thread together with "Built from" / "Used in" / "Appears in" rails. Does the model click — does the participant articulate the recipe-vs-ingredient relationship without prompting?
3. **Citability.** Each task ends with the participant having to defend their direction to someone (PM, EM, CFO, client). Does the platform produce material they would actually paste into a deck, ticket, or prompt? What survives the trust check?
4. **AI-prose detection.** Every participant in this round is a sensitive reader of synthetic prose. Do any of them flag any of the platform's own prose as AI-cadence? If so, where, and what cost does that have?
5. **Mobile experience.** A subset of these tasks happen on phones (commute reading, on-the-go validation, last-minute QBR prep in the cab). Does the layout hold up at 375 × 812 — both for reading and for the side-by-side demo comparison that is the platform's signature?

We are not measuring conversion to skill install, or time-on-page, or any analytics metric. This study is qualitative.

## 3. Method

Moderated remote, screen share, think-aloud. Sixty minutes per session.

Two devices in scope: laptop (1280–1920 px wide) and phone (375 × 812). Each participant runs the *same* core task on both. The phone half is twenty minutes; the laptop half is thirty; ten minutes of warm-up and debrief.

Recording: video + audio + screen, with explicit consent. Notes captured live by the moderator into a shared doc. No automated transcription tool that re-uploads to a third-party service (one of the participants is a privacy-sensitive PO at a payments company; this constraint applies to all sessions for consistency).

## 4. Participants

Five participants, one per archetype defined in `materials/user-personas/`:

| # | Archetype | Role |
|---|-----------|------|
| 1 | Sofia Martinez | Product Designer at a B2B SaaS, mid-market |
| 2 | Maya Chen | Design Engineer at a SaaS company building data-heavy product |
| 3 | Ethan Brooks | Frontend Engineer / FE lead, product-led SaaS |
| 4 | Daniel Weber | Product Owner at a company with a customer-facing web product |
| 5 | Alex Novak | Product-minded builder using AI coding tools, contracting |

We are not testing with newcomers to perceived performance as a topic — every participant has heard the phrase, has a working theory of what it means, and has at least one current problem at work where they suspect the topic applies. This is deliberate. The platform is for people who already feel the gap; testing with people who do not feel the gap would tell us nothing about whether the platform helps.

### Screener (5 questions)

1. Have you ever shipped or designed an interface that you later wished felt faster, even though the metrics said it was fine? **(Required: yes.)**
2. In the last six months, have you read any of the following: Nielsen Norman, Vitaly Friedman, Apple HIG, Material Design, Anthropic UX docs, an internal design system spec on loading states? **(Required: at least one.)**
3. Are you currently working on something where you suspect a perceived-performance change would help? Describe it in two sentences. **(Required: a credible answer.)**
4. How would you currently react if a friend pasted you the URL `feelsfast.fyi`? **(Used to calibrate first-impression bias.)**
5. On a scale of 1–5, how often do you spot AI-generated prose in articles you read for work? **(Used to flag participants who score themselves 4 or 5; see §9 risks.)**

## 5. Tasks

Three core tasks every participant runs, then two persona-tailored tasks.

### Core tasks (run by every participant)

**T1 — First-five-minutes test.** Land on the homepage cold. Speak aloud. After five minutes, stop. Write one sentence: "this site is for X people who want to do Y". *(Probes initial framing of the platform's purpose.)*

**T2 — Cross-link traversal.** Open `/scenarios/file-upload-single`. Find a *named pattern* you would apply, navigate to its dedicated page, then navigate to a Playground demo that exercises that same pattern. Tell me what you would copy from that demo into your own work. *(Probes whether the Scenario→Pattern→Playground IA is intelligible as a model.)*

**T3 — Defensibility.** Pretend you are presenting your task's recommendation to your PM (or EM, CFO, client) tomorrow. Find one citation on the platform you would put in your deck. Find one quote you would put in a Slack thread. Find one piece of code or one demo screenshot you would attach to a Jira ticket. *(Probes whether the platform produces "load-bearing" material under task pressure.)*

### Persona-tailored task (one per participant)

The participant brings their *own* current work assignment (captured in their persona file, §"Current task"). The task is: produce the deliverable they actually owe their team this week, using only the platform plus their normal note-taking tools.

Output types vary by persona:

- Sofia: a one-page argument for her Friday handoff
- Maya: a pattern recommendation per dashboard card type, plus one prototype implemented in her stack
- Ethan: pseudo-code (or real code) for two reusable React components, with a 1-page rationale
- Daniel: a 1-page QBR memo with citations and three backlog tickets
- Alex: an updated AGENTS.md / CLAUDE.md fragment plus three before/after JSX snippets

The participant is allowed to copy, paste, and screenshot freely. They are *not* allowed to consult any other source during the test — only the platform plus their own brain. (After the session, they are explicitly told they should consult other sources before shipping. We are testing the platform, not their delivery.)

### Mobile sub-task

Each participant repeats one self-selected sub-task on their phone, with the laptop closed. Twenty minutes. The sub-task is whichever of T1–T3 they thought *most* needed re-running, plus any portion of their persona-tailored task they could plausibly do on the bus.

## 6. Protocol per session

Sixty minutes, structured.

**Warm-up — 5 min.** Confirm consent, recording, screen share. Confirm the screener answers are still true today. Ask one off-topic warm-up question (e.g., "what's the worst loading state you have seen this week?") to drop performance anxiety.

**T1 — 5 min.** First-five-minutes test. Moderator stays silent except to remind to think aloud.

**T2 — 10 min.** Cross-link traversal. Probe gently when the participant pauses for more than 8 seconds; do not lead.

**T3 — 10 min.** Defensibility. The probes here are: "would you actually paste that?", "what would your PM say if you cited that?", "is the prose voice doing or undoing your case?".

**Persona-tailored task — 20 min.** Participant works through their current assignment. Moderator asks at minute 10: "are you finding what you came for, or are you working around something missing?".

**Mobile sub-task — 5 min.** Repeat one sub-task on phone.

**Debrief — 5 min.** Two questions:
1. "Imagine you are recommending this to one colleague. Who is it, and what do you say?"
2. "What would you change first if it were your call?"

## 7. Scoring

Three metrics per task. Filled in by the moderator immediately after each session, before listening back to the recording.

- **Task success.** 0 = bounced / gave up; 1 = completed with significant work-around; 2 = completed cleanly. Five tasks × five participants = 25 datapoints.
- **Trust signal.** A binary flag, set if the participant *spontaneously* says any version of: "I would actually use this", "I'd send this to [colleague]", "this is going in my [doc/deck/Jira]". Counted across the session, not per task.
- **Friction surface.** Free-text. Where did they slow down. Specific surface and specific element. We expect three to seven of these per session.

We are not running SUS. Five participants is too few for a SUS score to mean anything, and the platform's audience is too heterogeneous (a 75 SUS for Daniel and a 75 SUS for Alex would not be comparable in any case).

## 8. Schedule

| Day | Activity | Owner |
|---|---|---|
| Day 0 | Plan signed off | research lead |
| Day 1–4 | Recruitment, screener pass | research lead |
| Day 5 | Pilot session (one participant, results discarded except for protocol fixes) | moderator |
| Day 6–7 | Sessions 1–5 | moderator |
| Day 8 | Synthesis day. Session videos rewatched in full only if needed | research lead + 1 designer |
| Day 9 | Findings presented to platform owner | research lead |
| Day 10 | Roadmap conversation | platform owner |

Two-week window total. The pilot session matters; the protocol above is theoretical until at least one real person has gone through it.

## 9. Risks and what we are not testing

**Risk: small-n self-pollution.** With five participants, one outlier dominates. We mitigate by reading findings against the participant's own task, not against an aggregate. If only one participant struggled to find Patterns from Scenarios, that is a signal worth investigating but not a finding to act on by itself.

**Risk: "I have heard the term" framing in the screener.** A participant who has read one Vitaly Friedman article and a participant who has run an internal study on loading states will both pass the screener. We accept this; the persona files draw the distinctions.

**Risk: AI-prose detection bias.** Every participant in this round, by design, can spot AI prose. This is a sampling choice, not a representativeness statement. Findings about the platform's voice from this study should not be projected onto a broader audience without further work.

**Not testing: SEO, browser compatibility, deep dives on individual demo correctness, the install flow for the Skill (we treat Alex's session as a partial probe of that, not a full study of it), accessibility (separate WCAG audit covers that — see `materials/research/a11y-audit-*.md` if it exists, otherwise out of scope).**

## 10. Output

A short synthesis report (`synthesis.md` in this folder) covering:

- The five highest-confidence findings, ranked by how many participants they affected
- Per-persona findings that did not generalise, with a note on why
- Three concrete platform changes ranked by expected impact and cost
- Three open questions worth probing in a follow-up round

Plus the five raw session writeups (`session-*.md`), one per participant, lightly edited for clarity but kept in the participant's voice. Quotes preserved verbatim. No "the user said" framing — the writeups read as the participant's own notes from their session.
