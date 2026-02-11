import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { BlurView } from "expo-blur";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import type { ThemePreference } from "@/constants/theme";

const OPTIONS: { key: ThemePreference; label: string; icon: keyof typeof Feather.glyphMap }[] = [
  { key: "system", label: "Auto", icon: "cpu" },
  { key: "light", label: "Clair", icon: "sun" },
  { key: "dark", label: "Sombre", icon: "moon" },
];

export default function ThemeSwitcher() {
  const { theme, preference, setPreference } = useTheme();

  return (
    <View style={styles.wrap}>
      <BlurView intensity={theme.mode === "dark" ? 18 : 14} tint={theme.mode} style={StyleSheet.absoluteFill} />
      <View style={[styles.inner, { borderColor: theme.borderSoft }]}>
        {OPTIONS.map((opt) => {
          const active = preference === opt.key;
          return (
            <Pressable
              key={opt.key}
              onPress={() => setPreference(opt.key)}
              style={({ pressed }) => [
                styles.item,
                active && { backgroundColor: theme.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)" },
                pressed && { opacity: 0.9 },
              ]}
            >
              <Feather name={opt.icon} size={16} color={active ? theme.primary : theme.muted} />
              <Text style={[styles.label, { color: active ? theme.text : theme.muted }]}>
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 46,
    borderRadius: 16,
    overflow: "hidden",
  },
  inner: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    flexDirection: "row",
    padding: 4,
    gap: 6,
  },
  item: {
    flex: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
  },
});
