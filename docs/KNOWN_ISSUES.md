# Known Issues and Improvement Priorities

This document records the current known product and codebase gaps so future work is grounded in reality.

## 1. Search and Inventory Source of Truth

Status:

- not fully unified yet

Problem:

- search options in `SearchBar.tsx` are hard-coded
- listings results use `MOCK_CARS`

Impact:

- the UI can suggest combinations that do not actually exist in inventory

Recommended fix:

- derive brand/model options from inventory data or a dedicated catalog source

## 2. Placeholder Shared Links and Content

Status:

- still present

Examples:

- social links in `TopBar.tsx`
- multiple footer links in `Footer.tsx`
- some static support/about copy

Impact:

- acceptable for prototype/demo work
- not acceptable for production trust and SEO quality

## 3. Listings Totals

Status:

- presentation-only

Problem:

- the result total and some option counts are hard-coded

Impact:

- UI can drift from real filtering behavior

## 4. Pickup Modal Complexity

Status:

- works, but is the largest maintainability hotspot

Problem:

- one large client component owns multiple interaction models
- monthly and hourly dial logic remain tightly coupled to the view layer

Impact:

- design tweaks can cause subtle regressions

Recommended fix:

- split the modal into smaller date, dial, and time-selection subcomponents

## 5. Placeholder Content

Status:

- still visible in several areas

Examples:

- FAQ answers
- some footer descriptions
- some support/about copy

Recommended fix:

- replace with product-approved content before production launch

## 6. Production Readiness Summary

Current phase is best described as:

- polished front-end prototype with strong design fidelity

Not yet complete for:

- real inventory integration
- checkout/payment
- account/auth flows
- persisted bookings
- operational support content

