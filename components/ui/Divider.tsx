import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";

export default function Divider({ label = "Ou" }: { label?: string }) {
  const { theme } = useTheme();

  return (
    <View style={styles.row}>
      <View style={[styles.line, { backgroundColor: theme.borderSoft }]} />
      <Text style={[styles.text, { color: theme.muted }]}>{label}</Text>
      <View style={[styles.line, { backgroundColor: theme.borderSoft }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12, marginVertical: 6 },
  line: { flex: 1, height: 1 },
  text: { fontSize: 13, fontWeight: "700" },
});
