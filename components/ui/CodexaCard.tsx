import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import { useTheme } from "@/providers/ThemeProvider";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export default function CodexaCard({ children, style }: Props) {
  const { theme } = useTheme();

  return (
    <View style={[styles.wrap, { borderColor: theme.borderSoft }, style]}>
      <BlurView intensity={theme.mode === "dark" ? 18 : 14} tint={theme.mode} style={StyleSheet.absoluteFill} />
      <View style={styles.inner}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
  },
  inner: {
    padding: 14,
  },
});
