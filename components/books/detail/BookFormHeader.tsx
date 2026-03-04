import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";

type Props = {
  title: string;
  canSave: boolean;
  onBack: () => void;
  onSave: () => void;
};

export default function EditBookHeader({ title, canSave, onBack, onSave }: Props) {
  const { theme } = useTheme();
  const { t } = useTranslation(["books", "common"]);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
      <Pressable onPress={onBack} hitSlop={12} style={styles.headerBtn}>
        <MaterialCommunityIcons name="arrow-left-bold" size={24} color={theme.text} />
      </Pressable>

      <AppText weight="bold" style={{ fontSize: 18, color: theme.text }}>
        {title}
      </AppText>

      <Pressable
        onPress={onSave}
        disabled={!canSave}
        hitSlop={12}
        style={({ pressed }) => [
          styles.saveBtn,
          {
            opacity: !canSave ? 0.45 : pressed ? 0.9 : 1,
            backgroundColor: theme.primary,
            borderColor: theme.borderSoft,
            shadowColor: theme.shadowColor,
          },
        ]}
      >
        <AppText weight="semibold" style={{ color: theme.mode === "dark" ? theme.text : "#1b1613", fontSize: 13 }}>
          {t("common:save", { defaultValue: "Enregistrer" })}
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtn: {
    height: 36,
    borderRadius: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
});