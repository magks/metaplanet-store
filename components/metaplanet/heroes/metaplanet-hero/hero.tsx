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
      >
        {/* Content Overlay */}
        {(title || subtitle) && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            {/*<div className="text-center text-white px-4">*/}
                            {/*<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                  {title}
                </h1>*/}
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
            {/* Dark overlay for text readability */}
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