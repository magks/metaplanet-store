// components/TopBar.tsx
import appSettings from "@/lib/app-settings";
import { Fragment } from "react";
import { bannerLogoLinks } from "./banner-links";
import BannerLogoLink from "./banner-logo-link";

// container 
/*h-full bg-transparent z-55 relative */ 
//h-10 bg-black border-b border-white z-40 relative
export default function SiteSwitcher() {
  {/* bg-[linear-gradient(#252725,var(--navbar-black))] */}
  return (
    <div className="">
      <div className="flex items-baseline-last justify-between px-2 h-full">
        
        {/* Left side: empty */}
        <div className="text-black text-lg font-bold"></div>

        {/* Left side: logo links */}
        <div className="space-x-4">
          {bannerLogoLinks.map((link, idx) => {
            const isCurrent = link.brandId === appSettings.brandId;
            // look up the previous link’s "isCurrent" state (if any)
            const prevLink = idx > 0 ? bannerLogoLinks[idx - 1] : false;
            const prevIsCurrent = prevLink
              ? prevLink.brandId === appSettings.brandId
              : false;
            console.log(`siteswitcher::${link.brandId} =? ${appSettings.brandId}`);
            return (
              <Fragment key={link.brandId}>
                 {/*
                  Only show a divider if:
                    1) this is not the first item (idx > 0), AND
                    2) the previous item is NOT current, AND
                    3) this item is NOT current
                  */}
                  {idx > 0 && !prevIsCurrent && !isCurrent && (
                  <div
                    className="
                      w-[1px]        /* thickness = 1px */
                      h-6            /* height = 1.5rem (24px) */
                      bg-gray-700    /* color of the line */
                      mx-1           /* horizontal margin around the line */
                      self-center    /* vertically center the line */
                    "
                  />
                  )}
                <BannerLogoLink
                  key={link.brandId}
                  href={link.href}
                  src={link.src}
                  alt={link.alt}
                  isCurrentSite={link.brandId === appSettings.brandId}
                />
              </Fragment>
            );
        })}
        </div>

      </div>
    </div>
    
  );
}
