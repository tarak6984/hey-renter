'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { Car } from '@/app/types';

interface CarCardProps {
  car: Car;
  whatsappEnabled?: boolean;
}

const LISTING_IMAGE_OVERRIDES: Record<string, string> = {
  '/assets/cars/mercedes-sl63-amg.png': '/assets/cars/listings/mercedes-1.webp',
  '/assets/cars/ferrari-purosangue.png': '/assets/cars/listings/ferrari-1.webp',
  '/assets/cars/porsche-gt3-rs.png': '/assets/cars/listings/porsche-1.webp',
  '/assets/cars/cullinan-mansory-2024.png': '/assets/cars/listings/rolls-royce-1.webp',
};

const BRAND_GALLERY_IMAGES: Record<string, string[]> = {
  ferrari: [
    '/assets/cars/listings/ferrari-1.webp',
    '/assets/cars/listings/ferrari-2.webp',
    '/assets/cars/listings/ferrari-3.webp',
    '/assets/cars/listings/ferrari-4.webp',
  ],
  mercedes: [
    '/assets/cars/listings/mercedes-1.webp',
    '/assets/cars/listings/mercedes-2.webp',
    '/assets/cars/listings/mercedes-3.webp',
    '/assets/cars/listings/mercedes-4.webp',
  ],
  porsche: [
    '/assets/cars/listings/porsche-1.webp',
    '/assets/cars/listings/porsche-2.webp',
    '/assets/cars/listings/porsche-3.webp',
    '/assets/cars/listings/porsche-4.webp',
  ],
  mclaren: [
    '/assets/cars/listings/mclaren-1.webp',
    '/assets/cars/listings/mclaren-2.webp',
    '/assets/cars/listings/mclaren-3.webp',
    '/assets/cars/listings/mclaren-4.webp',
  ],
  'rolls royce': [
    '/assets/cars/listings/rolls-royce-1.webp',
    '/assets/cars/listings/rolls-royce-2.webp',
    '/assets/cars/listings/rolls-royce-3.webp',
    '/assets/cars/listings/rolls-royce-4.webp',
  ],
};

/**
 * Car listing card from the Figma "Browser & Mobile/Car Cards" component.
 */
