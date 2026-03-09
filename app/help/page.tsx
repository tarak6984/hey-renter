import { Metadata } from 'next';
import Breadcrumb from '@/app/components/shared/Breadcrumb';

export const metadata: Metadata = {
  title: 'Get Help | Hey Renter',
  description:
    'Get help with bookings, vehicle details, rental questions, and general support on Hey Renter.',
};

const helpTopics = [
  {
    title: 'Booking Support',
    body: 'If you need help understanding availability, pricing, or the booking flow, our support team can help guide you through the process.',
  },
  {
    title: 'Rental Questions',
    body: 'Need more clarity on insurance, mileage, documents, or pickup requirements? We can help explain the details before you reserve.',
  },
  {
    title: 'General Assistance',
    body: 'For anything else related to browsing, comparing cars, or using the platform, reach out and we will point you in the right direction.',
  },
];

const contactOptions = [
  'Live chat assistance during support hours',
  'WhatsApp support for quick rental questions',
  'Email help for follow-ups and booking details',
];

export default function HelpPage() {
  return (
    <div className="pb-16">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Get Help' },
        ]}
      />

      <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 pt-2 sm:px-6 md:px-[39px]">
        <div className="rounded-[28px] border border-black/8 bg-white px-6 py-10 shadow-[0_16px_48px_rgba(0,0,0,0.06)] sm:px-8 sm:py-12">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-black/45">
            Support
          </p>
          <h1 className="mt-3 max-w-[720px] text-[36px] font-semibold leading-[1.05] text-black sm:text-[48px]">
            We are here to help with your rental journey.
          </h1>
          <p className="mt-5 max-w-[760px] text-[16px] leading-7 text-black/65 sm:text-[18px]">
            This page is a simple placeholder for now, but it gives users a clear
            place to look when they need support with bookings, car details,
            rental conditions, or general questions about the platform.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {helpTopics.map((item) => (
            <article
              key={item.title}
              className="rounded-[24px] border border-black/8 bg-white px-6 py-6 shadow-[0_12px_36px_rgba(0,0,0,0.05)]"
            >
              <h2 className="text-[20px] font-semibold text-black">{item.title}</h2>
              <p className="mt-3 text-[15px] leading-7 text-black/60">{item.body}</p>
            </article>
          ))}
        </div>

        <section className="rounded-[28px] border border-black/8 bg-white px-6 py-8 shadow-[0_16px_48px_rgba(0,0,0,0.06)] sm:px-8">
          <h2 className="text-[26px] font-semibold text-black">Ways to get support</h2>
          <ul className="mt-4 grid gap-3 text-[15px] leading-7 text-black/65 sm:grid-cols-2">
            {contactOptions.map((item) => (
              <li
                key={item}
                className="rounded-[18px] border border-black/8 bg-black/[0.02] px-5 py-4"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
}
