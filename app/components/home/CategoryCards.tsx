import Image from 'next/image';
import Link from 'next/link';
import { CAR_CATEGORIES } from '@/app/constants';

export default function CategoryCards() {
  return (
    <section className="py-8">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-0">
        <div className="grid gap-4 sm:hidden">
          {CAR_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/listings?category=${category.id}`}
              className="group relative overflow-hidden rounded-[18px]"
            >
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={category.image}
                  alt={category.label}
                  fill
                  className={`object-cover transition-transform duration-300 group-hover:scale-[1.03] ${getMobileCategoryImagePosition(category.id)}`}
                  sizes="100vw"
                  quality={90}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: category.gradient }}
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4 pb-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[22px] font-bold leading-[1.05] text-white">{category.label}</span>
                    <span className="text-[14px] font-medium text-white/85">{category.carCount} cars from AED {category.fromPrice}</span>
                  </div>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[12px] font-medium text-white backdrop-blur-sm">
                    Explore
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="relative hidden aspect-[1440/272] w-full sm:block">
          <Image
            src="/assets/home-optimized/category-listing.webp"
            alt="Car categories"
            fill
            className="object-contain"
            sizes="(max-width: 1440px) 100vw, 1440px"
            quality={78}
          />

          <div className="absolute inset-0 grid grid-cols-6 gap-[2.083333%] px-[2.708333%]">
            {CAR_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/listings?category=${category.id}`}
                aria-label={`${category.label} category`}
                className="h-full rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                <span className="sr-only">{category.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function getMobileCategoryImagePosition(categoryId: string) {
  switch (categoryId) {
    case 'driver-service':
      return 'object-center';
    case 'convertible':
      return 'object-center';
    case 'luxury':
      return 'object-center';
    case 'suv':
      return 'object-center';
    case 'economy':
      return 'object-center';
    default:
      return 'object-center';
  }
}
