'use client';

import { useState } from 'react';
import { CheckCircle2, Copy, Camera } from 'lucide-react';
import Breadcrumb from '@/app/components/shared/Breadcrumb';

/**
 * Booking Confirmation page.
 * Shows: booking confirmed badge, booking ID (copy), WhatsApp CTA, document upload.
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
    <div className="bg-[#f5f5f5] min-h-screen">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Super Cars', href: '/listings?category=super' },
        { label: 'Cullinan 2024', href: '/cars/rolls-royce-cullinan-mansory-2024' },
        { label: 'Confirmation' },
      ]} />

      <div className="max-w-xl mx-auto px-4 py-8 space-y-4">
        {/* Confirmed card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center space-y-4">
          {/* Confirmed badge */}
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 size={28} className="text-green-500" />
            <h1 className="text-2xl font-extrabold">Booking Confirmed</h1>
          </div>

          {/* Booking ID */}
          <div className="flex items-center justify-center gap-3 text-sm">
            <span className="text-gray-500">Booking ID:</span>
            <span className="font-extrabold text-gray-900">{bookingId}</span>
            <button
              onClick={handleCopy}
              className="text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1 text-xs transition-colors"
            >
              {copied ? 'Copied!' : (
                <>
                  <Copy size={13} />
                  Tap to copy
                </>
              )}
            </button>
          </div>

          <hr className="border-gray-100" />

          {/* Move Faster */}
          <div className="space-y-3">
            <h2 className="text-lg font-extrabold">Want to move faster?</h2>
            <a
              href="https://wa.me/971000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold py-3.5 rounded-full flex items-center justify-center gap-2 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contact us on Whatsapp
            </a>
          </div>

          <hr className="border-gray-100" />

          {/* Document Upload */}
          <div className="space-y-4 text-left">
            <div>
              <h2 className="text-lg font-extrabold text-center">Upload Your Documents</h2>
              <p className="text-sm text-gray-500 text-center mt-1">
                Accelerate your booking by uploading your documents now
              </p>
            </div>

            <UploadCard
              title="Passport or National ID"
              subtitle="Upload a clear photo of your ID Card"
              buttonLabel="Upload Photo"
              file={passportFile}
              onFileChange={setPassportFile}
            />

            <UploadCard
              title="Driver's License (Front Side)"
              subtitle="Upload the front side only"
              buttonLabel="Upload Front"
              file={licenseFile}
              onFileChange={setLicenseFile}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Upload Card ─────────────────────────────────────────────────────────────── */
function UploadCard({
  title, subtitle, buttonLabel, file, onFileChange,
}: {
  title: string;
  subtitle: string;
  buttonLabel: string;
  file: File | null;
  onFileChange: (f: File | null) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileChange(e.target.files?.[0] ?? null);
  };

  return (
    <div className="flex items-center justify-between border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4">
      <div>
        <p className="font-bold text-sm text-gray-900">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
        {file && <p className="text-xs text-green-600 mt-1 font-medium">✓ {file.name}</p>}
      </div>
      <label className="cursor-pointer">
        <input type="file" accept="image/*" className="sr-only" onChange={handleChange} />
        <span className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-full transition-colors whitespace-nowrap">
          <Camera size={14} />
          {buttonLabel}
        </span>
      </label>
    </div>
  );
}
