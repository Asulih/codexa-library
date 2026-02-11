import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeTheme, Theme, ThemeMode, ThemePreference } from "@/constants/theme";

const STORAGE_KEY = "codexa.theme.preference";

type ThemeContextValue = {
  theme: Theme;
  mode: ThemeMode; // mode effectif (light/dark)
  preference: ThemePreference; // "system" | "light" | "dark"
  setPreference: (pref: ThemePreference) => void;
  toggle: () => void; // toggle light/dark (force manuel)
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme(); // "light" | "dark" | null
  const systemMode: ThemeMode = systemScheme === "dark" ? "dark" : "light";

  const [preference, setPreferenceState] = useState<ThemePreference>("system");
  const mode: ThemeMode = preference === "system" ? systemMode : preference;

  // Charge la préférence au démarrage
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === "light" || saved === "dark" || saved === "system") {
          setPreferenceState(saved);
        }
      } catch {
        // ignore
      }
    })();
  }, []);

  const setPreference = (pref: ThemePreference) => {
    setPreferenceState(pref);
    AsyncStorage.setItem(STORAGE_KEY, pref).catch(() => {});
  };

  const toggle = () => {
    // Si on est en system, on bascule vers l’opposé du mode système en "manuel"
    if (preference === "system") {
      setPreference(systemMode === "dark" ? "light" : "dark");
      return;
    }
    setPreference(preference === "dark" ? "light" : "dark");
  };

  const theme = useMemo(() => makeTheme(mode), [mode]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, mode, preference, setPreference, toggle }),
    [theme, mode, preference]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside <ThemeProvider />");
  }
  return ctx;
}
