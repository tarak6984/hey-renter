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
    <div className="min-h-screen overflow-x-hidden bg-[#f5f5f5]">
      <section className="bg-[#f5f5f5]">
        <div className="mx-auto w-full max-w-[760px] px-4 py-8 sm:px-6 md:max-w-[1440px] md:px-[39px]">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Super Cars', href: '/listings?category=super' },
              { label: car.model },
            ]}
            className="max-w-none px-0 py-0"
            itemClassName="gap-4"
            linkClassName="text-[18px] font-medium leading-[26px] text-black hover:text-black"
            currentClassName="text-[18px] font-normal leading-[26px] text-black/40"
            separatorClassName="h-4 w-4 text-black"
          />

          <div className="mt-8 flex flex-col items-center gap-5 text-center sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden">
                <Image
                  src={car.brandLogo}
                  alt={car.brand}
                  width={56}
                  height={56}
                  className="h-14 w-14 object-contain"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[18px] font-normal leading-[26px] text-black">{car.brand}</p>
                <h1 className="text-[24px] font-bold leading-[30px] text-black">{car.model}</h1>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                className="flex h-14 w-14 items-center justify-center rounded-[10px] bg-white text-black shadow-[0_2px_6px_rgba(0,0,0,0.06),0_6px_16px_rgba(0,0,0,0.08)] transition-colors hover:bg-white/90"
                aria-label="Wishlist"
              >
                <Heart size={28} strokeWidth={2.2} />
              </button>
              <button
                className="flex h-14 w-14 items-center justify-center rounded-[10px] bg-white text-black shadow-[0_2px_6px_rgba(0,0,0,0.06),0_6px_16px_rgba(0,0,0,0.08)] transition-colors hover:bg-white/90"
                aria-label="Share"
              >
                <Share2 size={28} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[760px] px-4 pb-16 sm:px-6 md:max-w-[1440px] md:px-[39px]">
        <div className="grid min-w-0 items-start gap-[30px] xl:grid-cols-[minmax(0,898px)_434px]">
          <div className="min-w-0 w-full">
            <ImageGallery images={car.images} alt={car.model} noDeposit={car.noDeposit} />

            <div className="mt-[30px]">
              <SpecsGrid specs={car.specs} />
            </div>

            <GeneralRules car={car} />

            <section className="mt-[30px] min-w-0 overflow-hidden rounded-[20px] bg-white px-4 py-5 shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06),0_4px_6px_-1px_rgba(0,0,0,0.1)] sm:px-6 sm:py-6">
              <div className="flex flex-col items-center gap-6">
                <h2 className="w-full text-center text-[18px] font-medium leading-[26px] text-black">
                  How it feels to drive?
                </h2>

                <p className="w-full whitespace-pre-line text-center text-[15px] font-normal leading-6 text-black sm:text-[16px] sm:leading-[24px]">
                  {`Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.but also the leap into electronic typesetting, remaining essentially unchanged.

It is a long established fact that a reader.`}
                </p>

                <button className="flex h-14 w-full items-center justify-center gap-2 rounded-[10px] border-2 border-black/10 bg-black/[0.06] px-4 text-[16px] font-medium leading-[24px] text-black transition-colors hover:bg-black/[0.08] sm:px-5 sm:pl-6">
                  SEE MORE
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M2.11328 5.25332L3.05328 4.31332L7.99995 9.25332L12.9466 4.31332L13.8866 5.25332L7.99995 11.14L2.11328 5.25332Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </section>

          </div>

          <div className="min-w-0 w-full">
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
          <div className="flex flex-col items-center gap-6">
            <h2
              className="text-center text-black"
              style={{
                fontFamily: 'var(--font-clash)',
                fontSize: 'clamp(24px, 6vw, 30px)',
                fontWeight: 600,
                lineHeight: '38px',
              }}
            >
              OTHER OPTIONS
            </h2>
            <p className="text-center text-[16px] font-normal leading-6 text-black sm:text-[18px] sm:leading-[26px]">
            Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
            </p>
          </div>
          <div className="mt-10 grid justify-items-center gap-[30px] sm:grid-cols-2 xl:grid-cols-4">
            {otherCars.slice(0, 4).map((otherCar) => (
              <CarCard key={otherCar.id} car={otherCar} />
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <button className="flex h-14 w-full items-center justify-center gap-2 rounded-[10px] border-2 border-black px-4 text-center text-[16px] font-medium leading-6 text-black transition-colors hover:bg-white/70 sm:px-5 sm:pl-6 sm:text-[18px] sm:leading-[26px]">
              SEE - 1,289 OTHER OPTIONS
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M7.41016 16.59L12.0002 12L7.41016 7.41L8.83016 6L14.8302 12L8.83016 18L7.41016 16.59Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </section>

        <FaqAccordion />

        <SeoSection />
      </div>
    </div>
  );
}
