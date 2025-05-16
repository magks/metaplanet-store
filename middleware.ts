import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

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

  // Extract locale from pathname (e.g., /en or /jp)
  const localeMatch = pathname.match(/^\/(en|jp)(\/|$)/);
  const urlLocale: "jp" | "en" | null = localeMatch ? localeMatch[1] as "jp" | "en" : null;

  // Use URL locale if valid, otherwise default to 'jp'
  const validLocale: "jp" | "en" = urlLocale && routing.locales.includes(urlLocale) ? urlLocale : routing.defaultLocale;
  console.log(`middleware validLocale:${validLocale}`);
  
  // Set preferredLocale cookie for valid locale
  const response = createMiddleware(routing)(request);
  response.cookies.set("preferredLocale", validLocale, {
    path: "/",
    sameSite: "lax",
    maxAge: 31536000, // 1 year
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};