import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TopBar from '@/app/components/shared/TopBar';
import Navbar from '@/app/components/shared/Navbar';
import Footer from '@/app/components/shared/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Hey Renter – Rent a Luxury Car in Dubai',
    template: '%s | Hey Renter',
  },
  description:
    'Rent luxury, super, SUV, convertible and economy cars in Dubai. Best rates from 500+ rental companies. No deposit options available.',
  keywords: ['luxury car rental dubai', 'rent supercar dubai', 'hey renter', 'car hire dubai'],
  openGraph: {
    title: 'Hey Renter – Rent a Luxury Car in Dubai',
    description: 'Rent the Dream. Live the Lifestyle.',
    url: 'https://hey-renter.com',
    siteName: 'Hey Renter',
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hey Renter – Rent a Luxury Car in Dubai',
    description: 'Rent the Dream. Live the Lifestyle.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-[#f5f5f5] text-gray-900`}>
        <TopBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
