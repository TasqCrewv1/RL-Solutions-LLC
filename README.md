# RL Solutions

Premium general contracting website for **RL Solutions** — *A Problem Solving Company* — serving Delaware and Southeastern Pennsylvania.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- React Hook Form + Zod
- Decap CMS (`/admin`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Decap CMS (local)

```bash
npx decap-server
```

Then visit [http://localhost:3000/admin](http://localhost:3000/admin).

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — lint

## Content

Editable CMS content lives in `content/`:

- `content/settings/homepage.json` — homepage hero, trust stats, why-choose, estimator copy
- `content/testimonials/` — reviews
- `content/gallery/` — project gallery items
- `content/faqs/general.json` — FAQs
- `content/blog/` and `content/case-studies/` — future collections

Service landing page copy is currently managed in `lib/services.ts` for type-safe rendering, with a Decap collection available for editorial notes / future migration.

## Environment

Optional:

```bash
NEXT_PUBLIC_SITE_URL=https://rlsolutionsllc.com
```
