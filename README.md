# feelsfast

> Educational platform on perceived performance — concepts, interactive scenarios, research-backed patterns, and an installable AI skill, for Product Designers, Design Engineers, and Frontend Engineers.

**Live (when launched):** [feelsfast.fyi](https://feelsfast.fyi)
**PRD:** [PRD.md](./PRD.md)

## Why this exists

Web performance literature is bottom-heavy on metrics and top-heavy on motivational hand-waving. The middle layer — *how a site is perceived to behave in time* — is treated as folklore. feelsfast pulls the canonical thresholds (Miller 1968; Card et al. 1991; Doherty 1982; Nielsen 1993), the patterns that exploit them, the interactive demos that let you feel the difference, and an AI skill into one place.

Read [PRD.md](./PRD.md) for the full plan: information architecture, content catalog (24 scenarios + 24 patterns), visual system, citation policy, and roadmap.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui
- MDX for content
- vitest + prettier
- Vercel hosting + Vercel Analytics

## Develop locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — local development with Turbopack
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — eslint
- `npm run test` — vitest
- `npm run format` — prettier write

## License

- **Code:** [MIT](./LICENSE).
- **Content** (essays, patterns, scenarios): CC-BY 4.0 — added under `content/LICENSE` once content drafting begins.
