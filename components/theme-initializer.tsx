// app/components/theme-initializer.tsx
'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export default function ThemeInitializer() {
  const { setTheme } = useTheme();

  useEffect(() => {
    // Read the theme from the cookie set by middleware
    const theme = document.cookie
      .split('; ')
      .find((row) => row.startsWith('theme='))
      ?.split('=')[1] || 'theme-default';
    setTheme(theme);
  }, [setTheme]);

  return null;
}