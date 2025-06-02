import { Theme } from "@/lib/types/themes";

// Helper to get the theme name from environment variables
export const getThemeName = (): Theme => {
  return (process.env.NEXT_PUBLIC_THEME_NAME || 'default') as Theme;
};