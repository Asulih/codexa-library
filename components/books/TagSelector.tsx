import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";
import { useTagsStore } from "@/store/useTagsStore";

type Props = {
  value: string[]; // tagIds
  onChange: (next: string[]) => void;
};

export default function TagsSelector({ value, onChange }: Props) {
  const { theme } = useTheme();
  const tags = useTagsStore((s) => s.tags);
  const addTag = useTagsStore((s) => s.addTag);
  const findByName = useTagsStore((s) => s.findByName);

  const [q, setQ] = useState("");

  const selected = useMemo(() => {
    const set = new Set(value);
    return tags.filter((t) => set.has(t.id));
  }, [tags, value]);

  const suggestions = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];

    const notSelected = tags.filter((t) => !value.includes(t.id));
    const starts = notSelected.filter((t) => t.name.toLowerCase().startsWith(query));
    const contains = notSelected
      .filter((t) => !t.name.toLowerCase().startsWith(query))
      .filter((t) => t.name.toLowerCase().includes(query));

    return [...starts, ...contains].slice(0, 8);
  }, [q, tags, value]);

  const canCreate = useMemo(() => {
    const name = q.trim();
    if (!name) return false;
    return !findByName(name);
  }, [q, findByName]);

  function addTagId(id: string) {
    if (value.includes(id)) return;
    onChange([...value, id]);
  }

  function removeTagId(id: string) {
    onChange(value.filter((x) => x !== id));
  }

  function onSubmit() {
    const name = q.trim();
    if (!name) return;

    // Si correspond à un tag existant (case-insensitive) => select
    const existing = findByName(name);
    if (existing) {
      addTagId(existing.id);
      setQ("");
      return;
    }

    // Sinon => crée + select ✅
    const created = addTag(name);
    addTagId(created.id);
    setQ("");
  }

  return (
    <View style={{ paddingHorizontal: 16, marginTop: 14 }}>
      <AppText weight="semibold" style={{ color: theme.text, marginBottom: 10 }}>
        Tags
      </AppText>

      <TextInput
        value={q}
        onChangeText={setQ}
        onSubmitEditing={onSubmit}
        returnKeyType="done"
        placeholder="Ajouter des tags (Entrée pour créer)"
        placeholderTextColor={theme.muted}
        style={[
          styles.input,
          {
            backgroundColor: theme.surfaceA,
            borderColor: theme.borderSoft,
            color: theme.text,
            shadowColor: theme.shadowColor,
          },
        ]}
      />

      {/* Suggestions */}
      {q.trim().length > 0 && (suggestions.length > 0 || canCreate) ? (
        <View
          style={[
            styles.suggestionsBox,
            { backgroundColor: theme.surfaceB, borderColor: theme.borderSoft, shadowColor: theme.shadowColor },
          ]}
        >
          {canCreate ? (
            <Pressable
              onPress={onSubmit}
              style={({ pressed }) => [styles.suggestionRow, { opacity: pressed ? 0.9 : 1 }]}
            >
              <MaterialCommunityIcons name="plus" size={18} color={theme.primary} />
              <AppText style={{ color: theme.text, marginLeft: 10 }} weight="semibold">
                Créer “{q.trim()}”
              </AppText>
            </Pressable>
          ) : null}

          {suggestions.map((t) => (
            <Pressable
              key={t.id}
              onPress={() => {
                addTagId(t.id);
                setQ("");
              }}
              style={({ pressed }) => [styles.suggestionRow, { opacity: pressed ? 0.9 : 1 }]}
            >
              <MaterialCommunityIcons name="tag-outline" size={18} color={theme.muted} />
              <AppText style={{ color: theme.text, marginLeft: 10 }} weight="semibold">
                {t.name}
              </AppText>
            </Pressable>
          ))}
        </View>
      ) : null}

      {/* Selected chips */}
      {selected.length > 0 ? (
        <View style={styles.chipsWrap}>
          {selected.map((t) => (
            <Pressable
              key={t.id}
              onPress={() => removeTagId(t.id)}
              style={({ pressed }) => [
                styles.chip,
                {
                  borderColor: theme.borderSoft,
                  backgroundColor: theme.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.65)",
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
            >
              <AppText style={{ color: theme.text, fontSize: 12.5 }} weight="semibold">
                {t.name}
              </AppText>
              <MaterialCommunityIcons name="close" size={16} color={theme.muted} style={{ marginLeft: 6 }} />
            </Pressable>
          ))}
        </View>
      ) : (
        <AppText style={{ color: theme.chipMuted, fontSize: 12, marginTop: 8 }}>
          Astuce : tape un nouveau tag et appuie sur Entrée pour le créer.
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 1,
  },
  suggestionsBox: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  suggestionRow: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 12,
  },
  chip: {
    height: 34,
    borderRadius: 999,
    paddingHorizontal: 12,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
