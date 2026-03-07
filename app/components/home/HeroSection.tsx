import Image from 'next/image';

const HERO_IMAGE_WIDTH = 2880;
const HERO_IMAGE_HEIGHT = 550;

/**
 * Home hero section based on the 1440px Figma desktop frame.
 * The artwork is rendered at its native aspect ratio so browser zoom
 * does not re-crop the cars when the effective viewport changes.
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
      }}
    >
      <div className="flex flex-col items-center gap-2 px-4 pt-14 text-center sm:px-6 md:px-[39px] md:pt-20">
        <h1
          className="max-w-[16ch]"
          style={{
            fontFamily: 'var(--font-clash)',
            fontSize: 'clamp(36px, 4vw, 48px)',
            fontWeight: 700,
            lineHeight: '1.2',
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
            fontSize: 'clamp(16px, 1.5vw, 18px)',
            fontWeight: 500,
            lineHeight: '1.45',
            color: '#000000',
            margin: 0,
          }}
        >
          Rent the Dream. Live the Lifestyle.
        </p>
      </div>

      <div className="h-10 shrink-0 md:h-12" />

      <div className="mx-auto w-full max-w-[1440px]">
        <div
          className="relative w-full"
          style={{
            aspectRatio: `${HERO_IMAGE_WIDTH} / ${HERO_IMAGE_HEIGHT}`,
            flexShrink: 0,
          }}
        >
          <Image
            src="/assets/hero/hero-cars-figma.png"
            alt="Luxury cars showcase - Rolls Royce, Lamborghini Urus, Sports Car"
            fill
            className="object-contain object-center"
            priority
            sizes="(max-width: 1440px) 100vw, 1440px"
            quality={90}
          />
        </div>
      </div>

      <div className="h-12 shrink-0 md:h-16" />
    </section>
  );
}
