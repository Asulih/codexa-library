// components/ui/TagAutocompleteInput.tsx
import React, { useMemo, useRef, useState, useCallback } from "react";
import { View, TextInput, StyleSheet, FlatList, Keyboard, ScrollView } from "react-native";
import TagSuggestionItem from "./TagSuggestionItem";
import { useTheme } from "@/providers/ThemeProvider";
import type { Tag } from "@/models/tag";
import { useFiltersStore } from "@/store/useFiltersStore";

type TagAutocompleteInputProps = {
  tags: Tag[]; // all available tags
  selectedTags: string[]; // selected tag ids
  placeholder?: string;
  minChars?: number; // ✅ default 2
  maxResults?: number; // ✅ default 10-12
};

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

  // Filter tags only when suggestions should be visible
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

  const handleSelect = useCallback(
    (tagId: string) => {
      addTagId(tagId);

      // Clear input and keep focus (your current UX)
      setQuery("");
      // Keep the keyboard open and input focused:
      requestAnimationFrame(() => inputRef.current?.focus());
    },
    [addTagId]
  );

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
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.muted}
        value={query}
        onChangeText={setQuery}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          // If the blur comes from tapping a suggestion, ignore it
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

      {/* Suggestions: only when >= minChars and focused */}
      {shouldShowSuggestions && filteredTags.length > 0 && (
        <View
          style={[
            styles.suggestions,
            { backgroundColor: theme.surfaceA, borderColor: theme.borderSoft },
          ]}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
          >
            {filteredTags.map((tag) => (
              <TagSuggestionItem
                key={tag.id}
                tag={tag}
                onSelect={() => {
                  selectingRef.current = true;
                  addTagId(tag.id);
                  setQuery("");
                  inputRef.current?.focus();

                  setTimeout(() => {
                    selectingRef.current = false;
                  }, 0);
                }}
              />
            ))}
          </ScrollView>
        </View>
      )}

      {/* Optional hint when focused but too short */}
      {focused && normalized.length > 0 && normalized.length < minChars && (
        <View style={{ marginTop: 6 }}>
          {/* If you want, replace with AppText for consistent typography */}
          {/* Example: <AppText style={{ color: theme.muted, fontSize: 12 }}>Tape au moins {minChars} caractères…</AppText> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  suggestions: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 8,
    maxHeight: 200,
    overflow: "hidden", // ✅ important (not 'scroll')
    zIndex: 10,
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
});

export default TagAutocompleteInput;
