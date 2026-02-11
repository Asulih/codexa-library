import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/providers/ThemeProvider";

export default function Screen({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <LinearGradient colors={[theme.bg0, theme.bg1]} style={styles.root}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
