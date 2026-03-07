import { ImageResponse } from 'next/og';
import { BrandShareFrame, getLogoDataUrl } from '@/app/lib/brand-media';

export const runtime = 'nodejs';
export const size = {
  width: 64,
  height: 64,
};
export const contentType = 'image/png';

export default async function Icon() {
  const logoSrc = await getLogoDataUrl();

  return new ImageResponse(<BrandShareFrame logoSrc={logoSrc} showTagline={false} />, size);
}
