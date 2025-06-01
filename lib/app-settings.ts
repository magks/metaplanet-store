// lib/app-settings.ts
import { getThemeName } from "@/utils/get-theme-name";
import { isClient } from "@/utils/is-client";
import { Theme } from "./types/themes";

type OptionalString = string | undefined;
interface AppSettings {
  siteTheme: Theme;
  brandId: string | undefined;
}

const getEnvVar = (
  clientVar: OptionalString, 
  serverVar: OptionalString, 
  defaultVar: OptionalString,
): OptionalString => {
  if (isClient) {
    return clientVar || defaultVar;
  }
  return serverVar || defaultVar;
};


export const getAppSettings = (): AppSettings => {
  const siteThemeVar: Theme = getThemeName();
  const brandIdVar: OptionalString = getEnvVar(process.env.NEXT_PUBLIC_BRAND_ID, process.env.BRAND_ID, undefined);
  //console.log(`settings.ts::after getEnvVar::siteThemeVar=${siteThemeVar}`);
  
  return {
    siteTheme: siteThemeVar,
    brandId: brandIdVar
  };
};

// Singleton for efficiency
const appSettings = getAppSettings();
export default appSettings;