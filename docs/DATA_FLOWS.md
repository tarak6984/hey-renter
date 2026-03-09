# Data and User Flows

## 1. Data Model

The app is currently static-data driven.

Primary model:

- `Car`

Defined in:

- `app/types/index.ts`

Important fields:

- identity: `id`, `slug`, `brand`, `model`, `year`
- pricing: `pricePerDay`, `pricePerHour`, `pricePerMonth`
- media: `images`, `brandLogo`
- specs: top speed, engine, acceleration, horsepower, seats, color, transmission, fuel type
- policy: `noDeposit`, `mileagePerDay`, `minAge`, `securityDeposit`, `fuelPolicy`, `insurance`
- support info: `languages`, `payments`, `documents`

Primary data source:

- `app/constants/index.ts`

## 2. Home Search Flow

The home page search shell is rendered by `SearchBar.tsx`.

Current inputs:

- brand
- model
- date/time

Behavior:

- values are converted into query params
- user is sent to `/listings`

Current implementation note:

- available search options are hard-coded in the search component
- listings data comes from `MOCK_CARS`

That means search options are not yet fully derived from inventory.

## 3. Listings Flow

The listings page:

- reads query params from `useSearchParams`
- filters `MOCK_CARS`
- repeats filtered cards to fill the current mock page count

Primary file:

- `app/listings/page.tsx`

Important limitation:

- totals and some CTA counts are still hard-coded presentation values

## 4. Car Detail Flow

Car detail pages resolve the current car by `slug`.

Primary route:

- `app/cars/[slug]/page.tsx`

That page assembles:

- breadcrumb
- gallery
- specs
- rules and documents
- language/payment support
- booking widget
- FAQ and related options

## 5. Booking Flow

Booking is currently client-side only.

Main booking UI:

- `app/components/car-profile/BookingWidget.tsx`

Pickup/date selection UI:

- `app/components/car-profile/PickupModal.tsx`

Current form fields:

- pickup date/time or range
- phone
- country code
- full name

Validation:

- inline field-level errors
- in-form validation summary messaging

## 6. Confirmation Flow

The confirmation route reads booking context from query params.

Primary route:

- `app/confirmation/page.tsx`

Current behavior:

- chooses a matching car from static data
- renders a mock booking ID
- supports copy-to-clipboard
- provides WhatsApp continuation CTA
- supports local document upload inputs

This is still UI-state only, not persisted to any backend.

## 7. WhatsApp Flow

Shared helper:

- `buildWhatsAppUrl()` in `app/lib/utils.ts`

Used in:

- listing card CTA context
- booking widget
- confirmation page

This centralization keeps message formatting consistent and reduces duplicated link building.

## 8. Current Data Constraints

Current known constraints:

- inventory is mock only
- search options and inventory are not fully unified
- footer and support content are partly placeholder
- FAQ content is placeholder copy

These are expected prototype-stage limitations, not hidden bugs in the documentation.

