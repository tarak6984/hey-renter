import Image from 'next/image';

/**
 * Hero section – pixel-perfect from Figma node 8937-42820
 *
 * Figma specs:
 *   BG: linear-gradient top→bottom rgba(222,222,222,0) → rgba(222,222,222,1)
 *   Title & Body: centered, padding T=80px L=39px R=39px, gap=24px between them
 *   Gap between text block and car image: 48px
 *   Car images: full viewport width (no side padding), H=275px, bleeds to edges
 *   Bottom padding: 64px (below car image)
 *   SearchBar overlaps bottom of hero by 36px (negative margin in page layout)
 *
 *   Title: Clash Display, 48px, fw=700, lh=58px, color=#000, UPPERCASE, CENTER
 *   Body:  TT Norms Pro, 18px, fw=500, lh=26px, color=#000, CENTER
 */
export default function HeroSection() {
  return (
    <section
      style={{
        background: 'linear-gradient(to bottom, rgba(222,222,222,0) 0%, rgba(222,222,222,1) 100%)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100vw',
      }}
    >
      {/* ── Title & Body ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          textAlign: 'center',
          paddingTop: '80px',
          paddingLeft: '39px',
          paddingRight: '39px',
          paddingBottom: '0',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-clash)',
            fontSize: '48px',
            fontWeight: 700,
            lineHeight: '58px',
            color: '#000000',
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '0',
          }}
        >
          Rent a Luxury Car in Dubai
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-tt-norms)',
            fontSize: '18px',
            fontWeight: 500,
            lineHeight: '26px',
            color: '#000000',
            margin: 0,
          }}
        >
          Rent the Dream. Live the Lifestyle.
        </p>
      </div>

      {/* ── 48px gap between text and image ── */}
      <div style={{ height: '48px', flexShrink: 0 }} />

      {/* ── Car Images – full viewport width, H=275px, bleeds edge-to-edge ── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '275px',
          flexShrink: 0,
        }}
      >
        <Image
          src="/assets/hero/hero-cars.png"
          alt="Luxury cars showcase – Rolls Royce, Lamborghini Urus, Sports Car"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={90}
        />
      </div>

      {/* ── 64px bottom padding ── */}
      <div style={{ height: '64px', flexShrink: 0 }} />
    </section>
  );
}
