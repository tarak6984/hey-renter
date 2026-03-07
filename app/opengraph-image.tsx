import { ImageResponse } from 'next/og';
import { BrandShareFrame, getLogoDataUrl } from '@/app/lib/brand-media';

export const runtime = 'nodejs';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const logoSrc = await getLogoDataUrl();

  return new ImageResponse(<BrandShareFrame logoSrc={logoSrc} />, size);
}
