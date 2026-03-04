'use client';

import Link from 'next/link';
import { Search, ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/app/lib/utils';

/**
 * Main navigation bar.
 * Sticky, dark background, HeyRenter logo, nav links with dropdowns, search.
 */
export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#111] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <div className="flex flex-col leading-none">
            <div className="flex items-center gap-0.5">
              {/* Speed lines */}
              <svg width="28" height="20" viewBox="0 0 28 20" fill="none" className="mr-1">
                <line x1="0" y1="5"  x2="22" y2="5"  stroke="#CDFF00" strokeWidth="3" strokeLinecap="round" />
                <line x1="4" y1="10" x2="26" y2="10" stroke="#CDFF00" strokeWidth="3" strokeLinecap="round" />
                <line x1="0" y1="15" x2="22" y2="15" stroke="#CDFF00" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <span className="text-white font-extrabold text-xl tracking-tight">HEY</span>
            </div>
            <span className="text-white font-extrabold text-xl tracking-tight -mt-1">RENTER</span>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium flex-1 justify-center">
          <NavDropdown label="Rent by Category" />
          <NavDropdown label="Rent by Brands" />
          <Link href="/about" className="hover:text-[#CDFF00] transition-colors">About</Link>
          <Link href="/help" className="flex items-center gap-1 hover:text-[#CDFF00] transition-colors">
            <HelpCircle size={15} />
            Get Help
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          {searchOpen ? (
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => !query && setSearchOpen(false)}
              placeholder="Search..."
              className="bg-[#222] text-white placeholder-gray-400 rounded-full px-4 py-2 pr-10 text-sm w-52 outline-none border border-gray-600 focus:border-[#CDFF00] transition-all"
            />
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 bg-[#222] hover:bg-[#2a2a2a] text-gray-300 hover:text-white rounded-full px-4 py-2 text-sm transition-colors border border-transparent hover:border-gray-600"
            >
              <Search size={15} />
              <span>Search...</span>
            </button>
          )}
          {searchOpen && (
            <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          )}
        </div>
      </div>
    </nav>
  );
}

// ─── NavDropdown ─────────────────────────────────────────────────────────────

function NavDropdown({ label }: { label: string }) {
  const [open, setOpen] = useState(false);

  const categoryLinks = [
    'Super Cars', 'Luxury Cars', "SUV's", 'Convertible', 'Driver Service', 'Economy',
  ];
  const brandLinks = [
    'Ferrari', 'Lamborghini', 'Rolls Royce', 'Porsche', 'Mercedes', 'BMW', 'Audi',
  ];
  const links = label === 'Rent by Category' ? categoryLinks : brandLinks;

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 hover:text-[#CDFF00] transition-colors">
        {label}
        <ChevronDown size={14} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-52 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-2xl py-2 z-50">
          {links.map((link) => (
            <Link
              key={link}
              href={`/listings?${label === 'Rent by Category' ? 'category' : 'brand'}=${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#2a2a2a] transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
