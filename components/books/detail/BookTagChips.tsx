import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";
import type { Tag } from "@/models/tag";

export default function BookTagsChips({ tags }: { tags: Tag[] }) {
  const { theme } = useTheme();
  if (!tags.length) return null;

  return (
    <View style={styles.wrap}>
      {tags.map((tag) => (
        <View
          key={tag.id}
          style={[
            styles.chip,
            {
              borderColor: theme.borderSoft,
              backgroundColor: theme.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.7)",
            },
          ]}
        >
          <AppText style={{ color: theme.text, fontSize: 12.5 }} weight="semibold">
            {tag.name}
          </AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 10, paddingHorizontal: 20, marginTop: 18 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, borderWidth: 1 },
});
