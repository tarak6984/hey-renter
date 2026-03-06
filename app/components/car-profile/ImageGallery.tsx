'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

/**
 * Image Gallery – pixel-perfect from Figma node 7350:98253
 *
 * Figma tokens:
 * - Container: layout_50DRZW – 898×455px, border-radius 20px, padding 24px, gap 32px
 * - Background: fill_LPSGU4 – IMAGE fill (imageRef: 771c47456b) + gradient overlay
 *   linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 93%, rgba(0,0,0,0.8) 100%)
 * - No Deposit Tag: h 40px, padding 13px 20px, border-radius 60px
 *   bg rgba(18,21,28,0.7), border #B8F04F 1px, backdropFilter blur(10px)
 * - Fullscreen btn: open_in_full icon, 32×32px
 * - Prev/Next: white bg, border-radius 100px, padding 12px
 * - Slider dots: row, gap 12px, circle 8px
 * - Lightbox: fullscreen white overlay with thumbnail strip (border #CDFF00 selected)
 */
export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <>
      {/* ── Main Gallery ── */}
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: 20,
          height: 455,
          background: '#2b2e34',
        }}
      >
        {/* Car image */}
        <Image
          src={images[current]}
          alt={`${alt} – image ${current + 1}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 898px"
          quality={90}
        />

        {/* Bottom gradient overlay – Figma: rgba(0,0,0,0) 0-93%, rgba(0,0,0,0.8) 100% */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 93%, rgba(0,0,0,0.8) 100%)' }}
        />

        {/* ── Top row: No Deposit tag + Fullscreen ── */}
        <div
          className="absolute top-6 left-6 right-6 flex items-center justify-between"
        >
          {/* No Deposit Tag – Figma: h 40px, padding 13px 20px, border-radius 60px */}
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

          {/* Fullscreen – open_in_full, 32×32px */}
          <button
            onClick={() => setLightboxOpen(true)}
            aria-label="View fullscreen"
            className="flex items-center justify-center bg-white/80 hover:bg-white transition-colors"
            style={{ width: 32, height: 32, borderRadius: '50%' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round">
              <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/>
            </svg>
          </button>
        </div>

        {/* ── Middle row: Prev / Next arrows ── */}
        <div
          className="absolute left-6 right-6 flex items-center justify-between"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          {/* Prev – white bg, border-radius 100px, padding 12px */}
          <button
            onClick={prev}
            aria-label="Previous image"
            className="flex items-center justify-center bg-white hover:bg-gray-100 transition-colors shadow-md"
            style={{ borderRadius: 100, padding: 12 }}
          >
            <ChevronLeft size={20} />
          </button>
          {/* Next */}
          <button
            onClick={next}
            aria-label="Next image"
            className="flex items-center justify-center bg-white hover:bg-gray-100 transition-colors shadow-md"
            style={{ borderRadius: 100, padding: 12 }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* ── Bottom row: Slider dots ── */}
        <div
          className="absolute bottom-6 left-0 right-0 flex items-center justify-center"
          style={{ gap: 12 }}
        >
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

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
          {/* Close */}
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
            className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            style={{ width: 44, height: 44, borderRadius: '50%' }}
          >
            <X size={20} />
          </button>

          {/* Main image */}
          <div className="relative w-full max-w-4xl" style={{ height: '60vh' }}>
            <Image
              src={images[current]}
              alt={`${alt} – view ${current + 1}`}
              fill
              className="object-contain"
              quality={90}
            />
          </div>

          {/* Thumbnail strip – border #B8F04F when selected */}
          <div className="flex gap-3 mt-6 overflow-x-auto px-4">
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
      )}
    </>
  );
}
