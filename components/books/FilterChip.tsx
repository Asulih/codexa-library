import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  active: boolean;
  onPress?: () => void;
};

function FilterChipBase({ label, icon, active, onPress }: Props) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          borderColor: theme.borderSoft,
          backgroundColor: active
            ? theme.mode === "dark"
              ? "rgba(236,185,57,0.2)"
              : "rgba(236,185,57,0.25)"
            : "transparent",
        },
        pressed && { opacity: 0.9 },
      ]}
    >
      <MaterialCommunityIcons name={icon} size={14} color={active ? theme.primary : theme.muted} />
      <AppText
        weight="semibold"
        style={{
          fontSize: 13,
          color: active ? theme.text : theme.muted,
          marginLeft: 5,
        }}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

export const FilterChip = memo(FilterChipBase);

const styles = StyleSheet.create({
  chip: {
    height: 34,
    borderRadius: 999,
    paddingHorizontal: 10,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
