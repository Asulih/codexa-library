import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Platform,
  TextInput,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

import { Screen } from "@/components/ui";
import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";

import { STATUS_ALL_ID, statuses } from "@/models/status";
import type { Book } from "@/models/book";

import { useBooksStore } from "@/store/useBooksStore";
import { useTagsWithCount } from "@/hooks/useTagsWithCount";

import { BookCard } from "@/components/books/BookCard";
import { FiltersBar } from "@/components/books/FiltersBar";
import AddBookFab from "@/components/AddBookFab";
import { useFiltersStore } from "@/store/useFiltersStore";
import { useTranslation } from "react-i18next";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BookRow } from "@/components/books/BookRow";

function useColumns(width: number) {
  return width >= 420 ? 3 : 2;
}

export default function BooksScreen() {
  const { t } = useTranslation("books");
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

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
  const selectedTagIds = useFiltersStore((s) => s.selectedTagIds);
  const displayMode = useFiltersStore((s) => s.selectedDisplayId);

  const setQuery = useFiltersStore((s) => s.setQuery);
  const setSelectedStatusId = useFiltersStore((s) => s.setSelectedStatusId);
  const toggleTagId = useFiltersStore((s) => s.toggleTagId);
  const clearTags = useFiltersStore((s) => s.clearTags);
  const setDisplayMode = useFiltersStore((s) => s.setDisplayMode);

  const isGrid = displayMode === 'cover';

  const tagsWithCount = useTagsWithCount(books);

  const filteredBooks = useMemo(() => {
    let list = books;

    if (selectedStatusId !== STATUS_ALL_ID) {
      list = list.filter((b) => b.statusId === selectedStatusId);
    }

    if (selectedTagIds.length > 0) {
      list = list.filter((b) => {
        const ids = b.tagIds ?? [];
        return selectedTagIds.some((id) => ids.includes(id));
      });
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
  }, [books, query, selectedStatusId, selectedTagIds]);

  const renderBook = useCallback(
    ({ item }: { item: Book }) => {
      const href = { pathname: "/books/[id]", params: { id: item.id } } as const;

      if (displayMode === "list") {
        return (
          <Link href={href} asChild>
            <TouchableOpacity activeOpacity={0.9}>
              <BookRow book={item} />
            </TouchableOpacity>
          </Link>
        );
      }

      return (
        <Link href={href} asChild>
          <TouchableOpacity activeOpacity={0.9}>
            <BookCard book={item} width={cardWidth} />
          </TouchableOpacity>
        </Link>
      );
    },
    [BookRow, BookCard, cardWidth, displayMode]
  );

  const idleBg =
    theme.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.65)";

  return (
    <Screen>
      {/* HEADER */}
      <View style={[styles.header, { paddingTop: insets.top, paddingHorizontal: pagePadding }]}>
        <AppText weight="extrabold" style={{ fontSize: 28, color: theme.text }}>
          {t('books:title')}
        </AppText>
      </View>

      {/* SEARCH */}
      <View style={{ flexDirection: 'row', paddingHorizontal: pagePadding, marginTop: 12, alignItems: 'center', justifyContent: 'space-between' }}>
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
        
        <Link href={'/(app)/(auth)/(modal)/filter'} asChild
          style={[
            styles.filterButton,
            { backgroundColor: idleBg, borderColor: theme.borderSoft, shadowColor: theme.shadowColor }
          ]} >
          <TouchableOpacity>
            <Ionicons name='filter' size={20} color={theme.muted}/>
          </TouchableOpacity>
        </Link>
      </View>
      
      <FiltersBar
        pagePadding={pagePadding}
        statuses={statuses}
        selectedStatusId={selectedStatusId}
        onSelectStatusId={setSelectedStatusId}
        tags={tagsWithCount}
        booksCount={books.length}
        selectedTagIds={selectedTagIds}
        onToggleTagId={toggleTagId}
        onClearTags={clearTags}
        maxVisibleTags={5}
      />


      {/* GRID */}
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        numColumns={isGrid ? columns : 1}
        key={`${displayMode}:${columns}`}
        contentContainerStyle={{
          paddingHorizontal: pagePadding,
          paddingTop: 14,
          paddingBottom: 100,
        }}
        columnWrapperStyle={ isGrid ? { gap } : undefined }
        ItemSeparatorComponent={() => <View style={{ height: isGrid ? 18 : 12 }} />}
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  filterButton: {
    height: 50,
    borderRadius: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    // iOS shadow doux
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  searchWrap: {
    width: '85%',
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
    width: '100%'
  },
});
