import { Metadata } from 'next';
import StaticInfoPage from '@/app/components/ui/StaticInfoPage';

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
    <StaticInfoPage
      currentLabel="About"
      eyebrow="About Hey Renter"
      title="A modern luxury car rental experience for Dubai."
      intro="Hey Renter is a premium car discovery and booking experience designed to make it easier to browse high-end vehicles, compare important rental details, and move from interest to reservation with less friction."
      cards={highlights}
      sectionTitle="What we are building"
      sectionParagraphs={[
        'The current project is a polished frontend experience centered around luxury car browsing, listings, car profile pages, and a streamlined booking journey.',
        'Over time, this foundation can expand into live rental inventory, real-time availability, renter accounts, payment integrations, and richer support for rental companies.',
      ]}
    />
  );
}
