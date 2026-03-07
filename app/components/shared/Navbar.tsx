'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

/**
 * Navbar - main navigation bar.
 * Desktop layout preserves the 1440px Figma alignment while avoiding overflow.
 */
export default function Navbar() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full" style={{ backgroundColor: '#12151C' }}>
      <div className="relative mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-4 sm:px-6 md:h-[80px] md:px-[39px] md:py-0">
        <Link
          href="/"
          aria-label="Hey Renter - Home"
          className="z-10 flex flex-shrink-0 items-center"
        >
          <Image
            src="/assets/icons/logo.svg"
            alt="Hey Renter"
            width={248}
            height={40}
            priority
            className="h-auto w-[168px] md:w-[248px]"
          />
        </Link>

        <div
          className="absolute left-1/2 hidden -translate-x-1/2 items-center min-[1400px]:flex"
          style={{ gap: '16px' }}
        >
          <NavItem label="Rent by Category" href="/listings?type=category" />
          <NavItem label="Rent by Brands" href="/listings?type=brand" />
          <Link
            href="/about"
            className="whitespace-nowrap transition-opacity hover:opacity-80"
            style={{
              fontFamily: 'var(--font-tt-norms)',
              fontSize: '18px',
              fontWeight: 400,
              color: '#fff',
            }}
          >
            About
          </Link>
          <Link
            href="/help"
            className="flex items-center whitespace-nowrap transition-opacity hover:opacity-80"
            style={{
              fontFamily: 'var(--font-tt-norms)',
              fontSize: '18px',
              fontWeight: 400,
              color: '#fff',
              gap: '6px',
            }}
          >
            <HelpIcon />
            Get Help
          </Link>
        </div>

        <div className="z-10 flex flex-shrink-0">
          <div
            className="flex items-center transition-all duration-200"
            style={{
              width: 'clamp(160px, 20vw, 248px)',
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
              className="flex-1 border-none bg-transparent outline-none"
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

function NavItem({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center whitespace-nowrap transition-opacity hover:opacity-80"
      style={{
        fontFamily: 'var(--font-tt-norms)',
        fontSize: '18px',
        fontWeight: 400,
        color: '#fff',
        gap: '6px',
      }}
    >
      {label}
      <ChevronLime />
    </Link>
  );
}

function ChevronLime() {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <path
        d="M1 1L5 5L9 1"
        stroke="#B8F04F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
        fill="#B8F04F"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
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
