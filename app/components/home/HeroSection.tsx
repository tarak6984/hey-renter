import Image from 'next/image';

/**
 * Hero section – full-width car showcase with headline text.
 * Center car is the focal point; flanking cars hint at a carousel.
 */
export default function HeroSection() {
  return (
    <section className="relative bg-[#f0f0f0] overflow-hidden">
      {/* Headline */}
      <div className="text-center pt-14 pb-4 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black uppercase leading-tight">
          Rent a Luxury Car in Dubai
        </h1>
        <p className="mt-3 text-gray-500 text-base font-medium">
          Rent the Dream. Live the Lifestyle.
        </p>
      </div>

      {/* Car showcase – three overlapping cars */}
      <div className="relative flex items-end justify-center h-64 md:h-80 overflow-hidden">
        {/* Left car (partial) */}
        <div className="absolute left-0 bottom-0 w-1/4 opacity-70 translate-y-4">
          <div className="relative h-40 md:h-56 w-full">
            <Image
              src="/hero/car-left.png"
              alt="Luxury car"
              fill
              className="object-contain object-right"
              priority
            />
          </div>
        </div>

        {/* Center car (hero) */}
        <div className="relative z-10 w-1/2 md:w-2/5 h-48 md:h-72">
          <Image
            src="/hero/car-center.png"
            alt="Lamborghini Urus – hero car"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Right car (partial) */}
        <div className="absolute right-0 bottom-0 w-1/4 opacity-70 translate-y-4">
          <div className="relative h-40 md:h-56 w-full">
            <Image
              src="/hero/car-right.png"
              alt="Sports car"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
