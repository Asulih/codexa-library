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
      fontFamily: 'CormorantGaramond_700Bold',
      color: theme.text,
    },
    h2: {
      fontSize: 32,
      fontFamily: 'CormorantGaramond_700Bold',
      color: theme.text,
    },
    body: {
      fontSize: 15,
      fontFamily: 'Inter_500Medium',
      color: theme.text,
    },
    muted: {
      fontSize: 15,
      fontFamily: 'Inter_500Medium',
      color: theme.muted,
    },
    caption: {
      fontSize: 13,
      fontFamily: 'Inter_700Medium',
      color: theme.muted,
    },
    button: {
      fontSize: 16,
      fontFamily: 'Inter_800ExtraBold',
      color: theme.text,
    },
    link: {
      fontSize: 13,
      fontFamily: 'Inter_800ExtraBold',
      color: theme.primary,
    },
  };
}
