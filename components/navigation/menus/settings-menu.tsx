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
import themeData from "@/lib/theme-data";
import { isHomePagePath } from "@/utils/is-homepage";
import { Settings } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const ICON_SIZE = 16;

const ICON_CONST = (
  <Button variant="ghost" size="sm">
    <Settings size={ICON_SIZE} className="text-black" />
    <span className="sr-only">Settings</span>
  </Button>
);


export function SettingsMenu() {
  const pathname = usePathname();
  const useWhiteText = isHomePagePath(pathname) && themeData?.pages.home.dark;

  const ICON = (
    <Button className="h-4 transition-all ease-in-out hover:scale-110" variant="link" size="sm">
      <Settings
        size={ICON_SIZE}
        className={twMerge(useWhiteText ? 'text-white' : 'text-black'
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

  // Sync locale with URL and localStorage on mount
  useEffect(() => {
    // Check for cookie set by middleware (indicating URL-driven locale)
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("preferredLocale="))
      ?.split("=")[1];

    const storedLocale = localStorage.getItem("preferredLocale");

    // If URL has a valid locale (set by middleware), use it and update localStorage
    if (cookieLocale && cookieLocale !== storedLocale) {
      localStorage.setItem("preferredLocale", cookieLocale);
      setSelectedLocale(cookieLocale);
    } else if (!storedLocale) {
      // If no stored preference, use URL's locale and save it
      localStorage.setItem("preferredLocale", currentLocale);
      setSelectedLocale(currentLocale);
    } else if (storedLocale !== currentLocale) {
      // If stored locale differs from URL, update URL to match stored
      const newPath = pathname.replace(`/${currentLocale}`, `/${storedLocale}`);
      router.replace(newPath);
      setSelectedLocale(storedLocale);
    }

    setMounted(true);
  }, [currentLocale, pathname, router]);

  // Handle locale change via dropdown
  const switchLanguage = (newLocale: string) => {
    localStorage.setItem("preferredLocale", newLocale);
    setSelectedLocale(newLocale);
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  if (!mounted) return ICON;

  return (
    <DropdownMenu>
      <div className="backdrop-blur-[2px] relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
        <DropdownMenuTrigger asChild>{ICON}</DropdownMenuTrigger>
      </div>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuLabel>{t("language")}</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={selectedLocale}
          onValueChange={switchLanguage}
        >
          <DropdownMenuRadioItem className="flex gap-2" value="jp">
            <Image
              src={`/images/round-flag-japan.svg`}
              alt="Japanese Flag"
              className="h-4 w-4 hover:opacity-80"
              width={4}
              height={4}
            />
            日本語
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2" value="en">
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

        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
