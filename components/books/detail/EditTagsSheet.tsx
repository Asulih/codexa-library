import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Modal, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";
import TagsSelector from "../TagSelector";

type Props = {
  visible: boolean;
  onClose: () => void;
  value: string[];
  onChange: (next: string[]) => void;
};

export default function EditTagsSheet({ visible, onClose, value, onChange }: Props) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const translateY = useRef(new Animated.Value(24)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;

    translateY.setValue(24);
    opacity.setValue(0);

    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 160, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
  }, [visible, opacity, translateY]);

  const sheetPaddingBottom = useMemo(() => insets.bottom + 14, [insets.bottom]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      {/* Backdrop */}
      <Pressable style={[styles.backdrop]} onPress={onClose}>
        <Animated.View style={{ flex: 1, opacity }} />
      </Pressable>

      {/* Sheet */}
      <Animated.View
        style={[
          styles.sheet,
          {
            paddingBottom: sheetPaddingBottom,
            backgroundColor: theme.bg1,
            borderColor: theme.borderSoft,
            shadowColor: theme.shadowColor,
            transform: [{ translateY }],
            opacity,
          },
        ]}
      >
        {/* Header */}
        <View style={styles.sheetHeader}>
          <View style={styles.sheetTitleRow}>
            <MaterialCommunityIcons name="tag-outline" size={18} color={theme.muted} />
            <AppText weight="bold" style={{ color: theme.text, marginLeft: 8, fontSize: 15 }}>
              Tags
            </AppText>
          </View>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={24} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={{ paddingTop: 8 }}>
          <TagsSelector value={value} onChange={onChange} />
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderTopWidth: 1,
    paddingTop: 10,
    shadowOpacity: 0.2,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: -10 },
    elevation: 4,
  },
  sheetHeader: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sheetTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  closeBtn: {
    padding: 4,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
});
