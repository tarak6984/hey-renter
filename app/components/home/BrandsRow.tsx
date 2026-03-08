import Image from 'next/image';
import { CAR_BRANDS } from '@/app/constants';

const DISPLAYED_BRANDS = [
  'Mazda',
  'Ford',
  'Cadillac',
  'Toyota Crown',
  'KIA',
  'Porsche',
  'Audi',
  'Subaru',
  'Fiat',
  'Land Rover',
];

const BRAND_LOGO_SIZES: Record<string, { width: number; height: number }> = {
  Mazda: { width: 48, height: 48 },
  Ford: { width: 87, height: 34 },
  Cadillac: { width: 50, height: 48 },
  'Toyota Crown': { width: 33, height: 48 },
  KIA: { width: 65, height: 35 },
  Porsche: { width: 72, height: 48 },
  Audi: { width: 72, height: 48 },
  Subaru: { width: 70, height: 48 },
  Fiat: { width: 42, height: 48 },
  'Land Rover': { width: 62, height: 48 },
};

const brands = DISPLAYED_BRANDS.map((name) =>
  CAR_BRANDS.find((brand) => brand.name === name)
).filter((brand): brand is (typeof CAR_BRANDS)[number] => Boolean(brand));

export default function BrandsRow() {
  return (
    <section className="bg-white py-8">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-0">
        <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-10">
          {brands.map((brand) => {
            const size = BRAND_LOGO_SIZES[brand.name] ?? { width: 72, height: 48 };

            return (
              <div
                key={brand.name}
                className="flex min-h-[96px] flex-col items-center justify-between gap-3 text-center"
              >
                <div className="flex h-12 items-center justify-center">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={size.width}
                    height={size.height}
                    className="h-auto w-auto object-contain"
                    quality={92}
                  />
                </div>

                <div className="flex items-center gap-2 text-[14px] font-medium leading-[1.2] text-[#3A3A3A]">
                  <span>{brand.carCount} Cars</span>
                  <span className="text-[20px] leading-none text-black">&rsaquo;</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
