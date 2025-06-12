'use client';
// components/hero.tsx
import { MetaplanetLogo } from '@/components/metaplanet/metaplanet-logo';
import clsx from 'clsx';


interface HeroProps {
  mobileImage: string;
  desktopImage: string;
  alt: string;
  title?: string;
  subtitle?: string;
  className?: string;
  breakpoint?: 'sm' | 'md' | 'lg';
}

interface HeroProps {
  mobileImage: string;
  desktopImage: string;
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
  breakpoint = 'sm'
}: HeroProps) {
  const mobileClasses = breakpoint === 'sm' ? 'block sm:hidden' : (
                        breakpoint === 'md' ? 'block md:hidden' :
                        'block lg:hidden');
                          
  const desktopClasses = breakpoint === 'sm' ? 'hidden sm:block' : (
                        breakpoint === 'md' ? 'hidden md:block' : 
                         'hidden lg:block');

  return (
    <>
      <style jsx>{`
        .hero-background-mtp {
          background-image: url('${mobileImage}');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        /* Gradient overlay that fades to background color */
        .gradient-fade {
          background: linear-gradient(
            to bottom,
            transparent 0%,
            transparent 40%,
            rgb(var(--background) / 0.5) 60%,
            rgb(var(--background) / 0.8) 80%,
            rgb(var(--background)) 95%
          );
        }
        
        @media (min-width: 768px) {
          .hero-background-mtp {
            background-image: url('${desktopImage}');
          }
        }
      `}</style>
      
      <section 
        className={clsx(
          'hero-background-mtp relative w-full overflow-hidden',
          'h-[67vh]',
          className
        )}
        role="img"
      >
        {/* Gradient Overlay BOTTOM - Multiple layers for better browser support */}
        {/*<div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% via-black/50 via-70% to-black to-95% z-[5]" />*/}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% via-black/50 via-70% to-neutral-500 to-95% z-[5]"/>
        {/*<div 
          className="absolute inset-0" 
          style={{
            background: `linear-gradient(180deg, transparent 30%, ${getComputedStyle(document.documentElement).getPropertyValue('--background')} 100%)`
          }}
        />
        */}

        {/* Additional overlay for background color matching */}
        <div 
          className="absolute inset-0 z-[5]" 
          style={{
            background: `linear-gradient(to bottom, transparent 0%, transparent 50%, var(--background, #000) 100%)`
          }}
        />

        {/* Gradient Overlay TOP - Multiple layers for better browser support */}
        {/*<div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% via-black/50 via-70% to-black to-95% z-[5]" />*/}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent from-89% via-[var(--navbar-black)]/30 via-91% to-[var(--navbar-black)] to-97% z-[5]"/>
        {/*<div 
          className="absolute inset-0" 
          style={{
            background: `linear-gradient(180deg, transparent 30%, ${getComputedStyle(document.documentElement).getPropertyValue('--background')} 100%)`
          }}
        />
        */}

        {/* Additional overlay for background color matching */}
        <div 
          className="absolute inset-0 z-[5]" 
          style={{
            background: `linear-gradient(to top, transparent 0%, transparent 95%, var(--navbar-balck, #000) 100%)`
          }}
        />

        {/* Additional overlay to darken image*/}
        <div 
          className="absolute inset-0 z-[5] bg-metaplanet-secondary-dark opacity-50" 
        />
        
        {/* Content Overlay */}
        {(title || subtitle) && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-left text-white px-3 py-2 backdrop-blur-md rounded-lg border border-white border-opacity-10">
              {title && true && (
                <MetaplanetLogo
                    variant="100"
                    width={600}
                    height={90}
                    className="max-w-[50vw]"
                    mode="light"
                />
               )}
              {title && true  && (
                <MetaplanetLogo
                    variant="015"
                    width={600}
                    height={80.4}
                    className="w-full max-w-[90vw] h-auto"
                    mode="dark"
                />
              )}
              {subtitle && (
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl drop-shadow-lg">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export function MetaplanetHero() {
  return (
    <Hero
      mobileImage="/images/metaplanet-mockup-ai-hall-of-metaplanet-portrait-rightcornercrop.png"
      desktopImage="/images/metaplanet-dojo-sky.jpeg"
      alt="Metaplanet Inc."
      title="Metaplanet Inc."
      breakpoint="sm"
    />
  );
}