import { Navbar as BtcMagNavBar } from "@/components/bmj/navigation/bmj-navbar";
import { NavbarConditional as BtcMagNavbarConditional } from "@/components/bmj/navigation/bmj-navbar/navbar-conditional";
import { Navbar as MetaplanetNavbar } from "@/components/metaplanet/navigation/metaplanet-navbar";
import { NavbarConditional as MetaplanetNavbarConditional } from "@/components/metaplanet/navigation/metaplanet-navbar/navbar-conditional";
import { Theme } from "@/lib/types/themes";
import { ReactElement } from "react";

export const NavbarSelector = ({ theme, pathname }: { theme: Theme; pathname: string }) => {
  const components: Record<Theme, ReactElement> = {
    metaplanet: (
      <MetaplanetNavbarConditional>
        <MetaplanetNavbar pathname={pathname} />
      </MetaplanetNavbarConditional>
    ),
    bmj: (
      <BtcMagNavbarConditional>
        <BtcMagNavBar pathname={pathname} />
      </BtcMagNavbarConditional>
    ),
    default: (
      <BtcMagNavbarConditional>
        <BtcMagNavBar pathname={pathname} />
      </BtcMagNavbarConditional>
    )
  };

  return components[theme] || components.default;
};