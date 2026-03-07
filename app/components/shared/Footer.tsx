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
      <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-14 sm:px-6 md:px-[39px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-5">
          <div className="space-y-4 md:col-span-2 xl:col-span-1">
            <LogoMark />
            <p className="text-sm leading-relaxed text-gray-400">
              Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
            </p>
            <div className="space-y-1 text-sm text-white">
              <p>heyrenter@info.com</p>
              <p>+1 912 239 1934</p>
              <p>Plot 11/A, Road 90, Block NE - L, Dubai</p>
            </div>
            <SocialIcons />
          </div>

          <FooterLinkColumn title="Company" links={FOOTER_COLUMNS.company} />
          <FooterLinkColumn title="Renters" links={FOOTER_COLUMNS.renters} />
          <FooterLinkColumn title="Rental Companies" links={FOOTER_COLUMNS.rentalCompanies} />

          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-400">Payment Gateways</h4>
            <PaymentMethods />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-4 py-8 sm:px-6 md:px-[39px] lg:grid-cols-4">
          {FOOTER_SEO_LINKS.map((col, i) => (
            <div key={i}>
              <h5 className="mb-3 text-xs font-semibold text-gray-400">{col.heading}</h5>
              <ul className="space-y-1.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-xs text-white transition-colors hover:text-[#CDFF00]">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs text-white/90">
        &copy; 2025 Hey Renter. All Rights Reserved
      </div>
    </footer>
  );
}

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
      <h4 className="mb-4 text-sm font-semibold text-gray-400">{title}</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link}>
            <Link href="#" className="text-sm text-white transition-colors hover:text-[#CDFF00]">
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
