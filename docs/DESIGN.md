# Design and Figma Implementation

## 1. Design Intent

This project is implemented with strong Figma fidelity as a primary goal.

That means:

- spacing matters
- container widths matter
- icon sizes matter
- responsive states should preserve the visual hierarchy from the design

The codebase is not meant to be generic UI scaffolding. It is a product-specific front end with deliberate visual behavior.

## 2. Design Sources

Primary design references:

- live Figma nodes pulled via API
- exported design references in `public/figma-files`

When implementing or revising a section:

1. prefer live node data first
2. use exported references when rate limited
3. avoid guessing if exact geometry is available

## 3. Typography

The app currently relies on:

- `Inter` from `next/font/google`
- `TT Norms Pro` via external stylesheet
- `Clash Display` via external stylesheet

General usage pattern:

- hero headings and strong section titles use the more display-oriented look
- body and interactive UI elements rely on TT Norms styling patterns

## 4. Layout Conventions

Desktop layout is centered around a `1440px` design frame.

Common desktop inset:

- `39px`

Patterns used repeatedly:

- `max-w-[1440px]` route wrapper
- `md:px-[39px]` content insets
- mobile-first stacking with desktop enhancement

Not every surface should be full-bleed. Some sections intentionally break container rules, but only when the Figma source supports it.

## 5. Design Implementation Rules

Preferred approach:

- implement in code, not as flattened screenshots
- use assets only for artwork that cannot be reproduced faithfully in code
- preserve keyboard access for interactive elements
- preserve mobile behavior while matching desktop fidelity

Avoid:

- replacing interactive UI with static images
- introducing magic spacing that only works at one viewport
- overfitting desktop at the expense of mobile

## 6. Figma-Driven Workflow

When a node is provided:

1. fetch node JSON from the Figma API
2. inspect text, bounds, spacing, and effects
3. export renders only if visual comparison is needed
4. map the node to the real component
5. implement the smallest safe change for parity

Useful local script:

- `npm run figma:pull -- <figma-file-url-or-key> [--node-id 123:456]`

Required environment variable:

- `FIGMA_API_KEY`

## 7. Responsive Design Expectations

Mobile is not a fallback afterthought.

Important expectations:

- no clipped text
- no horizontal overflow
- no dead image space when cards are compressed
- touch targets remain usable
- modal content remains visible under zoom and reduced viewport height

The most sensitive responsive areas are:

- home hero
- search shell
- category cards
- car profile stacked layout
- pickup modal

## 8. Known Design Debt

Current honest gaps:

- some footer and top-bar destinations are placeholders
- search options and inventory are not fully unified
- listings totals are still hard-coded
- some placeholder content remains in FAQ and static pages

These are acceptable for prototype/demo work, but should be removed before production positioning.

