export const tokens = {
  color: {
    primary: "#0078D4",
    primaryDark: "#005A9E",
    accent: "#50E6FF",
    dark1: "#0B1F3A",
    dark2: "#1B2A4E",
    textPrimary: "#0F172A",
    textSecondary: "#475569",
    textOnDark: "#FFFFFF",
    borderLight: "#E2E8F0",
    bgSoft: "#F4F7FB",
    scoreGreen: "#10B981",
    scoreGreenSoft: "#ECFDF5",
    scoreOrange: "#F59E0B",
    scoreOrangeSoft: "#FFFBEB",
    scoreRed: "#EF4444",
    scoreRedSoft: "#FEF2F2",
  },
} as const;

export type TokenColor = keyof typeof tokens.color;
