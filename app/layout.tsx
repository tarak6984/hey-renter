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
      <head>
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/tt-norms-pro" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <TopBar />
        {/* Gradient divider – very subtle, white 6% opacity center, transparent edges */}
        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
            backgroundColor: '#12151C',
          }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
