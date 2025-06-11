import Image from "next/image";
import { LogoVariant, logoVariants } from "./utils";

type MetaplanetLogoProps = {
  variant?: LogoVariant;
  width?: number;
  height?: number;
  className?: string;
  mode?: "light" | "dark";
};

export function MetaplanetLogo({
  variant = "005",
  width = 25,
  height = 25,
  className = "",
  mode,
}: MetaplanetLogoProps) {
  // Determine which logo to show based on mode prop
  const showLight = mode === "light";
  const showDark = mode === "dark";

  return (
    <>
      {/* Light mode logo */}
      <div
        className={`relative ${className} ${showDark ? "hidden" : "block"} ${
          !showLight && "ignoredark:hidden"
        }`}
        style={{ width: width, height: height }}
      >
        <Image
          src={logoVariants[variant].light}
          alt={`Metaplanet Logo ${variant}`}
          fill
          // style={{ objectFit: "contain" }}
          priority
        />
      </div>

      {/* Dark mode logo */}
      <div
        className={`relative ${className} ${showLight ? "hidden" : "block"} ${
          !showDark && "ignoredark:block hidden"
        }`}
        style={{ width: width, height: height }}
      >
        <Image
          src={logoVariants[variant].dark}
          alt={`Metaplanet Logo ${variant}`}
          fill
          // style={{ objectFit: "contain" }}
          priority
        />
      </div>
    </>
  );
}
