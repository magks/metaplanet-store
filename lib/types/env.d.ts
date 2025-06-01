// START APP SETTINGS TYPE GUARDS
// types/env.d.ts
interface ProcessEnv {
  [key: string]: string | undefined;
  SITE_THEME?: string;
  BRAND_ID?: string;
  NEXT_PUBLIC_BRAND_ID?: string;
}

declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv extends ProcessEnv {}
    }
  }
}
// END APP SETTINGS TYPE GUARDS