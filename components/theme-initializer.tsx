// app/components/theme-initializer.tsx
'use client';

import appSettings from '@/lib/app-settings';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
 
// dynamically initialize theme on client side
export default function ThemeInitializer() {
  const { setTheme } = useTheme();

    console.log(`ThemeInitializer::before useEffect::theme=${appSettings.siteTheme}`);
  useEffect(() => {
    // Read the theme from the cookie set by middleware
    const theme = appSettings.siteTheme; /*document.cookie
    '
      .split('; ')
      .find((row) => row.startsWith('theme='))
      ?.split('=')[1] || 'theme-default';
*/
    console.log(`ThemeInitializer::useEffect::theme=${theme}`)

    setTheme(theme);
  }, [setTheme]);

  return null;
}