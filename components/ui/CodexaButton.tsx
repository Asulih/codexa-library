import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { typography } from "./Typo";
import AppText from "./AppText";

type Props = {
  title: string;
  variant?: "primary" | "outline";
  onPress?: () => void;
  style?: ViewStyle;
};

export default function CodexaButton({ title, variant = "primary", onPress, style }: Props) {
  const { theme } = useTheme();
  const t = typography(theme);
  const primary = variant === "primary";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        primary
          ? { backgroundColor: theme.primary }
          : { backgroundColor: "transparent", borderWidth: 1, borderColor: theme.borderSoft },
        pressed && { opacity: 0.92, transform: [{ scale: 0.99 }] },
        style,
      ]}
    >
      <AppText weight="extrabold" style={[t.button, styles.text, { color: primary ? (theme.mode === "dark" ? "#14110f" : "#372e29") : theme.text }]}>
        {title}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 56,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontSize: 16 },
});
