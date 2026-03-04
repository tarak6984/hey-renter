# 🚗 Hey Renter

> **Rent a Luxury Car in Dubai** – A pixel-perfect Next.js implementation of the Hey Renter car rental platform, translated from Figma designs.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

---

## 📐 Design Source

All pages are translated from Figma designs exported to `public/figma-files/`. A future milestone will integrate the Figma API for pixel-perfect rendering.

---

## 🗂 Project Structure

```
hey-renter/
├── app/
│   ├── components/
│   │   ├── shared/          # TopBar, Navbar, Footer, Breadcrumb
│   │   ├── ui/              # Button, Badge, SeoSection (reusable primitives)
│   │   ├── home/            # HeroSection, SearchBar, StatsRow, CategoryCards, BrandsRow
│   │   ├── listings/        # CarCard, FilterBar, Pagination
│   │   └── car-profile/     # ImageGallery, SpecsGrid, GeneralRules, BookingWidget, PickupModal, FaqAccordion
│   ├── constants/           # Mock data: cars, brands, categories, FAQ, footer links
│   ├── lib/                 # Utility functions (cn, formatAED, getCalendarDays, …)
│   ├── types/               # TypeScript interfaces (Car, Booking, SearchFilters, …)
│   ├── listings/            # /listings route
│   ├── cars/[slug]/         # /cars/:slug route (Car Profile)
│   └── confirmation/        # /confirmation route
├── public/
│   ├── figma-files/         # Exported Figma design references
│   ├── hero/                # Hero car images
│   ├── brands/              # Brand SVG logos
│   └── categories/          # Category card images
└── next.config.ts
```

---

## 🖥 Pages

| Route | Description |
|-------|-------------|
| `/` | Home – Hero, Search Bar, Stats, Category Cards, Brand Logos, SEO |
| `/listings` | Listings – Filter bar, 4-col car grid, Pagination |
| `/cars/[slug]` | Car Profile – Gallery, Specs, Booking Widget, FAQ, Other Options |
| `/confirmation` | Booking Confirmed – Booking ID, WhatsApp CTA, Document Upload |

---

## ✨ Features

- 🎨 **Pixel-close Figma translation** across 4 pages
- 📅 **Pickup Date Modal** – Daily (calendar + time), Monthly (radial dial), Hourly
- 🔍 **Smart Search Bar** – Brand/Model/DateTime selectors with dynamic model filtering
- 🖼 **Image Lightbox** – Full-screen gallery with thumbnail strip
- 💚 **WhatsApp integration** on all booking CTAs
- 📄 **Document Upload** on confirmation page
- 🔒 **Security headers** via `next.config.ts`
- ♿ **Accessible** – aria-labels, semantic HTML, keyboard navigation
- 📱 **Fully responsive** – mobile-first, works on all screen sizes

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌿 Git Branching Strategy

```
main          ← Production-ready releases
└── develop   ← Integration branch
    ├── feat/project-setup
    ├── feat/shared-components
    ├── feat/home-page
    ├── feat/listings-page
    ├── feat/car-profile-page
    └── feat/confirmation-page
```

---

## 🛣 Roadmap

- [ ] Figma API integration for pixel-perfect rendering
- [ ] Real car data from backend API
- [ ] Authentication (renter login/register)
- [ ] Payment gateway integration (Stripe)
- [ ] Admin dashboard for rental companies
- [ ] Real-time availability checking
- [ ] Multi-language support (Arabic, Russian, French)

---

## 📦 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 16 | React framework (App Router) |
| TypeScript 5 | Type safety |
| Tailwind CSS 4 | Utility-first styling |
| Lucide React | Icon library |
| clsx + tailwind-merge | Conditional class merging |

---

## 📄 License

© 2025 Hey Renter. All Rights Reserved.
