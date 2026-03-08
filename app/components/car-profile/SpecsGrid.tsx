import { CarSpec } from '@/app/types';

interface SpecsGridProps {
  specs: CarSpec;
}

type SpecItem = {
  key: string;
  label: string;
  value: (specs: CarSpec) => string;
  icon: React.ReactNode;
};

const specItems: SpecItem[] = [
  {
    key: 'speed',
    label: 'TOP SPEED',
    value: (specs) => specs.topSpeed,
    icon: <TopSpeedIcon />,
  },
  {
    key: 'engine',
    label: 'ENGINE',
    value: (specs) => specs.engine,
    icon: <EngineIcon />,
  },
  {
    key: 'acceleration',
    label: '0-100 km/h',
    value: (specs) => specs.acceleration,
    icon: <AccelerationIcon />,
  },
  {
    key: 'horsepower',
    label: 'HORSE POWER',
    value: (specs) => specs.horsepower,
    icon: <HorsePowerIcon />,
  },
  {
    key: 'seats',
    label: 'SEAT CAPACITY',
    value: (specs) => `${specs.seats} Person`,
    icon: <SeatsIcon />,
  },
  {
    key: 'color',
    label: 'COLOR',
    value: (specs) => specs.color,
    icon: <ColorIcon />,
  },
  {
    key: 'transmission',
    label: 'TRANSMISSION',
    value: (specs) => specs.transmission,
    icon: <TransmissionIcon />,
  },
  {
    key: 'fuel',
    label: 'FUEL TYPE',
    value: (specs) => specs.fuelType,
    icon: <FuelIcon />,
  },
];

export default function SpecsGrid({ specs }: SpecsGridProps) {
  return (
    <section className="rounded-[20px] border border-black/10 bg-white px-6 py-6 lg:min-h-[192px] lg:px-6 lg:py-6">
      <h2 className="text-[18px] font-medium leading-[26px] text-black">
        Specifications
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-8">
        {specItems.map((item) => (
          <div key={item.key} className="flex items-center gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-black lg:h-9 lg:w-9">
              {item.icon}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[16px] font-medium leading-6 text-black lg:text-[18px] lg:leading-[26px]">
                {item.value(specs)}
              </p>
              <p className="mt-[2px] text-[14px] font-medium leading-5 tracking-[0.02em] text-black/50 lg:text-[16px] lg:leading-6">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TopSpeedIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 56 56" fill="none" aria-hidden="true" className="h-full w-full">
      <path
        d="M12 35.333C12 26.68 19.0135 19.667 27.6667 19.667C36.3198 19.667 43.3333 26.68 43.3333 35.333"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M27.666 35.333L35.3887 27.6104" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="27.6667" cy="35.333" r="3.33333" fill="currentColor" />
      <path
        d="M15.333 35.333H10.667M44.667 35.333H40M18.833 26.5L15.5 23.167M36.5 26.5L39.833 23.167"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EngineIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 56 56" fill="none" aria-hidden="true" className="h-full w-full">
      <path
        d="M19.834 22.167H34.1667C35.4553 22.167 36.5 23.2117 36.5 24.5003V35.0003C36.5 36.289 35.4553 37.3337 34.1667 37.3337H19.834C18.5453 37.3337 17.5007 36.289 17.5007 35.0003V24.5003C17.5007 23.2117 18.5453 22.167 19.834 22.167Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M14 25.667H17.5M14 34.167H17.5M36.5 25.667H42M36.5 34.167H42M22.167 18.667V22.167M31.833 18.667V22.167M22.167 37.333V40.833M31.833 37.333V40.833"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AccelerationIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 56 56" fill="none" aria-hidden="true" className="h-full w-full">
      <path
        d="M14 35.333C14 27.601 20.268 21.333 28 21.333C35.732 21.333 42 27.601 42 35.333"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M28 35.333L33.8333 29.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="28" cy="35.333" r="3.33333" fill="currentColor" />
    </svg>
  );
}

function HorsePowerIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 56 56" fill="none" aria-hidden="true" className="h-full w-full">
      <path
        d="M31.5 8.167L18.667 28H27.417L24.5 47.833L37.333 26.833H28.583L31.5 8.167Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SeatsIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 56 56" fill="none" aria-hidden="true" className="h-full w-full">
      <circle cx="20.9997" cy="18.6667" r="6.66667" stroke="currentColor" strokeWidth="4" />
      <circle cx="37.3337" cy="24.5" r="5.25" stroke="currentColor" strokeWidth="4" />
      <path
        d="M10.5 40.833C10.5 34.39 15.7233 29.167 22.1667 29.167C28.61 29.167 33.8333 34.39 33.8333 40.833"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M31.5 40.833C31.5 36.3267 35.16 32.667 39.6663 32.667C42.1563 32.667 44.386 33.782 45.884 35.5387"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ColorIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 56 56" fill="none" aria-hidden="true" className="h-full w-full">
      <path
        d="M20.167 16.333H35.833V31.5C35.833 35.366 32.699 38.5 28.833 38.5H27.167C23.301 38.5 20.167 35.366 20.167 31.5V16.333Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M17.833 16.333H38.167" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M28 38.5V44.333" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function TransmissionIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 56 56" fill="none" aria-hidden="true" className="h-full w-full">
      <circle cx="16.3333" cy="16.3333" r="4.66667" stroke="currentColor" strokeWidth="4" />
      <circle cx="32.6663" cy="16.3333" r="4.66667" stroke="currentColor" strokeWidth="4" />
      <circle cx="16.3333" cy="39.6663" r="4.66667" stroke="currentColor" strokeWidth="4" />
      <circle cx="32.6663" cy="28" r="4.66667" stroke="currentColor" strokeWidth="4" />
      <path
        d="M16.333 21V35M32.667 21V23.333M21 16.333H28M21 39.667H32.667M32.667 32.667V39.667H39.667C42.2443 39.667 44.333 37.5783 44.333 35.001V28"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FuelIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 56 56" fill="none" aria-hidden="true" className="h-full w-full">
      <path
        d="M18.667 42V17.5C18.667 16.2113 19.7117 15.1667 21.0003 15.1667H32.667C33.9557 15.1667 35.0003 16.2113 35.0003 17.5V42"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M18.667 28H35.0003" stroke="currentColor" strokeWidth="4" />
      <path
        d="M35 18.667H39.0837L42 22.167V36.167C42 37.4557 40.9553 38.5003 39.6667 38.5003H38.5C37.2113 38.5003 36.1667 37.4557 36.1667 36.167V30.3337"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
