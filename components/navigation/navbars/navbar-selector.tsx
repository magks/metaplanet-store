import { Theme } from "@/lib/types/themes";
import { ReactElement } from "react";
import { Navbar as BtcMagNavBar } from "./bmj-navbar";
import { NavbarConditional as BtcMagNavbarConditional } from "./bmj-navbar/navbar-conditional";
import { Navbar as MetaplanetNavbar } from "./metaplanet-navbar";
import { NavbarConditional as MetaplanetNavbarConditional } from "./metaplanet-navbar/navbar-conditional";

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