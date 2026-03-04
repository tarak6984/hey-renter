import { Metadata } from 'next';
import HeroSection from '@/app/components/home/HeroSection';
import SearchBar from '@/app/components/home/SearchBar';
import StatsRow from '@/app/components/home/StatsRow';
import CategoryCards from '@/app/components/home/CategoryCards';
import BrandsRow from '@/app/components/home/BrandsRow';
import SeoSection from '@/app/components/ui/SeoSection';

export const metadata: Metadata = {
  title: 'Hey Renter – Rent a Luxury Car in Dubai',
  description:
    'Rent a luxury car in Dubai. 500+ rental companies, 3,000+ cars. Super cars, SUVs, convertibles and more. Best rates guaranteed.',
};

/**
 * Home page – assembles all home sections in the order defined by the Figma design.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4">
        <SearchBar />
      </div>
      <StatsRow />
      <CategoryCards />
      <BrandsRow />
      <div className="max-w-7xl mx-auto px-4">
        <SeoSection />
      </div>
    </>
  );
}
