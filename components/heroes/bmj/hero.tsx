'use client';
import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';

// Import images directly for optimal load times and blur generation
import desktopImage from '@/public/images/FinalDay_600x_486_3000x1638_crop_center.webp';
import mobileImage from '@/public/images/restaurant-bitcoin-b.png';
interface HeroProps {
  mobileImage: string | StaticImageData;
  desktopImage: string | StaticImageData;
  alt: string;
  title?: string;
  subtitle?: string;
  className?: string;
  breakpoint?: 'sm' | 'md' | 'lg';
}

export function Hero({
  mobileImage,
  desktopImage,
  alt,
  title,
  subtitle,
  className,
  breakpoint = 'sm',
}: HeroProps) {
  const mobileClasses = breakpoint === 'sm' ? 'block sm:hidden' : 
                       breakpoint === 'md' ? 'block md:hidden' : 
                       'block lg:hidden';
  const desktopClasses = breakpoint === 'sm' ? 'hidden sm:block' : 
                        breakpoint === 'md' ? 'hidden md:block' : 
                        'hidden lg:block';

  return (
    <>
      {/* Inline critical CSS for stroke-shadow */}
      <style jsx>{`
        .stroke-shadow {
          color: #FFFFFF;
          text-shadow:
            -1px -1px 1px white,
            2px -2px 2px blue,
            -1px 1px 3px yellow,
            1px 1px 4px red;
        }
      `}</style>

      <section
        className={clsx(
          'relative w-full overflow-hidden',
          'h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]',
          className
        )}
        role="img"
        aria-label={alt}
      >
        {/* Mobile Image */}
        <div className={mobileClasses}>
          <Image
            src={mobileImage}
            alt={alt}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={75}
            placeholder="blur"
          />
        </div>
        {/* Desktop Image */}
        <div className={desktopClasses}>
          <Image
            src={desktopImage}
            alt={alt}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={75}
            placeholder="blur"
          />
        </div>

        {/* Content Overlay */}
        {(title || subtitle) && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 pt-30">
            <div className="uppercase stroke-shadow text-center text-white px-10 py-2 border border-white transform translate-y-[60%]">
              {title && <h1 className="font-semibold text-lg text-outline">{title}</h1>}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export function BitcoinMagazineHero() {
  return (
    <Hero
      mobileImage={mobileImage}
      desktopImage={desktopImage}
      alt="Bitcoin Magazine Japan"
      title="Bitcoin Magazine Japan"
      subtitle="The Latest in Bitcoin News and Analysis"
      breakpoint="sm"
    />
  );
}