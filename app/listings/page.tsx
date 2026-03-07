'use client';

import { Suspense, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, Search } from 'lucide-react';
import CarCard from '@/app/components/listings/CarCard';
import FilterBar from '@/app/components/listings/FilterBar';
import Pagination from '@/app/components/listings/Pagination';
import SeoSection from '@/app/components/ui/SeoSection';
import { CAR_BRANDS, MOCK_CARS } from '@/app/constants';

const BRANDS = ['Any', ...CAR_BRANDS.map((brand) => brand.name)];
const MODELS = ['Any', '812 GTS 2023', 'Urus 2023', 'Cullinan', 'GT3 RS 2024', 'SL 63 AMG 2022'];
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
  const router = useRouter();

  const [brand, setBrand] = useState(searchParams.get('brand') || 'Any');
  const [model, setModel] = useState(searchParams.get('model') || 'Any');
  const [dateTime, setDateTime] = useState(searchParams.get('dateTime') || '');
  const [page, setPage] = useState(1);

  const allCars = useMemo(() => {
    const filtered = MOCK_CARS.filter((car) => {
      if (brand !== 'Any' && car.brand.toLowerCase() !== brand.toLowerCase()) return false;
      return true;
    });

    const repeated: typeof MOCK_CARS = [];
    while (repeated.length < 16) repeated.push(...filtered);
    return repeated.slice(0, 16);
  }, [brand]);

  const paginatedCars = allCars.slice((page - 1) * CARS_PER_PAGE, page * CARS_PER_PAGE);
  const totalPages = Math.ceil(allCars.length / CARS_PER_PAGE);
  const isSelected = brand !== 'Any' || model !== 'Any' || dateTime !== '';

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (brand !== 'Any') params.set('brand', brand);
    if (model !== 'Any') params.set('model', model);
    if (dateTime) params.set('dateTime', dateTime);
    router.replace(`/listings?${params.toString()}`);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="border-b border-gray-200 bg-[#F5F5F5] px-4 py-6 sm:px-6 md:px-[39px]">
        <div className="mx-auto flex w-full max-w-[1440px] justify-center">
          <div className="w-full max-w-[926px] rounded-[10px] border border-[#F0F0F0] bg-white p-4 shadow-[0px_2px_4px_-1px_rgba(0,0,0,0.06),0px_4px_6px_-1px_rgba(0,0,0,0.1)] lg:hidden">
            <div className="space-y-4">
              <MobileSearchField label="Brand" value={brand} onChange={setBrand} options={BRANDS} />
              <MobileSearchField label="Model" value={model} onChange={setModel} options={MODELS} />
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-black/40">Dates &amp; Time</span>
                <input
                  type="text"
                  placeholder="Select"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="h-12 rounded-[10px] border border-black/10 bg-white px-4 text-base font-medium text-black outline-none"
                />
              </label>
              <button
                onClick={handleSearch}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-[10px] text-base font-medium transition-colors"
                style={{
                  background: isSelected ? '#B8F04F' : '#12151C',
                  color: isSelected ? '#000' : '#fff',
                }}
              >
                SPOIL ME
                <Search size={18} />
              </button>
            </div>
          </div>

          <div
            className="hidden w-full max-w-[926px] items-center overflow-hidden bg-white lg:flex"
            style={{
              borderRadius: 10,
              border: '1px solid #F0F0F0',
              boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.06), 0px 4px 6px -1px rgba(0,0,0,0.1)',
              paddingLeft: 16,
              gap: 16,
            }}
          >
            <SearchSelect label="Brand" value={brand} onChange={setBrand} options={BRANDS} width={160} />
            <div className="self-stretch flex-shrink-0" style={{ width: 1, background: '#E0DFDF', margin: '16px 0' }} />
            <SearchSelect label="Model" value={model} onChange={setModel} options={MODELS} width={160} />
            <div className="self-stretch flex-shrink-0" style={{ width: 1, background: '#E0DFDF', margin: '16px 0' }} />
            <div className="flex flex-shrink-0 flex-col py-4" style={{ width: 272, gap: 14 }}>
              <span style={{ fontSize: 18, fontWeight: 500, color: 'rgba(0,0,0,0.5)' }}>Dates &amp; Time</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Select"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="flex-1 bg-transparent outline-none"
                  style={{ fontSize: 18, fontWeight: 500, color: '#000' }}
                />
                <ChevronDown size={24} className="flex-shrink-0 text-gray-400" />
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="flex flex-shrink-0 items-center justify-center gap-2 font-medium transition-colors"
              style={{
                width: 174,
                height: 72,
                background: isSelected ? '#B8F04F' : '#12151C',
                color: isSelected ? '#000' : '#fff',
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              SPOIL ME <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 md:px-[39px]">
        <FilterBar total={280} />

        <div className="mt-6 flex flex-wrap justify-center gap-6 xl:justify-start">
          {paginatedCars.map((car, i) => (
            <CarCard key={`${car.id}-${i}`} car={car} />
          ))}
        </div>

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

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

function SearchSelect({
  label,
  value,
  onChange,
  options,
  width,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  width: number;
}) {
  return (
    <div className="flex flex-shrink-0 flex-col py-4" style={{ width, gap: 14 }}>
      <span style={{ fontSize: 18, fontWeight: 500, color: 'rgba(0,0,0,0.5)' }}>{label}</span>
      <div className="flex items-center gap-2">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none cursor-pointer bg-transparent outline-none"
          style={{ fontSize: 18, fontWeight: 500, color: '#000' }}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown size={24} className="pointer-events-none flex-shrink-0 text-gray-400" />
      </div>
    </div>
  );
}

function MobileSearchField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium text-black/40">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-[10px] border border-black/10 bg-white px-4 text-base font-medium text-black outline-none"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
