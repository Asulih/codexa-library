import React from "react";
import { View } from "react-native";
import { Status } from "@/models/status";
import { StatusFilterList } from "./StatusFilterList";
import { TagFilterList } from "./TagFilterList";

type TagWithCount = { id: string; name: string; count: number };

type Props = {
  pagePadding: number;

  statuses: Status[];
  selectedStatusId: string;
  onSelectStatusId: (id: string) => void;

  tags: TagWithCount[];
  booksCount: number;

  // ✅ Multi-select tags
  selectedTagIds: string[];
  onToggleTagId: (id: string) => void;
  onClearTags: () => void;

  maxVisibleTags?: number;
};

export function FiltersBar(props: Props) {
  return (
    <>
      <View>
        <StatusFilterList
          pagePadding={props.pagePadding}
          statuses={props.statuses}
          selectedStatusId={props.selectedStatusId}
          onSelectStatusId={props.onSelectStatusId}
        />
      </View>

      <View>
        <TagFilterList
          pagePadding={props.pagePadding}
          tags={props.tags}
          booksCount={props.booksCount}
          selectedTagIds={props.selectedTagIds}
          onToggleTagId={props.onToggleTagId}
          onClearTags={props.onClearTags}
          maxVisibleTags={props.maxVisibleTags}
        />
      </View>
    </>
  );
}
