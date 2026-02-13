import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Platform,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

import { Screen } from "@/components/ui";
import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";

import { statuses } from "@/models/status";
import type { Book } from "@/models/book";

import { useBooksStore } from "@/store/useBooksStore";
import { useTagsWithCount } from "@/hooks/useTagsWithCount";

import { BookCard } from "@/components/books/BookCard";
import { FiltersBar } from "@/components/books/FiltersBar";
import AddBookFab from "@/components/AddBookFab";
import { useFiltersStore } from "@/store/useFiltersStore";
import { useTranslation } from "react-i18next";

function useColumns(width: number) {
  return width >= 420 ? 3 : 2;
}

export default function BooksScreen() {
  const { t } = useTranslation("books");
  const { theme } = useTheme();
  const { width } = useWindowDimensions();

  const books = useBooksStore((s) => s.books);

  const columns = useMemo(() => useColumns(width), [width]);

  const pagePadding = 20;
  const gap = 14;

  const cardWidth = useMemo(() => {
    const containerWidth = width - pagePadding * 2;
    return Math.floor((containerWidth - gap * (columns - 1)) / columns);
  }, [width, columns]);

  const query = useFiltersStore((s) => s.query);
  const selectedStatusId = useFiltersStore((s) => s.selectedStatusId);
  const selectedTagId = useFiltersStore((s) => s.selectedTagId);

  const setQuery = useFiltersStore((s) => s.setQuery);
  const setSelectedStatusId = useFiltersStore((s) => s.setSelectedStatusId);
  const setSelectedTagId = useFiltersStore((s) => s.setSelectedTagId);

  const tagsWithCount = useTagsWithCount(books);

  const filteredBooks = useMemo(() => {
    let list = books;

    if (selectedStatusId !== "all") {
      list = list.filter((b) => b.statusId === selectedStatusId);
    }

    if (selectedTagId !== "all") {
      list = list.filter((b) => (b.tagIds ?? []).includes(selectedTagId));
    }

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((b) => {
        const authorString = b.authors?.join(" ") ?? "";
        return (
          b.title.toLowerCase().includes(q) ||
          authorString.toLowerCase().includes(q)
        );
      });
    }

    return list;
  }, [books, query, selectedStatusId, selectedTagId]);

  const renderBook = useCallback(
    ({ item }: { item: Book }) => <BookCard book={item} width={cardWidth} />,
    [cardWidth]
  );

  return (
    <Screen>
      {/* HEADER */}
      <View style={[styles.header, { paddingHorizontal: pagePadding }]}>
        <AppText weight="extrabold" style={{ fontSize: 28, color: theme.text }}>
          {t('books:mybooks')}
        </AppText>
      </View>

      {/* SEARCH */}
      <View style={{ paddingHorizontal: pagePadding, marginTop: 12 }}>
        <View style={[styles.searchWrap, { borderColor: theme.borderSoft }]}>
          <BlurView
            intensity={theme.mode === "dark" ? 18 : 14}
            tint={theme.mode}
            style={StyleSheet.absoluteFill}
          />
          <Feather
            name="search"
            size={18}
            color={theme.muted}
            style={{ marginRight: 10 }}
          />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={t('books:filters.searchPlaceholder')}
            placeholderTextColor={theme.muted}
            style={[styles.searchInput, { color: theme.text }]}
          />
        </View>
      </View>

      <FiltersBar
        pagePadding={pagePadding}
        statuses={statuses}
        selectedStatusId={selectedStatusId}
        onSelectStatusId={setSelectedStatusId}
        tags={tagsWithCount}
        booksCount={books.length}
        selectedTagId={selectedTagId}
        onSelectTagId={setSelectedTagId}
        maxVisibleTags={5}
      />

      {/* GRID */}
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        numColumns={columns}
        key={columns}
        contentContainerStyle={{
          paddingHorizontal: pagePadding,
          paddingTop: 14,
          paddingBottom: 100,
        }}
        columnWrapperStyle={{ gap }}
        ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
        renderItem={renderBook}
        // perf easy wins:
        removeClippedSubviews
        initialNumToRender={12}
        maxToRenderPerBatch={12}
        windowSize={7}
        updateCellsBatchingPeriod={50}
      />

      <AddBookFab />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "android" ? 18 : 22,
  },
  searchWrap: {
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
});
