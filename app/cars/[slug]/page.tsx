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
  const car = MOCK_CARS.find((c) => c.slug === slug);
  if (!car) return { title: 'Car Not Found' };
  return {
    title: `${car.model} | Hey Renter`,
    description: `Rent the ${car.model} in Dubai from AED ${car.pricePerDay}/day. No deposit available.`,
  };
}

export async function generateStaticParams() {
  return MOCK_CARS.map((car) => ({ slug: car.slug }));
}

/**
 * Car Profile page - image gallery, specs, general rules, booking widget, FAQs, other options.
 */
export default async function CarProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const car = MOCK_CARS.find((c) => c.slug === slug);
  if (!car) notFound();

  const otherCars = MOCK_CARS.filter((c) => c.id !== car.id);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Super Cars', href: '/listings?category=super' },
          { label: car.model },
        ]}
      />

      <div className="mx-auto w-full max-w-[1440px] px-4 pb-16 sm:px-6 md:px-[39px]">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white">
              <Image src={car.brandLogo} alt={car.brand} width={32} height={32} className="object-contain" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{car.brand}</p>
              <h1 className="text-2xl font-extrabold text-gray-900">{car.model}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-colors hover:bg-white" aria-label="Wishlist">
              <Heart size={18} className="text-gray-500" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-colors hover:bg-white" aria-label="Share">
              <Share2 size={18} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div>
            <ImageGallery images={car.images} alt={car.model} />

            <div className="mt-6">
              <h2 className="mb-3 text-lg font-extrabold">Specifications</h2>
              <SpecsGrid specs={car.specs} />
            </div>

            <GeneralRules car={car} />

            <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-lg font-extrabold">How it feels to drive?</h2>
              <p className="mb-3 text-sm leading-7 text-gray-600">
                Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
              </p>
              <p className="mb-3 text-sm leading-7 text-gray-600">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.
              </p>
              <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50">
                SEE MORE
              </button>
            </div>

            <FaqAccordion />
          </div>

          <div>
            <BookingWidget
              carId={car.id}
              carBrand={car.brand}
              carModel={car.model}
              pricePerDay={car.pricePerDay}
              slug={car.slug}
            />
          </div>
        </div>

        <section className="mt-16">
          <h2 className="mb-2 text-center text-2xl font-extrabold">OTHER OPTIONS</h2>
          <p className="mb-6 text-center text-sm text-gray-500">
            Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
          </p>
          <div className="flex flex-wrap justify-center gap-5 xl:justify-start">
            {otherCars.slice(0, 4).map((otherCar) => (
              <CarCard key={otherCar.id} car={otherCar} />
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <button className="flex items-center gap-2 rounded-full border border-gray-300 px-8 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-white">
              SEE - 1,289 OTHER OPTIONS
            </button>
          </div>
        </section>

        <SeoSection />
      </div>
    </div>
  );
}
