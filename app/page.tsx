import Image from 'next/image';
import { Metadata } from 'next';
import HeroSection from '@/app/components/home/HeroSection';
import SearchBar from '@/app/components/home/SearchBar';
import StatsRow from '@/app/components/home/StatsRow';
import CategoryCards from '@/app/components/home/CategoryCards';
import BrandsRow from '@/app/components/home/BrandsRow';
import SeoSection from '@/app/components/ui/SeoSection';

export const metadata: Metadata = {
  title: 'Hey Renter - Rent a Luxury Car in Dubai',
  description:
    'Rent a luxury car in Dubai. 500+ rental companies, 3,000+ cars. Super cars, SUVs, convertibles and more. Best rates guaranteed.',
};

/**
 * Home page - assembles all sections in the order defined by the Figma design.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="relative z-10 -mt-6 flex justify-center px-4 sm:px-6 md:-mt-[36px] md:px-[39px]">
        <SearchBar />
      </div>
      <div className="mt-12 md:mt-14">
        <StatsRow />
      </div>
      <div className="mt-8 flex justify-center">
        <Image
          src="/assets/icons/scroll-down.svg"
          alt="Scroll down"
          width={32}
          height={48}
          priority
        />
      </div>
      <CategoryCards />
      <BrandsRow />
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-[39px]">
        <SeoSection />
      </div>
    </>
  );
}
