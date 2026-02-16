import React, { useMemo, useRef, useCallback } from "react";
import { FlatList, type FlatList as FlatListType } from "react-native";
import { FilterChip } from "./FilterChip";
import { Status, STATUS_ALL_ID } from "@/models/status";
import { useTranslation } from "react-i18next";
import { withAlpha } from "@/utils/color";

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

  const sortedStatuses = useMemo(() => {
    const all = statuses.find((s) => s.id === STATUS_ALL_ID);
    const rest = statuses
      .filter((s) => s.id !== STATUS_ALL_ID)
      .sort((a, b) => a.order - b.order);

    return { all, rest };
  }, [statuses]);

  const data = useMemo(() => {
    const all = sortedStatuses.all;
    const rest = sortedStatuses.rest;

    if (!all) return rest; // au cas où

    // ✅ "all" TOUJOURS en premier
    if (selectedStatusId === STATUS_ALL_ID) {
      return [all, ...rest];
    }

    const selected = rest.find((s) => s.id === selectedStatusId);
    const others = rest.filter((s) => s.id !== selectedStatusId);

    return selected ? [all, selected, ...others] : [all, ...rest];
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
      renderItem={({ item }) => {
        const isAll = item.id === STATUS_ALL_ID;
        const isActive = selectedStatusId === item.id;
        const tint = (item as Status).color as string;
        const backgroundColor =
          tint ? withAlpha(tint, isActive ? 0.32 : 0.10) : undefined;

        const borderColor =
          tint ? withAlpha(tint, isActive ? 0.75 : 0.22) : undefined;

        const iconColor = tint ? tint : undefined;

        return (
          <FilterChip
            label={
              isAll
                ? t("common:all")
                : t(`books:status.${item.id}`, { defaultValue: item.name })
            }
            icon={(item as any).icon}
            active={isActive}
            onPress={() => select(item.id)}
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            iconColor={iconColor}
          />
        );
      }}
    />
  );
}
