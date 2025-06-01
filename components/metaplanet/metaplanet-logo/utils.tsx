//import { prodUrl } from "@/lib/consts";

const prodUrl = '/'
// Base path for logos
const basePath = `${prodUrl}images/logos`;

// List of variant IDs (can be extended as needed)
const variantIds = ["005", "012", "013", "015", "100"] as const; // Add more IDs here as needed

// Type definition for logo variants
export type LogoVariant = (typeof variantIds)[number];

// Dynamically generate logo variants
export const logoVariants = Object.fromEntries(
  variantIds.map((id) => [
    id,
    {
      light: `${basePath}/light/_${id}.svg`,
      dark: `${basePath}/dark/_${id}.svg`,
    },
  ])
) as Record<
  LogoVariant,
  {
    light: string;
    dark: string;
  }
>;
