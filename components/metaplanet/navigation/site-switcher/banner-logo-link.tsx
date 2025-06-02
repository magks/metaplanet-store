import { metaplanetBaseUrl, metaplanetBrandId } from "@/lib/app-settings";
import MetaplanetLogoSvg from "@/public/images/logos/dark/_012.svg";

export const MetaplanetLogoImage = MetaplanetLogoSvg;
export const MetaplanetBannerLogoLinkProps = {
    href: metaplanetBaseUrl,
    src:  MetaplanetLogoImage,
    alt:  "Metaplanet Logo",
    brandId: metaplanetBrandId,
};

