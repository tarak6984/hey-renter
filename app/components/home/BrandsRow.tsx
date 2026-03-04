import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { CAR_BRANDS } from '@/app/constants';

/**
 * Brands row – pixel-perfect from Figma "Rent by Brands" frame (8937:42833).
 * Layout: row, gap 48px, padding 0 39px, overflow scroll X.
 * Each brand CTA: column, center, width 96px. Logo: 96×96px. Real Figma PNG assets.
 */
export default function BrandsRow() {
  return (
    <section className="py-8 border-t border-gray-100 bg-white">
      <div
        className="flex gap-12 overflow-x-auto scrollbar-hide items-center px-[39px]"
      >
        {CAR_BRANDS.map((brand) => (
          <Link
            key={brand.name}
            href={`/listings?brand=${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="flex flex-col items-center gap-2 flex-shrink-0 group"
            style={{ width: 96 }}
          >
            {/* Logo container – 96×96px from Figma */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-300"
                sizes="96px"
                quality={85}
              />
            </div>

            {/* Count & Arrow – matches Figma "Count & Arrow" frame */}
            <div className="flex items-center justify-center gap-1.5 text-sm text-gray-800 group-hover:text-black transition-colors font-normal">
              <span>{brand.carCount} Cars</span>
              <ChevronRight size={12} className="text-gray-500" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
