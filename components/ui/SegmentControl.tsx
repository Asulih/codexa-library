// components/ui/SegmentControl.tsx
import React, { useMemo } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SegmentButton from "./SegmentButton";

export type Segment<T extends string> = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  value: T;
};

type SegmentControlProps<T extends string> = {
  segments: Segment<T>[];
  selectedValue: T;
  onValueChange: (value: T) => void;
  gap?: number;
};

export default function SegmentControl<T extends string>({
  segments,
  selectedValue,
  onValueChange,
  gap = 0,
}: SegmentControlProps<T>) {
  const { width } = useWindowDimensions();

  // largeur dispo approximative : tu peux adapter si tu veux
  const containerPadding = 0;
  const containerWidth = width - containerPadding * 2;

  const segmentWidth = useMemo(() => {
    const count = Math.max(1, segments.length);
    const totalGap = gap * (count - 1);
    return Math.floor((containerWidth - totalGap) / count);
  }, [containerWidth, segments.length, gap]);

  return (
    <View style={[styles.row, gap ? { gap } : null]}>
      {segments.map((s, idx) => (
        <SegmentButton<T>
          key={s.value}
          label={s.label}
          icon={s.icon}
          value={s.value}
          selected={selectedValue === s.value}
          onSelect={onValueChange}
          width={segmentWidth}
          isFirst={idx === 0}
          isLast={idx === segments.length - 1}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingTop: 8,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "stretch",
  },
});
