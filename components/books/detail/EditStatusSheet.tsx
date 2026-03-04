import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Modal, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";
import { statuses, STATUS_ALL_ID } from "@/models/status";
import { FilterChip } from "../FilterChip";
import { useTranslation } from "react-i18next";

/**
 * ✅ Si tu as déjà un composant Chip global, remplace le rendu dans StatusChip ci-dessous
 * par ton composant (FilterChip / StatusChip / etc.)
 */

type Props = {
  visible: boolean;
  onClose: () => void;
  value: string; // current statusId
  onChange: (nextStatusId: string) => void;
};

export default function EditStatusSheet({ visible, onClose, value, onChange }: Props) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const translateY = useRef(new Animated.Value(24)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const items = useMemo(
    () => statuses.filter((s) => s.id !== STATUS_ALL_ID).sort((a, b) => a.order - b.order),
    []
  );

  useEffect(() => {
    if (!visible) return;
    translateY.setValue(24);
    opacity.setValue(0);

    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 160, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
  }, [visible, opacity, translateY]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Animated.View style={{ flex: 1, opacity }} />
      </Pressable>

      {/* Sheet */}
      <Animated.View
        style={[
          styles.sheet,
          {
            paddingBottom: insets.bottom + 14,
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
            <MaterialCommunityIcons name="bookmark-check-outline" size={18} color={theme.muted} />
            <AppText weight="bold" style={{ color: theme.text, marginLeft: 8, fontSize: 15 }}>
              Choisir un statut
            </AppText>
          </View>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={24} />
          </TouchableOpacity>
        </View>

        {/* Chips */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 6, paddingBottom: 10 }}
        >
          <View style={styles.wrap}>
            {items.map((s) => (
              <FilterChip
                key={s.id}
                label={t(`books:status.${s.id}`, { defaultValue: s.name })}
                icon={(s as any).icon}
                active={s.id === value}
                onPress={() => {
                  onChange(s.id);
                  onClose();
                }}
              />
            ))}
          </View>
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.35)" },
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
    maxHeight: "70%",
  },
  sheetHeader: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sheetTitleRow: { flexDirection: "row", alignItems: "center" },
  closeBtn: {
    padding: 4,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },

  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    height: 36,
    borderRadius: 999,
    paddingHorizontal: 12,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
