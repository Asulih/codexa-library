import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";

type Props = {
  onScanPress: () => void;
  onManualPress?: () => void;

  // état optionnel si préfill actif
  isPrefilled?: boolean;
  onUndoPrefill?: () => void;
};

export default function ScanPrefillCard({
  onScanPress,
  onManualPress,
  isPrefilled,
  onUndoPrefill,
}: Props) {
  const { theme } = useTheme();

  return (
    <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.surfaceB,
            borderColor: theme.borderSoft,
            shadowColor: theme.shadowColor,
          },
        ]}
      >
        <View style={styles.row}>
          <View
            style={[
              styles.iconWrap,
              { backgroundColor: theme.mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.7)" },
            ]}
          >
            <MaterialCommunityIcons name="barcode-scan" size={22} color={theme.primary} />
          </View>

          <View style={{ flex: 1 }}>
            <AppText weight="bold" style={{ color: theme.text, fontSize: 15 }}>
              Scanner pour remplir automatiquement
            </AppText>
            <AppText style={{ color: theme.chipMuted, marginTop: 4, fontSize: 12.5 }}>
              ISBN / EAN – plus rapide
            </AppText>
          </View>

          <Pressable
            onPress={onScanPress}
            hitSlop={10}
            style={({ pressed }) => [
              styles.cta,
              {
                backgroundColor: theme.primary,
                borderColor: theme.borderSoft,
                opacity: pressed ? 0.9 : 1,
              },
            ]}
          >
            <AppText weight="semibold" style={{ color: "#14110f", fontSize: 12.5 }}>
              Scanner
            </AppText>
          </Pressable>
        </View>

        {/* Lien discret */}
        {onManualPress ? (
          <Pressable onPress={onManualPress} hitSlop={10} style={{ marginTop: 10, alignSelf: "flex-start" }}>
            <AppText style={{ color: theme.muted, fontSize: 12.5, textDecorationLine: "underline" }}>
              Saisie manuelle
            </AppText>
          </Pressable>
        ) : null}

        {/* Badge préfill + undo */}
        {isPrefilled ? (
          <View style={[styles.badgeRow, { borderColor: theme.borderSoft }]}>
            <View style={styles.badgeLeft}>
              <MaterialCommunityIcons name="auto-fix" size={16} color={theme.primary} />
              <AppText style={{ color: theme.text, fontSize: 12.5, marginLeft: 8 }} weight="semibold">
                Données récupérées — vérifier
              </AppText>
            </View>

            {onUndoPrefill ? (
              <Pressable onPress={onUndoPrefill} hitSlop={10} style={{ paddingHorizontal: 6, paddingVertical: 6 }}>
                <AppText style={{ color: theme.primary, fontSize: 12.5 }} weight="semibold">
                  Annuler
                </AppText>
              </Pressable>
            ) : null}
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 14,
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  cta: {
    height: 34,
    borderRadius: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeRow: {
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badgeLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 10,
  },
});
