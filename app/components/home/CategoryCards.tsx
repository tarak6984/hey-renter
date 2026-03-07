import Image from 'next/image';
import Link from 'next/link';
import { CAR_CATEGORIES } from '@/app/constants';

export default function CategoryCards() {
  return (
    <section className="py-8">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-0">
        <div className="relative aspect-[1440/272] w-full">
          <Image
            src="/assets/categories/Category Listing.png"
            alt="Car categories"
            fill
            className="object-contain"
            sizes="(max-width: 1440px) 100vw, 1440px"
            quality={100}
            priority
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
