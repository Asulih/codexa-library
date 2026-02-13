import React from "react";
import { View, StyleSheet, TextInput, Pressable } from "react-native";
import { BlurView } from "expo-blur";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";

export default function BooksSearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const { theme } = useTheme();

  return (
    <View style={[styles.wrap, { borderColor: theme.borderSoft }]}>
      <BlurView intensity={theme.mode === "dark" ? 18 : 14} tint={theme.mode} style={StyleSheet.absoluteFill} />
      <Feather name="search" size={18} color={theme.muted} style={{ marginRight: 10 }} />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Titre, auteur, tag…"
        placeholderTextColor={theme.mode === "dark" ? "rgba(247,240,223,0.45)" : "rgba(55,46,41,0.45)"}
        style={[styles.input, { color: theme.text }]}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
      {value.length > 0 ? (
        <Pressable onPress={() => onChange("")} hitSlop={10}>
          <Feather name="x" size={18} color={theme.muted} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 52,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  input: { flex: 1, fontSize: 15 },
});
