import React from "react";
import { Pressable, StyleSheet, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AddBookFab({ onPress }: { onPress?: () => void }) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const size = 44;          // ✅ plus petit
  const radius = size / 2;

  return (
    <Pressable
      onPress={onPress}
      hitSlop={12}
      style={({ pressed }) => [
        styles.fab,
        {
          width: size,
          height: size,
          borderRadius: radius,
          backgroundColor: theme.primary,
          borderColor: theme.borderSoft,
          shadowColor: theme.shadowColor,
          bottom: insets.bottom + 14, // un poil plus proche
          opacity: pressed ? 0.92 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        Platform.OS === "android" && { elevation: 2 },
      ]}
    >
      <MaterialCommunityIcons
        name="plus"
        size={20} // ✅ adapté
        color={theme.mode === "dark" ? theme.text : "#1b1613"}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    zIndex: 999,

    // shadow plus discrète
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
});
