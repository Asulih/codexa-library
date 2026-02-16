// components/ui/TagAutocompleteInput.tsx
import React, { useMemo, useRef, useState, useCallback } from "react";
import { View, TextInput, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";
import type { Tag } from "@/models/tag";
import { useFiltersStore } from "@/store/useFiltersStore";

type TagAutocompleteInputProps = {
  tags: Tag[];
  selectedTags: string[];
  placeholder?: string;
  minChars?: number;
  maxResults?: number;
};

const ITEM_HEIGHT = 42;
const MAX_VISIBLE_ITEMS = 5;
const DROPDOWN_MAX_HEIGHT = ITEM_HEIGHT * MAX_VISIBLE_ITEMS + 40; // + header

const TagAutocompleteInput = ({
  tags,
  selectedTags,
  placeholder = "Rechercher un tag...",
  minChars = 2,
  maxResults = 12,
}: TagAutocompleteInputProps) => {
  const { theme } = useTheme();
  const inputRef = useRef<TextInput>(null);
  const selectingRef = useRef(false);

  const addTagId = useFiltersStore((s) => s.addTagId);

  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const normalized = query.trim().toLowerCase();
  const shouldShowSuggestions = focused && normalized.length >= minChars;

  const filteredTags = useMemo(() => {
    if (!shouldShowSuggestions) return [];
    const selectedSet = new Set(selectedTags);

    return tags
      .filter((tag) => !selectedSet.has(tag.id))
      .filter((tag) => {
        const name = tag.name.toLowerCase();
        const slug = (tag.slug ?? "").toLowerCase();
        return name.includes(normalized) || slug.includes(normalized);
      })
      .slice(0, maxResults);
  }, [tags, selectedTags, normalized, shouldShowSuggestions, maxResults]);

  const onSelectTag = useCallback(
    (tagId: string) => {
      selectingRef.current = true;

      addTagId(tagId);
      setQuery("");

      // garde focus + clavier
      requestAnimationFrame(() => inputRef.current?.focus());

      setTimeout(() => {
        selectingRef.current = false;
      }, 0);
    },
    [addTagId]
  );

  const activeBg =
    theme.mode === "dark" ? "rgba(236,185,57,0.10)" : "rgba(236,185,57,0.12)";

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={[
          styles.input,
          {
            backgroundColor: theme.surfaceA,
            borderColor: theme.borderSoft,
            color: theme.text,
            shadowColor: theme.shadowColor,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.muted}
        value={query}
        onChangeText={setQuery}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          if (selectingRef.current) {
            requestAnimationFrame(() => inputRef.current?.focus());
            return;
          }
          setFocused(false);
        }}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
      />

      {/* Dropdown */}
      {shouldShowSuggestions && (
        <View
          style={[
            styles.suggestions,
            {
              backgroundColor: theme.surfaceA,
              borderColor: theme.borderSoft,
              shadowColor: theme.shadowColor,
            },
          ]}
        >
          {/* Header */}
          <View style={[styles.dropdownHeader, { borderBottomColor: theme.borderSoft }]}>
            <AppText style={{ color: theme.chipMuted, fontSize: 12 }}>
              Suggestions
            </AppText>
            <AppText style={{ color: theme.chipMuted, fontSize: 12 }}>
              {filteredTags.length}/{maxResults}
            </AppText>
          </View>

          {filteredTags.length > 0 ? (
            <ScrollView
              keyboardShouldPersistTaps="always"
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: DROPDOWN_MAX_HEIGHT }}
              contentContainerStyle={{ paddingVertical: 6 }}
            >
              {filteredTags.map((tag, idx) => (
                <Pressable
                  key={tag.id}
                  onPress={() => onSelectTag(tag.id)}
                  style={({ pressed }) => [
                    styles.suggestionRow,
                    {
                      backgroundColor: pressed ? activeBg : "transparent",
                    },
                  ]}
                >
                  <AppText numberOfLines={1} style={{ color: theme.text, fontSize: 12, lineHeight: 16 }}>
                    {tag.name}
                  </AppText>

                  <Ionicons name="add" size={18} color={theme.muted} />

                  {/* Separator */}
                  {idx !== filteredTags.length - 1 && (
                    <View
                      pointerEvents="none"
                      style={[
                        styles.separator,
                        { backgroundColor: theme.mode === "dark" ? "rgba(255,240,210,0.08)" : "rgba(55,46,41,0.08)" },
                      ]}
                    />
                  )}
                </Pressable>
              ))}
            </ScrollView>
          ) : (
            <View style={{ padding: 12 }}>
              <AppText style={{ color: theme.chipMuted, fontSize: 13 }}>
                Aucun résultat
              </AppText>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingTop: 8,
    paddingBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,

    // shadow douce
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.10,
    shadowRadius: 14,
    elevation: 2,
  },
  suggestions: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
    zIndex: 10,

    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 3,
  },
  dropdownHeader: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  suggestionRow: {
    height: 42,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  separator: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 0,
    height: 1,
  },
});

export default TagAutocompleteInput;
