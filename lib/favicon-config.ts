// lib/favicon-config.ts
import appSettings from './app-settings';
import { Theme } from './types/themes';

interface FaviconConfig {
  favicon: string;
  icon: string;
  appleTouchIcon: string;
  manifest: string;
  iconSizes: {
    small: string;
    large: string;
  };
}

const faviconConfigs: Record<Theme, FaviconConfig> = {
  metaplanet: {
    favicon: '/favicons/metaplanet/favicon.ico',
    icon: '/favicons/metaplanet/icon.svg',
    appleTouchIcon: '/favicons/metaplanet/apple-icon.png',
    manifest: '/favicons/metaplanet/manifest.json',
    iconSizes: {
      small: '/favicons/metaplanet/icon-192.png',
      large: '/favicons/metaplanet/icon-512.png'
    }
  },
  bmj: {
    favicon: '/favicons/bmj/favicon.ico',
    icon: '/favicons/bmj/icon.svg',
    appleTouchIcon: '/favicons/bmj/apple-icon.png',
    manifest: '/favicons/bmj/manifest.json',
    iconSizes: {
      small: '/favicons/bmj/icon-192.png',
      large: '/favicons/bmj/icon-512.png'
    }
  },
  default: {
    favicon: '/favicons/default/favicon.ico',
    icon: '/favicons/default/favicon.ico',
    appleTouchIcon: '/favicons/default/apple-icon.png',
    manifest: '/manifest.json',
    iconSizes: {
      small: '/favicons/default/favicon.ico',
      large: '/favicons/default/favicon.ico'
    }
  }
};

export const getFaviconConfig = (): FaviconConfig => {
  const theme = appSettings.siteTheme as Theme;
  return faviconConfigs[theme] || faviconConfigs.default;
};

export default getFaviconConfig();