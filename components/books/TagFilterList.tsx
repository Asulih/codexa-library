import React, { useMemo, useRef, useCallback, useState } from "react";
import {
  FlatList,
  type FlatList as FlatListType,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from "react-native";
import { useTranslation } from "react-i18next";

import { FilterChip } from "./FilterChip";

type TagWithCount = { id: string; name: string; count: number };

type Props = {
  pagePadding: number;
  tags: TagWithCount[];
  booksCount: number;
  selectedTagId: string;
  onSelectTagId: (id: string) => void;
  maxVisibleTags?: number;
};

export function TagFilterList({
  pagePadding,
  tags,
  booksCount,
  selectedTagId,
  onSelectTagId,
  maxVisibleTags = 5,
}: Props) {
  const { t } = useTranslation(["books", "common"]);

  const listRef = useRef<FlatListType<any>>(null);
  const [expanded, setExpanded] = useState(false);

  // Track current scroll position (x offset)
  const scrollXRef = useRef(0);

  // Track sizes to compute max valid offset after data changes
  const contentWidthRef = useRef(0);
  const viewportWidthRef = useRef(0);

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  /**
   * After expanding/collapsing, the content width changes.
   * If current offset is now out of bounds, FlatList can render blank
   * until the user scrolls (classic horizontal virtualization edge case).
   *
   * Fix: after layout, clamp offset to a valid range and scroll (without animation).
   */
  const fixOffsetAfterLayout = useCallback(() => {
    // One frame is sometimes not enough; two frames is the reliable pattern.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const maxOffset = Math.max(
          0,
          contentWidthRef.current - viewportWidthRef.current
        );
        const nextOffset = clamp(scrollXRef.current, 0, maxOffset);

        listRef.current?.scrollToOffset({
          offset: nextOffset,
          animated: false,
        });
      });
    });
  }, []);

  const setExpandedSafe = useCallback(
    (next: boolean) => {
      setExpanded(next);
      fixOffsetAfterLayout();
    },
    [fixOffsetAfterLayout]
  );

  // Build base data: "all" + tags (we translate labels at render time)
  const allTags = useMemo(() => {
    return [{ id: "all", count: booksCount } as any, ...tags];
  }, [tags, booksCount]);

  // Put the selected tag right after "all" to keep UX consistent
  const ordered = useMemo(() => {
    const [allItem, ...rest] = allTags;

    if (selectedTagId === "all") return [allItem, ...rest];

    const selected = rest.find((x: any) => x.id === selectedTagId);
    const others = rest.filter((x: any) => x.id !== selectedTagId);

    return selected ? [allItem, selected, ...others] : [allItem, ...rest];
  }, [allTags, selectedTagId]);

  // Final list data depending on expanded/collapsed state
  const data = useMemo(() => {
    const [allItem, ...rest] = ordered;

    if (!expanded) {
      const top = rest.slice(0, maxVisibleTags);
      const remaining = rest.length - maxVisibleTags;

      if (remaining > 0) {
        return [allItem, ...top, { id: "__more__", remainingCount: remaining }];
      }
      return [allItem, ...top];
    }

    return [allItem, ...rest, { id: "__less__" }];
  }, [ordered, expanded, maxVisibleTags]);

  /**
   * When selecting a tag:
   * - update selection
   * - auto-collapse
   * - scroll back to start (this is your requested UX)
   */
  const select = useCallback(
    (id: string) => {
      onSelectTagId(id);
      setExpanded(false);
      // This is intentional: selecting a tag scrolls back to start
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
      // Also keep refs consistent
      scrollXRef.current = 0;
    },
    [onSelectTagId]
  );

  return (
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
      extraData={expanded} // ensures FlatList re-renders on expand/collapse
      keyExtractor={(item: any) => item.id}
      renderItem={({ item }: { item: any }) => {
        if (item.id === "__more__") {
          return (
            <FilterChip
              label={`… + ${item.remainingCount}`}
              icon="dots-horizontal"
              active={false}
              // IMPORTANT: expand without jumping to start
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
              // IMPORTANT: collapse without jumping to start
              onPress={() => setExpandedSafe(false)}
            />
          );
        }

        return (
          <FilterChip
            label={
              item.id === "all"
                ? t("books:tags.labelAll", {
                    tags: t("books:tags.title"),
                    all: t("common:all"),
                  })
                : `${item.name} · ${item.count}`
            }
            icon="tag"
            active={selectedTagId === item.id}
            onPress={() => select(item.id)}
          />
        );
      }}
      // Track scroll position
      onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollXRef.current = e.nativeEvent.contentOffset.x;
      }}
      scrollEventThrottle={16}
      // Track content size (width)
      onContentSizeChange={(w) => {
        contentWidthRef.current = w;
      }}
      // Track visible viewport width
      onLayout={(e) => {
        viewportWidthRef.current = e.nativeEvent.layout.width;
      }}
    />
  );
}
