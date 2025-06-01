import { TRANSLATION_NOT_FOUND } from "@/lib/constants";
import { hasLocale, IntlErrorCode } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// ignore@ts-expect-error
export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  //console.log(`i18n/request::getRequestConfig::requestLocale:${requested}`);
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  //console.log(`i18n/request::getRequestConfig::locale:${locale}`);
  //console.log(`i18n/request::getRequestConfig::(await import(\`../messages/\${locale}.json\`)).default:${(await import(`../messages/${locale}.json`)).default}`);


  return {
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        // Missing translations are expected and should only log an error
        //console.error(error);
      } else {
        // Other errors indicate a bug in the app and should be reported to error tracking
        // todo set up error logging framework -- for now do the same as above
        //console.error(error);
      }
    },

    getMessageFallback({ namespace, key, error }) {
      return TRANSLATION_NOT_FOUND;
    },
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
