// lib/app-settings.ts
import { getThemeName } from "@/utils/get-theme-name";
import { Theme } from "./types/themes";

interface AppSettings {
  siteTheme: Theme;
}


export const getAppSettings = (): AppSettings => {
  const siteThemeVar: Theme = getThemeName() as Theme;
  console.log(`settings.ts::after getEnvVar::siteThemeVar=${siteThemeVar}`);
  
  return {
    siteTheme: siteThemeVar,
  };
};

// Singleton for efficiency
const appSettings = getAppSettings();
export default appSettings;