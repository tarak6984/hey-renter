import Link from 'next/link';
import Image from 'next/image';
import { CAR_CATEGORIES } from '@/app/constants';
import { formatAED } from '@/app/lib/utils';

/**
 * Horizontally scrollable row of car category cards.
 * Each card links to the filtered listings page.
 */
export default function CategoryCards() {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
          {CAR_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/listings?category=${cat.id}`}
              className="relative flex-shrink-0 snap-start w-44 md:w-48 h-56 rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Background image */}
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="192px"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-4">
                <div>
                  <p className="text-white font-extrabold text-sm tracking-widest">{cat.label}</p>
                  <p className="text-gray-300 text-xs mt-0.5">{cat.carCount} Cars Available</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">From</p>
                  <p className="text-white font-bold text-sm">{formatAED(cat.fromPrice)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
