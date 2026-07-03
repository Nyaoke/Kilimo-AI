import type { Language } from "@/types";

const SWAHILI_TOKENS = new Set([
  "ya", "wa", "za", "kwa", "na", "ni", "nini", "gani", "vipi", "wapi", "lini", "je",
  "mahindi", "maharagwe", "viazi", "kahawa", "chai", "shamba", "mbegu", "mbolea",
  "udongo", "mvua", "wadudu", "kilimo", "mkulima", "kupanda", "kuvuna", "nifanye",
  "yanabadilika", "manjano", "samahani", "mtaalamu", "mazao", "mimea", "dawa",
  "mchanga", "kukua", "mavuno", "hali", "maji", "kupanda", "kunyunyiza",
]);

/**
 * Demo-grade language detection using high-frequency Swahili tokens.
 * A production system would use a proper language detector.
 */
export function detectLanguage(text: string): Language {
  const normalized = text.toLowerCase().replace(/[^a-z\u00c0-\u024f\s]/g, " ");
  const tokens = normalized.split(/\s+/).filter(Boolean);
  let hits = 0;
  for (const token of tokens) {
    if (SWAHILI_TOKENS.has(token)) {
      hits++;
    }
  }
  return hits >= 2 ? "sw" : "en";
}
