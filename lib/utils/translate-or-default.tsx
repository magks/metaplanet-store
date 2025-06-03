import { TRANSLATION_NOT_FOUND } from "@/lib/constants";

export function translateOrDefault(translation: string, 
  defaultVal: string, 
  translationKey?: string 
  
): string {
  // if translated value returned as something other than the not_found sentinel or user-supplied translation key
  // then return the translated value otherwise use the default value
  return (translation === TRANSLATION_NOT_FOUND || translation === translationKey) 
    ? defaultVal 
    : translation;
};

