// lib/settings.ts
interface AppSettings {
  darkHome: boolean;
  siteTheme: string;
}

const parseBoolean = (value: string | undefined, defaultValue: boolean = false): boolean => {
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === "true";
};

export const getSettings = (): AppSettings => {
  const isClient = typeof window !== "undefined";
  if (isClient) {
      console.log(`settings.ts::getEnvVar::isClient while getting NEXT_PUBLIC_SITE_THEME=${process.env.NEXT_PUBLIC_SITE_THEME}`);
      console.log(`settings.ts::getEnvVar::isClient while getting NEXT_PUBLIC_DARK_HOME=${process.env.NEXT_PUBLIC_DARK_HOME}`);
  }
  // Helper to get variable with fallback
  const getEnvVar = (key: string, publicKey: string, defaultValue: string | undefined): string | undefined => {
    let siteThemeEnvVar = undefined;
    if (isClient) {
      // On client, prioritize NEXT_PUBLIC_ if defined, else fall back to non-prefixed
      siteThemeEnvVar = process.env[publicKey] !== undefined ? process.env[publicKey] : process.env[key];
      return siteThemeEnvVar || defaultValue;
    }
    // On server, prioritize non NEXT_PUBLIC_ prefixed, else fall back to NEXT_PUBLIC
    return process.env[key] !== undefined ? process.env[key] : process.env[publicKey];
  };

  const darkHomeVar = getEnvVar("DARK_HOME", "NEXT_PUBLIC_DARK_HOME", process.env.NEXT_PUBLIC_DARK_HOME);
  const siteThemeVar = getEnvVar("SITE_THEME", "NEXT_PUBLIC_SITE_THEME", process.env.NEXT_PUBLIC_SITE_THEME);   

  console.log(`settings.ts::after getEnvVar::siteThemeVar=${siteThemeVar}`);
  

  return {
    darkHome: parseBoolean(darkHomeVar, false),
    siteTheme: siteThemeVar || "theme-default",
  };
};

// Singleton for efficiency
const settings = getSettings();
export default settings;