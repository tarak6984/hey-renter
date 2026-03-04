import Link from 'next/link';
import Image from 'next/image';
import { FOOTER_COLUMNS, FOOTER_SEO_LINKS } from '@/app/constants';

/**
 * Site-wide footer with company links, renter links, SEO car-type links,
 * payment gateway logos, and social icons.
 */
export default function Footer() {
  return (
    <footer className="bg-[#111] text-white">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="md:col-span-1 space-y-4">
            <LogoMark />
            <p className="text-gray-400 text-sm leading-relaxed">
              Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
            </p>
            <div className="space-y-1 text-sm text-gray-300">
              <p>heyrenter@info.com</p>
              <p>+1 912 239 1934</p>
              <p>Plot 11/A, Road 90, Block NE - L, Dubai</p>
            </div>
            <SocialIcons />
          </div>

          {/* Company */}
          <FooterLinkColumn title="Company" links={FOOTER_COLUMNS.company} />

          {/* Renters */}
          <FooterLinkColumn title="Renters" links={FOOTER_COLUMNS.renters} />

          {/* Rental Companies */}
          <FooterLinkColumn title="Rental Companies" links={FOOTER_COLUMNS.rentalCompanies} />

          {/* Payment Gateways */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Payment Gateways</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-gray-700 rounded px-2 py-1">GDPR</span>
                <span className="text-xs text-gray-400">Secure Payment</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm font-bold text-white bg-[#635BFF] px-2 py-0.5 rounded text-xs">stripe</span>
                <span className="text-xs font-bold text-[#003087]">
                  <span className="text-[#009CDE]">Pay</span>
                  <span className="text-[#003087]">Pal</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO link grid */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {FOOTER_SEO_LINKS.map((col, i) => (
            <div key={i}>
              <h5 className="text-gray-400 text-xs font-semibold mb-3">{col.heading}</h5>
              <ul className="space-y-1.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-400 hover:text-[#CDFF00] text-xs transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-4 text-center text-gray-500 text-xs">
        © 2025 Hey Renter. All Rights Reserved
      </div>
    </footer>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function LogoMark() {
  return (
    <Image
      src="/assets/icons/logo.svg"
      alt="Hey Renter"
      width={100}
      height={32}
      className="h-8 w-auto"
    />
  );
}

function FooterLinkColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-semibold text-sm mb-4">{title}</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link}>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcons() {
  const icons = [
    { label: 'Discord', path: 'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.003.022.015.043.031.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z' },
    { label: 'Telegram', path: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' },
    { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z' },
    { label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    { label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
    { label: 'Twitter', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
  ];

  return (
    <div className="flex items-center gap-3 mt-2">
      {icons.map(({ label, path }) => (
        <a key={label} href="#" aria-label={label} className="text-gray-400 hover:text-[#CDFF00] transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d={path} />
          </svg>
        </a>
      ))}
    </div>
  );
}
