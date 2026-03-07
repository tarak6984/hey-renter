'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

/**
 * Image Gallery from the Figma car profile design.
 */
export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <>
      <div
        className="relative aspect-[898/455] min-h-[280px] w-full overflow-hidden"
        style={{
          borderRadius: 20,
          background: '#2b2e34',
        }}
      >
        <Image
          src={images[current]}
          alt={`${alt} - image ${current + 1}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1280px) 100vw, 898px"
          quality={90}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 93%, rgba(0,0,0,0.8) 100%)' }}
        />

        <div className="absolute left-4 right-4 top-4 flex items-center justify-between md:left-6 md:right-6 md:top-6">
          <div
            className="flex items-center justify-center"
            style={{
              height: 40,
              padding: '0 20px',
              borderRadius: 60,
              background: 'rgba(18, 21, 28, 0.7)',
              border: '1px solid #B8F04F',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span style={{ fontSize: 18, fontWeight: 500, color: '#fff', lineHeight: '1.44em' }}>
              No Deposit
            </span>
          </div>

          <button
            onClick={() => setLightboxOpen(true)}
            aria-label="View fullscreen"
            className="flex items-center justify-center bg-white/80 transition-colors hover:bg-white"
            style={{ width: 32, height: 32, borderRadius: '50%' }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
            </svg>
          </button>
        </div>

        <div
          className="absolute left-4 right-4 flex items-center justify-between md:left-6 md:right-6"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          <button
            onClick={prev}
            aria-label="Previous image"
            className="flex items-center justify-center bg-white shadow-md transition-colors hover:bg-gray-100"
            style={{ borderRadius: 100, padding: 12 }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="flex items-center justify-center bg-white shadow-md transition-colors hover:bg-gray-100"
            style={{ borderRadius: 100, padding: 12 }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3 md:bottom-6">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Image ${i + 1}`}
              className="transition-all"
              style={{
                width: i === current ? 20 : 8,
                height: 8,
                borderRadius: 100,
                background: i === current ? '#fff' : 'rgba(255,255,255,0.5)',
              }}
            />
          ))}
        </div>
      </div>

      {lightboxOpen ? (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
          >
            <X size={20} />
          </button>

          <div className="relative h-[60vh] w-full max-w-4xl">
            <Image
              src={images[current]}
              alt={`${alt} - view ${current + 1}`}
              fill
              className="object-contain"
              quality={90}
            />
          </div>

          <div className="mt-6 flex gap-3 overflow-x-auto px-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="relative flex-shrink-0 overflow-hidden transition-all"
                style={{
                  width: 144,
                  height: 96,
                  borderRadius: 10,
                  border: i === current ? '2px solid #B8F04F' : '2px solid transparent',
                  opacity: i === current ? 1 : 0.65,
                }}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="144px"
                />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
