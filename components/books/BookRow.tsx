import React, { memo, useMemo } from "react";
import { View, StyleSheet, Image, Platform, ViewStyle } from "react-native";

import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";
import type { Book } from "@/models/book";
import { statuses } from "@/models/status";
import { FilterChip } from "./FilterChip";
import i18n from "@/lib/i18n";
import { formatDate } from "@/utils/formatDate";

// Lookup map au top-level
const statusById = new Map(statuses.map((s) => [s.id, s]));
const STATUS_BADGE_BG: Record<string, string> = {
  "status#1": "rgba(114,98,85,0.92)",
  "status#2": "rgba(236,185,57,0.95)",
  "status#3": "rgba(199,97,54,0.92)",
  "status#4": "rgba(88,139,110,0.92)",
  "status#5": "rgba(120,62,52,0.92)",
};

type Props = {
  book: Book;
};

function BookRowBase({ book }: Props) {
  const { theme } = useTheme();

  const status = statusById.get(book.statusId);
  const badgeBg = STATUS_BADGE_BG[book.statusId] ?? "rgba(0,0,0,0.45)";

  const coverStyle = useMemo(() => {
    return {
      borderColor: theme.borderSoft,
      shadowColor: theme.shadowColor,
    } as ViewStyle;
  }, [theme]);

  const added = useMemo(() => formatDate(book.createdAt, { locale: i18n.language, preset: "medium" }), [book.createdAt]);

  return (
    <View
      style={[
        styles.row,
        {
          backgroundColor:
            theme.mode === "dark" ? "rgba(35,28,23,0.75)" : "rgba(255,250,240,0.85)", // proche de surfaceA
          borderColor: theme.borderSoft,
          shadowColor: theme.shadowColor,
        },
      ]}
    >
      {/* Cover */}
      <View style={[styles.cover, coverStyle]}>
        {!!book.cover && (
          <Image
            source={book.cover}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        )}
      </View>

      {/* Infos */}
      <View style={{ flex: 1, marginLeft: 12 }}>
        <AppText weight="extrabold" numberOfLines={2} style={{ color: theme.text }}>
          {book.title}
        </AppText>

        <AppText numberOfLines={1} style={{ color: theme.muted, fontSize: 13, marginTop: 2 }}>
          {book.authors?.join(", ")}
        </AppText>

        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 8 }}>
          {!!added && (
            <AppText style={{ color: theme.chipMuted, fontSize: 12 }}>
              {added}
            </AppText>
          )}

          {!!status && (
            <View style={[styles.statusChipWrap]}>
              <FilterChip
                style={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 20,
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                  height: 30,
                }}
                label={status.name}
                active
                icon={status.icon}
                backgroundColor={badgeBg}
                iconColor='#000'
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export const BookRow = memo(BookRowBase);

const styles = StyleSheet.create({
  row: {
    position: 'relative',
    borderWidth: 1,
    borderRadius: 20,
    padding: 12,
    paddingRight: 0,
    flexDirection: "row",
    alignItems: "center",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: Platform.OS === "android" ? 2 : 0,
  },
  cover: {
    width: 54,
    aspectRatio: 2 / 3,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    shadowOpacity: 0.10,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: Platform.OS === "android" ? 2 : 0,
  },
  statusChipWrap: {
    position: "absolute",
    bottom: -15,
    right: 2,
  }
});