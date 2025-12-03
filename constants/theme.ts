/**
 * Palettes de couleurs pour le thème clair et sombre.
 * Compatible Expo, Expo Router et React Navigation.
 */

import { Platform } from "react-native";

const tintColorLight = "#EFC817";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#ffffff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },

  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

/**
 * Fonts selon la plateforme.
 * Fonctionne sans erreur même si les polices n'existent pas encore sur Android.
 */
export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },

  android: {
    sans: "sans-serif",
    serif: "serif",
    rounded: "sans-serif",
    mono: "monospace",
  },

  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono:
      "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },

  default: {
    sans: "System",
    serif: "serif",
    rounded: "sans-serif",
    mono: "monospace",
  },
});
