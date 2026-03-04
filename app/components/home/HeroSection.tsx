import Image from 'next/image';

/**
 * Hero section – pixel-perfect from Figma node I8937:42821;5425:35599
 * Uses the exported hero-cars.png (2880×550) directly from Figma.
 * Typography matches: Heading 2 – 48/Clash Display, Body Large/Medium.
 */
export default function HeroSection() {
  return (
    <section className="relative bg-[#EFEFEF] overflow-hidden">
      {/* Title & Body – Figma: "Title & Body" frame */}
      <div className="text-center pt-14 pb-0 px-4">
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-black uppercase leading-tight"
          style={{ fontFamily: 'var(--font-inter), sans-serif', letterSpacing: '-0.02em' }}
        >
          RENT A LUXURY CAR IN DUBAI
        </h1>
        <p className="mt-3 text-gray-700 text-lg font-medium">
          Rent the Dream. Live the Lifestyle.
        </p>
      </div>

      {/* Car Images – Figma node I8937:42821;5425:35599, exported at 2× (2880×550px) */}
      <div className="relative w-full" style={{ aspectRatio: '2880/550' }}>
        <Image
          src="/assets/hero/hero-cars.png"
          alt="Luxury cars showcase – Lamborghini Urus, Rolls Royce, Sports Car"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={90}
        />
      </div>
    </section>
  );
}
