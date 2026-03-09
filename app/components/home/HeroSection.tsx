import Image from 'next/image';

const HERO_STAGE_HEIGHT = 275;
/**
 * Home hero section based on the 1440px Figma desktop frame.
 * The hero art is composed from three separate car assets inside an oversized
  * centered rail. At the baseline desktop width the side cars are intentionally
  * cropped, and wider viewports reveal more of them naturally.
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

      <div className="w-full overflow-hidden">
        <div
          className="relative w-full overflow-hidden"
          style={{
            flexShrink: 0,
            height: `clamp(180px, ${(HERO_STAGE_HEIGHT / 1440) * 100}vw, ${HERO_STAGE_HEIGHT}px)`,
          }}
        >
          <div
            className="pointer-events-none absolute bottom-0 left-1/2 grid -translate-x-1/2 items-end"
            style={{
              width: 'clamp(1700px, 155vw, 2430px)',
              gridTemplateColumns: '31.11% 31.48% 31.48%',
              gap: '2.96%',
            }}
          >
            <Image
              src="/assets/hero/left-car-image.png"
              alt="Rolls Royce side profile"
              width={2000}
              height={617}
              priority
              className="h-auto w-full self-end"
              sizes="(max-width: 1440px) 52.5vw, 756px"
              quality={92}
            />
            <Image
              src="/assets/hero/middle-car-image.png"
              alt="Lamborghini Urus side profile"
              width={1537}
              height={550}
              priority
              className="h-auto w-full self-end"
              sizes="(max-width: 1440px) 53.125vw, 765px"
              quality={92}
            />
            <Image
              src="/assets/hero/right-car-image.png"
              alt="Sports car side profile"
              width={1725}
              height={567}
              priority
              className="h-auto w-full self-end"
              sizes="(max-width: 1440px) 53.125vw, 765px"
              quality={92}
            />
          </div>
        </div>
      </div>

      <div className="h-12 shrink-0 md:h-16" />
    </section>
  );
}
