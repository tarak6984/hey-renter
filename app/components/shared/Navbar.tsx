'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

/**
 * Navbar – main navigation bar.
 * Figma specs:
 *   bg=#12151C, height=80px, padding=16px 39px
 *   Logo container: 248×40px (inner logo image: 125×40px)
 *   CTAs: font=TT Norms Pro 18px fw=400, gap=16px, color=white
 *   Chevrons: lime #B8F04F
 *   Get Help icon: lime #B8F04F (help_outline)
 *   Search: W=248 H=48, borderRadius=40, bg=rgba(255,255,255,0.10), padding=12px, icon=24px
 *   Search focus: lime #B8F04F border
 *   Layout: logo(248px) | CTAs(flex-1 center) | search(248px)
 */
export default function Navbar() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: '#12151C' }}
    >
      {/* Use relative+absolute to achieve true centering of nav links */}
      <div
        className="relative flex items-center justify-between"
        style={{ height: '80px', paddingLeft: '39px', paddingRight: '39px' }}
      >
        {/* ── Logo – full SVG asset is 248×40px (includes speed lines + wordmark) ── */}
        <Link
          href="/"
          aria-label="Hey Renter – Home"
          className="flex-shrink-0 flex items-center z-10"
        >
          <Image
            src="/assets/icons/logo.svg"
            alt="Hey Renter"
            width={248}
            height={40}
            priority
            style={{ width: '248px', height: '40px' }}
          />
        </Link>

        {/* ── Nav CTAs – absolutely centered in the full navbar width ── */}
        <div
          className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2"
          style={{ gap: '16px' }}
        >
          <NavItem label="Rent by Category" href="/listings?type=category" />
          <NavItem label="Rent by Brands" href="/listings?type=brand" />
          <Link
            href="/about"
            style={{
              fontFamily: 'var(--font-tt-norms)',
              fontSize: '18px',
              fontWeight: 400,
              color: '#fff',
            }}
            className="hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            About
          </Link>
          <Link
            href="/help"
            className="flex items-center hover:opacity-80 transition-opacity"
            style={{
              fontFamily: 'var(--font-tt-norms)',
              fontSize: '18px',
              fontWeight: 400,
              color: '#fff',
              gap: '6px',
              whiteSpace: 'nowrap',
            }}
          >
            <HelpIcon />
            Get Help
          </Link>
        </div>

        {/* ── Search Bar ── */}
        <div className="flex-shrink-0 z-10">
          <div
            className="flex items-center transition-all duration-200"
            style={{
              width: '248px',
              height: '48px',
              borderRadius: '40px',
              backgroundColor: 'rgba(255,255,255,0.10)',
              padding: '0 14px',
              gap: '8px',
              border: focused ? '1.5px solid #B8F04F' : '1.5px solid transparent',
            }}
          >
            <SearchIcon />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Search..."
              className="flex-1 bg-transparent outline-none border-none"
              style={{
                fontFamily: 'var(--font-tt-norms)',
                fontSize: '16px',
                fontWeight: 400,
                color: '#fff',
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ── NavItem – simple link with lime chevron, no dropdown ─────────────────── */

function NavItem({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center hover:opacity-80 transition-opacity"
      style={{
        fontFamily: 'var(--font-tt-norms)',
        fontSize: '18px',
        fontWeight: 400,
        color: '#fff',
        gap: '6px',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
      <ChevronLime />
    </Link>
  );
}

/* ── Icons ────────────────────────────────────────────────────────────────── */

/** Lime chevron – static, no rotation */
function ChevronLime() {
  return (
    <svg
      width="10" height="6" viewBox="0 0 10 6" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <path d="M1 1L5 5L9 1" stroke="#B8F04F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/** help_outline – filled lime #B8F04F matching Figma */
function HelpIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
        fill="#B8F04F"
      />
    </svg>
  );
}

/** Search icon – white, 24×24 */
function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path
        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
