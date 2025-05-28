import { Theme } from "@/lib/types/themes";
import { ReactElement } from "react";
import { BitcoinMagazineHero } from "./bmj/hero";
import { MetaplanetHero } from "./metaplanet/hero";

export const HomePageHeroSelector = ({ theme }: { theme: Theme;  }) => {
  const components: Record<Theme, ReactElement> = {
    metaplanet: (
      <MetaplanetHero/>
    ),
    bmj: (
      <BitcoinMagazineHero/>
    ),
    default: (
      <MetaplanetHero/>
    )
  };

  return components[theme] || components.default;
};