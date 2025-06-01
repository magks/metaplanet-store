import { BitcoinMagazineHero } from "@/components/bmj/heroes/bmj-hero";
import { MetaplanetHero } from "@/components/metaplanet/heroes/metaplanet-hero";
import { Theme } from "@/lib/types/themes";
import { ReactElement } from "react";

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