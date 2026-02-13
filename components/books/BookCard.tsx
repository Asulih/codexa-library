import React, { memo, useMemo } from "react";
import { View, StyleSheet, Image, Platform } from "react-native";
import { BlurView } from "expo-blur";
import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";
import type { Book } from "@/models/book";
import { statuses } from "@/models/status";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = { book: Book; width: number };

// Lookup map au top-level (pas un hook)
const statusById = new Map(statuses.map((s) => [s.id, s]));
const STATUS_BADGE_BG: Record<string, string> = {
  "status#1": "rgba(114,98,85,0.92)",   // wishlist - mocha (#726255)
  "status#2": "rgba(236,185,57,0.95)",  // to read - gold (#ecb939)
  "status#3": "rgba(199,97,54,0.92)",   // in progress - copper/terracotta
  "status#4": "rgba(88,139,110,0.92)",  // read - sage green
  "status#5": "rgba(120,62,52,0.92)",   // abandoned - wine/brick
};

function BookCardBase({ book, width }: Props) {
  const { theme } = useTheme();
  const coverHeight = useMemo(() => Math.round(width * 1.4), [width]);

  const status = statusById.get(book.statusId);
  const bg = STATUS_BADGE_BG[book.statusId] ?? "rgba(0,0,0,0.45)";

  return (
    <View style={{ width }}>
      <View
        style={[
          styles.cover,
          {
            height: coverHeight,
            borderColor: theme.borderSoft,
            shadowColor: theme.shadowColor,
          },
        ]}
      >
        {!!book.cover && (
          <Image
            source={book.cover}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        )}

        <View style={[styles.badge, { borderColor: theme.borderSoft, backgroundColor: bg }]}>
          <BlurView
            intensity={15}
            tint={theme.mode}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.badgeRow}>
            {status?.icon ? (
                <MaterialCommunityIcons
                  name={status?.icon}
                  size={14}
                  color={theme.text}
                  style={{ marginRight: 6 }}
                />
              ) : null}
            <AppText weight="semibold" style={{ fontSize: 12, color: theme.text }}>
              {status?.name ?? "—"}
            </AppText>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 8 }}>
        <AppText weight="extrabold" numberOfLines={1} style={{ color: theme.text }}>
          {book.title}
        </AppText>
        <AppText numberOfLines={1} style={{ color: theme.muted, fontSize: 13 }}>
          {book.authors?.join(", ")}
        </AppText>
      </View>
    </View>
  );
}

export const BookCard = memo(BookCardBase);

const styles = StyleSheet.create({
  cover: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: Platform.OS === "android" ? 3 : 0,
  },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    // petit depth
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  badgeRow: {
    flexDirection: 'row'
  }
});
