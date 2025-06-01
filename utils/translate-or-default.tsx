import { TRANSLATION_NOT_FOUND } from "@/lib/constants";

export const translateOrDefault= (translation: string, defaultVal: string): string => {
  //// console.log(`translateOrDefault::translation=${translation}`);
  //// console.log(`translateOrDefault::return=${(translation !== TRANSLATION_NOT_FOUND) ? translation : defaultVal}`);
  return (translation !== TRANSLATION_NOT_FOUND) ? translation : defaultVal;
};