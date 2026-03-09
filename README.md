# Hey Renter

Hey Renter is a Next.js App Router front end for a Dubai luxury car rental experience. The project is built around strong Figma fidelity, reusable UI components, responsive behavior, and a mock-data-driven product flow that can later be connected to real backend services.

## Current Scope

The app currently includes these routes:

- `/` home page
- `/listings` listings/search results page
- `/cars/[slug]` car profile page
- `/confirmation` booking confirmation page
- `/about` placeholder about page
- `/help` placeholder help page

Core product flows already implemented:

- home search flow
- listings browsing and filter UI
- car detail gallery and booking widget
- pickup date/time modal
- WhatsApp booking and negotiation CTAs
- confirmation and document-upload UI

## Tech Stack

| Tool | Version |
|------|---------|
| Next.js | 16.1.6 |
| React | 19.2.3 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| ESLint | 9 |
| Lucide React | 0.577.0 |

Utility libraries:

- `clsx`
- `tailwind-merge`

## Local Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

Default local URL:

```text
http://localhost:3000
```

## Important Project Files

Main entry points:

- `app/layout.tsx`
- `app/page.tsx`
- `app/listings/page.tsx`
- `app/cars/[slug]/page.tsx`
- `app/confirmation/page.tsx`
- `app/constants/index.ts`
- `app/types/index.ts`
- `app/lib/utils.ts`
- `app/globals.css`

Figma sync script:

- `scripts/pull-figma.mjs`

## Figma Workflow

This project supports live Figma pulls through the local API key.

Available script:

```bash
npm run figma:pull -- <figma-file-url-or-key> [--node-id 123:456]
```

Required environment variable:

- `FIGMA_API_KEY`

Design references and synced assets are stored under:

- `public/figma-files`
- `figma-sync`

## Documentation

Deeper project documentation now lives in [`docs/`](./docs):

- [`docs/README.md`](./docs/README.md)
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
- [`docs/DESIGN.md`](./docs/DESIGN.md)
- [`docs/DEVELOPMENT.md`](./docs/DEVELOPMENT.md)
- [`docs/DATA_FLOWS.md`](./docs/DATA_FLOWS.md)
- [`docs/OPERATIONS.md`](./docs/OPERATIONS.md)
- [`docs/KNOWN_ISSUES.md`](./docs/KNOWN_ISSUES.md)

## Current Constraints

This is still a front-end-first implementation.

Important current limitations:

- inventory is mock/static
- search options are not yet fully unified with inventory data
- some support/footer content is placeholder
- listings totals are partly presentation-only
- booking is client-side only

## Deployment

The app is intended to deploy on Vercel.

Typical release flow:

```bash
git add .
git commit -m "your message"
git push origin main
```

## License

Copyright 2025 Hey Renter. All rights reserved.
