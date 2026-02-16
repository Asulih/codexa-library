import React, { useMemo } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";
import { statuses, STATUS_ALL_ID } from "@/models/status";
import { withAlpha } from "@/utils/color";

type Props = {
  value: string;
  onChange: (id: string) => void;
};

export default function StatusSelector({ value, onChange }: Props) {
  const { theme } = useTheme();

  const data = useMemo(
    () => statuses.filter((s) => s.id !== STATUS_ALL_ID).sort((a, b) => a.order - b.order),
    []
  );

  return (
    <View style={{ paddingHorizontal: 16, marginTop: 14 }}>
      <AppText weight="semibold" style={{ color: theme.text, marginBottom: 10 }}>
        Status
      </AppText>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(s) => s.id}
        contentContainerStyle={{ gap: 10, paddingRight: 16 }}
        renderItem={({ item }) => {
          const active = item.id === value;
          const bg = active
            ? item.color                       // ✅ plein
            : theme.mode === "dark"
              ? "rgba(255,255,255,0.05)"
              : "rgba(255,255,255,0.65)";

          const textColor = active
            ? (theme.mode === "dark" ? "#14110f" : "#14110f")  // ✅ contraste sur le gold/teintes
            : theme.text;

          const iconColor = active ? "#14110f" : theme.muted;

          return (
            <Pressable
              onPress={() => onChange(item.id)}
              style={({ pressed }) => [
                styles.chip,
                {
                  backgroundColor: bg,
                  borderColor: active ? item.color : theme.borderSoft,
                  opacity: pressed ? 0.92 : 1,
                },
              ]}
            >
              <MaterialCommunityIcons name={item.icon} size={18} color={iconColor} style={{ marginRight: 8 }} />
              <AppText weight="semibold" style={{ color: textColor, fontSize: 13 }}>
                {item.name}
              </AppText>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 40,
    borderRadius: 999,
    paddingHorizontal: 12,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
