import Link from 'next/link';
import Image from 'next/image';
import { CAR_CATEGORIES } from '@/app/constants';

/**
 * Category cards – pixel-perfect from Figma "Category Listing" frame (8937:42826).
 * Card dimensions from Figma: 202×272px. Gap: 30px. Padding: 0 39px.
 * Each card has a real Figma background image + exact gradient overlay from design.
 */
export default function CategoryCards() {
  return (
    <section className="py-8">
      <div
        className="flex gap-[30px] overflow-x-auto scrollbar-hide px-[39px] justify-start"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {CAR_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/listings?category=${cat.id}`}
            className="relative flex-shrink-0 rounded-[10px] overflow-hidden group cursor-pointer"
            style={{ width: 202, height: 272, scrollSnapAlign: 'start' }}
          >
            {/* Background image from Figma */}
            <Image
              src={cat.image}
              alt={cat.label}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="202px"
              quality={85}
            />

            {/* Exact gradient overlays from Figma fills */}
            <div
              className="absolute inset-0"
              style={{ background: cat.gradient }}
            />

            {/* Content – matches Figma layout: justify-between, padding 24px */}
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              {/* Top: Category name + count */}
              <div className="flex flex-col gap-5">
                <p className="text-white font-medium text-lg leading-tight tracking-wide">
                  {cat.label}
                </p>
                <p className="text-white/80 text-lg font-normal">
                  {cat.carCount} Cars Available
                </p>
              </div>

              {/* Bottom: From price */}
              <div className="flex flex-col gap-4">
                <p className="text-white/70 text-lg font-normal">From</p>
                <p className="text-white font-bold text-lg">
                  AED {cat.fromPrice.toLocaleString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
