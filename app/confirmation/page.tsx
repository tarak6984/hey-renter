'use client';

import { Suspense, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { MOCK_CARS } from '@/app/constants';
import Breadcrumb from '@/app/components/shared/Breadcrumb';

const CONFIRMATION_WHATSAPP_NUMBER = '8801788656498';

/**
 * Confirmation page based on Figma node 8984:17660.
 */
export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div style={{ background: '#F5F5F5', minHeight: '100vh' }} />}>
      <ConfirmationContent />
    </Suspense>
  );
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const bookingId = '#001232';
  const [copied, setCopied] = useState(false);
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const carId = searchParams.get('carId') || '';
  const slug = searchParams.get('slug') || '';
  const dateTime = searchParams.get('dateTime') || '';
  const phone = searchParams.get('phone') || '';
  const countryCode = searchParams.get('countryCode') || '+971';
  const fullName = searchParams.get('fullName') || '';
  const car =
    MOCK_CARS.find((item) => item.id === carId) ||
    MOCK_CARS.find((item) => item.slug === slug) ||
    MOCK_CARS[0];
  const breadcrumbCarLabel = car.model.replace(/\s+Mansory(?=\s+\d{4}$)/i, '');
  const whatsappMessage = [
    'Hello Hey Renter,',
    '',
    'My booking is confirmed and I would like to continue on WhatsApp.',
    'Please do not remove the information below so we can assist you faster.',
    `Booking ID: ${bookingId}`,
    `Car: ${car.brand} ${car.model}`,
    `Pickup Date & Time: ${dateTime || 'Not selected yet'}`,
    `Best Rate: AED ${car.pricePerDay.toLocaleString()}/day`,
    `Phone: ${phone ? `${countryCode} ${phone}` : 'Not provided yet'}`,
    `Full Name: ${fullName || 'Not provided yet'}`,
  ].join('\n');
  const whatsappHref = `https://wa.me/${CONFIRMATION_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: '#F5F5F5', minHeight: '100vh' }}>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Super Cars', href: '/listings?category=super' },
          { label: breadcrumbCarLabel, href: `/cars/${car.slug}` },
          { label: 'Confirmation' },
        ]}
        className="max-w-[1440px] px-4 py-8 sm:px-6 md:px-[39px]"
        itemClassName="gap-4"
        linkClassName="text-[18px] font-medium leading-[26px] text-black hover:text-black"
        currentClassName="text-[18px] font-normal leading-[26px] text-black/50"
        separatorClassName="h-4 w-4 text-black"
      />

      <div className="mx-auto w-full max-w-[1440px] px-4 pb-16 sm:px-6 md:px-[39px]">
        <div className="mx-auto max-w-[666px]">
          <div className="flex flex-col gap-10 rounded-[20px] border border-black/10 bg-white px-6 pb-6 pt-10">
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-wrap items-center justify-center gap-3 rounded-full border border-black/10 bg-black/[0.06] px-6 py-4">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  aria-hidden="true"
                  className="flex-shrink-0"
                >
                  <path
                    d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM20 32L12 24L14.82 21.18L20 26.34L33.18 13.16L36 16L20 32Z"
                    fill="#0EAD69"
                  />
                </svg>
                <h1 className="m-0 text-[30px] font-bold leading-[38px] text-black">
                  Booking Confirmed
                </h1>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="text-[18px] font-medium leading-[26px] text-black/50">
                  Booking ID: <span className="font-bold text-black">{bookingId}</span>
                </span>
                <button
                  onClick={handleCopy}
                  className="bg-transparent p-0 text-[18px] font-medium leading-[26px] text-[#0052FF] transition-opacity hover:opacity-80"
                >
                  {copied ? 'Copied!' : 'Tap to copy'}
                </button>
              </div>
            </div>

            <div className="h-px w-full bg-[#E0DFDF]" />

            <div className="flex flex-col items-center gap-7">
              <h2 className="m-0 text-center text-[30px] font-bold leading-[38px] text-black">
                Want to move faster?
              </h2>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-full items-center justify-center gap-3 rounded-[10px] bg-[#1CC25A] px-6 no-underline transition-colors hover:bg-[#18b253]"
              >
                <span className="text-[18px] font-medium leading-[26px] text-white">
                  Contact us on
                </span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="text-[18px] font-medium leading-[26px] text-white">Whatsapp</span>
              </a>
            </div>

            <div className="h-px w-full bg-[#E0DFDF]" />

            <div className="flex flex-col gap-8">
              <div className="flex flex-col items-center gap-2 text-center">
                <h2 className="m-0 text-[30px] font-bold leading-[38px] text-black">
                  Upload Your Documents
                </h2>
                <p className="m-0 text-[18px] font-normal leading-[26px] text-black">
                  Accelerate your booking by uploading your documents now
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <UploadField
                  title="Passport or National ID"
                  body="Upload a clear photo of your ID Card"
                  buttonLabel="Upload Photo"
                  file={passportFile}
                  onFileChange={setPassportFile}
                />
                <UploadField
                  title="Driver's License (Front Side)"
                  body="Upload the front side only"
                  buttonLabel="Upload Front"
                  file={licenseFile}
                  onFileChange={setLicenseFile}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadField({
  title,
  body,
  buttonLabel,
  file,
  onFileChange,
}: {
  title: string;
  body: string;
  buttonLabel: string;
  file: File | null;
  onFileChange: (f: File | null) => void;
}) {
  return (
    <div className="flex flex-col gap-5 rounded-[20px] border border-black/10 bg-black/[0.02] px-6 py-6 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-2">
        <p className="m-0 text-[24px] font-medium leading-8 text-black">
          {title}
        </p>
        <p className="m-0 text-[18px] font-normal leading-[26px] text-black">
          {body}
        </p>
        {file ? (
          <p className="m-0 text-[14px] font-medium leading-5 text-[#1CC25A]">
            Uploaded: {file.name}
          </p>
        ) : null}
      </div>

      <label className="cursor-pointer flex-shrink-0">
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
        />
        <span
          className="flex h-14 min-w-[202px] items-center justify-center gap-2 rounded-[10px] bg-[#0052FF] px-5"
        >
          <Image
            src="/assets/icons/camera-alt.png"
            alt=""
            width={24}
            height={24}
            style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
          />
          <span className="whitespace-nowrap text-[18px] font-medium leading-[26px] text-white">{buttonLabel}</span>
        </span>
      </label>
    </div>
  );
}
