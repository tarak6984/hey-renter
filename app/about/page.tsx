import { Metadata } from 'next';
import Breadcrumb from '@/app/components/shared/Breadcrumb';

export const metadata: Metadata = {
  title: 'About | Hey Renter',
  description:
    'Learn more about Hey Renter, our mission, and how we help people find luxury car rentals in Dubai.',
};

const highlights = [
  {
    title: 'Luxury-First Marketplace',
    body: 'We focus on premium and luxury vehicles so renters can quickly explore standout options without digging through generic inventory.',
  },
  {
    title: 'Fast Booking Flow',
    body: 'Our current experience is designed to help users compare cars, review key rules, and request a booking in just a few steps.',
  },
  {
    title: 'Built for Growth',
    body: 'The platform is being shaped for future integrations like live inventory, payments, renter accounts, and multi-language support.',
  },
];

export default function AboutPage() {
  return (
    <div className="pb-16">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'About' },
        ]}
      />

      <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 pt-2 sm:px-6 md:px-[39px]">
        <div className="rounded-[28px] border border-black/8 bg-white px-6 py-10 shadow-[0_16px_48px_rgba(0,0,0,0.06)] sm:px-8 sm:py-12">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-black/45">
            About Hey Renter
          </p>
          <h1 className="mt-3 max-w-[720px] text-[36px] font-semibold leading-[1.05] text-black sm:text-[48px]">
            A modern luxury car rental experience for Dubai.
          </h1>
          <p className="mt-5 max-w-[760px] text-[16px] leading-7 text-black/65 sm:text-[18px]">
            Hey Renter is a premium car discovery and booking experience designed to
            make it easier to browse high-end vehicles, compare important rental
            details, and move from interest to reservation with less friction.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-[24px] border border-black/8 bg-white px-6 py-6 shadow-[0_12px_36px_rgba(0,0,0,0.05)]"
            >
              <h2 className="text-[20px] font-semibold text-black">{item.title}</h2>
              <p className="mt-3 text-[15px] leading-7 text-black/60">{item.body}</p>
            </article>
          ))}
        </div>

        <section className="rounded-[28px] border border-black/8 bg-white px-6 py-8 shadow-[0_16px_48px_rgba(0,0,0,0.06)] sm:px-8">
          <h2 className="text-[26px] font-semibold text-black">What we are building</h2>
          <div className="mt-4 grid gap-4 text-[15px] leading-7 text-black/65 sm:grid-cols-2">
            <p>
              The current project is a polished frontend experience centered around
              luxury car browsing, listings, car profile pages, and a streamlined
              booking journey.
            </p>
            <p>
              Over time, this foundation can expand into live rental inventory,
              real-time availability, renter accounts, payment integrations, and
              richer support for rental companies.
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}
