import React from "react";
import { Pressable, StyleSheet, Platform, View } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import AppText from "./ui/AppText";
import { useTranslation } from "react-i18next";

export default function AddBookFab({ onPress }: { onPress?: () => void }) {
  const { theme } = useTheme();
  const { t } = useTranslation('books');

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          borderColor: theme.borderSoft,
          backgroundColor: theme.primary,
          shadowColor: theme.shadowColor,
          opacity: pressed ? 0.92 : 1,
        },
        Platform.OS === "android" && {
          elevation: 1,
        },
      ]}
    >
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons
          name="plus"
          size={22}
          color={theme.text}
        />
      </View>

      <AppText
        weight="semibold"
        style={{
          fontSize: 13,
          color: theme.text,
          marginLeft: 6,
        }}
      >
        {t('books:add')}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    position: "absolute",
    right: 18,
    bottom: 18,
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
