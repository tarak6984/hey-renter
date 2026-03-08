# Hey Renter

Hey Renter is a Next.js App Router project for a luxury car rental website focused on Figma-faithful UI, responsive behavior, and reusable front-end components.

The current app covers four primary flows:
- Home page
- Listings page
- Car detail page
- Booking confirmation page

## Overview

This project is built as a static/mock-driven front end for a Dubai luxury car rental experience.

Key characteristics:
- Figma-driven implementation
- App Router architecture
- TypeScript throughout
- Tailwind CSS for styling
- Shared reusable components for layout and feature sections
- Client-side booking and WhatsApp flows

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 16.1.6 | React framework with App Router |
| React | 19.2.3 | UI library |
| TypeScript | 5 | Static typing |
| Tailwind CSS | 4 | Utility-first styling |
| ESLint | 9 | Linting |
| Lucide React | Latest installed | Icons |
| clsx + tailwind-merge | Latest installed | Class composition |

## Main Routes

| Route | Purpose |
|------|---------|
| `/` | Home page with hero, search, categories, brands, stats, and SEO section |
| `/listings` | Listings page with search bar, filter tags, car grid, and pagination |
| `/cars/[slug]` | Car profile page with gallery, specs, booking widget, FAQs, and related options |
| `/confirmation` | Booking confirmation page with booking summary, WhatsApp CTA, and document upload |

## Features

- Figma-aligned home page and listings experience
- Search flow with brand, model, and date/time selection
- Listings card system with reusable car cards
- Car detail gallery and booking sidebar
- WhatsApp negotiation flow with prefilled booking context
- Confirmation flow with booking ID and document upload
- Generated favicon, Open Graph image, and Twitter image

## Project Structure

```text
hey-renter/
├── app/
│   ├── cars/[slug]/              # Car profile route
│   ├── confirmation/             # Confirmation route
│   ├── listings/                 # Listings route
│   ├── components/
│   │   ├── car-profile/          # Car page feature components
│   │   ├── home/                 # Home page sections
│   │   ├── listings/             # Listings components
│   │   ├── shared/               # Navbar, top bar, footer, breadcrumb
│   │   └── ui/                   # Shared UI primitives
│   ├── constants/                # Mock cars, brands, FAQ, footer data
│   ├── lib/                      # Utilities and brand media helpers
│   ├── types/                    # Shared TypeScript types
│   ├── icon.tsx                  # App favicon generator
│   ├── opengraph-image.tsx       # Open Graph image generator
│   ├── twitter-image.tsx         # Twitter image generator
│   ├── globals.css               # Global styles
│   └── layout.tsx                # App shell and metadata
├── public/
│   ├── assets/                   # Production images, logos, icons, cars
│   └── figma-files/              # Exported Figma references
├── next.config.ts
├── package.json
└── README.md
```

## Local Development

### Install

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

Default local URL:

```text
http://localhost:3000
```

### Build for production

```bash
npm run build
```

### Start the production server

```bash
npm start
```

### Run linting

```bash
npm run lint
```

## Source of Truth Files

These files are the best entry points when working in the codebase:

- `app/layout.tsx`: app shell, metadata, shared wrappers
- `app/page.tsx`: home page route
- `app/listings/page.tsx`: listings route
- `app/cars/[slug]/page.tsx`: car profile route
- `app/confirmation/page.tsx`: confirmation route
- `app/constants/index.ts`: mock cars and static content
- `app/types/index.ts`: shared interfaces
- `app/lib/utils.ts`: utility helpers
- `app/globals.css`: global styles and layout behavior

## Data Model Notes

The app is currently mock-data driven.

Important points:
- Cars come from `MOCK_CARS` in `app/constants/index.ts`
- Car pages resolve by `slug`
- Search and booking state are client-side
- There is no backend integration yet

## Design and Responsiveness Notes

- Figma references live in `public/figma-files`
- The desktop source-of-truth layout is centered around a `1440px` design frame
- Larger desktop widths use centered container behavior instead of forcing full-width stretch
- Repeated UI like listings cards and filters should be implemented in code, not as flat Figma exports

## WhatsApp Flow

There are two WhatsApp-related flows in the app:

1. Car profile negotiation
   - Built from the booking widget inputs
   - Sends car, date/time, best rate, phone, and full name into a prefilled WhatsApp message

2. Confirmation page contact CTA
   - Carries the booking context forward from the reserve flow
   - Reuses booking details in the WhatsApp prefill

## Quality Checklist

Before shipping changes, verify:

- `npm run lint` passes
- `npm run build` passes for substantial changes
- No route imports are broken
- Shared layout remains intact across routes
- Main pages still behave correctly at desktop widths like `1440px` and `1920px`

## Deployment

This project is designed to deploy cleanly on Vercel.

Typical flow:

```bash
git add .
git commit -m "your message"
git push origin main
```

## Roadmap

Planned future work:

- Figma API integration
- Real inventory and backend APIs
- Authentication
- Payment gateway integration
- Admin dashboard
- Real-time availability
- Multi-language support

## License

Copyright 2025 Hey Renter. All rights reserved.
