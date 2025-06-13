"use client";

/**
 * @description
 * Renders a settings menu for language and theme selection. Allows users to switch between supported locales (jp, en) and themes (light, dark, system). Syncs the selected locale with the URL and localStorage, respecting manually entered URL locales.
 *
 * Key features:
 * - Language selection with flag icons for Japanese and English
 * // **REMOVED FOR ECOM**- Theme selection with icons for light, dark, and system modes
 * - Syncs locale with URL and localStorage, prioritizing URL on initial load
 *
 * @dependencies
 * // **REMOVED FOR ECOM** - next-themes: Provides useTheme for theme management 
 * - next-intl: Provides useTranslations and useLocale for internationalization
 * - next/navigation: Provides usePathname and useRouter for URL manipulation
 * - lucide-react: Provides icons for theme and settings
 * - next/image: Renders flag icons
 *
 * @notes
 * - Uses a cookie from middleware to detect URL-driven locale changes
 * - Handles hydration by rendering only the icon until mounted
 * - Ensures locale changes update both URL and localStorage
 */

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCountryCode, StoreLocale } from "@/lib/i18n/storelocale-countrycode";
import themeData from "@/lib/theme-data";
import { Theme } from "@/lib/types/themes";
import { isHomePagePath } from "@/lib/utils/is-homepage";
import { Settings } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
//import { usePathname, useRouter } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useEffect, useState, useTransition } from "react";
import { twMerge } from "tailwind-merge";
import { updateCartCountryCode } from "../../cart/actions";
import { useCart } from "../../cart/cart-context";

const ICON_SIZE = 16;

const ICON_CONST = (
  <Button variant="ghost" size="sm">
    <Settings size={ICON_SIZE} className="text-black" />
    <span className="sr-only">Settings</span>
  </Button>
);



const selectSettingsMenuColor  = ({ theme, pathname }: { theme: Theme; pathname: string }) => {
  const components: Record<Theme, string> = {
    metaplanet: (
      isHomePagePath(pathname) && themeData?.pages.home.dark 
      ? "text-white"
      : "text-black"
    ),
    bmj: (
     themeData?.components?.settings_menu?.icon_color ?? ""
    ),
    default: (
     "text-black"
    )
  };

  return components[theme] || components.default;
};


