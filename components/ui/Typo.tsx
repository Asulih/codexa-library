import type { Theme } from "@/constants/theme";

/**
 * Typographies Codexa.
 * Usage :
 *   const t = typography(theme);
 *   <Text style={t.h1}>...</Text>
 */
export function typography(theme: Theme) {
  return {
    h1: {
      fontSize: 58,
      color: theme.text,
    },
    h2: {
      fontSize: 32,
      color: theme.text,
    },
    body: {
      fontSize: 15,
      color: theme.text,
    },
    muted: {
      fontSize: 15,
      color: theme.muted,
    },
    caption: {
      fontSize: 13,
      color: theme.muted,
    },
    button: {
      fontSize: 16,
      color: theme.text,
    },
    link: {
      fontSize: 13,
      color: theme.primary,
    },
  };
}
