'use client';
// components/BannerLogoLink.tsx
import { Link } from "@/i18n/navigation";
import { BrandKey } from "@/lib/app-settings";
import Image, { StaticImageData } from "next/image";


export type BannerLogoLinkProps = {
  href: string;
  src: StaticImageData;
  alt: string;
  brandId?: BrandKey;
  isCurrentSite?: boolean
};

export default function BannerLogoLink({
  href,
  src,
  alt,
  isCurrentSite = false,
}: BannerLogoLinkProps) {
  //
  //  If this is the current site, let it “stretch to fill” the parent’s height
  //  . Otherwise keep it a small pill (h-8).
  //
  const outerClasses = [
    "group inline-flex w-max overflow-hidden transition-all duration-300",
     "",
    // active: fill parent’s height; inactive: fixed 8
    isCurrentSite ? " rounded-t" : " rounded-full ",
    // opacity / pointer logic
    isCurrentSite
      ? "opacity-90 cursor-default pointer-events-none"
      : "opacity-45 hover:opacity-90",
    // dark gradient background
    "bg-[linear-gradient(#000000,#1a1a1a_50%,#000000_99%,#228B22_100%)]",
  ].join(" ");

  //
  //  Middle layer: also fill the same height (h-full if active)
  //
  const heavyDarkShadow =
    "hover:shadow-[0_0_1px_rgba(0,0,0,0.5),0_0_1px_rgba(0,0,0,1.4),0_3px_3px_rgba(0,0,0,0.7)]";

  const middleClasses = [
    "w-full",
    // active: full parent height; inactive: fill outer’s h-8
    isCurrentSite ? "" : "",
    // rounded top if active, otherwise fully pill shaped
    isCurrentSite ? "rounded-t " : "rounded-full",
    "bg-[linear-gradient(to_top,#000,#011)] px-[0.0rem] ",
    heavyDarkShadow,
    isCurrentSite ? "" : "",
    "duration-300",
  ].join(" ");

  //
  //  Inner layer: fill parent’s height again and only round top corners if active
  /*
  const innerClasses = [
    "inline-flex items-center justify-center w-full h-full gap-2 overflow-hidden",
    isCurrentSite ? "rounded-t-md" : "rounded-full",
    "bg-[linear-gradient(#444,#222)] px-3 py-1 text-white text-sm font-medium transition-colors duration-200",
    isCurrentSite ? "" : "group-hover:bg-[linear-gradient(#333,#111)]",
    isCurrentSite ? "ring-2 ring-white" : "",
  ].join(" ");*/

  const innerClasses = [
    "inline-flex items-center justify-center w-full h-full gap-2 overflow-hidden",
    isCurrentSite ? "rounded-t-lg px-3 py-1.5" : "rounded-b-lg px-3 py-0.5",
    // ← change here: bottom stop is #000
    //"bg-[linear-gradient(180deg,#444_0%,#222_80%,#333_99%,##228B22_100%)]", //nonsense value results in no gradient
    "px-1 text-white text-sm font-medium transition-colors duration-200",
    isCurrentSite ? "" : "group-hover:bg-[linear-gradient(#333,#111)]",
    isCurrentSite ? "ring-0 ring-black" : "",
  ].join(" ");

  return (
    <Link href={href} passHref>
      <div className={outerClasses}>
        <div className={middleClasses}>
          <div className={innerClasses}>
            {/* Shrink SVG slightly */}
            <Image src={src} alt={alt} className="h-4 w-auto" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function BannerLogoLink_DarkBg_NeedsLightSvg({
  href,
  src,
  alt,
  isCurrentSite = false,
}: BannerLogoLinkProps) {
  //
  //  Outer wrapper: smaller height + darker gradient
  //
  const outerClasses = [
    // Dark gradient background
    "bg-[linear-gradient(#2a2a2a,#1a1a1a_50%,#000)]",
    "group inline-flex h-8 w-max overflow-visible rounded-full p-1",
    "transition-all duration-300",
    "opacity-45",
    // If it's the current site, dim & disable pointer events
    isCurrentSite
      ? "opacity-60 cursor-default pointer-events-none"
      : "hover:opacity-60",
  ].join(" ");

  //
  //  Middle “shell”: slightly lighter dark gradient + shadow
  //
  const heavyDarkShadow = "hover:shadow-[0_0_1px_rgba(0,0,0,0.5),0_0_1px_rgba(0,0,0,0.4),0_3px_3px_rgba(0,0,0,0.7)]";
  const middleClasses = [
    "w-full h-full",
    "bg-[linear-gradient(to_top,#111,#333)]",
    "overflow-hidden rounded-full px-0.01 py-0.01",
    // Heavy dark shadow
    heavyDarkShadow,
    isCurrentSite ? "" : "shadow-none",
    "duration-300",
  ].join(" ");

  //
  //  Inner “face”: darkest gradient + white text (but here we only have an Image)
  //
  //const 
  const innerClasses = [
    "inline-flex items-center justify-center w-full h-full gap-2 overflow-hidden rounded-full",
    "bg-[linear-gradient(#444,#222)]",
    "px-3 py-1 text-white text-sm font-medium",
    "transition-colors duration-200",
    // On hover, slightly lighten
    isCurrentSite ?  "" : "group-hover:bg-[linear-gradient(#333,#111)]",
    // If it’s current, add a   ring
    isCurrentSite ? "ring-2 ring-white" : "",
  ].join(" ");

  return (
    <Link href={href} passHref>
      <div className={outerClasses}>
        <div className={middleClasses}>
          <div className={innerClasses}>
            {/* Shrink SVG to h-6 so it fits the smaller bar */}
            <Image src={src} alt={alt} className="h-4 w-auto" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function BannerLogoLink_LightBg_Needs_DarkSvg({
  href,
  src,
  alt,
  isCurrentSite = false,
}: BannerLogoLinkProps) {
  // if it's the current site, we’ll dim it slightly and disable hover effects
  const outerClasses = [
    "bg-[linear-gradient(#e9e9e9,#e9e9e9_50%,#fff)]",
    "group inline-flex h-16 w-max overflow-visible rounded-full p-1 transition-all duration-300",
    isCurrentSite
      ? "opacity-60 cursor-default pointer-events-none"
      : "hover:opacity-100", // keep default if not current
  ].join(" ");

  const middleClasses = [
    "w-full h-full",
    "bg-[linear-gradient(to_top,#ececec,#fff)]",
    "overflow-hidden p-1 rounded-full",
    "shadow-[0_0_1px_rgba(0,0,0,0.07),0_0_1px_rgba(0,0,0,0.05),0_3px_3px_rgba(0,0,0,0.25),0_1px_3px_rgba(0,0,0,0.12)]",
    isCurrentSite ? "" : "hover:shadow-none",
    "duration-300",
  ].join(" ");

  const innerClasses = [
    "inline-flex items-center justify-center",
    "w-full h-full gap-4 overflow-hidden rounded-full",
    "bg-[linear-gradient(#f4f4f4,#fefefe)]",
    "px-4 py-2 text-[#101010] text-xl font-medium",
    "transition-colors duration-200",
    isCurrentSite ? "" : "group-hover:bg-[linear-gradient(#e2e2e2,#fefefe)]",
    isCurrentSite ? "ring-2 ring-blue-500" : "",
  ].join(" ");

  return (
    <Link href={href} passHref>
      <div className={outerClasses}>
        <div className={middleClasses}>
          <div className={innerClasses}>
            <Image src={src} alt={alt} className="h-8 w-auto" />
          </div>
        </div>
      </div>
    </Link>
  );
}

/*
export default function BannerLogoLink({
  href,
  src,
  alt,
  isCurrentSite = false,
}: BannerLogoLinkProps) {
  return (
    <>
    <div 
      className={cn(
        (isCurrentSite ? "rounded-full ring-1 ring-gray-400" : "")
      )}
    >
   
    <Link
      onClick={ */
        /* if this is link is for the current site then disable it*/
     /*   (e) => { isCurrentSite ? e.preventDefault() : undefined;  }
      }
      href={href}
      className={clsx(
        "flex items-center hover:underline",
        (!isCurrentSite ? "hover:drop-shadow-[0_0_8px_white]": "pointer-events-none cursor-not-allowed opacity-1)"),
        (isCurrentSite ? " rounded-full border border-b-2 border-black ring-1" : "")
      )}
    >
      {isCurrentSite && false && <span className="ml-1 text-xs text-white">-&gt;</span>}
      <Image src={src} alt={alt} className={clsx(
        (isCurrentSite ?  "pointer-events-none cursor-not-allowed opacity-50 h-3 w-auto" : "h-4 w-auto")
      )}/>
    </Link>
    </div>
    </>
  );
}
*/