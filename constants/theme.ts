export const palette = {
  gold: "#ecb939",
  gold2: "#f0c75e",
  leather: "#726255",
  ink: "#372e29",
  black: "#000000",

  paper0: "#fbf5e6",
  paper1: "#f6ecd6",
  paper2: "#fffaf0",

  night0: "#14110f",
  night1: "#1b1613",
  night2: "#231c17",

  // 🔴 Couleurs d’erreur
  error: "#d9534f",       // rouge-terreux (par défaut)
  error2: "#c85e54",      // plus doux, plus chaud
  errorLight: "#f8d7da",  // fond clair pour les erreurs (mode clair)
  errorDark: "#5c2e2e",   // fond sombre pour les erreurs (mode sombre)
};

export type ThemeMode = "light" | "dark";
export type ThemePreference = ThemeMode | "system";

export type Theme = {
  mode: ThemeMode;

  bg0: string;
  bg1: string;

  surfaceA: string;
  surfaceB: string;

  text: string;
  muted: string;

  primary: string;
  primary2: string;

  borderSoft: string;
  shadowColor: string;

  chipText: string;
  chipMuted: string;

  error: string;
  errorBg: string;
  errorBorder: string;
};

// ✅ IMPORTANT: export nommé (pas default)
export function makeTheme(mode: ThemeMode): Theme {
  if (mode === "dark") {
    return {
      mode,
      bg0: palette.night0,
      bg1: palette.night1,

      surfaceA: "rgba(35,28,23,0.75)",
      surfaceB: "rgba(20,17,15,0.55)",

      text: "#f7f0df",
      muted: "#c8b9a4",

      primary: palette.gold,
      primary2: palette.gold2,

      borderSoft: "rgba(255,240,210,0.10)",
      shadowColor: "rgba(0,0,0,0.45)",

      chipText: "#f7f0df",
      chipMuted: "rgba(247,240,223,0.72)",

      error: "#d9534f",
      errorBg: "rgba(217,83,79,0.2)",
      errorBorder: "#d9534f",
    };
  }

  return {
    mode,
    bg0: palette.paper0,
    bg1: palette.paper1,

    surfaceA: "rgba(255,250,240,0.85)",
    surfaceB: "rgba(255,245,225,0.70)",

    text: palette.ink,
    muted: palette.leather,

    primary: palette.gold,
    primary2: palette.gold2,

    borderSoft: "rgba(55,46,41,0.10)",
    shadowColor: "rgba(0,0,0,0.14)",

    chipText: palette.ink,
    chipMuted: "rgba(55,46,41,0.70)",

    error: "#d9534f",
    errorBg: "rgba(248,215,218,0.8)",
    errorBorder: "#d9534f",
  };
}
