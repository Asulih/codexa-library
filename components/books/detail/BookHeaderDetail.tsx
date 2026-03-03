import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";

type Props = {
  title?: string;
  onBack: () => void;
  onMenu: () => void;
};

export default function BookHeader({ title, onBack, onMenu }: Props) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <View style={styles.row}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.iconBtn}>
          <MaterialCommunityIcons name="arrow-left" size={22} color={theme.text} />
        </Pressable>

        <Pressable onPress={onMenu} hitSlop={12} style={styles.iconBtn}>
          <MaterialCommunityIcons name="dots-horizontal" size={22} color={theme.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
  },
  row: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between'
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: "center",
  },
});
