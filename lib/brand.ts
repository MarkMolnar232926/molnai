/**
 * Thera-Team brand colours, sampled from the logo (blue wordmark, blue → green flame).
 * Mirrors the tokens in app/globals.css for places that need raw values (canvas, SVG, inline styles).
 */
export const BRAND = {
  blue: "#1162a9",
  sky: "#1a8fd0",
  skyLight: "#5bb8ea",
  green: "#3aa062",
  greenDark: "#237a46",
  lime: "#8ec85e",
} as const;

/** Eight shades along the logo's flame, used for the hero bands and decorative waves. */
export const BRAND_SHADES = ["#0d4f8c", "#1162a9", "#1679bf", "#1a8fd0", "#4aaee3", "#2f9a5c", "#5cb35f", "#8ec85e"];
