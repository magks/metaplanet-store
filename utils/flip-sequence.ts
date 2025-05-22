/**
 * Utility functions for flipboard-style animations.
 */

/**
 * The lowercase alphabet used for flipping animations.
 */
const alphabet = {
  en: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQXYZ".split(""),
  jp: "あいうえおかきくけこさしすせそたちつてとなにぬねのまみむめもらりるれろをんアイウエオビットコン確保未来へ".split(
    ""
  ),
};

/**
 * Generates a sequence of characters for a flipboard animation from startChar to endChar.
 * Always performs a full cycle through the alphabet, even if characters are the same.
 *
 * @param startChar - The starting character.
 * @param endChar - The target character to settle on.
 * @returns An array of characters representing the flip sequence.
 */
export const getFlipSequence = (
  startChar: string,
  endChar: string,
  locale: "en" | "jp"
): string[] => {
  const startIndex = alphabet[locale].indexOf(startChar.toLowerCase());
  const endIndex = alphabet[locale].indexOf(endChar.toLowerCase());
  const sequence: string[] = [];

  // If startChar or endChar isn't in alphabet (e.g., space), return single char
  if (startIndex === -1 || endIndex === -1) return [endChar];

  // Always do a full cycle, even if same letter
  let currentIndex = startIndex;
  for (let i = 0; i <= alphabet[locale].length; i++) {
    sequence.push(alphabet[locale][currentIndex]);
    currentIndex = (currentIndex + 1) % alphabet[locale].length;
    if (currentIndex === endIndex && i > 0) break; // Stop after reaching end
  }
  return sequence;
};
