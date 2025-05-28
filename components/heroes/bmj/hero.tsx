'use client';
// components/hero.tsx
import clsx from 'clsx';
//import { MetaplanetLogo } from '../../metaplanet-logo';

interface HeroProps {
  mobileImage: string;
  desktopImage: string;
  alt: string;
  title?: string;
  subtitle?: string;
  className?: string;
  breakpoint?: 'sm' | 'md' | 'lg'; // When to switch from mobile to desktop
}

export function Hero({
  mobileImage,
  desktopImage,
  alt,
  title,
  subtitle,
  className,
  breakpoint = 'sm' // Default breakpoint is medium (768px)
}: HeroProps) {
  // Dynamic classes based on breakpoint
  const mobileClasses = breakpoint === 'sm' ? 'block sm:hidden' : ( 
                       breakpoint === 'md' ? 'block md:hidden' : 
                       'block lg:hidden');
                       
  const desktopClasses = breakpoint === 'sm' ? 'hidden sm:block' : (
                        breakpoint === 'md' ? 'hidden md:block' : 
                        'hidden lg:block');

  return (
    <>
      {/* Add this to your globals.css or component styles */}
      {/*section classname           'h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]',*/}
      <style jsx>{`
        .hero-background {
          background-image: url('${mobileImage}');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        @media (min-width: 768px) {
          .hero-background {
            background-image: url('${desktopImage}');
          }
        }
      `}</style>
      
      <section 
        className={clsx(
          'hero-background relative w-full overflow-hidden',
          'h-[100vh] ',
          className
        )}
        role="img"
        aria-label={alt}
      >
        {/* Content Overlay */}
        {(title || subtitle) && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pt-50">
            {/*<div className="text-center text-white px-4">*/}
                            {/*<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                  {title}
                </h1>*/}
            <div className="text-center text-white px-10 py-2 backdrop-blur-md rounded-sm border border-white border-opacity-10">
              {title && (
                <h3 className="font-semibold text-lg">Global Shipping</h3>
              )}
              
            </div>
            {/* Dark overlay for text readability */}
          </div>
        )}
      </section>
    </>
  );
}

// Usage examples for your storefronts:

export function BitcoinMagazineHero() {
  return (
    <Hero
      mobileImage="/images/restaurant-bitcoin-b.png"
      desktopImage="/images/cartoon-btcmagjp-bitcoin-b-shirts-hats-books-lg.png"
      alt="Bitcoin Magazine Japan"
      title="Bitcoin Magazine Japan"
      subtitle="The Latest in Bitcoin News and Analysis"
      breakpoint="md" // Switch at 768px
    />
  );
}
