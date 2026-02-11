export const Colors = {
  primary: "#ecb939",
  warning: "#eb5555",
  disabled: "#cfccca",
  pale: '#e6e6e6',
  black: '#000000',


  light: {
    text: '#6d6158',
    title: "#38302c",
    background: "#f5edca",
    navBackground: "#726255",
    iconColor: "#372e29",
    iconColorFocused: "#ecb939",
    uiBackground: "#f0d79a",
  },
  dark: {
    text: '#d4d4d4',
    title: "#fff",
    background: "#38302c",
    navBackground: "#312925",
    iconColor: "#f0d79a",
    iconColorFocused: "#ecb939",
    uiBackground: "#6d6158",
  },
}

export const Fonts = {
  brand: 'Merienda',
  brandLight: 'Merienda_300Light',
  brandRegular: 'Merienda_400Regular',
  brandMedium: 'Merienda_500Medium',
  brandSemiBold: 'Merienda_600SemiBold',
  brandBold: 'Merienda_700Bold',
  brandExtraBold: 'Merienda_800ExtraBold',
  brandBlack: 'Merienda_900Black',
};

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
  };
}
