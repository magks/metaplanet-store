export const isHomePagePath = (pathname: string) => pathname === '/' || /^\/[a-z]{2}$/.test(pathname);
