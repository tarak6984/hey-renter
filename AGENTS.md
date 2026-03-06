# AGENTS.md

This file helps any AI agent (Codex, Cursor, Claude, ChatGPT, etc.) quickly understand and contribute to this project safely.

## 1) Project Identity

- Name: `hey-renter`
- Type: Next.js App Router web app
- Domain: Luxury car rental in Dubai
- Goal: Pixel-close implementation from Figma with responsive, accessible UI

## 2) Tech Stack

- Next.js `16.1.6`
- React `19.2.3`
- TypeScript `5`
- Tailwind CSS `4`
- ESLint `9` + `eslint-config-next`
- Utility libs: `clsx`, `tailwind-merge`, `lucide-react`

## 3) Runbook

- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Start prod: `npm start`
- Lint: `npm run lint`

Default local URL: `http://localhost:3000`

## 4) Main Routes

- `/` Home page
- `/listings` Listings page
- `/cars/[slug]` Car profile page
- `/confirmation` Booking confirmation page

## 5) Source of Truth (Important Files)

- App shell and global metadata: `app/layout.tsx`
- Home route: `app/page.tsx`
- Listings route: `app/listings/page.tsx`
- Car profile route: `app/cars/[slug]/page.tsx`
- Confirmation route: `app/confirmation/page.tsx`
- Mock data and static content: `app/constants/index.ts`
- Shared types: `app/types/index.ts`
- Utilities (`cn`, formatting, calendar helpers): `app/lib/utils.ts`
- Global styles: `app/globals.css`

## 6) Folder Map

- `app/components/shared`: layout-level pieces (`TopBar`, `Navbar`, `Footer`, `Breadcrumb`)
- `app/components/ui`: reusable primitives (`Button`, `Badge`, `SeoSection`)
- `app/components/home`: homepage sections
- `app/components/listings`: listings page components
- `app/components/car-profile`: car detail page components
- `public/assets`: production UI images/icons/brands/cars
- `public/figma-files`: exported design references for visual parity

## 7) Implementation Conventions

- Use TypeScript in all feature work.
- Prefer reusable components over page-local duplication.
- Keep design fidelity with Figma references in `public/figma-files`.
- Use Tailwind classes and `cn()` from `app/lib/utils.ts` for class composition.
- Preserve responsiveness (mobile-first behavior is expected).
- Preserve accessibility (`aria-*`, semantic HTML, keyboard use).
- Keep static datasets in `app/constants/index.ts` unless feature needs API data.

## 8) Data and State Notes

- Current data is mock/static (cars, brands, categories, FAQ, footer links, country codes).
- Car detail pages resolve by `slug`.
- Booking and UI flows are client-side in current implementation.
- No backend integration yet (roadmap item).

## 9) Quality Checklist for Agents

Before finishing, verify:

- Project builds and lints (`npm run build`, `npm run lint`) when changes are substantial.
- No broken route imports after refactors.
- No TypeScript errors introduced.
- Responsive behavior still works on key breakpoints.
- Shared layout (`TopBar`, `Navbar`, `Footer`) remains intact across routes.

## 10) Future Direction (Roadmap Context)

Planned priorities:

- Figma API integration for stronger pixel-perfect sync
- Backend API integration for real car inventory
- Authentication for renters
- Payment gateway integration (Stripe)
- Admin dashboard for rental companies
- Real-time availability checks
- Multi-language support (Arabic, Russian, French)

When adding new code, prefer decisions that keep these milestones easy to implement later.

## 11) Suggested Workflow for Any Agent

1. Read this file.
2. Read `README.md`.
3. Inspect route file and related components before editing.
4. Reuse existing constants/types/utilities where possible.
5. Implement minimal safe change.
6. Run lint/build when needed.
7. Document assumptions in PR/commit notes.

## 12) Change Log (Agent-Maintained)

Keep a short running record here when major architecture decisions change.

- 2026-03-05: Initial `AGENTS.md` created to standardize cross-agent onboarding and contribution rules.
