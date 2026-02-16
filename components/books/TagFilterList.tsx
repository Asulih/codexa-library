import React, { useMemo, useRef, useCallback, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  type FlatList as FlatListType,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from "react-native";
import { useTranslation } from "react-i18next";
import { FilterChip } from "./FilterChip";
import { useRouter } from "expo-router";

type TagWithCount = { id: string; name: string; count: number };

type Props = {
  pagePadding: number;
  tags: TagWithCount[];
  booksCount: number;

  selectedTagIds: string[];
  onToggleTagId: (id: string) => void;
  onClearTags: () => void;

  maxVisibleTags?: number;
};

export function TagFilterList({
  pagePadding,
  tags,
  booksCount,
  selectedTagIds,
  onToggleTagId,
  onClearTags,
  maxVisibleTags = 5,
}: Props) {
  const { t } = useTranslation(["books", "common"]);
  const router = useRouter();
  const listRef = useRef<FlatListType<any>>(null);

  const [expanded, setExpanded] = useState(false);

  // ---- Anti "blank list on collapse" fix (keeps offset valid)
  const scrollXRef = useRef(0);
  const contentWidthRef = useRef(0);
  const viewportWidthRef = useRef(0);
  const pendingClampRef = useRef(false);

  const selectedSet = useMemo(() => new Set(selectedTagIds), [selectedTagIds]);

  // Selected tags objects (for display row)
  const selectedTags = useMemo(() => {
    return selectedTagIds
      .map((id) => tags.find((x) => x.id === id))
      .filter(Boolean) as TagWithCount[];
  }, [selectedTagIds, tags]);

  /**
   * Order tags: selected first (in selection order), then the rest.
   */
  const availableTags = useMemo(() => {
    // When some tags are selected, we remove them from the bottom list
    if (selectedTagIds.length === 0) return tags;
    return tags.filter((t) => !selectedSet.has(t.id));
  }, [tags, selectedSet, selectedTagIds.length]);

  /**
   * Build the horizontal list data.
   */
  const data = useMemo(() => {
    const allItem = { id: "all", count: booksCount };

    if (!expanded) {
      const top = availableTags.slice(0, maxVisibleTags);
      const remaining = Math.max(0, availableTags.length - maxVisibleTags);

      return remaining > 0
        ? [allItem, ...top, { id: "__more__", remainingCount: remaining }]
        : [allItem, ...top];
    }

    return [allItem, ...availableTags, { id: "__less__" }];
  }, [booksCount, expanded, availableTags, maxVisibleTags]);

  const setExpandedSafe = useCallback((next: boolean) => {
    pendingClampRef.current = true;
    setExpanded(next);
  }, []);

  // How many selected tags we show in the wrapped row
  const MAX_SELECTED_VISIBLE = 3;
  const remainingSelectedCount = Math.max(
    0,
    selectedTags.length - MAX_SELECTED_VISIBLE
  );

  return (
    <View>
      {/* Selected tags summary row (wrapped) */}
      {selectedTagIds.length > 0 && (
        <View style={{ paddingHorizontal: pagePadding, marginTop: 8, flexDirection: "row", gap: 10 }}>
          <FilterChip
            label={t("books:tags.selectedCount", { count: selectedTagIds.length })}
            icon="tag"
            active={true}
            onPress={() => router.push({
              pathname: "/(app)/(auth)/(modal)/filter",
              params: { focus: 'tags' }
            })} // open full list
          />
          <FilterChip
            label={t("books:tags.clear")}
            icon="filter-remove"
            active={false}
            onPress={onClearTags}
          />
        </View>
      )}


      {/* Main horizontal tags list */}
      <FlatList
        ref={listRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: pagePadding,
          marginVertical: 10,
          gap: 10,
        }}
        data={data}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: { item: any }) => {
          if (item.id === "__more__") {
            return (
              <FilterChip
                label={`… + ${item.remainingCount}`}
                icon="dots-horizontal"
                active={false}
                onPress={() => setExpandedSafe(true)}
              />
            );
          }

          if (item.id === "__less__") {
            return (
              <FilterChip
                label={t("books:tags.minimize")}
                icon="chevron-left"
                active={false}
                onPress={() => setExpandedSafe(false)}
              />
            );
          }

          if (item.id === "all") {
            const isAll = selectedTagIds.length === 0;

            return (
              <FilterChip
                label={t("books:tags.labelAll", {
                  tags: t("books:tags.title"),
                  all: t("common:all"),
                })}
                icon="tag"
                active={isAll}
                onPress={() => {
                  onClearTags();
                }}
              />
            );
          }

          return (
            <FilterChip
              label={`${item.name} · ${item.count}`}
              icon="tag"
              active={selectedSet.has(item.id)}
              onPress={() => onToggleTagId(item.id)}
            />
          );
        }}
        // Track scroll offset
        onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          scrollXRef.current = e.nativeEvent.contentOffset.x;
        }}
        scrollEventThrottle={16}
        // Track viewport width
        onLayout={(e) => {
          viewportWidthRef.current = e.nativeEvent.layout.width;
        }}
        // Track content width + clamp when collapsing/expanding
        onContentSizeChange={(w) => {
          contentWidthRef.current = w;

          if (!pendingClampRef.current) return;

          const maxOffset = Math.max(
            0,
            contentWidthRef.current - viewportWidthRef.current
          );

          if (scrollXRef.current > maxOffset) {
            listRef.current?.scrollToOffset({ offset: maxOffset, animated: false });
            scrollXRef.current = maxOffset;
          }

          pendingClampRef.current = false;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  selectedRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
