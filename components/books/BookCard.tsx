import React, { memo, useMemo } from "react";
import { View, StyleSheet, Image, Platform, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";
import type { Book } from "@/models/book";
import { statuses, StatusId } from "@/models/status";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = { book: Book; width: number };

// Lookup map au top-level (pas un hook)
const statusById = new Map(statuses.map((s) => [s.id, s]));

function BookCardBase({ book, width }: Props) {
  const { theme } = useTheme();

  const status = statusById.get(book.statusId as StatusId);

  const coverStyle = useMemo(() => {
    return {
      width: '100%',
      aspectRatio: 2 / 3,
      borderColor: theme.borderSoft,
      shadowColor: theme.shadowColor,
    } as ViewStyle
  }, [theme]);

  return (
    <View style={{ width }}>
      <View
        style={[
          styles.cover,
          coverStyle,
        ]}
      >
        {!!book.cover && (
          <Image
            source={book.cover}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        )}

        <View style={[styles.badge, { borderColor: theme.borderSoft, backgroundColor: status?.color }]}>
          {status?.icon ? (
              <MaterialCommunityIcons
                name={status?.icon}
                size={16}
                color={theme.text}
              />
            ) : null}
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
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
});
