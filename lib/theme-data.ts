// lib/theme-data.ts

// Import all theme JSON files directly
import defaultTheme from '@/themes/theme-default.json';
import metaplanetTheme from '@/themes/theme-metaplanet.json';
import appSettings from './app-settings';
// Infer the type of a single theme 
type ThemeData = undefined 
  | typeof defaultTheme 
  | typeof metaplanetTheme 
  ;

// Create a lookup object for themes
const themes: Record<string, ThemeData> = {
  default: defaultTheme,
  metaplanet: metaplanetTheme,
  // Add more themes here as needed
};

// Load theme-data (singleton)
export const getThemeData = (): ThemeData  => {
  const themeName = appSettings.siteTheme;
  console.log(`settings.ts::getSettings::themeName=${themeName}`);

  const themeData = themes[themeName] ?? themes['default'];
  if (!themes[themeName]) {
    console.warn(`Theme "${themeName}" not found, falling back to default theme.`);
  }

  return themeData;
};

// Singleton for efficiency
const themeData = getThemeData();
export default themeData;