export const themes = ["light", "dark"] as const;
export type Theme = typeof themes[number];
export function resolveTheme(value?: string): Theme { return themes.includes(value as Theme) ? value as Theme : "light"; }
