# Development Workflow

## 1. Local Setup

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

Build for production:

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

## 2. Day-to-Day Engineer Workflow

Recommended sequence:

1. read `AGENTS.md`
2. read `README.md`
3. inspect the route and related components before editing
4. reuse existing constants, types, and utility helpers
5. make the smallest safe change
6. run lint and build when the change is meaningful

## 3. Editing Guidelines

Follow these conventions:

- use TypeScript everywhere
- prefer reusable components to copy-pasted page logic
- keep static data in `app/constants/index.ts` unless there is a strong reason not to
- use `cn()` from `app/lib/utils.ts` for class composition
- preserve accessibility and keyboard behavior

## 4. Branching and Delivery

Keep changes focused by concern.

Good branch themes:

- feature work
- design parity fixes
- mobile/responsive sweeps
- code quality or refactor work
- docs work

Avoid mixing:

- large product changes
- unrelated Figma tweaks
- architecture refactors

in the same branch unless they are tightly coupled.

## 5. Verification Standards

Minimum checks for substantial changes:

- `npm run lint`
- `npm run build`

Also verify manually when relevant:

- mobile viewport behavior
- desktop `1440px` layout
- route-to-route shell consistency
- gallery and modal interactions
- listings/search flows

## 6. What to Inspect Before Editing

For route work:

- route file
- related feature components
- data source in `app/constants/index.ts`
- shared types in `app/types/index.ts`

For design work:

- relevant Figma node
- current component structure
- any exported assets already present in `public/assets` or `public/figma-files`

For search/listings work:

- `app/components/home/SearchBar.tsx`
- `app/listings/page.tsx`
- `app/components/listings/FilterBar.tsx`
- `app/components/listings/CarCard.tsx`

## 7. Practical Guardrails

Be especially careful with:

- `PickupModal.tsx`
- `ImageGallery.tsx`
- `SearchBar.tsx`
- `CarCard.tsx`

These components combine layout, interactivity, and design sensitivity.

## 8. Documentation Expectation

If a change shifts architecture, developer workflow, or system behavior in a meaningful way:

- update the relevant document in `docs/`
- update `AGENTS.md` if cross-agent workflow guidance changes

