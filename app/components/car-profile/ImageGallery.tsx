'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { cn } from '@/app/lib/utils';

interface ImageGalleryProps {
  images: string[];
  alt: string;
  noDeposit?: boolean;
}

/**
 * Car profile gallery uses the in-page Figma hero slider and
 * switches to the separate fullscreen image-section layout when opened.
 */
export default function ImageGallery({
  images,
  alt,
  noDeposit = false,
}: ImageGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const safeImages = images.length > 0 ? images : ['/assets/cars/ferrari-812-gts.png'];
  const currentImage = safeImages[current] ?? safeImages[0];

  const prev = () => setCurrent((value) => (value - 1 + safeImages.length) % safeImages.length);
  const next = () => setCurrent((value) => (value + 1) % safeImages.length);

  return (
    <>
      <section className="relative aspect-[898/455] min-h-[280px] w-full overflow-hidden rounded-[20px]">
        <Image
          src={currentImage}
          alt={`${alt} - image ${current + 1}`}
          fill
          priority
          quality={100}
          sizes="(max-width: 1280px) 100vw, 898px"
          className="object-cover"
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.04) 22%, rgba(0,0,0,0) 48%, rgba(0,0,0,0.08) 74%, rgba(0,0,0,0.44) 100%)',
          }}
        />

        <div className="absolute left-6 right-6 top-6 flex items-center justify-between gap-4">
          {noDeposit ? (
            <div className="flex h-10 items-center rounded-[60px] border border-[#B8F04F] bg-[rgba(18,21,28,0.7)] px-5 backdrop-blur-[10px]">
              <span className="text-[18px] font-medium leading-[26px] text-white">No Deposit</span>
            </div>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="Open image gallery"
            className="flex h-8 w-8 items-center justify-center text-white transition-opacity hover:opacity-80"
          >
            <Maximize2 size={24} strokeWidth={2.3} />
          </button>
        </div>

        <div
          className="absolute left-6 right-6 flex items-center justify-between"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-gray-100"
          >
            <ChevronLeft size={22} strokeWidth={2.8} />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-gray-100"
          >
            <ChevronRight size={22} strokeWidth={2.8} />
          </button>
        </div>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3">
          {safeImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`View image ${index + 1}`}
              aria-pressed={index === current}
              className={cn(
                'h-2 w-2 rounded-full transition-opacity',
                index === current ? 'bg-white opacity-100' : 'bg-white/50 opacity-100'
              )}
            />
          ))}
        </div>
      </section>

      {lightboxOpen ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/55 px-4 py-6 backdrop-blur-[2px] md:px-[39px]">
          <div className="flex min-h-full items-center justify-center">
            <div className="flex w-full max-w-[1440px] flex-col gap-[24px]">
              <div className="relative mx-auto w-full max-w-[1440px] overflow-visible">
                <div className="relative mx-auto aspect-[898/500] w-full max-w-[898px] overflow-hidden rounded-[20px]">
                  <Image
                    src={currentImage}
                    alt={`${alt} fullscreen image ${current + 1}`}
                    fill
                    quality={100}
                    sizes="(max-width: 960px) calc(100vw - 48px), 898px"
                    className="object-cover object-center"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  aria-label="Close gallery"
                  className="absolute right-0 top-0 z-10 flex h-14 w-14 items-center justify-center rounded-[10px] border border-white/50 bg-white/50 text-white backdrop-blur-[10px] transition-colors hover:bg-white/60"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>

              <div className="mx-auto flex max-w-[898px] gap-[24px] overflow-x-auto pb-2">
                {safeImages.map((image, index) => (
                  <button
                    key={`lightbox-${image}-${index}`}
                    type="button"
                    onClick={() => setCurrent(index)}
                    aria-label={`Select fullscreen image ${index + 1}`}
                    aria-pressed={index === current}
                    className={cn(
                      'relative h-[120px] w-[205px] flex-shrink-0 rounded-[10px] p-[3px] transition-all',
                      index === current ? 'bg-[#B8F04F]' : 'bg-transparent opacity-85'
                    )}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-[7px]">
                      <Image
                        src={image}
                        alt={`${alt} thumbnail ${index + 1}`}
                        fill
                        quality={100}
                        sizes="205px"
                        className="object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
