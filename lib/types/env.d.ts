// START APP SETTINGS TYPE GUARDS
// types/env.d.ts
interface ProcessEnv {
  [key: string]: string | undefined;
  DARK_HOME?: string;
  SITE_THEME?: string;
  NEXT_PUBLIC_DARK_HOME?: string;
  NEXT_PUBLIC_SITE_THEME?: string;
}

declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv extends ProcessEnv {}
    }
  }
}
// END APP SETTINGS TYPE GUARDS