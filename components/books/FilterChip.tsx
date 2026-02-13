import React, { memo } from "react";
import { Pressable, StyleSheet, View, Platform } from "react-native";
import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

type Props = {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  active: boolean;
  onPress?: () => void;
};

function FilterChipBase({ label, icon, active, onPress }: Props) {
  const { theme } = useTheme();
  const { t } = useTranslation('books');

  const activeBg =
    theme.mode === "dark" ? "rgba(236,185,57,0.18)" : "rgba(236,185,57,0.22)";

  const idleBg =
    theme.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.65)";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          borderColor: active ? "rgba(236,185,57,0.35)" : theme.borderSoft,
          backgroundColor: active ? activeBg : idleBg,
          shadowColor: theme.shadowColor,
          transform: [{ scale: pressed ? 0.985 : 1 }],
          opacity: pressed ? 0.92 : 1,
        },
        Platform.OS === "android" && {
          elevation: active ? 2 : 1,
        },
      ]}
    >
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons
          name={icon}
          size={14}
          color={active ? theme.primary : theme.muted}
        />
      </View>

      <AppText
        weight="semibold"
        style={{
          fontSize: 13,
          color: active ? theme.text : theme.muted,
          marginLeft: 6,
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
    paddingHorizontal: 12,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    // iOS shadow doux
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
});
