// bannerLogoLinks.ts

import { BtcMagJpBannerLogoLinkProps } from '@/components/bmj/navigation/site-switcher/banner-logo-link';
import { MetaplanetBannerLogoLinkProps } from '@/components/metaplanet/navigation/site-switcher/banner-logo-link';
import appSettings from '@/lib/app-settings';
import { BannerLogoLinkProps } from './banner-logo-link';

const allBannerLogoLinks: BannerLogoLinkProps[] = [
  MetaplanetBannerLogoLinkProps,
  BtcMagJpBannerLogoLinkProps,
  // …more in the future
];

// Pull out the entry whose brandId matches appsettings.brandId, if any.
const primary = allBannerLogoLinks.find(
  (entry) => entry.brandId === appSettings.brandId
);

// a new array that has `primary` set in hard-coded position (e.g. always last) if a primary is found or else initial order
export const bannerLogoLinks: BannerLogoLinkProps[] = allBannerLogoLinks/*primary
  ? [
      ...allBannerLogoLinks.filter((e) => e.brandId !== primary.brandId),
      // filter out the “primary” from the rest
      primary,
    ]
  : // if there is no match, just fall back to the original order
    allBannerLogoLinks;
*/