import { hasLocale, IntlErrorCode } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// @ts-expect-error
export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  console.log(`i18n/request::getRequestConfig::requestLocale:${requested}`);
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  console.log(`i18n/request::getRequestConfig::locale:${locale}`);
  console.log(`i18n/request::getRequestConfig::(await import(\`../messages/\${locale}.json\`)).default:${(await import(`../messages/${locale}.json`)).default}`);



  return {
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        // Missing translations are expected and should only log an error
        console.error(error);
      } else {
        // Other errors indicate a bug in the app and should be reported to error tracking
        // todo set up error logging framework -- for now do the same as above
        console.error(error);
      }
    },

    async getMessageFallback({ namespace, key, error }) {
      const path = [namespace, key].filter((part) => part != null).join('.');

      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        //try to use the default locale translation if we're using another locale
        if (locale !== routing.defaultLocale) {
          const msgs = (await import(`../messages/${routing.defaultLocale}.json`)).default;
          console.log("msgs:\n" + msgs[`${namespace}`][`${key}`]);
          return msgs[`${namespace}`][`${key}`];
        }
        return undefined;
      }
      else if (error.code === IntlErrorCode.INVALID_MESSAGE) {
        //try to use the default locale translation if we're using another locale
        if (locale !== routing.defaultLocale) {
          const msgs = (await import(`../messages/${routing.defaultLocale}.json`)).default;
          console.log("msgs:\n" + msgs[`${namespace}.${key}`]);
          return msgs[`${namespace}`][`${key}`];
        }
        return undefined;
      } else {
        return 'From: i18n/request:: Dear developer, please fix this message: ' + path;
      }
    },
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
