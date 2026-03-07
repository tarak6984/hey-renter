/* eslint-disable @next/next/no-img-element */
import path from 'node:path';
import { readFile } from 'node:fs/promises';

const LOGO_PATH = path.join(process.cwd(), 'public', 'assets', 'icons', 'logo.svg');

export async function getLogoDataUrl() {
  const svg = await readFile(LOGO_PATH, 'utf8');
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

export function BrandShareFrame({
  logoSrc,
  showTagline = true,
}: {
  logoSrc: string;
  showTagline?: boolean;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        background: '#12151C',
        color: 'white',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 15% 15%, rgba(184,240,79,0.2), transparent 32%), radial-gradient(circle at 85% 85%, rgba(184,240,79,0.14), transparent 30%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 14,
          background: '#B8F04F',
        }}
      />
      <img
        src={logoSrc}
        alt="Hey Renter logo"
        style={{
          width: showTagline ? 720 : 220,
          height: 'auto',
        }}
      />
      {showTagline ? (
        <div
          style={{
            marginTop: 40,
            fontSize: 42,
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          Rent the Dream. Live the Lifestyle.
        </div>
      ) : null}
    </div>
  );
}
