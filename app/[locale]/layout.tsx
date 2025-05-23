import { CartProvider } from 'components/cart/cart-context';
import { Navbar } from 'components/layout/navbar';
import { WelcomeToast } from 'components/welcome-toast';

// todo: fix false "has no imported member Geist{Mono|Sans}" error message in linter
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import { getCart } from 'lib/shopify';
import { baseUrl } from 'lib/utils';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';


import ThemeInitializer from '@/components/theme-initializer';
import { ThemeProvider } from 'next-themes';
import './globals.css';
/*
const geist = Geist({
  subsets: ['latin'],
})*/

// i18n
import { routing } from '@/i18n/routing';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  }
};

 
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

  return (
    <html lang={locale}  className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      {/*<body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">*/}
        <body>
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ThemeInitializer />
          <NextIntlClientProvider>
          <CartProvider cartPromise={cart}>
              <Navbar />
              <main>
                {children}
                <Toaster closeButton />
                <WelcomeToast />
              </main>
            </CartProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
