import React from "react";
import { Image, StyleSheet, View } from "react-native";
import type { ImageSourcePropType } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";
import type { Status } from "@/models/status";

export default function BookHero({
  cover,
  status,
}: {
  cover?: ImageSourcePropType;
  status?: Status;
}) {
  const { theme } = useTheme();

  return (
    <View style={styles.hero}>
      {cover ? (
        <Image source={cover} style={styles.cover} resizeMode="cover" />
      ) : (
        <View style={[styles.coverPlaceholder, { backgroundColor: theme.surfaceA, borderColor: theme.borderSoft }]}>
          <MaterialCommunityIcons name="book-open-page-variant" size={48} color={theme.muted} />
        </View>
      )}

      {status ? (
        <View style={[styles.statusBadge, { backgroundColor: status.color }]}>
          <MaterialCommunityIcons name={status.icon} size={16} color="#14110f" />
          <AppText weight="semibold" style={{ marginLeft: 6, color: "#14110f", fontSize: 12.5 }}>
            {status.name}
          </AppText>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: "center", marginTop: 12 },
  cover: { width: 180, aspectRatio: 2 / 3, borderRadius: 20 },
  coverPlaceholder: {
    width: 180,
    aspectRatio: 2 / 3,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  statusBadge: {
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
  },
});
