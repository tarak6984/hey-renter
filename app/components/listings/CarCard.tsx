'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import Badge from '@/app/components/ui/Badge';
import { Car } from '@/app/types';
import { formatAED } from '@/app/lib/utils';

interface CarCardProps {
  car: Car;
}

/**
 * Car listing card – matches the Figma listings grid card exactly.
 * Shows: image, badge, wishlist, brand logo, name, specs, price, WhatsApp + Reserve CTAs.
 */
export default function CarCard({ car }: CarCardProps) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-44 bg-gray-100">
        <Image
          src={car.images[0]}
          alt={car.model}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        {/* No Deposit badge */}
        {car.noDeposit && (
          <div className="absolute top-3 left-3">
            <Badge variant="default">No Deposit</Badge>
          </div>
        )}
        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform"
        >
          <Heart
            size={15}
            className={wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>
        {/* Brand logo overlay */}
        <div className="absolute bottom-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow overflow-hidden">
          <Image src={car.brandLogo} alt={car.brand} width={24} height={24} className="object-contain" />
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Car name */}
        <div>
          <p className="text-xs text-gray-400">{car.brand}</p>
          <h3 className="font-bold text-sm text-gray-900">{car.model}</h3>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
          <span>{car.specs.engine}</span>
          <span className="text-gray-300">·</span>
          <span>{car.specs.horsepower}</span>
          <span className="text-gray-300">·</span>
          <span>{car.specs.topSpeed}</span>
          <span className="text-gray-300">·</span>
          <span>{car.specs.seats} Seater</span>
        </div>

        {/* Price + CTAs */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
          <div>
            <p className="text-xs text-gray-400">AED</p>
            <p className="text-lg font-extrabold text-gray-900 leading-tight">
              {car.pricePerDay.toLocaleString()}
              <span className="text-xs font-normal text-gray-400">/day</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/971000000000?text=I'm interested in ${car.model}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 bg-[#25D366] rounded-full flex items-center justify-center hover:bg-[#1ebe5b] transition-colors"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>

            {/* Reserve */}
            <Link
              href={`/cars/${car.slug}`}
              className="bg-black text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              RESERVE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
