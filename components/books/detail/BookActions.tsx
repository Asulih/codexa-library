import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";
import { withAlpha } from "@/utils/color";

export default function BookActions({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { theme } = useTheme();

  return (
    <View style={{ paddingHorizontal: 20, marginTop: 32, gap: 14 }}>
      <Pressable
        onPress={onEdit}
        style={({ pressed }) => [
          styles.btn,
          { borderColor: theme.borderSoft, backgroundColor: theme.surfaceA, opacity: pressed ? 0.9 : 1 },
        ]}
      >
        <MaterialCommunityIcons name="pencil-outline" size={18} color={theme.text} />
        <AppText style={{ marginLeft: 8, color: theme.text }} weight="semibold">
          Modifier
        </AppText>
      </Pressable>

      <Pressable
        onPress={onDelete}
        style={({ pressed }) => [
          styles.btn,
          { borderColor: theme.errorBorder, backgroundColor: withAlpha(theme.error, 0.1), opacity: pressed ? 0.9 : 1 },
        ]}
      >
        <MaterialCommunityIcons name="delete-outline" size={18} color={theme.error} />
        <AppText style={{ marginLeft: 8, color: theme.error }} weight="semibold">
          Supprimer
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 44,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
