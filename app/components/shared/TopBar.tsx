'use client';

import Link from 'next/link';
import { Facebook, Linkedin, Twitter } from 'lucide-react';

/**
 * TopBar – slim utility bar above the main navbar.
 * Shows social icons on the left, locale/currency/location on the right.
 */
export default function TopBar() {
  return (
    <div className="w-full bg-[#111] text-white text-xs py-1.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Social Icons */}
        <div className="flex items-center gap-3">
          <Link href="#" aria-label="Facebook" className="hover:text-[#CDFF00] transition-colors">
            <Facebook size={13} />
          </Link>
          <Link href="#" aria-label="LinkedIn" className="hover:text-[#CDFF00] transition-colors">
            <Linkedin size={13} />
          </Link>
          {/* WeChat icon (custom SVG) */}
          <Link href="#" aria-label="WeChat" className="hover:text-[#CDFF00] transition-colors">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.5 4C4.36 4 1 6.92 1 10.5c0 2.04 1.07 3.87 2.75 5.06L3 18l2.75-1.38C6.47 16.83 7.46 17 8.5 17c.17 0 .34 0 .5-.01A5.97 5.97 0 0 1 9 15c0-3.31 3.13-6 7-6h.5C15.67 6.42 12.36 4 8.5 4zM6 8.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5.5 5c-3.04 0-5.5 1.79-5.5 4s2.46 4 5.5 4c.73 0 1.43-.12 2.06-.33L21 22l-.69-2.08A3.93 3.93 0 0 0 22 17.5c0-2.21-2.46-4-5.5-4zm-2 3a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm4 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
            </svg>
          </Link>
          <Link href="#" aria-label="Twitter" className="hover:text-[#CDFF00] transition-colors">
            <Twitter size={13} />
          </Link>
          {/* WhatsApp */}
          <Link href="#" aria-label="WhatsApp" className="hover:text-[#CDFF00] transition-colors">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </Link>
        </div>

        {/* Right: Locale, Currency, Location */}
        <div className="flex items-center gap-4 text-gray-300">
          <button className="hover:text-white transition-colors">EN</button>
          <span className="text-gray-600">|</span>
          <button className="hover:text-white transition-colors">UAE Dirham (AED)</button>
          <span className="text-gray-600">|</span>
          <button className="flex items-center gap-1 hover:text-white transition-colors">
            <span className="text-base">🇦🇪</span>
            <span>Dubai</span>
          </button>
        </div>
      </div>
    </div>
  );
}
