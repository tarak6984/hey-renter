import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { CAR_BRANDS } from '@/app/constants';

/**
 * Horizontally scrollable brand logos row with car counts.
 */
export default function BrandsRow() {
  return (
    <section className="py-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-8 overflow-x-auto pb-2 scrollbar-hide items-start">
          {CAR_BRANDS.map((brand) => (
            <Link
              key={brand.name}
              href={`/listings?brand=${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex flex-col items-center gap-2 flex-shrink-0 group"
            >
              <div className="w-16 h-10 relative flex items-center justify-center">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                  sizes="64px"
                />
              </div>
              <div className="flex items-center gap-0.5 text-xs text-gray-500 group-hover:text-gray-800 transition-colors">
                <span>{brand.carCount} Cars</span>
                <ChevronRight size={11} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
