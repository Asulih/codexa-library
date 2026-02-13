import React from "react";
import { Pressable, StyleSheet, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";

export default function AddBookFab({ onPress }: { onPress?: () => void }) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.fab,
        { backgroundColor: theme.primary, shadowColor: theme.shadowColor },
        pressed && { transform: [{ scale: 0.98 }], opacity: 0.95 },
      ]}
    >
      <Feather name="plus" size={22} color={theme.mode === "dark" ? "#14110f" : "#372e29"} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 18,
    bottom: 18,
    height: 56,
    width: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: Platform.OS === "android" ? 6 : 0,
  },
});
