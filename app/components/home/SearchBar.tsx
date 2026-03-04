'use client';

import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

/**
 * Search / Selection Bar – pixel-perfect from Figma nodes:
 *   Not Selected: 4961:55543 | Selected: 4961:55575
 *
 * Figma specs (Selected state):
 * - Container: white bg, border #F0F0F0 1px, border-radius 10px
 *   box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.06), 0px 4px 6px -1px rgba(0,0,0,0.1)
 *   padding: 0 0 0 16px, gap: 16px
 * - Brand column: width 160px, gap 14px
 * - Model column: width 160px, gap 14px
 * - Date column:  width 272px, gap 14px
 * - Label: Body Large/Medium Black/50% (font-size 18px, weight 500)
 * - Value: Body Large/Medium Black/100%
 * - Dividers: #E0DFDF vertical lines
 * - SPOIL ME button (not selected): #12151C bg, white text, 174×72px
 * - SPOIL ME button (selected): #B8F04F bg, black text, 174×72px
 */

const BRANDS = ['Any', 'Ferrari', 'Lamborghini', 'Rolls Royce', 'Porsche', 'Mercedes', 'BMW', 'Audi', 'Brabus', 'Ford', 'KIA'];
const MODELS: Record<string, string[]> = {
  Any: ['Any'],
  Ferrari: ['Any', '812 GTS 2023', 'Purosangue 2024', 'SF90'],
  Lamborghini: ['Any', 'Urus 2023', 'Huracan', 'Aventador'],
  'Rolls Royce': ['Any', 'Cullinan Mansory 2024', 'Ghost', 'Phantom'],
  Porsche: ['Any', 'GT3 RS 2024', 'Cayenne', '911'],
  Mercedes: ['Any', 'SL 63 AMG 2022', 'G63 AMG', 'S-Class'],
  BMW: ['Any', 'M5', 'M8', 'X7'],
  Audi: ['Any', 'RS7', 'Q8', 'R8'],
  Brabus: ['Any', '800', '900'],
  Ford: ['Any', 'Mustang', 'Explorer'],
  KIA: ['Any', 'Stinger', 'EV6'],
};

export default function SearchBar() {
  const router = useRouter();
  const [brand, setBrand] = useState('Any');
  const [model, setModel] = useState('Any');
  const [dateTime, setDateTime] = useState('');

  const isSelected = brand !== 'Any' || model !== 'Any' || dateTime !== '';

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (brand !== 'Any') params.set('brand', brand);
    if (model !== 'Any') params.set('model', model);
    if (dateTime) params.set('dateTime', dateTime);
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <div
      className="flex items-center overflow-hidden bg-white w-full max-w-4xl mx-auto"
      style={{
        borderRadius: 10,
        border: '1px solid #F0F0F0',
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.06), 0px 4px 6px -1px rgba(0,0,0,0.1)',
        paddingLeft: 16,
        gap: 16,
      }}
    >
      {/* Brand – width 160px */}
      <SelectField
        label="Brand"
        value={brand}
        onChange={(v) => { setBrand(v); setModel('Any'); }}
        options={BRANDS}
        width={160}
      />

      {/* Divider */}
      <Divider />

      {/* Model – width 160px */}
      <SelectField
        label="Model"
        value={model}
        onChange={setModel}
        options={MODELS[brand] ?? ['Any']}
        width={160}
      />

      {/* Divider */}
      <Divider />

      {/* Dates & Time – width 272px */}
      <div className="flex flex-col py-4" style={{ width: 272, gap: 14, flexShrink: 0 }}>
        <span style={{ fontSize: 18, fontWeight: 500, lineHeight: '1.44em', color: 'rgba(0,0,0,0.5)' }}>
          Dates &amp; Time
        </span>
        <div className="flex items-center justify-between" style={{ gap: 8 }}>
          <input
            type="text"
            placeholder="Select"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="outline-none bg-transparent w-full"
            style={{ fontSize: 18, fontWeight: 500, lineHeight: '1.44em', color: '#000' }}
          />
          <ChevronDown size={24} className="text-gray-400 flex-shrink-0" />
        </div>
      </div>

      {/* SPOIL ME CTA – 174×72px. Active: #B8F04F + black text. Inactive: #12151C + white text */}
      <button
        onClick={handleSearch}
        className="flex items-center justify-center gap-1.5 flex-shrink-0 font-medium transition-colors"
        style={{
          width: 174,
          height: 72,
          background: isSelected ? '#B8F04F' : '#12151C',
          color: isSelected ? '#000000' : '#ffffff',
          fontSize: 16,
          fontWeight: 500,
          letterSpacing: '0.02em',
          borderRadius: 0,
        }}
        aria-label="Search cars"
      >
        SPOIL ME
        <Search size={20} />
      </button>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────────────────────────── */

function SelectField({
  label, value, onChange, options, width,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  width: number;
}) {
  return (
    <div className="flex flex-col py-4 relative flex-shrink-0" style={{ width, gap: 14 }}>
      {/* Label: Body Large/Medium Black/50% */}
      <span style={{ fontSize: 18, fontWeight: 500, lineHeight: '1.44em', color: 'rgba(0,0,0,0.5)' }}>
        {label}
      </span>
      {/* Value row */}
      <div className="flex items-center justify-between" style={{ gap: 8 }}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent outline-none cursor-pointer appearance-none w-full"
          style={{ fontSize: 18, fontWeight: 500, lineHeight: '1.44em', color: '#000' }}
        >
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown size={24} className="text-gray-400 pointer-events-none flex-shrink-0" />
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div
      className="flex-shrink-0 self-stretch"
      style={{ width: 1, background: '#E0DFDF', margin: '16px 0' }}
    />
  );
}
