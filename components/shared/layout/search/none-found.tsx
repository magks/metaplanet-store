'use client';

import { BRAND_ID } from '@/lib/app-settings';
import { default as backgroundImageBmj, default as backgroundImageDefault } from '@/public/images/cartoon-btcmagjp-bitcoin-b-shirts-hats-books-lg.webp';
import { default as backgroundImageMetaplanet } from '@/public/images/planets-hero.webp';

import { useViewportForAnimations } from '@/components/shared/client-utils/window';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { translateOrDefault } from 'utils';

const bgImgMap = { 
  metaplanet: backgroundImageMetaplanet,
  bmj: backgroundImageBmj,
} as any;

interface NoneFoundProps {
  namespace?: string;
  titleTranslation?: string;
  titleDefault?: string;
  titleKey?: string;
  titleSearchParams?: string;
  descriptionTranslation?: string;
  descriptionDefault?: string;
  descriptionKey?: string;
  buttonTranslation?: string;
  buttonDefault?: string;
  buttonKey?: string;
  disableButton?: boolean;
}

interface BackgroundImageProps {
  backgroundImage: any;
}

const BackgroundImage = ({ backgroundImage }: BackgroundImageProps) => (
  <Image
    src={backgroundImage}
    alt="Background for no products found"
    onError={() => {}}
    fill
    className="object-cover object-center rounded-lg"
    priority={true}
    quality={75}
  />
);

interface AnimatedSearchIconProps {
  xKeyframes: number[];
  yKeyframes: number[];
}

const AnimatedSearchIcon = ({ xKeyframes, yKeyframes }: AnimatedSearchIconProps) => (
  <motion.div
    className="mb-4 text-4xl text-grey-200 flex justify-center"
    animate={{
      x: xKeyframes,
      y: yKeyframes,
    }}
    transition={{
      y: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        times: Array.from({ length: 12 }, (_, i) => i / 12),
      },
      x: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        times: Array.from({ length: 12 }, (_, i) => i / 12),
      },
    }}
  >
    <FaSearch />
  </motion.div>
);

const StaticSearchIcon = () => (
  <div className="mb-4 text-4xl text-grey-200 flex justify-center">
    <FaSearch />
  </div>
);

interface ContentTextProps {
  t: any;
  titleTranslation: string;
  titleSearchParams: string;
  descriptionTranslation: string;
  descriptionDefault: string;
  namespace: string;
  descriptionKey: string;
}

const ContentText = ({ 
  t, 
  titleTranslation, 
  titleSearchParams, 
  descriptionTranslation, 
  descriptionDefault, 
  namespace, 
  descriptionKey 
}: ContentTextProps) => (
  <>
    <h2 className="mb-2 text-2xl font-semibold text-gray-300">
      {t.rich(titleTranslation, {
        params: titleSearchParams,
        searchParams: (chunks: any) => (
          <span className="font-bold text-gray-50">{chunks}</span>
        )
      })}
    </h2>
    <p className="mb-6 text-gray-400">
      {translateOrDefault(t(descriptionTranslation), descriptionDefault, `${namespace}.${descriptionKey}`)}
    </p>
  </>
);

interface ActionButtonProps {
  disableButton: boolean;
  t: any;
  buttonTranslation: string;
  buttonDefault: string;
  namespace: string;
  buttonKey: string;
}

const ActionButton = ({ 
  disableButton, 
  t, 
  buttonTranslation, 
  buttonDefault, 
  namespace, 
  buttonKey 
}: ActionButtonProps) => {
  if (disableButton) return null;
  
  return (
    <button
      className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
      onClick={() => window.location.reload()}
    >
      {translateOrDefault(t(buttonTranslation), buttonDefault, `${namespace}.${buttonKey}`)}
    </button>
  );
};

interface ContentContainerProps {
  children: React.ReactNode;
  isAnimated?: boolean;
  viewportWidth: number;
  viewportHeight: number;
}

const ContentContainer = ({ 
  children, 
  isAnimated = false, 
  viewportWidth, 
  viewportHeight 
}: ContentContainerProps) => {
  const baseClasses = "max-w-md rounded-lg bg-black/40 p-6 text-center shadow-lg";
  
  if (isAnimated) {
    return (
      <motion.div
        className={baseClasses}
        initial={{ 
          opacity: 1, 
          y: 30,
          x: -viewportWidth  // Just outside left edge of viewport
        }}
        animate={{ opacity: 1, y: 30, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    );
  }
  
  return <div className={baseClasses}>{children}</div>;
};

const NoneFound = ({
  namespace = 'collections',
  titleTranslation = 'noProductsFound',
  titleDefault = 'No products found in this collection',
  titleKey = 'noProductsFound',
  titleSearchParams = '',
  descriptionTranslation = 'noProductsFoundDescription',
  descriptionDefault = 'Try adjusting your filters or explore other categories.',
  descriptionKey = 'noProductsFoundDescription',
  buttonTranslation = 'clearFilters',
  buttonDefault = 'Clear Filters',
  buttonKey = 'clearFilters',
  disableButton = true
}: NoneFoundProps) => {
  const { width: viewportWidth, height: viewportHeight, isReady } = useViewportForAnimations();
  const t = useTranslations(namespace);

  const bgImgDefault = bgImgMap[BRAND_ID] || backgroundImageDefault;
  
  // SSR-safe background image selection
  const [backgroundImage, setBackgroundImage] = useState(bgImgDefault);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Only set brand-specific image on client side
    const brandImage = bgImgMap[BRAND_ID];
    setBackgroundImage(brandImage);
  }, []);

  // Animation calculations
  const radius = 7;
  const angles = Array.from({ length: 12 }, (_, i) => (i * 30 * Math.PI) / 180);
  const xKeyframes = angles.map((angle) => radius * Math.cos(angle));
  const yKeyframes = angles.map((angle) => radius * Math.sin(angle));
  
  console.log(`viewPortDim=${viewportWidth}x${viewportHeight}`);

  const contentProps = {
    t,
    titleTranslation,
    titleSearchParams,
    descriptionTranslation,
    descriptionDefault,
    namespace,
    descriptionKey
  };

  const buttonProps = {
    disableButton,
    t,
    buttonTranslation,
    buttonDefault,
    namespace,
    buttonKey
  };

  return (
    <div className={clsx(
      "flex min-h-[50vh] items-center justify-center bg-gray-50 rounded-lg",
      "bg-cover bg-center relative"
    )}>
      <BackgroundImage backgroundImage={backgroundImage} />
      
      {isReady && isClient ? (
        <ContentContainer 
          isAnimated 
          viewportWidth={viewportWidth || 1200} 
          viewportHeight={viewportHeight || 800}
        >
          <AnimatedSearchIcon xKeyframes={xKeyframes} yKeyframes={yKeyframes} />
          <ContentText {...contentProps} />
          <ActionButton {...buttonProps} />
        </ContentContainer>
      ) : (
        <ContentContainer 
          viewportWidth={viewportWidth || 1200} 
          viewportHeight={viewportHeight || 800}
        >
          <StaticSearchIcon />
          <ContentText {...contentProps} />
          <ActionButton {...buttonProps} />
        </ContentContainer>
      )}
    </div>
  );
};

export default NoneFound;