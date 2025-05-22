import { QUARTER_ENDS, QUARTER_NAMES } from "@/lib";

export function quarterXtoDate(x: string): string {
  const [quarter, yearSuffix] = x.split(" "); // e.g., 'Q4 24'
  const quarterIndex = QUARTER_NAMES.indexOf(quarter); // 0-based index
  const fullYear = `20${yearSuffix}`;
  const quarterEnd = QUARTER_ENDS[quarterIndex]; // e.g., '12-31'
  return `${fullYear}-${quarterEnd}`; // e.g., '2024-12-31'
}
