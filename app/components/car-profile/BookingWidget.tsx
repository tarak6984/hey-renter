'use client';

import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { Calendar, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { buildWhatsAppUrl } from '@/app/lib/utils';

const PickupModal = dynamic(() => import('@/app/components/car-profile/PickupModal'), {
  ssr: false,
});

interface BookingWidgetProps {
  carId: string;
  carBrand: string;
  carModel: string;
  pricePerDay: number;
  slug: string;
}

const NEGOTIATION_WHATSAPP_NUMBER = '8801788656498';
const COUNTRY_OPTIONS = [
  { code: '+971', label: 'AE', placeholder: '050 123 4567' },
  { code: '+1', label: 'US', placeholder: '(555) 000-0000' },
  { code: '+44', label: 'UK', placeholder: '07400 123456' },
  { code: '+91', label: 'IN', placeholder: '09876 543210' },
];

type BookingErrors = {
  selectedDate?: string;
  phone?: string;
  fullName?: string;
};

/**
 * Sticky booking sidebar widget on the Car Profile page.
 * Handles date selection, phone, name, reserve + WhatsApp CTA.
 */
export default function BookingWidget({
  carId,
  carBrand,
  carModel,
  pricePerDay,
  slug,
}: BookingWidgetProps) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState('+971');
  const [errors, setErrors] = useState<BookingErrors>({});
  const pickupButtonRef = useRef<HTMLButtonElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const fullNameInputRef = useRef<HTMLInputElement>(null);
  const normalizedPhone = phone.trim();
  const normalizedName = fullName.trim();
  const controlShadow = 'shadow-[0_1px_2px_rgba(0,0,0,0.05)]';
  const selectedCountry = COUNTRY_OPTIONS.find((option) => option.code === countryCode) ?? COUNTRY_OPTIONS[0];
  const phonePlaceholder = selectedCountry.placeholder;
  const whatsappMessage = [
    'Hello Hey Renter,',
    '',
    'I would like to negotiate this car rental offer.',
    'Please do not remove the information below so we can assist you faster.',
    `Car: ${carBrand} ${carModel}`,
    `Pickup Date & Time: ${selectedDate || 'Not selected yet'}`,
    `Best Rate: AED ${pricePerDay.toLocaleString()}/day`,
    `Phone: ${normalizedPhone ? `${countryCode} ${normalizedPhone}` : 'Not provided yet'}`,
    `Full Name: ${normalizedName || 'Not provided yet'}`,
  ].join('\n');
  const whatsappHref = buildWhatsAppUrl(NEGOTIATION_WHATSAPP_NUMBER, whatsappMessage);
  const hasValidationErrors = Object.keys(errors).length > 0;

  const handleReserve = () => {
    const nextErrors: BookingErrors = {};

    if (!selectedDate) {
      nextErrors.selectedDate = 'Please select pickup date and time';
    }
    if (!normalizedPhone) {
      nextErrors.phone = 'Please enter your phone number';
    }
    if (!normalizedName) {
      nextErrors.fullName = 'Please enter your full name';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);

      if (nextErrors.selectedDate) {
        pickupButtonRef.current?.focus();
      } else if (nextErrors.phone) {
        phoneInputRef.current?.focus();
      } else if (nextErrors.fullName) {
        fullNameInputRef.current?.focus();
      }

      return;
    }

    const params = new URLSearchParams({
      carId,
      slug,
      dateTime: selectedDate,
      phone: normalizedPhone,
      countryCode,
      fullName: normalizedName,
    });
    router.push(`/confirmation?${params.toString()}`);
  };

  return (
    <>
      <div className="flex flex-col gap-6 rounded-[20px] bg-white px-4 pb-4 pt-6 shadow-[0_2px_4px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.1)] xl:sticky xl:top-24">
        <h3 className="text-center text-[18px] font-medium leading-[26px] text-black">
          Get the Best Offer for This Car in Minutes
        </h3>

        {hasValidationErrors ? (
          <div
            aria-live="polite"
            className="rounded-[12px] border border-[#F3B2B2] bg-white px-4 py-3 text-[15px] font-medium leading-6 text-[#C62828]"
          >
            Please fill in the required information.
          </div>
        ) : null}

        <div className="flex flex-col gap-4">
          <button
            ref={pickupButtonRef}
            onClick={() => setModalOpen(true)}
            aria-describedby={errors.selectedDate ? 'pickup-date-error' : undefined}
            className={`flex w-full flex-col gap-[14px] rounded-[10px] border bg-[#F0F0F0] px-3 py-4 text-left transition-colors hover:border-black/20 ${controlShadow} ${
              errors.selectedDate ? 'border-[#E5484D]' : 'border-[#E0DFDF]'
            }`}
          >
            <span className="text-[18px] font-normal leading-[26px] text-black">
              Pickup Date &amp; Time
            </span>
            <span className="flex items-center justify-between gap-3">
              <span className="text-[18px] font-medium leading-[26px] text-black">
                {selectedDate || 'Select'}
              </span>
              <Calendar size={24} strokeWidth={2} className="text-black" />
            </span>
          </button>
          {errors.selectedDate ? (
            <p id="pickup-date-error" className="-mt-1 text-[14px] font-medium leading-5 text-[#E5484D]">
              {errors.selectedDate}
            </p>
          ) : null}

          <div className="flex flex-col gap-[18px] rounded-[10px] border border-[#9FDEC3] bg-[#E7F7F0] px-4 py-4">
            <p className="text-[18px] font-medium leading-[26px] text-[#0EAD69]">
              Best rate based on your selection
            </p>
            <p className="text-[18px] font-bold leading-[26px] text-black">
              AED {pricePerDay.toLocaleString()}/day
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-[16px] font-medium leading-6 text-black">
            Phone<span className="text-[#FF4D4F]">*</span>
          </label>
          <div
            className={`flex h-[52px] overflow-hidden rounded-[12px] border bg-white ${controlShadow} ${
              errors.phone ? 'border-[#E5484D]' : 'border-[#D8D8D8]'
            }`}
          >
            <div className="relative h-full w-[122px] border-r border-[#D8D8D8] bg-[#E9E9E9]">
              <div className="pointer-events-none flex h-full items-center justify-between px-3">
                <div className="flex items-center gap-[10px]">
                  <CountryFlag code={selectedCountry.code} />
                  <span className="text-[16px] font-medium leading-6 text-black">
                    {selectedCountry.code}
                  </span>
                </div>
                <svg
                  className="flex-shrink-0 text-black"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
                aria-label="Country code"
              >
                {COUNTRY_OPTIONS.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label} {option.code}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative h-full flex-1">
              {!phone ? (
                <span className="pointer-events-none absolute left-4 top-1/2 z-0 -translate-y-1/2 text-[16px] font-normal leading-6 text-black/50">
                  {phonePlaceholder}
                </span>
              ) : null}
              <input
                ref={phoneInputRef}
                type="tel"
                inputMode="tel"
                placeholder={phonePlaceholder}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) {
                    setErrors((current) => ({ ...current, phone: undefined }));
                  }
                }}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                className="relative z-10 h-full w-full bg-transparent px-4 text-[16px] font-normal leading-6 text-black outline-none placeholder:text-transparent"
              />
            </div>
          </div>
          {errors.phone ? (
            <p id="phone-error" className="-mt-1 text-[14px] font-medium leading-5 text-[#E5484D]">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-[18px] font-medium leading-[26px] text-black">
            Full Name<span className="text-[#FF4D4F]">*</span>
          </label>
          <input
            ref={fullNameInputRef}
            type="text"
            placeholder="Your full name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) {
                setErrors((current) => ({ ...current, fullName: undefined }));
              }
            }}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'full-name-error' : undefined}
            className={`h-14 rounded-[10px] border bg-white px-4 text-[18px] font-normal leading-[26px] text-black outline-none placeholder:text-black/55 ${controlShadow} ${
              errors.fullName ? 'border-[#E5484D]' : 'border-[#E0DFDF]'
            }`}
          />
          {errors.fullName ? (
            <p id="full-name-error" className="-mt-1 text-[14px] font-medium leading-5 text-[#E5484D]">
              {errors.fullName}
            </p>
          ) : null}
        </div>

        <button
          onClick={handleReserve}
          className="flex min-h-14 w-full items-center justify-center gap-[7px] rounded-[10px] border border-[#8DCC19] bg-[#B8F04F] px-4 py-3 text-center text-[16px] font-medium leading-6 text-black shadow-[0_16px_20px_rgba(113,170,6,0.35)] transition-colors hover:bg-[#afd95f] sm:px-6 sm:text-[18px] sm:leading-[26px]"
        >
          <Lock size={18} strokeWidth={2.3} />
          Reserve Now &amp; Pay on Delivery
        </button>

        <div className="flex items-center gap-[15px]">
          <div className="h-px flex-1 bg-[#E0DFDF]" />
          <p className="text-[16px] font-medium leading-6 text-black">Want a better deal?</p>
          <div className="h-px flex-1 bg-[#E0DFDF]" />
        </div>

        <div className="flex flex-col gap-4">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-14 w-full items-center justify-center gap-2 rounded-[10px] bg-[#1CC25A] px-4 py-3 text-center text-[16px] font-medium leading-6 text-white transition-colors hover:bg-[#18b253] sm:text-[18px] sm:leading-[26px]"
          >
            <span>Negotiate on</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>Whatsapp</span>
          </a>

          <div className="flex flex-col gap-5 rounded-[10px] border border-[#9FDEC3] bg-[#E7F7F0] px-4 py-4">
            <p className="text-[18px] font-medium leading-[26px] text-[#0EAD69]">
              How Negotiation Works?
            </p>
            <ol className="flex flex-col gap-[14px]">
              {[
                'Choose your dates.',
                'We contact 100+ rental companies.',
                'You receive the best quotes in 5 minutes.',
                'Lowest rate for the same or similar car.',
              ].map((step, i) => (
                <li key={i} className="text-[16px] font-normal leading-6 text-black sm:text-[18px] sm:leading-[26px]">
                  <span className="text-[#0EAD69]">{i + 1}.</span>{' '}
                  {step === 'We contact 100+ rental companies.' ? (
                    <>
                      We contact <span className="font-semibold">100+</span> rental companies.
                    </>
                  ) : step === 'You receive the best quotes in 5 minutes.' ? (
                    <>
                      You receive the best quotes in <span className="font-semibold">5</span> minutes.
                    </>
                  ) : (
                    step
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {modalOpen ? (
        <PickupModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={(date) => {
            setSelectedDate(date);
            setErrors((current) => ({ ...current, selectedDate: undefined }));
            setModalOpen(false);
          }}
        />
      ) : null}
    </>
  );
}

function CountryFlag({ code }: { code: string }) {
  switch (code) {
    case '+971':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
          <defs>
            <clipPath id="uae-flag-circle">
              <circle cx="12" cy="12" r="12" />
            </clipPath>
          </defs>
          <circle cx="12" cy="12" r="12" fill="#FFFFFF" />
          <g clipPath="url(#uae-flag-circle)">
            <rect x="0" y="0" width="6.75" height="24" fill="#FF3B30" />
            <rect x="6.75" y="0" width="17.25" height="8" fill="#009A49" />
            <rect x="6.75" y="8" width="17.25" height="8" fill="#FFFFFF" />
            <rect x="6.75" y="16" width="17.25" height="8" fill="#000000" />
          </g>
        </svg>
      );
    case '+1':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
          <defs>
            <clipPath id="us-flag-circle">
              <circle cx="12" cy="12" r="12" />
            </clipPath>
          </defs>
          <g clipPath="url(#us-flag-circle)">
            <circle cx="12" cy="12" r="12" fill="#FFFFFF" />
            <rect x="0" y="0" width="24" height="24" fill="#FFFFFF" />
            <rect x="0" y="0" width="24" height="2.2" fill="#D22F27" />
            <rect x="0" y="4.4" width="24" height="2.2" fill="#D22F27" />
            <rect x="0" y="8.8" width="24" height="2.2" fill="#D22F27" />
            <rect x="0" y="13.2" width="24" height="2.2" fill="#D22F27" />
            <rect x="0" y="17.6" width="24" height="2.2" fill="#D22F27" />
            <rect x="0" y="22" width="24" height="2.2" fill="#D22F27" />
            <rect x="0" y="0" width="11" height="11.8" fill="#23408E" />
          </g>
        </svg>
      );
    case '+44':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
          <defs>
            <clipPath id="uk-flag-circle">
              <circle cx="12" cy="12" r="12" />
            </clipPath>
          </defs>
          <g clipPath="url(#uk-flag-circle)">
            <circle cx="12" cy="12" r="12" fill="#1F4AA8" />
            <path d="M0 3.5 3.5 0 24 20.5 20.5 24 0 3.5Z" fill="#FFFFFF" />
            <path d="M20.5 0 24 3.5 3.5 24 0 20.5 20.5 0Z" fill="#FFFFFF" />
            <path d="M0 5.2 5.2 0 24 18.8 18.8 24 0 5.2Z" fill="#D22F27" />
            <path d="M18.8 0 24 5.2 5.2 24 0 18.8 18.8 0Z" fill="#D22F27" />
            <rect x="9.2" y="0" width="5.6" height="24" fill="#FFFFFF" />
            <rect x="0" y="9.2" width="24" height="5.6" fill="#FFFFFF" />
            <rect x="10.2" y="0" width="3.6" height="24" fill="#D22F27" />
            <rect x="0" y="10.2" width="24" height="3.6" fill="#D22F27" />
          </g>
        </svg>
      );
    case '+91':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
          <defs>
            <clipPath id="in-flag-circle">
              <circle cx="12" cy="12" r="12" />
            </clipPath>
          </defs>
          <g clipPath="url(#in-flag-circle)">
            <rect x="0" y="0" width="24" height="8" fill="#FF9933" />
            <rect x="0" y="8" width="24" height="8" fill="#FFFFFF" />
            <rect x="0" y="16" width="24" height="8" fill="#138808" />
            <circle cx="12" cy="12" r="2.6" stroke="#1A3C8E" strokeWidth="1.2" />
          </g>
        </svg>
      );
    default:
      return (
        <div className="h-6 w-6 rounded-full bg-white" />
      );
  }
}
