import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import AppText from "@/components/ui/AppText";

export default function BooksHeaderBar({
  title,
  onToggleSort,
  onOpenFilters,
}: {
  title: string;
  onToggleSort?: () => void;
  onOpenFilters?: () => void;
}) {
  const { theme } = useTheme();

  return (
    <View style={styles.row}>
      <AppText weight="extrabold" style={{ color: theme.text, fontSize: 28 }}>
        {title}
      </AppText>

      <View style={styles.actions}>
        <Pressable
          onPress={onToggleSort}
          style={({ pressed }) => [
            styles.iconBtn,
            { borderColor: theme.borderSoft },
            pressed && { opacity: 0.9 },
          ]}
        >
          <MaterialCommunityIcons name="arrow-up-down" size={18} color={theme.muted} />
        </Pressable>

        <Pressable
          onPress={onOpenFilters}
          style={({ pressed }) => [
            styles.iconBtn,
            { borderColor: theme.borderSoft },
            pressed && { opacity: 0.9 },
          ]}
        >
          <Feather name="sliders" size={18} color={theme.muted} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  actions: { flexDirection: "row", gap: 10 },
  iconBtn: {
    height: 40,
    width: 40,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
