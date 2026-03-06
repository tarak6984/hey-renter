'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Search / Selection Bar – pixel-perfect from Figma node 8937-42822
 *
 * Figma specs:
 *   Container: W=907px H=72px, bg=white, borderRadius=10, paddingLeft=16, gap=16 HORIZONTAL
 *   Border: 1px #F0F0F0 | shadow: 0 2px 4px rgba(0,0,0,0.06), 0 4px 6px rgba(0,0,0,0.1)
 *
 *   Fields: Brand(160px) | / | Model(160px) | / | Dates & Time(272px)
 *   Field layout: VERTICAL, gap=14px
 *   Label: TT Norms Pro 18px fw=500 lh=26px color=#000 (full black)
 *   Value: TT Norms Pro 18px fw=500 lh=26px color=#000
 *   Value row: HORIZONTAL gap=8px (value text + arrow_back_ios 24×24 black)
 *
 *   Dividers: diagonal LINE nodes (rendered as italic "/" separator)
 *
 *   CTA: W=174px H=72px (self-stretch), bg=#12151C (inactive) / #B8F04F (active)
 *   CTA text: SPOIL ME, TT Norms Pro 16px fw=500 lh=24px white/black
 *   CTA icon: search 20×20 white/black, gap=7px
 *   CTA borderRadius: 0 10px 10px 0 (right corners only)
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
        height: '72px',
        borderRadius: '10px',
        border: '1px solid #F0F0F0',
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.06), 0px 4px 6px -1px rgba(0,0,0,0.1)',
        paddingLeft: '16px',
        gap: '16px',
      }}
    >
      {/* ── Brand – 160px ── */}
      <SelectField
        label="Brand"
        value={brand}
        onChange={(v) => { setBrand(v); setModel('Any'); }}
        options={BRANDS}
        width={160}
      />

      {/* ── Diagonal divider ── */}
      <SlashDivider />

      {/* ── Model – 160px ── */}
      <SelectField
        label="Model"
        value={model}
        onChange={setModel}
        options={MODELS[brand] ?? ['Any']}
        width={160}
      />

      {/* ── Diagonal divider ── */}
      <SlashDivider />

      {/* ── Dates & Time – 272px ── */}
      <div
        className="flex flex-col flex-shrink-0"
        style={{ width: '272px', gap: '14px', justifyContent: 'center', height: '100%' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-tt-norms)',
            fontSize: '18px',
            fontWeight: 500,
            lineHeight: '26px',
            color: '#000000',
          }}
        >
          Dates &amp; Time
        </span>
        <div className="flex items-center" style={{ gap: '8px' }}>
          <input
            type="text"
            placeholder="Select"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="outline-none bg-transparent w-full"
            style={{
              fontFamily: 'var(--font-tt-norms)',
              fontSize: '18px',
              fontWeight: 500,
              lineHeight: '26px',
              color: '#000000',
            }}
          />
          <ArrowIcon />
        </div>
      </div>

      {/* ── SPOIL ME CTA ── */}
      <button
        onClick={handleSearch}
        className="flex items-center justify-center flex-shrink-0 transition-colors self-stretch"
        style={{
          width: '174px',
          gap: '7px',
          background: isSelected ? '#B8F04F' : '#12151C',
          color: isSelected ? '#000000' : '#ffffff',
          fontFamily: 'var(--font-tt-norms)',
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: '24px',
          letterSpacing: '0.08em',
          borderRadius: '0 10px 10px 0',
          border: 'none',
          cursor: 'pointer',
        }}
        aria-label="Search cars"
      >
        SPOIL ME
        <SearchIcon color={isSelected ? '#000000' : '#ffffff'} />
      </button>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

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
    <div
      className="flex flex-col flex-shrink-0"
      style={{ width: `${width}px`, gap: '14px', justifyContent: 'center', height: '100%' }}
    >
      <span
        style={{
          fontFamily: 'var(--font-tt-norms)',
          fontSize: '18px',
          fontWeight: 500,
          lineHeight: '26px',
          color: '#000000',
        }}
      >
        {label}
      </span>
      <div className="flex items-center" style={{ gap: '8px' }}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent outline-none cursor-pointer appearance-none w-full"
          style={{
            fontFamily: 'var(--font-tt-norms)',
            fontSize: '18px',
            fontWeight: 500,
            lineHeight: '26px',
            color: '#000000',
          }}
        >
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <ArrowIcon />
      </div>
    </div>
  );
}

/** Diagonal slash divider – matches Figma's italic "/" LINE separator */
function SlashDivider() {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center self-stretch"
      style={{ color: '#E0DFDF', fontSize: '28px', fontWeight: 300, lineHeight: 1, userSelect: 'none' }}
      aria-hidden
    >
      /
    </div>
  );
}

/** arrow_back_ios rotated 270° – 24×24 black chevron down */
function ArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M7 10l5 5 5-5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/** Search icon – 20×20 */
function SearchIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
