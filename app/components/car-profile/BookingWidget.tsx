'use client';

import { useState } from 'react';
import { Calendar, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PickupModal from '@/app/components/car-profile/PickupModal';

interface BookingWidgetProps {
  carId: string;
  carBrand: string;
  carModel: string;
  pricePerDay: number;
  slug: string;
}

const NEGOTIATION_WHATSAPP_NUMBER = '8801788656498';

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
  const normalizedPhone = phone.trim();
  const normalizedName = fullName.trim();
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
  const whatsappHref = `https://wa.me/${NEGOTIATION_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleReserve = () => {
    if (!phone || !fullName) return;
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
      <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-5 space-y-4 sticky top-24">
        <h3 className="text-sm font-semibold text-center text-gray-700">
          Get the Best Offer for This Car in Minutes
        </h3>

        {/* Pickup Date & Time */}
        <button
          onClick={() => setModalOpen(true)}
          className="w-full flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 hover:border-gray-400 transition-colors"
        >
          <div className="text-left">
            <p className="text-xs text-gray-400 font-medium">Pickup Date &amp; Time</p>
            <p className="text-sm font-semibold text-gray-700">{selectedDate || 'Select'}</p>
          </div>
          <Calendar size={18} className="text-gray-400" />
        </button>

        {/* Best Rate banner */}
        <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3">
          <p className="text-green-600 text-xs font-semibold">Best rate based on your selection</p>
          <p className="text-gray-900 text-sm font-bold mt-0.5">
            AED <span className="text-2xl font-extrabold">{pricePerDay.toLocaleString()}</span>/day
          </p>
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1 block">
            Phone <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="bg-gray-50 text-sm px-2 py-3 outline-none border-r border-gray-200"
            >
              <option value="+971">🇦🇪 +971</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+91">🇮🇳 +91</option>
            </select>
            <input
              type="tel"
              placeholder="(555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 px-3 py-3 text-sm outline-none"
            />
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1 block">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors"
          />
        </div>

        {/* Reserve CTA */}
        <button
          onClick={handleReserve}
          className="w-full bg-[#CDFF00] hover:bg-[#b8e600] text-black font-bold py-3.5 rounded-full flex items-center justify-center gap-2 transition-colors"
        >
          <Lock size={16} />
          Reserve Now &amp; Pay on Delivery
        </button>

        {/* WhatsApp negotiation */}
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Want a better deal?</p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-colors text-sm"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Negotiate on Whatsapp
          </a>
        </div>

        {/* How Negotiation Works */}
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs font-bold text-gray-700 mb-2">How Negotiation Works?</p>
          <ol className="space-y-1">
            {[
              'Choose your dates.',
              'We contact 100+ rental companies.',
              'You receive the best quotes in 5 minutes.',
              'Lowest rate for the same or similar car.',
            ].map((step, i) => (
              <li key={i} className="text-xs text-gray-500 flex gap-2">
                <span className="font-bold text-gray-700">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Pickup Date/Time Modal */}
      <PickupModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={(date) => {
          setSelectedDate(date);
          setModalOpen(false);
        }}
      />
    </>
  );
}
