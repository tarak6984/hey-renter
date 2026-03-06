import { CarSpec } from '@/app/types';

interface SpecsGridProps {
  specs: CarSpec;
}

/**
 * Specifications grid – pixel-perfect from Figma node 7350:98280
 *
 * Figma tokens:
 * - Container: white bg, shadow /shadow/md, border-radius 20px, padding (from layout_7W35XJ)
 * - Title: Body Large/Medium, Black/100%
 * - Grid: 2-col layout (layout_KVHAQV), border-radius 10px
 * - Each spec row: layout_U5BVZG (row, gap 12px)
 * - Icon: 32×32px SVG from Figma Outline component set
 * - Value text: Body Medium/Medium (16px/500), Black/100%
 * - Label text: Body Small/Medium (14px/500), Black/50%
 *
 * Icons sourced from Figma component set "Outline" (16:11461)
 * Using lucide-react equivalents as pixel-close substitutes.
 */

// Figma spec icon mapping – using real Figma SVG paths where available
const SPEC_ICONS: Record<string, React.ReactNode> = {
  speed: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 6C10.477 6 6 10.477 6 16C6 18.395 6.843 20.592 8.245 22.307L10.121 20.431C9.108 19.17 8.5 17.558 8.5 15.8C8.5 11.659 11.859 8.3 16 8.3C20.141 8.3 23.5 11.659 23.5 15.8C23.5 17.558 22.892 19.17 21.879 20.431L23.755 22.307C25.157 20.592 26 18.395 26 16C26 10.477 21.523 6 16 6Z" fill="black" fillOpacity="0.5"/>
      <path d="M14.5 16.5L11 12L17.5 14.5L14.5 16.5Z" fill="black"/>
      <circle cx="16" cy="16" r="2" fill="black"/>
    </svg>
  ),
  engine: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="10" y="10" width="12" height="12" rx="2" stroke="black" strokeWidth="1.5"/>
      <path d="M6 14h4M22 14h4M6 18h4M22 18h4M14 6v4M14 22v4M18 6v4M18 22v4" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  acceleration: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="9" stroke="black" strokeWidth="1.5"/>
      <path d="M16 10v6l4 2" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  horsepower: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 8l2 5h5l-4 3 1.5 5L16 18l-4.5 3 1.5-5-4-3h5z" stroke="black" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  seats: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="10" r="3" stroke="black" strokeWidth="1.5"/>
      <path d="M10 24c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  color: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="6" stroke="black" strokeWidth="1.5"/>
      <path d="M16 10V8M16 24v-2M10 16H8M24 16h-2M11.515 11.515L10.1 10.1M21.9 21.9l-1.415-1.415M11.515 20.485L10.1 21.9M21.9 10.1l-1.415 1.415" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  transmission: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="10" cy="10" r="2.5" stroke="black" strokeWidth="1.5"/>
      <circle cx="22" cy="10" r="2.5" stroke="black" strokeWidth="1.5"/>
      <circle cx="10" cy="22" r="2.5" stroke="black" strokeWidth="1.5"/>
      <path d="M10 12.5V19.5M22 12.5V19M16 10h3.5M10 10h3.5" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 19.5h3.5" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="16" cy="22" r="2.5" stroke="black" strokeWidth="1.5"/>
    </svg>
  ),
  fuel: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M10 26V10a2 2 0 012-2h8a2 2 0 012 2v6h1a1 1 0 011 1v5a1 1 0 01-1 1h-1v3" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 16h12" stroke="black" strokeWidth="1.5"/>
    </svg>
  ),
};

const SPECS = [
  { key: 'speed',        icon: 'speed',        label: 'TOP SPEED',   getValue: (s: CarSpec) => s.topSpeed },
  { key: 'engine',       icon: 'engine',       label: 'ENGINE',      getValue: (s: CarSpec) => s.engine },
  { key: 'acceleration', icon: 'acceleration', label: '0-100 km/h',  getValue: (s: CarSpec) => s.acceleration },
  { key: 'horsepower',   icon: 'horsepower',   label: 'HORSE POWER', getValue: (s: CarSpec) => s.horsepower },
  { key: 'seats',        icon: 'seats',        label: 'SEAT CAPACITY',getValue: (s: CarSpec) => `${s.seats} Person` },
  { key: 'color',        icon: 'color',        label: 'COLOR',       getValue: (s: CarSpec) => s.color },
  { key: 'transmission', icon: 'transmission', label: 'TRANSMISSION', getValue: (s: CarSpec) => s.transmission },
  { key: 'fuel',         icon: 'fuel',         label: 'FUEL TYPE',   getValue: (s: CarSpec) => s.fuelType },
];

export default function SpecsGrid({ specs }: SpecsGridProps) {
  return (
    <div
      className="bg-white"
      style={{
        borderRadius: 20,
        boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)',
        padding: '24px',
      }}
    >
      {/* Title – Body Large/Medium, Black/100% */}
      <p style={{ fontSize: 18, fontWeight: 500, color: '#000', marginBottom: 20 }}>
        Specifications
      </p>

      {/* Grid – 2 cols on md+, 4 on lg */}
      <div
        style={{ borderRadius: 10 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-5"
      >
        {SPECS.map(({ key, icon, label, getValue }) => (
          <div key={key} className="flex items-center" style={{ gap: 12 }}>
            {/* Icon – 32×32px */}
            <div className="flex-shrink-0" style={{ width: 32, height: 32 }}>
              {SPEC_ICONS[icon]}
            </div>
            {/* Text */}
            <div className="flex flex-col" style={{ gap: 2 }}>
              {/* Value: Body Medium/Medium 16px/500, Black/100% */}
              <p style={{ fontSize: 16, fontWeight: 500, lineHeight: '1.5em', color: '#000', margin: 0 }}>
                {getValue(specs)}
              </p>
              {/* Label: Body Small/Medium 14px/500, Black/50% */}
              <p style={{ fontSize: 14, fontWeight: 500, lineHeight: '1.57em', color: 'rgba(0,0,0,0.5)', margin: 0 }}>
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
