import Link from 'next/link';
import Image from 'next/image';
import { FOOTER_COLUMNS, FOOTER_SEO_LINKS } from '@/app/constants';

/**
 * Site-wide footer with company links, renter links, SEO car-type links,
 * payment gateway logos, and social icons.
 */
export default function Footer() {
  return (
    <footer className="bg-[#12151C] text-white">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="md:col-span-1 space-y-4">
            <LogoMark />
            <p className="text-gray-400 text-sm leading-relaxed">
              Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
            </p>
            <div className="space-y-1 text-sm text-white">
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
            <h4 className="font-semibold text-sm mb-4 text-gray-400">Payment Gateways</h4>
            <PaymentMethods />
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
                    <Link href="#" className="text-white hover:text-[#CDFF00] text-xs transition-colors">
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
      <div className="border-t border-gray-800 py-4 text-center text-white/90 text-xs">
        &copy; 2025 Hey Renter. All Rights Reserved
      </div>
    </footer>
  );
}

// Sub-components

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
      <h4 className="font-semibold text-sm mb-4 text-gray-400">{title}</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link}>
            <Link href="#" className="text-white hover:text-[#CDFF00] text-sm transition-colors">
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcons() {
  const socialLinks = [
    { label: 'Discord', href: '#' },
    { label: 'Telegram', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'Twitter', href: '#' },
  ];

  return (
    <div className="relative mt-2 h-5 w-[240px]">
      <Image
        src="/assets/icons/Social Icons.svg"
        alt="Social icons"
        fill
        className="object-contain"
      />
      <div className="absolute inset-0 flex">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            aria-label={link.label}
            className="block h-full flex-1"
          />
        ))}
      </div>
    </div>
  );
}

function PaymentMethods() {
  return (
    <div className="relative h-[66px] w-[172px]">
      <Image
        src="/assets/icons/Payments Methods.svg"
        alt="Payment methods"
        fill
        className="object-contain object-left-top"
      />
    </div>
  );
}
