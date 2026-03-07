'use client';

import { useState } from 'react';
import Image from 'next/image';
import Breadcrumb from '@/app/components/shared/Breadcrumb';

/**
 * Confirmation page based on Figma node 8984:17660.
 */
export default function ConfirmationPage() {
  const bookingId = '#001232';
  const [copied, setCopied] = useState(false);
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);

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
          { label: 'Cullinan 2024', href: '/cars/rolls-royce-cullinan-mansory-2024' },
          { label: 'Confirmation' },
        ]}
      />

      <div className="mx-auto w-full max-w-[1440px] px-4 pb-16 sm:px-6 md:px-[39px]">
        <div className="mx-auto max-w-[780px]">
          <div
            className="flex flex-col bg-white p-6 sm:p-8 md:px-12 md:py-10"
            style={{
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: 20,
              gap: 32,
            }}
          >
            <div className="flex flex-col items-center" style={{ gap: 16 }}>
              <div
                className="flex flex-wrap items-center justify-center"
                style={{
                  background: 'rgba(0,0,0,0.06)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: 500,
                  padding: '16px 24px',
                  gap: 12,
                }}
              >
                <Image
                  src="/assets/icons/check-circle.png"
                  alt="Booking Confirmed"
                  width={32}
                  height={32}
                  style={{ objectFit: 'contain' }}
                />
                <h1 style={{ fontSize: 30, fontWeight: 700, color: '#000', margin: 0, lineHeight: '1.27em' }}>
                  Booking Confirmed
                </h1>
              </div>

              <div className="flex flex-wrap items-center justify-center" style={{ gap: 12 }}>
                <span style={{ fontSize: 18, fontWeight: 500, color: 'rgba(0,0,0,0.5)' }}>
                  Booking ID: <span style={{ color: '#000', fontWeight: 700 }}>{bookingId}</span>
                </span>
                <button
                  onClick={handleCopy}
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    color: '#0052FF',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  {copied ? 'Copied!' : 'Tap to copy'}
                </button>
              </div>
            </div>

            <div style={{ height: 1, background: '#E0DFDF', width: '100%' }} />

            <div className="flex flex-col items-center" style={{ gap: 20 }}>
              <h2 style={{ fontSize: 30, fontWeight: 700, color: '#000', margin: 0, lineHeight: '1.27em' }}>
                Want to move faster?
              </h2>

              <a
                href="https://wa.me/971000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center"
                style={{
                  background: '#1CC25A',
                  borderRadius: 10,
                  padding: '16px 24px',
                  gap: 12,
                  textDecoration: 'none',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span style={{ fontSize: 18, fontWeight: 500, color: '#fff', lineHeight: '1.44em' }}>
                  Contact us on
                </span>
                <span style={{ fontSize: 18, fontWeight: 500, color: '#fff', lineHeight: '1.44em' }}>
                  Whatsapp
                </span>
              </a>
            </div>

            <div style={{ height: 1, background: '#E0DFDF', width: '100%' }} />

            <div className="flex flex-col" style={{ gap: 24 }}>
              <div className="flex flex-col items-center" style={{ gap: 8 }}>
                <h2 style={{ fontSize: 30, fontWeight: 700, color: '#000', margin: 0, lineHeight: '1.27em' }}>
                  Upload Your Documents
                </h2>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 400,
                    color: '#000',
                    margin: 0,
                    lineHeight: '1.44em',
                    textAlign: 'center',
                  }}
                >
                  Accelerate your booking by uploading your documents now
                </p>
              </div>

              <div className="flex flex-col" style={{ gap: 16 }}>
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
    <div
      className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
      style={{
        background: 'rgba(0,0,0,0.02)',
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: 20,
        padding: 24,
      }}
    >
      <div className="flex flex-col" style={{ gap: 8 }}>
        <p style={{ fontSize: 24, fontWeight: 500, color: '#000', margin: 0, lineHeight: '1.33em' }}>
          {title}
        </p>
        <p style={{ fontSize: 18, fontWeight: 400, color: '#000', margin: 0, lineHeight: '1.44em' }}>
          {body}
        </p>
        {file ? (
          <p style={{ fontSize: 14, fontWeight: 500, color: '#1CC25A', margin: 0 }}>
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
          className="flex items-center justify-center"
          style={{
            background: '#0052FF',
            borderRadius: 10,
            padding: '12px 20px',
            gap: 8,
            display: 'flex',
          }}
        >
          <Image
            src="/assets/icons/camera-alt.png"
            alt=""
            width={24}
            height={24}
            style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
          />
          <span
            style={{
              fontSize: 18,
              fontWeight: 500,
              color: '#fff',
              lineHeight: '1.44em',
              whiteSpace: 'nowrap',
            }}
          >
            {buttonLabel}
          </span>
        </span>
      </label>
    </div>
  );
}
