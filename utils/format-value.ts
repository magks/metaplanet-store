/**
 * Formats a numeric value with appropriate unit symbol and locale-specific abbreviations
 * @param value - String representation of the number
 * @param unit - Unit type to format with
 * @param locale - Locale string ("en" or "jp")
 * @param excludeDecimals - Whether to exclude decimal places
 * @returns Formatted string with unit and locale-specific abbreviation
 */
export function formatValue(
  value: string,
  unit: string,
  locale: "en" | "jp",
  excludeDecimals: boolean = false
): string {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return value;

  let symbol: string;
  switch (unit) {
    case "$":
      symbol = "$";
      break;
    case "¥":
      symbol = "¥";
      break;
    case "BTC":
      symbol = "₿";
      break;
    case "PERCENTAGE":
      symbol = "%";
      break;
    case "JPY":
      symbol = "¥";
      break;
    case "USD":
      symbol = "$";
      break;
    case "MULTIPLIER":
      symbol = "x";
      break;
    case "NUMBER":
      symbol = "";
      break;
    case "3350":
      symbol = "¥";
      break;
    case "MTPLF":
      symbol = "$";
      break;
    default:
      symbol = "";
  }

  let formattedValue: string;
  const absValue = Math.abs(numValue); // Work with absolute value for formatting
  const isNegative = numValue < 0; // Track if the number is negative

  if (absValue >= 1_000_000_000) {
    formattedValue =
      (
        absValue / (locale === "jp" ? 100_000_000 : 1_000_000_000)
      ).toLocaleString(locale === "jp" ? "ja-JP" : "en-US", {
        maximumFractionDigits: excludeDecimals ? 0 : locale === "jp" ? 0 : 2,
        minimumFractionDigits: excludeDecimals ? 0 : locale === "jp" ? 0 : 2,
      }) + (locale === "jp" ? "億" : "B");
  } else if (absValue >= 1_000_000) {
    formattedValue =
      (absValue / (locale === "jp" ? 10_000 : 1_000_000)).toLocaleString(
        locale === "jp" ? "ja-JP" : "en-US",
        {
          maximumFractionDigits: excludeDecimals ? 0 : locale === "jp" ? 0 : 2,
          minimumFractionDigits: excludeDecimals ? 0 : locale === "jp" ? 0 : 2,
        }
      ) + (locale === "jp" ? "万" : "M");
  } else if (absValue <= 1_000) {
    formattedValue = absValue.toLocaleString(
      locale === "jp" ? "ja-JP" : "en-US",
      {
        maximumFractionDigits: excludeDecimals ? 0 : 2,
        minimumFractionDigits: excludeDecimals ? 0 : 2,
      }
    );
  } else {
    formattedValue = absValue.toLocaleString(
      locale === "jp" ? "ja-JP" : "en-US",
      {
        maximumFractionDigits: 0,
      }
    );
  }

  const isSuffixUnit = unit === "PERCENTAGE" || unit === "MULTIPLIER";
  const signPrefix = isNegative ? "-" : ""; // Add negative sign if needed

  return isSuffixUnit
    ? `${signPrefix}${formattedValue}${symbol}` // For suffix units like % or x
    : `${signPrefix}${symbol}${formattedValue}`; // For prefix units like $
}
