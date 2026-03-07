'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import PickupModal from '@/app/components/car-profile/PickupModal';

const BRAND_OPTIONS = [
  { label: 'Any', logo: null },
  { label: 'Ferrari', logo: '/assets/brands/ferrari.png' },
  { label: 'Lamborghini', logo: null },
  { label: 'Rolls Royce', logo: '/assets/brands/rolls-royce.png' },
  { label: 'Porsche', logo: '/assets/brands/porsche.png' },
  { label: 'Mercedes', logo: '/assets/brands/mercedes.png' },
  { label: 'BMW', logo: null },
  { label: 'Audi', logo: '/assets/brands/audi.png' },
  { label: 'Brabus', logo: '/assets/brands/brabus.png' },
  { label: 'Ford', logo: '/assets/brands/ford.png' },
  { label: 'KIA', logo: '/assets/brands/kia.png' },
] as const;

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

interface SearchBarProps {
  initialBrand?: string;
  initialModel?: string;
  initialDateTime?: string;
  destinationPath?: string;
  navigationMode?: 'push' | 'replace';
}

export default function SearchBar({
  initialBrand = 'Any',
  initialModel = 'Any',
  initialDateTime = '',
  destinationPath = '/listings',
  navigationMode = 'push',
}: SearchBarProps) {
  const router = useRouter();
  const [brand, setBrand] = useState(initialBrand);
  const [model, setModel] = useState(initialModel);
  const [dateTime, setDateTime] = useState(initialDateTime);
  const [modalOpen, setModalOpen] = useState(false);
  const availableModels = MODELS[brand] ?? ['Any'];
  const safeModel = availableModels.includes(model) ? model : 'Any';

  const isSelected = brand !== 'Any' || safeModel !== 'Any' || dateTime !== '';

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (brand !== 'Any') params.set('brand', brand);
    if (safeModel !== 'Any') params.set('model', safeModel);
    if (dateTime) params.set('dateTime', dateTime);

    const target = params.toString() ? `${destinationPath}?${params.toString()}` : destinationPath;
    if (navigationMode === 'replace') {
      router.replace(target);
      return;
    }

    router.push(target);
  };

  return (
    <>
      <div
        className="hidden w-full max-w-[907px] items-stretch overflow-visible bg-white md:flex"
        style={{
          height: '72px',
          borderRadius: '10px',
          border: '1px solid #F0F0F0',
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.06), 0px 4px 6px -1px rgba(0,0,0,0.1)',
          paddingLeft: '16px',
          gap: '16px',
        }}
      >
        <BrandSelectField
          label="Brand"
          value={brand}
          onChange={(value) => {
            setBrand(value);
            setModel('Any');
          }}
          options={BRAND_OPTIONS}
          width={160}
        />

        <SlashDivider />

        <SelectField
          label="Model"
          value={safeModel}
          onChange={setModel}
          options={availableModels}
          width={160}
        />

        <SlashDivider />

        <button
          className="flex flex-shrink-0 flex-col text-left"
          style={{
            width: '272px',
            gap: '2px',
            justifyContent: 'flex-start',
            height: '100%',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '9px 0 9px',
          }}
          onClick={() => setModalOpen(true)}
        >
          <span
            style={{
              fontFamily: 'var(--font-tt-norms)',
              fontSize: '18px',
              fontWeight: 500,
              lineHeight: '26px',
              color: 'rgba(0,0,0,0.4)',
            }}
          >
            Dates &amp; Time
          </span>
          <div className="flex items-center" style={{ gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-tt-norms)',
                fontSize: '18px',
                fontWeight: 500,
                lineHeight: '26px',
                color: '#000000',
              }}
            >
              {dateTime || 'Select'}
            </span>
            <ArrowIcon expanded={modalOpen} />
          </div>
        </button>

        <button
          onClick={handleSearch}
          className="relative flex-shrink-0 self-stretch transition-colors"
          style={{
            width: '174px',
            background: isSelected ? '#B8F04F' : '#12151C',
            color: isSelected ? '#000000' : '#ffffff',
            border: '1px solid #F0F0F0',
            cursor: 'pointer',
            clipPath: 'polygon(49px 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '0 10px 10px 0',
          }}
          aria-label="Search cars"
        >
          <span
            className="absolute flex items-center whitespace-nowrap"
            style={{
              left: '54px',
              top: '50%',
              width: '103px',
              height: '17.45px',
              gap: '7px',
              transform: 'translateY(-50%)',
              fontFamily: 'var(--font-tt-norms)',
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '24px',
              letterSpacing: '0',
            }}
          >
            <span className="flex items-center">SPOIL ME</span>
            <SearchIcon color={isSelected ? '#000000' : '#ffffff'} />
          </span>
        </button>
      </div>

      <div className="w-full max-w-[420px] rounded-[10px] border border-[#F0F0F0] bg-white p-4 shadow-[0px_2px_4px_-1px_rgba(0,0,0,0.06),0px_4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden">
        <div className="space-y-4">
          <MobileSelectField
            label="Brand"
            value={brand}
            options={BRAND_OPTIONS.map((option) => option.label)}
            onChange={(value) => {
              setBrand(value);
              setModel('Any');
            }}
          />
          <MobileSelectField
            label="Model"
            value={model}
            options={availableModels}
            onChange={setModel}
          />
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex w-full items-center justify-between rounded-[10px] border border-black/10 px-4 py-3 text-left"
          >
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-black/40">Dates &amp; Time</span>
              <span className="text-base font-medium text-black">{dateTime || 'Select'}</span>
            </div>
            <ArrowIcon expanded={modalOpen} />
          </button>
          <button
            type="button"
            onClick={handleSearch}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-[10px] font-medium transition-colors"
            style={{
              background: isSelected ? '#B8F04F' : '#12151C',
              color: isSelected ? '#000000' : '#ffffff',
            }}
          >
            SPOIL ME
            <SearchIcon color={isSelected ? '#000000' : '#ffffff'} />
          </button>
        </div>
      </div>

      <PickupModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={(value) => {
          setDateTime(value);
          setModalOpen(false);
        }}
      />
    </>
  );
}

function MobileSelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
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

function BrandSelectField({
  label,
  value,
  onChange,
  options,
  width,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { label: string; logo: string | null }[];
  width: number;
}) {
  const [open, setOpen] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.label === value) ?? options[0];

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event: MouseEvent) => {
      if (!fieldRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <div
      ref={fieldRef}
      className="relative flex flex-shrink-0 flex-col"
      style={{
        width: `${width}px`,
        gap: '2px',
        justifyContent: 'flex-start',
        height: '100%',
        paddingTop: '9px',
        paddingBottom: '9px',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-tt-norms)',
          fontSize: '18px',
          fontWeight: 500,
          lineHeight: '26px',
          color: 'rgba(0,0,0,0.4)',
        }}
      >
        {label}
      </span>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center justify-between bg-transparent text-left outline-none"
        style={{
          minHeight: '26px',
          padding: 0,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span className="flex min-w-0 items-center" style={{ gap: '8px' }}>
          <BrandLogo label={selected.label} src={selected.logo} />
          <span
            style={{
              fontFamily: 'var(--font-tt-norms)',
              fontSize: '18px',
              fontWeight: 500,
              lineHeight: '26px',
              color: '#000000',
            }}
          >
            {selected.label}
          </span>
        </span>
        <ArrowIcon expanded={open} />
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label={label}
          className="absolute left-0 top-[calc(100%+8px)] z-30 overflow-y-auto rounded-[12px] bg-white"
          style={{
            width: '220px',
            maxHeight: '320px',
            border: '1px solid #E5E5E5',
            boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 10px 10px -5px rgba(0,0,0,0.04)',
            padding: '8px',
          }}
        >
          {options.map((option) => {
            const active = option.label === value;

            return (
              <button
                key={option.label}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(option.label);
                  setOpen(false);
                }}
                className="flex w-full items-center rounded-[10px] text-left transition-colors"
                style={{
                  gap: '10px',
                  padding: '10px 12px',
                  background: active ? 'rgba(18,21,28,0.06)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <BrandLogo label={option.label} src={option.logo} />
                <span
                  style={{
                    fontFamily: 'var(--font-tt-norms)',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '24px',
                    color: '#000000',
                  }}
                >
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function BrandLogo({ label, src }: { label: string; src: string | null }) {
  if (label === 'Any') {
    return null;
  }

  if (!src) {
    return (
      <span
        aria-hidden
        className="flex items-center justify-center rounded-full"
        style={{
          width: '20px',
          height: '20px',
          background: 'rgba(18,21,28,0.08)',
          color: '#12151C',
          fontFamily: 'var(--font-tt-norms)',
          fontSize: '10px',
          fontWeight: 700,
          lineHeight: '10px',
          flexShrink: 0,
        }}
      >
        {label.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className="relative flex-shrink-0 overflow-hidden rounded-full bg-white"
      style={{
        width: '20px',
        height: '20px',
        border: '1px solid rgba(18,21,28,0.08)',
      }}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-contain p-[2px]"
        sizes="20px"
      />
    </span>
  );
}

function SelectField({
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
    <div
      className="flex flex-shrink-0 flex-col"
      style={{
        width: `${width}px`,
        gap: '2px',
        justifyContent: 'flex-start',
        height: '100%',
        paddingTop: '9px',
        paddingBottom: '9px',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-tt-norms)',
          fontSize: '18px',
          fontWeight: 500,
          lineHeight: '26px',
          color: 'rgba(0,0,0,0.4)',
        }}
      >
        {label}
      </span>
      <div className="flex items-center" style={{ gap: '8px' }}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none cursor-pointer bg-transparent outline-none"
          style={{
            fontFamily: 'var(--font-tt-norms)',
            fontSize: '18px',
            fontWeight: 500,
            lineHeight: '26px',
            color: '#000000',
          }}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ArrowIcon />
      </div>
    </div>
  );
}

function SlashDivider() {
  return (
    <svg
      aria-hidden
      width="23"
      height="33"
      viewBox="0 0 23 33"
      className="flex-shrink-0 self-center"
    >
      <path d="M1 32L22 1" stroke="#E0DFDF" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon({ expanded = false }: { expanded?: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        flexShrink: 0,
        margin: '0 auto',
        transform: expanded ? 'rotate(90deg)' : 'rotate(-90deg)',
        transition: 'transform 180ms ease',
      }}
    >
      <path
        d="M15.5 6L9.5 12L15.5 18"
        stroke="#000000"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon({ color }: { color: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
