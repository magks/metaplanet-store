//import { brandBaseUrl } from '@/lib/app-settings';
// todo refactor url setting
// lib/app-settings.ts
import { Theme } from "./types/themes";
import { getThemeName } from "./utils/get-theme-name";


const defaultProjectUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000'
const environ = process.env.NODE_ENV === "production"
    ? "PROD"
    : "DEV";

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
/*
function getBaseUrlForBrand(brand: BrandKey): string {
  const toUpper = (s: string) => s.toUpperCase();
  const envKey = `${toUpper(brand)}_STORE_${environ}_URL`;
  console.log(`appSettings::getBaseUrlForBrand::envKey=${envKey}`)
  const baseUrl = `${environ == "PROD" ? "https": "http"}://${getEnvVar(envKey)}`;
   if ( typeof window !== 'undefined') console.log(`appSettings::getBaseUrlForBrand::baseUrl=${baseUrl}`)
   if ( typeof window !== 'undefined') console.log("process.env key-value pairs:", Object.entries(process.env));
  return baseUrl ?? defaultProjectUrl;
}*/

// Build a single object whose keys are each BrandKey → baseUrl string.
//const allBaseUrls = Object.fromEntries(
//  BRANDS.map((brand: BrandKey) => {
//    return [brand, getBaseUrlForBrand(brand)]; // return tuple(brand, brandBaseUrl)//
  //}) 
//) as Record<BrandKey, string>;

export const appSettings = getAppSettings();
//  Read the “active” brand from NEXT_PUBLIC_BRAND_ID (fallback to "metaplanet" if undefined)
export const BRAND_ID = appSettings.brandId as BrandKey;


// Export each brand’s URL and the “active” one:
//export const { 
 // metaplanet: metaplanetBaseUrl,
 // bmj: bmjBaseUrl 
//} = allBaseUrls;

const metaplanetDomain= (environ == "PROD" ? process.env.NEXT_PUBLIC_METAPLANET_STORE_PROD_URL : process.env.NEXT_PUBLIC_METAPLANET_STORE_DEV_URL) ?? "metaplanet-store.vercel.app";
const bmjBaseDomain = environ == "PROD" ? process.env.NEXT_PUBLIC_BMJ_STORE_PROD_URL : process.env.NEXT_PUBLIC_BMJ_STORE_DEV_URL ?? "bmj-store.vercel.app";
export const metaplanetBaseUrl = (environ == "PROD" ? `https://${metaplanetDomain}` :`http://${metaplanetDomain}`) ;
export const bmjBaseUrl = (environ == "PROD" ? `https://${bmjBaseDomain}`:`http://${bmjBaseDomain}`);
export const allBaseUrls = {
  metaplanet: metaplanetBaseUrl,
  bmj: bmjBaseUrl

};
export const brandBaseUrl = allBaseUrls[BRAND_ID];
//export const brandBaseUrl = allBaseUrls[BRAND_ID];

// individual brand IDs by name:
export const [
  metaplanetBrandId, 
  bmjBrandId
] = BRANDS;

// export the full map
//export { allBaseUrls };

export default appSettings;