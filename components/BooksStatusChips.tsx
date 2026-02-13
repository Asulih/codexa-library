import React from "react";
import { FlatList } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import AppText from "@/components/ui/AppText";

export type StatusFilter = "all" | "to_read" | "reading" | "read";

function Chip({
  label,
  active,
  icon,
  onPress,
}: {
  label: string;
  active: boolean;
  icon: keyof typeof Feather.glyphMap;
  onPress?: () => void;
}) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          borderColor: theme.borderSoft,
          backgroundColor: active
            ? theme.mode === "dark"
              ? "rgba(236,185,57,0.18)"
              : "rgba(236,185,57,0.20)"
            : theme.mode === "dark"
            ? "rgba(255,255,255,0.06)"
            : "rgba(255,255,255,0.55)",
        },
        pressed && { opacity: 0.92, transform: [{ scale: 0.99 }] },
      ]}
    >
      <Feather name={icon as any} size={14} color={active ? theme.primary : theme.muted} style={{ marginRight: 8 }} />
      <AppText weight="semibold" style={{ color: active ? theme.text : theme.muted, fontSize: 13 }}>
        {label}
      </AppText>
    </Pressable>
  );
}

export default function BooksStatusChips({
  value,
  onChange,
}: {
  value: StatusFilter;
  onChange: (v: StatusFilter) => void;
}) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 10 }}
      data={[
        { key: "all" as const, label: "Tous", icon: "grid" as const },
        { key: "to_read" as const, label: "À lire", icon: "bookmark" as const },
        { key: "reading" as const, label: "En cours", icon: "book-open" as const },
        { key: "read" as const, label: "Lu", icon: "check-circle" as const },
      ]}
      keyExtractor={(x) => x.key}
      renderItem={({ item }) => (
        <Chip label={item.label} icon={item.icon} active={value === item.key} onPress={() => onChange(item.key)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 34,
    borderRadius: 999,
    paddingHorizontal: 12,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
