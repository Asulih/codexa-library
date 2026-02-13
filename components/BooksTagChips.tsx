import React from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import AppText from "@/components/ui/AppText";
import { Tag } from "@/models/tag";

function TagChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
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
      <Feather name="tag" size={14} color={active ? theme.primary : theme.muted} style={{ marginRight: 8 }} />
      <AppText weight="semibold" style={{ color: active ? theme.text : theme.muted, fontSize: 13 }}>
        {label}
      </AppText>
    </Pressable>
  );
}

type TagWithCount = Tag & {
  count: number;
}

export default function BooksTagChips({
  value,
  onChange,
  totalCount,
  tags,
}: {
  value: string; // "all" ou nom de tag
  onChange: (v: string) => void;
  totalCount: number;
  tags: TagWithCount[];
}) {
  const data: TagWithCount[] = tags;

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 10 }}
      data={data}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <TagChip
          label={`Tags : Tous (${totalCount})`}
          active={value === "all"}
          onPress={() => onChange("all")}
        />
      }
      renderItem={({ item }) => (
        <TagChip
          label={`${item.slug} · ${item.count}`}
          active={value === item.id}
          onPress={() => onChange(item.id)}
        />
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