export default function CarCard({ car, whatsappEnabled = true }: CarCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const primaryImage = LISTING_IMAGE_OVERRIDES[car.images[0]] ?? car.images[0];
  const galleryImages = BRAND_GALLERY_IMAGES[car.brand.toLowerCase()] ?? [primaryImage];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const requestedImage = galleryImages[activeImageIndex] ?? primaryImage;
  const activeImage = failedImages[requestedImage] ? primaryImage : requestedImage;

  const specs = [
    car.specs.engine,
    car.specs.horsepower,
    car.specs.topSpeed,
    `${car.specs.seats} Seater`,
  ];

  return (
    <div
      className="relative flex w-full max-w-[318px] flex-col overflow-hidden"
      style={{
        minHeight: 439,
        borderRadius: 15,
        background: 'linear-gradient(0deg, #ffffff 0%, #e9e9e9 44%, #2b2e34 100%)',
        padding: '8px 8px 16px',
        gap: 24,
      }}
    >
      <div className="relative h-[225px] flex-shrink-0 overflow-hidden rounded-[10px] bg-[#D8D8D8]">
        <Image
          key={activeImage}
          src={activeImage}
          alt={`${car.brand} ${car.model} image ${activeImageIndex + 1}`}
          fill
          className="object-cover object-center"
          sizes="(max-width: 420px) 100vw, 318px"
          quality={75}
          onError={() =>
            setFailedImages((current) => ({
              ...current,
              [requestedImage]: true,
            }))
          }
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 89.5%, rgba(0,0,0,0.2) 95.5%)',
          }}
        />

        {car.noDeposit ? (
          <div
            className="absolute left-2 top-2 z-20 flex items-center"
            style={{
              background: 'rgba(47, 50, 56, 0.7)',
              border: '1px solid #B8F04F',
              borderRadius: 60,
              padding: '8px 12px',
              backdropFilter: 'blur(10px)',
              height: 26,
            }}
          >
            <span
              style={{
                fontSize: 16,
                fontWeight: 500,
                lineHeight: '24px',
                color: '#FFFFFF',
              }}
            >
              No Deposit
            </span>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setWishlisted(!wishlisted)}
          aria-label="Add to wishlist"
          aria-pressed={wishlisted}
          className="absolute right-2 top-2 z-20 flex items-center justify-center rounded-full bg-transparent transition-opacity hover:opacity-80"
          style={{
            width: 32,
            height: 32,
          }}
        >
          <Heart
            size={24}
            strokeWidth={1.8}
            className={wishlisted ? 'fill-red-500 text-red-500' : 'text-white'}
          />
        </button>

        {galleryImages.length > 1 ? (
          <>
            <div className="absolute inset-0 z-10 flex">
              {galleryImages.map((image, index) => (
                <button
                  key={`${image}-overlay`}
                  type="button"
                  aria-label={`Preview image ${index + 1}`}
                  aria-pressed={index === activeImageIndex}
                  onMouseEnter={() => setActiveImageIndex(index)}
                  onFocus={() => setActiveImageIndex(index)}
                  onClick={() => setActiveImageIndex(index)}
                  className="flex-1 bg-transparent"
                />
              ))}
            </div>

            <div className="absolute inset-x-2 bottom-0 z-20 flex h-8 items-end gap-1 pb-2">
            {galleryImages.map((image, index) => (
              <button
                key={image}
                type="button"
                aria-label={`Preview image ${index + 1}`}
                aria-pressed={index === activeImageIndex}
                onMouseEnter={() => setActiveImageIndex(index)}
                onFocus={() => setActiveImageIndex(index)}
                onClick={() => setActiveImageIndex(index)}
                className="flex h-full flex-1 items-end rounded-sm bg-transparent"
              >
                <span
                  className="block h-1 w-full rounded-full transition-colors"
                  style={{
                    background: index === activeImageIndex ? '#FFFFFF' : 'rgba(0,0,0,0.4)',
                  }}
                />
              </button>
            ))}
            </div>
          </>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col" style={{ gap: 24 }}>
          <div className="flex items-start justify-between px-2" style={{ gap: 16 }}>
            <div className="flex min-w-0 flex-col" style={{ gap: 12 }}>
              <span
                className="font-medium"
                style={{ fontSize: 16, fontWeight: 500, lineHeight: '24px', color: '#000' }}
              >
                {car.brand}
              </span>
              <span
                className="font-bold"
                style={{ fontSize: 18, fontWeight: 700, lineHeight: '26px', color: '#000' }}
              >
                {car.model}
              </span>
            </div>
            <div className="relative h-10 w-10 flex-shrink-0">
              <Image
                src={car.brandLogo}
                alt={car.brand}
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
          </div>

          <div
            className="flex max-w-[302px] flex-nowrap items-center overflow-hidden px-2"
            style={{ gap: 6 }}
          >
            {specs.map((spec) => (
              <div
                key={spec}
                className="flex min-w-0 flex-shrink items-center justify-center whitespace-nowrap"
                style={{
                  background: 'rgba(0,0,0,0.08)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: 60,
                  padding: '6px 7px',
                  height: 22,
                }}
              >
                <span
                  className="truncate"
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: '18px',
                    color: '#000',
                  }}
                >
                  {spec}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between px-2" style={{ gap: 17 }}>
          <div className="flex flex-col" style={{ gap: 8 }}>
            <span
              style={{
                fontSize: 14,
                fontWeight: 500,
                lineHeight: '22px',
                color: 'rgba(0,0,0,0.5)',
              }}
            >
              AED
            </span>
            <div className="flex items-end">
              <span
                style={{ fontSize: 24, fontWeight: 700, lineHeight: '30px', color: '#000' }}
              >
                {car.pricePerDay.toLocaleString()}
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: '22px',
                  color: 'rgba(0,0,0,0.5)',
                }}
              >
                /day
              </span>
            </div>
          </div>

          <div className="flex items-center" style={{ gap: 8 }}>
            {whatsappEnabled ? (
              <a
                href={`https://wa.me/971000000000?text=I'm interested in ${car.model}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full"
                style={{ background: '#1CC25A' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#FFFFFF" />
                </svg>
              </a>
            ) : (
              <span
                aria-label="WhatsApp unavailable on listings"
                aria-disabled="true"
                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full"
                style={{ background: '#1CC25A', cursor: 'default' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#FFFFFF" />
                </svg>
              </span>
            )}

            <Link
              href={`/cars/${car.slug}`}
              className="flex h-14 w-[108px] items-center justify-center whitespace-nowrap rounded-[100px] border border-[#B8F04F] bg-[#12151C] px-4 font-bold text-white"
              style={{
                fontSize: 16,
                fontWeight: 700,
                lineHeight: '24px',
              }}
            >
              RESERVE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
