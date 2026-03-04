'use client';

import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BRANDS = ['Any', 'Ferrari', 'Lamborghini', 'Rolls Royce', 'Porsche', 'Mercedes', 'BMW', 'Audi'];
const MODELS: Record<string, string[]> = {
  Any: ['Any'],
  Ferrari: ['Any', '812 GTS', 'Purosangue', 'SF90'],
  Lamborghini: ['Any', 'Urus', 'Huracan', 'Aventador'],
  'Rolls Royce': ['Any', 'Cullinan', 'Ghost', 'Phantom'],
  Porsche: ['Any', 'GT3 RS', 'Cayenne', '911'],
  Mercedes: ['Any', 'SL 63 AMG', 'G63', 'S-Class'],
  BMW: ['Any', 'M5', 'M8', 'X7'],
  Audi: ['Any', 'RS7', 'Q8', 'R8'],
};

/**
 * Home page search bar – Brand / Model / Dates & Time selectors + SPOIL ME CTA.
 */
export default function SearchBar() {
  const router = useRouter();
  const [brand, setBrand] = useState('Any');
  const [model, setModel] = useState('Any');
  const [dateTime, setDateTime] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (brand !== 'Any') params.set('brand', brand);
    if (model !== 'Any') params.set('model', model);
    if (dateTime) params.set('dateTime', dateTime);
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl mx-auto max-w-3xl px-2 py-2 flex flex-col md:flex-row items-stretch gap-0 -mt-6 relative z-20">
      {/* Brand */}
      <SelectField
        label="Brand"
        value={brand}
        onChange={(v) => { setBrand(v); setModel('Any'); }}
        options={BRANDS}
      />
      <Divider />

      {/* Model */}
      <SelectField
        label="Model"
        value={model}
        onChange={setModel}
        options={MODELS[brand] ?? ['Any']}
      />
      <Divider />

      {/* Dates & Time */}
      <div className="flex-1 flex flex-col justify-center px-4 py-2">
        <span className="text-xs text-gray-400 font-medium mb-0.5">Dates &amp; Time</span>
        <input
          type="text"
          placeholder="Select"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="text-sm font-medium text-gray-700 outline-none bg-transparent placeholder-gray-400 w-full"
        />
      </div>

      {/* CTA */}
      <button
        onClick={handleSearch}
        className="bg-black text-white font-bold text-sm rounded-xl px-6 py-3 flex items-center gap-2 hover:bg-gray-900 transition-colors whitespace-nowrap"
      >
        SPOIL ME
        <Search size={15} />
      </button>
    </div>
  );
}

function SelectField({
  label, value, onChange, options,
}: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div className="flex-1 flex flex-col justify-center px-4 py-2 relative group">
      <span className="text-xs text-gray-400 font-medium mb-0.5">{label}</span>
      <div className="flex items-center gap-1">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-sm font-medium text-gray-700 bg-transparent outline-none cursor-pointer appearance-none w-full"
        >
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown size={14} className="text-gray-400 pointer-events-none flex-shrink-0" />
      </div>
    </div>
  );
}

function Divider() {
  return <div className="hidden md:block w-px bg-gray-200 my-2" />;
}
