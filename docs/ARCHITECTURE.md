# Architecture

## 1. System Overview

`hey-renter` is a Next.js App Router application for a luxury car rental experience in Dubai.

The current codebase is intentionally front-end heavy:

- static route rendering
- mock inventory data
- client-side booking flow
- Figma-driven component implementation

There is no backend integration yet. The app is structured so real APIs can replace static data later without rewriting the entire UI.

## 2. Route Map

### `/`

Home page.

Key sections:

- hero
- search bar
- stats row
- category cards
- brands row
- SEO section

Primary source files:

- `app/page.tsx`
- `app/components/home/HeroSection.tsx`
- `app/components/home/SearchBar.tsx`
- `app/components/home/StatsRow.tsx`
- `app/components/home/CategoryCards.tsx`
- `app/components/home/BrandsRow.tsx`

### `/listings`

Listings results page.

Key sections:

- top search shell
- result count / filter / sort row
- filter pills
- car grid
- pagination
- SEO section

Primary source files:

- `app/listings/page.tsx`
- `app/components/listings/FilterBar.tsx`
- `app/components/listings/CarCard.tsx`
- `app/components/listings/Pagination.tsx`

### `/cars/[slug]`

Car profile page.

Key sections:

- breadcrumb
- gallery
- specs
- general rules
- booking widget
- FAQ
- related options

Primary source files:

- `app/cars/[slug]/page.tsx`
- `app/components/car-profile/ImageGallery.tsx`
- `app/components/car-profile/SpecsGrid.tsx`
- `app/components/car-profile/GeneralRules.tsx`
- `app/components/car-profile/BookingWidget.tsx`
- `app/components/car-profile/FaqAccordion.tsx`
- `app/components/car-profile/PickupModal.tsx`

### `/confirmation`

Booking confirmation page.

Primary source file:

- `app/confirmation/page.tsx`

### `/about` and `/help`

Static placeholder pages sharing one generic UI shell.

Primary source files:

- `app/about/page.tsx`
- `app/help/page.tsx`
- `app/components/ui/StaticInfoPage.tsx`

## 3. Shared Shell

The global shell is defined in `app/layout.tsx`.

It contains:

- top bar
- divider line
- sticky navbar
- route content
- footer

Shared shell components:

- `app/components/shared/TopBar.tsx`
- `app/components/shared/Navbar.tsx`
- `app/components/shared/Footer.tsx`
- `app/components/shared/Breadcrumb.tsx`

## 4. Data Sources

The app is mock-data driven.

The primary static source of truth is:

- `app/constants/index.ts`

That file currently contains:

- brands
- categories
- car inventory
- FAQ items
- footer content
- country codes

Shared types live in:

- `app/types/index.ts`

## 5. Utilities

Shared helpers live in:

- `app/lib/utils.ts`

Current responsibilities:

- class merging
- currency formatting
- date formatting
- booking ID generation
- text truncation
- WhatsApp deep-link building
- calendar-day generation
- month-name constants

There is also a design/media helper area in:

- `app/lib/brand-media.tsx`

## 6. Metadata and Generated Images

Global metadata is defined in:

- `app/layout.tsx`

Generated brand imagery routes:

- `app/icon.tsx`
- `app/opengraph-image.tsx`
- `app/twitter-image.tsx`

## 7. Design Sync and Figma Workflow

The project supports scripted Figma pulls with:

- `scripts/pull-figma.mjs`

The script:

- reads `FIGMA_API_KEY`
- pulls file JSON
- exports target nodes
- downloads image fills
- writes synced output into `figma-sync/` and `public/figma-files/`

This is useful for:

- node inspection
- design parity work
- high-fidelity asset extraction

## 8. High-Risk Change Areas

These areas deserve extra care:

### `SearchBar.tsx`

This component owns:

- home search
- listings search shell
- desktop and mobile variants
- pickup modal entry

It is visually important and tightly coupled to current search params.

### `PickupModal.tsx`

This is the highest-complexity UI component in the codebase.

It contains:

- daily range calendar
- monthly dial + range logic
- hourly dial + date + time flow
- viewport-aware modal positioning

It is also design-sensitive, so visual changes can create regressions quickly.

### `CarCard.tsx`

This component combines:

- image gallery hover behavior
- listing-specific image overrides
- CTA styling
- spec pill behavior

Small styling changes can affect both desktop and mobile listing readability.

## 9. Current Architectural Constraints

- no API layer yet
- no server actions for booking
- no persistent cart or session booking state
- no unified search-option source of truth
- some placeholder company/footer links still exist

Those constraints are acceptable for the current phase, but should be treated as temporary product debt.

