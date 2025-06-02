import { bmjBaseUrl, bmjBrandId } from "@/lib/app-settings";
import BtcMagJpLogoSvg from "@/public/images/BM_Japan_White_lg.svg";

export const BtcMagJpLogoImage = BtcMagJpLogoSvg;
export const BtcMagJpBannerLogoLinkProps = {
    href: bmjBaseUrl,
    src:  BtcMagJpLogoImage,
    alt:  "Bitcon Magazine Japan Logo",
    brandId: bmjBrandId,
};
