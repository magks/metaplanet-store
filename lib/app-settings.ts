// lib/app-settings.ts
import { Theme } from "./types/themes";
import { getThemeName } from "./utils/get-theme-name";

const defaultProjectUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000'
const environ = process.env.NODE_ENV === "production"
    ? "PRODUCTION"
    : "DEV";
1
//  Enumerate all known brands here:
export const BRANDS = ["metaplanet", "bmj"] as const;
export type BrandKey = (typeof BRANDS)[number];

type OptionalString = string | undefined;
interface AppSettings {
  siteTheme: Theme;
  brandId: BrandKey
}

const getEnvVar = (
  envKey: string, 
  defaultVar: OptionalString = undefined,
): OptionalString => {
  return process.env[envKey] || defaultVar;
};


export const getAppSettings = (): AppSettings => {
  const siteThemeVar: Theme = getThemeName();
  const brandIdVar: BrandKey = getEnvVar("NEXT_PUBLIC_BRAND_ID", "metaplanet") as BrandKey;
  //console.log(`settings.ts::after getEnvVar::siteThemeVar=${siteThemeVar}`);
  
  return {
    siteTheme: siteThemeVar,
    brandId: brandIdVar
  };
};

//  Build a full URL (prod vs dev) for a given brand name.
//     We expect each brand to define:
//
//       <BRAND>_PROD_URL    (e.g. "bmj.example.com")
//       <BRAND>_DEV_URL     (e.g. "localhost:4000")
// for now always precede with "https"
function getBaseUrlForBrand(brand: BrandKey): string {
  const toUpper = (s: string) => s.toUpperCase();
  const envKey = `${toUpper(brand)}_STORE_${environ}_URL`;
  const baseUrl = `${environ == "PRODUCTION" ? "https ": "http"}://${getEnvVar(envKey)}`;
  return baseUrl ?? defaultProjectUrl;
}

// Build a single object whose keys are each BrandKey → baseUrl string.
const allBaseUrls = Object.fromEntries(
  BRANDS.map((brand: BrandKey) => {
    return [brand, getBaseUrlForBrand(brand)]; // return tuple(brand, brandBaseUrl)
  }) 
) as Record<BrandKey, string>;

export const appSettings = getAppSettings();
//  Read the “active” brand from NEXT_PUBLIC_BRAND_ID (fallback to "metaplanet" if undefined)
const BRAND_ID = appSettings.brandId as BrandKey;


// Export each brand’s URL and the “active” one:
export const { 
  metaplanet: metaplanetBaseUrl,
  bmj: bmjBaseUrl 
} = allBaseUrls;

export const brandBaseUrl = allBaseUrls[BRAND_ID];

// individual brand IDs by name:
export const [
  metaplanetBrandId, 
  bmjBrandId
] = BRANDS;

// export the full map
export { allBaseUrls };

export default appSettings;