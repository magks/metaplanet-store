import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

function getTheme(request: NextRequest): string {; 
  const { SITE_THEME } = process.env;
  let theme = `theme-${SITE_THEME ? SITE_THEME : 'default'}`;
  /*
  const requestHeaders = new Headers(request.headers)
  const hostname = requestHeaders.get('host') || ''; 
  let theme = 'theme-default'; // Default theme

  if (hostname.includes('store.brand1.com')) {
    theme = 'theme-brand1';
  } else if (hostname.includes('store.brand2.com')) {
    theme = 'theme-brand2';
  } else if (hostname.includes('store.brand3.com')) {
    theme = 'theme-brand3';
  }*/
  return theme;
}

function getValidLocale(pathname: string) {
    // Extract locale from pathname (e.g., /en or /jp)
  const localeMatch = pathname.match(/^\/(en|jp)(\/|$)/);
  const urlLocale: "jp" | "en" | null = localeMatch ? localeMatch[1] as "jp" | "en" : null;

  // Use URL locale if valid, otherwise default to 'jp'
  const validLocale: "jp" | "en" = urlLocale && routing.locales.includes(urlLocale) ? urlLocale : routing.defaultLocale;
  return validLocale;
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(`middleware request:NextRequest:${request}`);
  console.log(`middleware pathname: request.nextUrl:${pathname}`);

  // Redirect /ja or /en/ja to /jp
  if (pathname.includes("/ja") || pathname.includes("/en/ja")) {
    const newPathname = pathname.replace(/\/(en\/)?ja/, "/jp");
    const newUrl = new URL(newPathname, request.url);
    return NextResponse.redirect(newUrl);
  }

  const validLocale: "jp" | "en" = getValidLocale(pathname);
  console.log(`middleware validLocale:${validLocale}`);

  const theme = getTheme(pathname);
  console.log(`middleware theme:${theme}`);
  
  // Set preferredLocale cookie for valid locale
  const response = createMiddleware(routing)(request);
  response.cookies.set("preferredLocale", validLocale, {
    path: "/",
    sameSite: "lax",
    maxAge: 31536000, // 1 year
  });
  response.cookies.set('theme', theme);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};