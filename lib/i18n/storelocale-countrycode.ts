export type StoreLocale = 'en' | 'jp';
export type CountryCode = 'US' | 'JP';

export type LocaleToCountryCode = {
  [key in StoreLocale]: CountryCode;
};

// Define the mapping constant
export const storeLocaleToCountryCode: LocaleToCountryCode = {
  en: 'US',
  jp: 'JP',
};

export function getCountryCode(locale: StoreLocale): CountryCode {
  return storeLocaleToCountryCode[locale]; 
}