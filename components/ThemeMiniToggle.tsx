import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";

type Props = {
  variant?: "icon" | "label";
  onOpenSettings?: () => void;
};

export default function ThemeMiniToggle({
  variant = "icon",
  onOpenSettings,
}: Props) {
  const { theme, preference, toggle } = useTheme();

  const icon =
    preference === "system"
      ? "cpu"
      : theme.mode === "dark"
      ? "moon"
      : "sun";

  const label =
    preference === "system"
      ? "Auto"
      : theme.mode === "dark"
      ? "Sombre"
      : "Clair";

  const showLabel = variant === "label";

  return (
    <Pressable
      onPress={toggle}
      onLongPress={onOpenSettings}
      style={styles.wrap}
      hitSlop={10}
    >
      <BlurView
        intensity={theme.mode === "dark" ? 18 : 14}
        tint={theme.mode}
        style={StyleSheet.absoluteFill}
      />

      <View
        style={[
          styles.inner,
          { borderColor: theme.borderSoft },
          showLabel && styles.innerWithLabel,
        ]}
      >
        <Feather name={icon as any} size={16} color={theme.muted} />

        {showLabel && (
          <Text style={[styles.text, { color: theme.muted }]}>
            {label}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 999,
    overflow: "hidden",
  },
  inner: {
    height: 36,
    width: 36,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 999,
  },
  innerWithLabel: {
    width: "auto",
    paddingHorizontal: 12,
    flexDirection: "row",
    gap: 8,
  },
  text: {
    fontSize: 13,
    fontWeight: "800",
  },
});
