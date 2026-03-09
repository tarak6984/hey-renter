import { Metadata } from 'next';
import StaticInfoPage from '@/app/components/ui/StaticInfoPage';

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

export default function HelpPage() {
  return (
    <StaticInfoPage
      currentLabel="Get Help"
      eyebrow="Support"
      title="We are here to help with your rental journey."
      intro="This page is a simple placeholder for now, but it gives users a clear place to look when they need support with bookings, car details, rental conditions, or general questions about the platform."
      cards={helpTopics}
      sectionTitle="Ways to get support"
      sectionList={[
        'Live chat assistance during support hours',
        'WhatsApp support for quick rental questions',
        'Email help for follow-ups and booking details',
      ]}
    />
  );
}
