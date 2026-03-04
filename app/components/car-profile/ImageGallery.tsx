'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { cn } from '@/app/lib/utils';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

/**
 * Car profile image gallery.
 * - Main image with prev/next arrows and dot indicators
 * - Fullscreen lightbox with thumbnail strip (matching Figma "Image Preview")
 */
export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <>
      {/* Main gallery */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 h-80 md:h-[420px]">
        <Image src={images[current]} alt={`${alt} – view ${current + 1}`} fill className="object-cover" priority />

        {/* No Deposit badge */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
          No Deposit
        </div>

        {/* Fullscreen button */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute top-4 right-4 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
          aria-label="View fullscreen"
        >
          <Maximize2 size={15} />
        </button>

        {/* Arrows */}
        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow transition-colors" aria-label="Previous image">
          <ChevronLeft size={20} />
        </button>
        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow transition-colors" aria-label="Next image">
          <ChevronRight size={20} />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn('w-2 h-2 rounded-full transition-all', i === current ? 'bg-white w-4' : 'bg-white/50')}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Main lightbox image */}
          <div className="relative w-full max-w-4xl h-[60vh]">
            <Image src={images[current]} alt={`${alt} – view ${current + 1}`} fill className="object-contain" />
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-3 mt-6 overflow-x-auto px-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  'relative flex-shrink-0 w-36 h-24 rounded-xl overflow-hidden border-2 transition-all',
                  i === current ? 'border-[#CDFF00]' : 'border-transparent opacity-70 hover:opacity-100'
                )}
              >
                <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
