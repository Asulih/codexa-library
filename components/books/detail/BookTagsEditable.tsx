import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";
import type { Tag } from "@/models/tag";
import EditTagsSheet from "./EditTagsSheet";

type Props = {
  bookId: string;
  tagIds: string[];
  tags: Tag[]; // tags sélectionnés (déjà filtrés)
  onRemoveTag: (tagId: string) => void; // tap sur chip => remove
  onSetTagIds: (next: string[]) => void; // sheet => set
};

export default function BookTagsEditable({ bookId, tagIds, tags, onRemoveTag, onSetTagIds }: Props) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  const hasTags = tags.length > 0;

  const chipBg = theme.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.7)";

  return (
    <View style={{ paddingHorizontal: 20, marginTop: 18 }}>
      <View style={styles.titleRow}>
        <AppText weight="bold" style={{ color: theme.text, fontSize: 16 }}>
          Tags
        </AppText>

        <Pressable onPress={() => setOpen(true)} hitSlop={10} style={styles.addBtn}>
          <MaterialCommunityIcons name="plus" size={18} color={theme.primary} />
          <AppText weight="semibold" style={{ color: theme.primary, marginLeft: 6, fontSize: 13 }}>
            Ajouter
          </AppText>
        </Pressable>
      </View>

      <View style={styles.wrap}>
        {hasTags ? (
          tags.map((tag) => (
            <Pressable
              key={tag.id}
              onPress={() => onRemoveTag(tag.id)}
              style={({ pressed }) => [
                styles.chip,
                {
                  borderColor: theme.borderSoft,
                  backgroundColor: chipBg,
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
            >
              <AppText style={{ color: theme.text, fontSize: 12.5 }} weight="semibold">
                {tag.name}
              </AppText>
              <MaterialCommunityIcons name="close" size={16} color={theme.muted} style={{ marginLeft: 6 }} />
            </Pressable>
          ))
        ) : (
          <AppText style={{ color: theme.chipMuted, fontSize: 12.5 }}>
            Aucun tag — ajoute-en pour organiser ta bibliothèque.
          </AppText>
        )}
      </View>

      <EditTagsSheet
        visible={open}
        onClose={() => setOpen(false)}
        value={tagIds}
        onChange={onSetTagIds}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 14,
  },
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
