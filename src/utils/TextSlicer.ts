/**
 *
 * @param {string} text - The text to be sliced.
 * @param {number} [maxLength = 50] - The maximum length before truncation.
 * @returns The sliced text, with an ellipsis (...) appended if truncated.
 */

export function textSlicer(text: string, maxLength: number = 50): string {
  if (text.length >= maxLength) return `${text.slice(0, maxLength)}...`
  return text
}
