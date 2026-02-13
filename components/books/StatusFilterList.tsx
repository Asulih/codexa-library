import React, { useMemo, useRef, useCallback } from "react";
import { FlatList, type FlatList as FlatListType } from "react-native";
import { FilterChip } from "./FilterChip";
import { Status } from "@/models/status";
import { useTranslation } from "react-i18next";

type Props = {
  pagePadding: number;
  statuses: Status[];
  selectedStatusId: string;
  onSelectStatusId: (id: string) => void;
};

export function StatusFilterList({
  pagePadding,
  statuses,
  selectedStatusId,
  onSelectStatusId,
}: Props) {
  const { t } = useTranslation(['books', 'common']);
  const listRef = useRef<FlatListType<any>>(null);

  const sortedStatuses = useMemo(
    () => [...statuses].sort((a, b) => a.order - b.order),
    [statuses]
  );

  const statusAllItem = {
    id: "all",
    name: "Tous",
    icon: "view-grid",
    order: -1,
  };

  const data = useMemo(() => {
    if (selectedStatusId === "all") {
      return [statusAllItem, ...sortedStatuses];
    }

    const selected = sortedStatuses.find((s) => s.id === selectedStatusId);
    const rest = sortedStatuses.filter((s) => s.id !== selectedStatusId);

    return selected
      ? [statusAllItem, selected, ...rest]
      : [statusAllItem, ...sortedStatuses];
  }, [sortedStatuses, selectedStatusId]);

  const select = useCallback(
    (id: string) => {
      onSelectStatusId(id);
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    },
    [onSelectStatusId]
  );

  return (
    <FlatList
      ref={listRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: pagePadding,
        marginTop: 14,
        gap: 10,
      }}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <FilterChip
          label={t(`books:status.${item.id}`, { defaultValue: t('common:all') })}
          icon={(item as any).icon}
          active={selectedStatusId === item.id}
          onPress={() => select(item.id)}
        />
      )}
    />
  );
}
