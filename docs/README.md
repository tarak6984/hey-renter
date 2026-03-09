# Docs

This folder contains the project-level documentation for `hey-renter`.

Recommended reading order:

1. `ARCHITECTURE.md`
2. `DESIGN.md`
3. `DEVELOPMENT.md`
4. `DATA_FLOWS.md`
5. `OPERATIONS.md`
6. `KNOWN_ISSUES.md`

What these docs are for:

- onboarding new engineers quickly
- preserving implementation intent across design-driven changes
- documenting the current mock-data architecture honestly
- reducing regressions when touching the search, listings, booking, and gallery flows

Current product shape:

- Next.js App Router front end
- Figma-driven UI implementation
- static/mock data
- client-side booking and WhatsApp flows
- Vercel-friendly deployment path

Primary routes:

- `/`
- `/listings`
- `/cars/[slug]`
- `/confirmation`
- `/about`
- `/help`

