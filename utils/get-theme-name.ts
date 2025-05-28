import { Theme } from "@/lib/types/themes";
import { isClient } from "./is-client";

// Helper to get the theme name from environment variables
export const getThemeName = (): Theme => {
  if (isClient) {
    console.log(`getThemeName::isClient while getting NEXT_PUBLIC_THEME_NAME=${process.env.NEXT_PUBLIC_THEME_NAME}`);
    return (process.env.NEXT_PUBLIC_THEME_NAME || 'default') as Theme;
  }
  return (process.env.THEME_NAME || 'default') as Theme;
};