'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronDown, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CarCard from '@/app/components/listings/CarCard';
import FilterBar from '@/app/components/listings/FilterBar';
import Pagination from '@/app/components/listings/Pagination';
import SeoSection from '@/app/components/ui/SeoSection';
import { MOCK_CARS, CAR_BRANDS } from '@/app/constants';

const BRANDS = ['Any', ...CAR_BRANDS.map(b => b.name)];
const MODELS = ['Any', '812 GTS 2023', 'Urus 2023', 'Cullinan', 'GT3 RS 2024', 'SL 63 AMG 2022'];
const CARS_PER_PAGE = 8;

/**
 * Listings page – search bar at top, filter bar, 4-column car grid, pagination, SEO section.
 */
export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>}>
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

  // Simulate more results by repeating mock data
  const allCars = useMemo(() => {
    const filtered = MOCK_CARS.filter(car => {
      if (brand !== 'Any' && car.brand.toLowerCase() !== brand.toLowerCase()) return false;
      return true;
    });
    // Repeat to simulate 280 results
    const repeated: typeof MOCK_CARS = [];
    while (repeated.length < 16) repeated.push(...filtered);
    return repeated.slice(0, 16);
  }, [brand]);

  const paginatedCars = allCars.slice((page - 1) * CARS_PER_PAGE, page * CARS_PER_PAGE);
  const totalPages = Math.ceil(allCars.length / CARS_PER_PAGE);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (brand !== 'Any') params.set('brand', brand);
    if (model !== 'Any') params.set('model', model);
    if (dateTime) params.set('dateTime', dateTime);
    router.replace(`/listings?${params.toString()}`);
    setPage(1);
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      {/* Search bar – pixel-perfect from Figma node 8937:44972 (Selected state) */}
      <div className="bg-[#F5F5F5] border-b border-gray-200 py-6 px-[39px]">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div
            className="flex items-center overflow-hidden bg-white"
            style={{
              borderRadius: 10,
              border: '1px solid #F0F0F0',
              boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.06), 0px 4px 6px -1px rgba(0,0,0,0.1)',
              paddingLeft: 16,
              gap: 16,
            }}
          >
            {/* Brand – 160px */}
            <SearchSelect label="Brand" value={brand} onChange={setBrand} options={BRANDS} width={160} />
            <div className="self-stretch flex-shrink-0" style={{ width: 1, background: '#E0DFDF', margin: '16px 0' }} />
            {/* Model – 160px */}
            <SearchSelect label="Model" value={model} onChange={setModel} options={MODELS} width={160} />
            <div className="self-stretch flex-shrink-0" style={{ width: 1, background: '#E0DFDF', margin: '16px 0' }} />
            {/* Dates & Time – 272px */}
            <div className="flex flex-col py-4 flex-shrink-0" style={{ width: 272, gap: 14 }}>
              <span style={{ fontSize: 18, fontWeight: 500, color: 'rgba(0,0,0,0.5)' }}>Dates &amp; Time</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Select"
                  value={dateTime}
                  onChange={e => setDateTime(e.target.value)}
                  className="outline-none bg-transparent flex-1"
                  style={{ fontSize: 18, fontWeight: 500, color: '#000' }}
                />
                <ChevronDown size={24} className="text-gray-400 flex-shrink-0" />
              </div>
            </div>
            {/* SPOIL ME – 174×72px, lime green when selected */}
            <button
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 flex-shrink-0 font-medium transition-colors"
              style={{
                width: 174,
                height: 72,
                background: (brand !== 'Any' || model !== 'Any' || dateTime) ? '#B8F04F' : '#12151C',
                color: (brand !== 'Any' || model !== 'Any' || dateTime) ? '#000' : '#fff',
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              SPOIL ME <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <FilterBar total={280} />

        {/* Car grid – Figma card width 318px, gap from design */}
        <div className="flex flex-wrap gap-6 mt-6 justify-start">
          {paginatedCars.map((car, i) => (
            <CarCard key={`${car.id}-${i}`} car={car} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

        {/* See other options CTA */}
        <div className="flex justify-center my-6">
          <button className="border border-gray-300 rounded-full px-8 py-3 text-sm font-semibold text-gray-700 hover:bg-white hover:border-gray-500 transition-all flex items-center gap-2">
            SEE – 1,289 OTHER OPTIONS
            <ChevronDown size={15} />
          </button>
        </div>

        {/* SEO */}
        <SeoSection />
      </div>
    </div>
  );
}

function SearchSelect({ label, value, onChange, options, width }: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; width: number;
}) {
  return (
    <div className="flex flex-col py-4 flex-shrink-0" style={{ width, gap: 14 }}>
      <span style={{ fontSize: 18, fontWeight: 500, color: 'rgba(0,0,0,0.5)' }}>{label}</span>
      <div className="flex items-center gap-2">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="bg-transparent outline-none cursor-pointer appearance-none w-full"
          style={{ fontSize: 18, fontWeight: 500, color: '#000' }}
        >
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown size={24} className="text-gray-400 pointer-events-none flex-shrink-0" />
      </div>
    </div>
  );
}
