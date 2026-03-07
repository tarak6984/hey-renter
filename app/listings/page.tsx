'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import SearchBar from '@/app/components/home/SearchBar';
import CarCard from '@/app/components/listings/CarCard';
import FilterBar from '@/app/components/listings/FilterBar';
import Pagination from '@/app/components/listings/Pagination';
import SeoSection from '@/app/components/ui/SeoSection';
import { MOCK_CARS } from '@/app/constants';

const CARS_PER_PAGE = 8;

/**
 * Listings page - search bar at top, filter bar, car grid, pagination, SEO section.
 */
export default function ListingsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-gray-400">
          Loading...
        </div>
      }
    >
      <ListingsContent />
    </Suspense>
  );
}

function ListingsContent() {
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand') || 'Any';
  const model = searchParams.get('model') || 'Any';
  const dateTime = searchParams.get('dateTime') || '';

  return (
    <ListingsResults
      key={`${brand}|${model}|${dateTime}`}
      brand={brand}
      model={model}
      dateTime={dateTime}
    />
  );
}

function ListingsResults({
  brand,
  model,
  dateTime,
}: {
  brand: string;
  model: string;
  dateTime: string;
}) {
  const [page, setPage] = useState(1);
  const allCars = useMemo(() => {
    const filtered = MOCK_CARS.filter((car) => {
      if (brand !== 'Any' && car.brand.toLowerCase() !== brand.toLowerCase()) return false;
      if (model !== 'Any' && car.model.toLowerCase() !== model.toLowerCase()) return false;
      return true;
    });

    const repeated: typeof MOCK_CARS = [];
    while (repeated.length < Math.max(filtered.length, 16) && filtered.length > 0) {
      repeated.push(...filtered);
    }

    return filtered.length > 0 ? repeated.slice(0, Math.max(filtered.length, 16)) : [];
  }, [brand, model]);

  const paginatedCars = allCars.slice((page - 1) * CARS_PER_PAGE, page * CARS_PER_PAGE);
  const totalPages = Math.max(1, Math.ceil(allCars.length / CARS_PER_PAGE));

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="border-b border-gray-200 bg-[#F5F5F5] px-4 py-6 sm:px-6 md:px-[39px]">
        <div className="mx-auto flex w-full max-w-[1440px] justify-center">
          <SearchBar
            initialBrand={brand}
            initialModel={model}
            initialDateTime={dateTime}
            destinationPath="/listings"
            navigationMode="replace"
          />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 md:px-[39px]">
        <FilterBar total={280} />

        <div className="mt-6 flex flex-wrap justify-center gap-6 xl:justify-start">
          {paginatedCars.map((car, i) => (
            <CarCard key={`${car.id}-${i}`} car={car} />
          ))}
        </div>

        {allCars.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-black/10 bg-white px-6 py-10 text-center text-black/60">
            No cars matched your current search.
          </div>
        ) : (
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        )}

        <div className="my-6 flex justify-center">
          <button className="flex items-center gap-2 rounded-full border border-gray-300 px-8 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-gray-500 hover:bg-white">
            SEE - 1,289 OTHER OPTIONS
            <ChevronDown size={15} />
          </button>
        </div>

        <SeoSection />
      </div>
    </div>
  );
}
