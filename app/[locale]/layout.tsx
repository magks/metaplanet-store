// app/[locale]/layout.tsx
import { CartProvider } from '@/components/shared/cart/cart-context';
import { getFaviconConfig } from '@/lib/favicon-config';
// todo: fix false "has no imported member Geist{Mono|Sans}" error message in linter
//import { GeistMono } from 'geist/font/mono';
//import { GeistSans } from 'geist/font/sans';

import { getCart } from 'lib/shopify';
import { baseUrl } from 'lib/utils';
import { ReactNode } from 'react';

import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';

import { inter, orbitron, roboto_mono, spaceGrotesk } from 'styles/fonts';


/*

const geist = Geist({
  subsets: ['latin'],
})*/

// i18n
import { routing } from '@/i18n/routing';
import appSettings from '@/lib/app-settings';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
const { SITE_NAME } = process.env;



// metadata
import { NavbarConditional } from '@/components/shared/navigation/navbar-conditional';
import SiteSwitcher from '@/components/shared/navigation/navbars/banner/site-switcher';
import { UniversalNavbar } from '@/components/shared/navigation/navbars/universal-navbar';
import type { Metadata, ResolvingMetadata } from 'next';
type MetadataProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const faviconConfig = getFaviconConfig();

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: SITE_NAME!,
      template: `%s | ${SITE_NAME}`
    },
    robots: {
      follow: true,
      index: true
    },
    icons: {
      icon: [
        {
          url: faviconConfig.favicon,
          sizes: 'any',
        },
        {
          url: faviconConfig.icon,
          type: 'image/svg+xml',
        },
        {
          url: faviconConfig.iconSizes.small,
          sizes: '192x192',
          type: 'image/png',
        },
        {
          url: faviconConfig.iconSizes.large,
          sizes: '512x512', 
          type: 'image/png',
        },
      ],
      apple: faviconConfig.appleTouchIcon,
    },
    manifest: faviconConfig.manifest,
  };
}

/*
export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  icons: {
  icon: [
    {
      url: '/light-icon.png',
      media: '(prefers-color-scheme: light)',
    },
    {
      url: '/dark-icon.png',
      media: '(prefers-color-scheme: dark)',
    },
  ],
},
};*/


 
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {

  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
 

  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';

  
  // Check if it's homepage
  //const isHomepage = pathname === `/${locale}` || pathname === '/';
  //console.log(`rootLayout::x-pathname=${headersList.get('x-pathname') }`);
  //console.log(`rootLayout::settings.themeName=${appSettings.siteTheme}`)


  return (
    <html lang={locale}  className={`${inter.variable} ${roboto_mono.variable} ${orbitron.variable} ${spaceGrotesk.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = '${appSettings.siteTheme || 'default'}';
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      {/*<body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">*/}
        <body suppressHydrationWarning>
        <ThemeProvider 
         attribute="data-theme"
          defaultTheme={appSettings.siteTheme}
          enableSystem={false}
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
          <CartProvider cartPromise={cart}>
            {/*   */}
            <SiteSwitcher/>
            {/* <NavbarSelector theme={appSettings.siteTheme} pathname={pathname} /> */}
            <NavbarConditional>
                <UniversalNavbar 
                  pathname={pathname} 
                  theme={appSettings.siteTheme} 
                />
            </NavbarConditional>
                   { /*
                   <MetaplanetNavbarConditional>
                      <MetaplanetNavbar pathname={pathname} />
                    </MetaplanetNavbarConditional>
                    */}
              <main>
                {children}
                {/*<Toaster closeButton />
                <WelcomeToast />*/}
              </main>
            </CartProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
