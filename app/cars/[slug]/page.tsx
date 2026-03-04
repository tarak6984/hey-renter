import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Heart, Share2 } from 'lucide-react';
import Image from 'next/image';
import { MOCK_CARS } from '@/app/constants';
import Breadcrumb from '@/app/components/shared/Breadcrumb';
import ImageGallery from '@/app/components/car-profile/ImageGallery';
import SpecsGrid from '@/app/components/car-profile/SpecsGrid';
import GeneralRules from '@/app/components/car-profile/GeneralRules';
import BookingWidget from '@/app/components/car-profile/BookingWidget';
import FaqAccordion from '@/app/components/car-profile/FaqAccordion';
import CarCard from '@/app/components/listings/CarCard';
import SeoSection from '@/app/components/ui/SeoSection';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = MOCK_CARS.find(c => c.slug === slug);
  if (!car) return { title: 'Car Not Found' };
  return {
    title: `${car.model} | Hey Renter`,
    description: `Rent the ${car.model} in Dubai from AED ${car.pricePerDay}/day. No deposit available.`,
  };
}

export async function generateStaticParams() {
  return MOCK_CARS.map(car => ({ slug: car.slug }));
}

/**
 * Car Profile page – image gallery, specs, general rules, booking widget, FAQs, other options.
 */
export default async function CarProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const car = MOCK_CARS.find(c => c.slug === slug);
  if (!car) notFound();

  const otherCars = MOCK_CARS.filter(c => c.id !== car.id);

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Super Cars', href: '/listings?category=super' },
        { label: car.model },
      ]} />

      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Car title row */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
              <Image src={car.brandLogo} alt={car.brand} width={32} height={32} className="object-contain" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{car.brand}</p>
              <h1 className="text-2xl font-extrabold text-gray-900">{car.model}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center hover:bg-white transition-colors" aria-label="Wishlist">
              <Heart size={18} className="text-gray-500" />
            </button>
            <button className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center hover:bg-white transition-colors" aria-label="Share">
              <Share2 size={18} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Two-column layout: gallery+details | booking widget */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Left column */}
          <div>
            <ImageGallery images={car.images} alt={car.model} />

            {/* Specs */}
            <div className="mt-6">
              <h2 className="text-lg font-extrabold mb-3">Specifications</h2>
              <SpecsGrid specs={car.specs} />
            </div>

            {/* General Rules + Documents */}
            <GeneralRules car={car} />

            {/* How it feels to drive */}
            <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-extrabold mb-3">How it feels to drive?</h2>
              <p className="text-sm text-gray-600 leading-7 mb-3">
                Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
              </p>
              <p className="text-sm text-gray-600 leading-7 mb-3">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.
              </p>
              <button className="w-full py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 mt-2">
                SEE MORE ▾
              </button>
            </div>

            {/* FAQ */}
            <FaqAccordion />
          </div>

          {/* Right column – Booking widget */}
          <div>
            <BookingWidget carId={car.id} pricePerDay={car.pricePerDay} slug={car.slug} />
          </div>
        </div>

        {/* Other Options */}
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold mb-2 text-center">OTHER OPTIONS</h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {otherCars.slice(0, 4).map(c => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button className="border border-gray-300 rounded-full px-8 py-3 text-sm font-semibold text-gray-700 hover:bg-white transition-all flex items-center gap-2">
              SEE – 1,289 OTHER OPTIONS ›
            </button>
          </div>
        </section>

        {/* SEO */}
        <SeoSection />
      </div>
    </div>
  );
}
