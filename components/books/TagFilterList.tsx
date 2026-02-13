import React, { useMemo, useRef, useCallback, useState } from "react";
import { FlatList, type FlatList as FlatListType } from "react-native";
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
  const listRef = useRef<FlatListType<any>>(null);
  const [expanded, setExpanded] = useState(false);

  const allTags = useMemo(() => {
    return [{ id: "all", name: "Tous", count: booksCount }, ...tags];
  }, [tags, booksCount]);

  const ordered = useMemo(() => {
    const [allItem, ...rest] = allTags;

    if (selectedTagId === "all") return [allItem, ...rest];

    const selected = rest.find((t) => t.id === selectedTagId);
    const others = rest.filter((t) => t.id !== selectedTagId);

    return selected
      ? [allItem, selected, ...others]
      : [allItem, ...rest];
  }, [allTags, selectedTagId]);

  const data = useMemo(() => {
    const [allItem, ...rest] = ordered;

    if (!expanded) {
      const top = rest.slice(0, maxVisibleTags);
      const remaining = rest.length - maxVisibleTags;

      if (remaining > 0) {
        return [
          allItem,
          ...top,
          { id: "__more__", name: `+ ${remaining}`, count: remaining },
        ];
      }

      return [allItem, ...top];
    }

    return [
      allItem,
      ...rest,
      { id: "__less__", name: "Réduire", count: 0 },
    ];
  }, [ordered, expanded, maxVisibleTags]);

  const select = useCallback(
    (id: string) => {
      onSelectTagId(id);
      setExpanded(false); // 👈 repli automatique
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
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
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        if (item.id === "__more__") {
          return (
            <FilterChip
              label={`… ${item.name}`}
              icon="dots-horizontal"
              active={false}
              onPress={() => setExpanded(true)}
            />
          );
        }

        if (item.id === "__less__") {
          return (
            <FilterChip
              label="Réduire"
              icon="chevron-left"
              active={false}
              onPress={() => setExpanded(false)}
            />
          );
        }

        return (
          <FilterChip
            label={
              item.id === "all"
                ? "Tags : Tous"
                : `${item.name} · ${item.count}`
            }
            icon="tag"
            active={selectedTagId === item.id}
            onPress={() => select(item.id)}
          />
        );
      }}
    />
  );
}
