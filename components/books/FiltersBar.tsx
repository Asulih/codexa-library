import React, { useCallback, useMemo } from "react";
import { View, FlatList } from "react-native";
import { FilterChip } from "@/components/books/FilterChip";
import { Status } from "@/models/status";

type TagWithCount = { id: string; name: string; count: number };

type Props = {
  pagePadding: number;
  statuses: Status[];
  selectedStatusId: string;
  onSelectStatusId: (id: string) => void;

  tags: TagWithCount[];
  booksCount: number;
  selectedTagId: string;
  onSelectTagId: (id: string) => void;
};

export function FiltersBar({
  pagePadding,
  statuses,
  selectedStatusId,
  onSelectStatusId,
  tags,
  booksCount,
  selectedTagId,
  onSelectTagId,
}: Props) {
  const sortedStatuses = useMemo(
    () => [...statuses].sort((a, b) => a.order - b.order),
    [statuses]
  );

  const renderStatus = useCallback(
    ({ item }: { item: Status }) => (
      <FilterChip
        label={item.name}
        icon={item.icon}
        active={selectedStatusId === item.id}
        onPress={() => onSelectStatusId(item.id)}
      />
    ),
    [selectedStatusId, onSelectStatusId]
  );

  const renderTag = useCallback(
    ({ item }: { item: TagWithCount }) => (
      <FilterChip
        label={item.id === "all" ? "Tags : Tous" : `${item.name} · ${item.count}`}
        icon="tag"
        active={selectedTagId === item.id}
        onPress={() => onSelectTagId(item.id)}
      />
    ),
    [selectedTagId, onSelectTagId]
  );

  return (
    <>
      {/* STATUS */}
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: pagePadding,
            marginTop: 14,
            gap: 10,
          }}
          data={[{ id: "all", name: "Tous", icon: "view-grid", order: -1 }, ...sortedStatuses]}
          keyExtractor={(item) => item.id}
          renderItem={renderStatus}
        />
      </View>

      {/* TAGS */}
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: pagePadding,
            marginVertical: 10,
            gap: 10,
          }}
          data={[{ id: "all", name: "Tous", count: booksCount }, ...tags]}
          keyExtractor={(item) => item.id}
          renderItem={renderTag}
        />
      </View>
    </>
  );
}