export function SettingsMenu() {
  const { refreshCart } = useCart();
  const pathname = usePathname();
  const theme = themeData?.name as Theme;

  const ICON = (
    <Button  variant="ghostier" className="h-4 transition-all ease-in-out hover:scale-110" size="sm">
      <Settings
        size={ICON_SIZE}
        className={twMerge(selectSettingsMenuColor( {theme, pathname} )
        )}
      />
      <span className="sr-only">Settings</span>
    </Button>
  );
  const [mounted, setMounted] = useState(false);
  //const { theme, setTheme } = useTheme();
  const currentLocale = useLocale();
  const [selectedLocale, setSelectedLocale] = useState(currentLocale);
  const router = useRouter();
  const t = useTranslations("navigation.settings");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Sync locale with URL and localStorage on mount
  /*
  useEffect(() => {
    // Check for cookie set by middleware (indicating URL-driven locale)
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("preferredLocale="))
      ?.split("=")[1];

    const storedLocale = localStorage.getItem("preferredLocale");

    // If URL has a valid locale (set by middleware), use it and update localStorage
    if (cookieLocale && cookieLocale !== storedLocale) {
      console.log("cookieLocale && cookieLocale !== storedLocale! setting to cookieLocale:", cookieLocale);
      localStorage.setItem("preferredLocale", cookieLocale);
      setSelectedLocale(cookieLocale);
    } else if (!storedLocale) {
      console.log("!storedLocale! setting to currentLocale", currentLocale);
      // If no stored preference, use URL's locale and save it
      localStorage.setItem("preferredLocale", currentLocale);
      setSelectedLocale(currentLocale);
    } else if (storedLocale !== currentLocale) {
      console.log("storedLocale !== currentLocale! setting to storedLocale and navigating to storedLocale:", storedLocale);
      // If stored locale differs from URL, update URL to match stored
      const newPath = `${storedLocale}${pathname}`;//pathname.replace(`/${currentLocale}`, `/${storedLocale}`);
      //router.replace(newPath);
      router.push({pathname}, {locale: storedLocale});
      setSelectedLocale(storedLocale);
    }

    setMounted(true);
  }, [currentLocale, pathname, router]);
  */
   useEffect(() => {
    setMounted(true);
   });


  // Handle locale change via dropdown
  const switchLanguage = (newLocale: string) => {
    console.log(`switchLanguage to ${newLocale}`);
    if (!["jp", "en"].includes(newLocale)) {
      startTransition(() => {
        setError("Invalid locale selected");
      });
      return;
    }
    if (newLocale === currentLocale) {
      return;
    }

    // Mark localStorage as needing a buyer identity update
    localStorage.setItem('needsCartBuyerIdentityUpdate', newLocale);
    // Set cookie for middleware to read
    document.cookie = `preferredLocale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    // transtion to other page
    startTransition(() => {
      // Update UI and navigate immediately
      console.log(`starting transition from ${currentLocale} to ${newLocale} for pathname: ${pathname}`);
      setSelectedLocale(newLocale);
      router.push({pathname}, {locale: newLocale});
    }); 
  }

  const oldswitchLanguage = (newLocale: string) => {
    console.log(`??????????????????????switchLanguage to ${newLocale}`);
    if (!["jp", "en"].includes(newLocale)) {
      setError("Invalid locale selected");
      return;
    }
    localStorage.setItem('needsCartBuyerIdentityUpdate', newLocale);
    // Set cookie for middleware to read
    document.cookie = `preferredLocale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    startTransition(() => {
        const buyerIdentity = {
        countryCode: getCountryCode(newLocale as StoreLocale),
      };
    
      
      updateCartCountryCode({ buyerIdentity })
        .then(() => refreshCart(newLocale))
        .catch((err) => {
          console.error("Cart update error:", err);
          setError(err.message);
        });
      // Update UI and navigate immediately
      localStorage.setItem("preferredLocale", newLocale);
      // Set cookie for middleware to read
      document.cookie = `preferredLocale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      //await setLocaleCookie(newLocale); // Server action to set cookie
      //await setLocaleCookie(newLocale).catch((err) => {console.error(`error setting locale cookie: ${err}`)});
      console.log(`starting transition from ${currentLocale} to ${newLocale} for pathname: ${pathname}`);
      //console.log(`replacing /${currentLocale} with /${newLocale} in pathname`);
      //const newPath = `${newLocale}${pathname}`;//pathname.replace(`/${currentLocale}`, `/${newLocale}`);
      //console.log(`newPath:${newPath}`);
      setSelectedLocale(newLocale);
      //router.push({pathname}, {locale: newLocale});
      router.push({pathname}, {locale: newLocale});
      // Fire cart update in the background
      // Update cart in background
      // Fire background tasks without awaiting
      
    
        
      });
  };

  if (!mounted) return ICON;

  return (
    <DropdownMenu>
      <div className="relative flex h-11 w-11 items-center justify-center rounded-md transition-colors">
        <DropdownMenuTrigger asChild>{ICON}</DropdownMenuTrigger>
      </div>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuLabel>{t("language")}</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={selectedLocale}
          onValueChange={switchLanguage}
        >
          <DropdownMenuRadioItem className="flex gap-2" value="jp" disabled={isPending}>
            <Image
              src={`/images/round-flag-japan.svg`}
              alt="Japanese Flag"
              className="h-4 w-4 hover:opacity-80"
              width={4}
              height={4}
            />
            日本語
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2" value="en" disabled={isPending}>
            <Image
              src={`/images/round-flag-usa.svg`}
              alt="American Flag"
              className="h-4 w-4 hover:opacity-80"
              width={4}
              height={4}
            />
            English
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        {error && <p className="p-2 text-sm text-red-500">{error}</p>}
        {isPending && <p className="p-2 text-sm text-gray-500">Updating...</p>}
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
