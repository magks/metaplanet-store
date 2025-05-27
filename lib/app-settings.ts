// lib/app-settings.ts
import { getThemeName } from "@/utils/get-theme-name";

interface AppSettings {
  siteTheme: string;
}


export const getAppSettings = (): AppSettings => {
  const siteThemeVar = getThemeName();
  console.log(`settings.ts::after getEnvVar::siteThemeVar=${siteThemeVar}`);
  
  return {
    siteTheme: siteThemeVar || "theme-default",
  };
};

// Singleton for efficiency
const appSettings = getAppSettings();
export default appSettings;