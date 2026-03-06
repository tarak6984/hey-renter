import Image from 'next/image';
import { CAR_BRANDS } from '@/app/constants';

const BRAND_SLOT_WIDTH = 96;
const BRAND_SLOT_STEP = 144;
const BRAND_SLOT_START = 24;
const SVG_WIDTH = 1440;

export default function BrandsRow() {
  return (
    <section className="bg-white py-8">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="relative mx-auto aspect-[1440/112] min-w-[1440px] max-w-[1440px]">
          <Image
            src="/assets/brands/Rent by Brands.svg"
            alt="Rent by brands"
            fill
            priority
            sizes="1440px"
            className="object-contain"
          />

          {CAR_BRANDS.map((brand, index) => {
            const left = ((BRAND_SLOT_START + index * BRAND_SLOT_STEP) / SVG_WIDTH) * 100;
            const width = (BRAND_SLOT_WIDTH / SVG_WIDTH) * 100;

            return (
              <div
                key={brand.name}
                aria-hidden="true"
                className="absolute top-0 h-full"
                style={{ left: `${left}%`, width: `${width}%` }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
