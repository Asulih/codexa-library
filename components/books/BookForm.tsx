import React from "react";
import { Pressable, ScrollView, StyleSheet, View, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import { Screen, Divider } from "@/components/ui";
import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";

import CoverPicker from "@/components/books/CoverPicker";
import StatusSelector from "@/components/books/StatusSelector";
import BookFormField from "@/components/books/BookFormField";
import { useBookForm } from "@/hooks/useBookForm";
import ScanPrefillCard from "./ScanPrefillCard";

export default function AddBookModal() {
  const { theme } = useTheme();
  const { t } = useTranslation(["books", "common"]);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { values, setField, isValid, submit, isPrefilled, applyScannedData, undoPrefill } = useBookForm();

  function onSave() {
    if (!isValid) return;
    submit();
    router.dismiss();
  }

  return (
    <Screen>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.headerBtn}>
          <MaterialCommunityIcons name="arrow-left-bold" size={24} color={theme.text} />
        </Pressable>

        <AppText weight="bold" style={{ fontSize: 18, color: theme.text }}>
          {t("books:add")}
        </AppText>

        <Pressable
          onPress={onSave}
          disabled={!isValid}
          hitSlop={12}
          style={({ pressed }) => [
            styles.saveBtn,
            {
              opacity: !isValid ? 0.45 : pressed ? 0.9 : 1,
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

      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 28 }}
      >
        <ScanPrefillCard
          onScanPress={() => {
            // TODO: brancher vrai scan plus tard
            // Pour l’instant on simule un préfill (tu peux retirer ce mock quand tu branches l’API)
            applyScannedData({
              title: "Dune",
              authors: ["Frank Herbert"],
              publisher: "Robert Laffont",
              pageCount: 614,
              ean: "9782221127483",
              publishedDate: "2020-09-24",
              summary: "Pré-rempli via scan (mock).",
              coverUri: undefined,
            });
          }}
          onManualPress={() => {
            // Optionnel: juste scroll vers les champs, ou ne rien faire
          }}
          isPrefilled={isPrefilled}
          onUndoPrefill={undoPrefill}
        />
        {/* Cover */}
        <CoverPicker value={values.cover} onChange={(c) => setField("cover", c)} />

        {/* Infos */}
        <View style={{ paddingHorizontal: 16, marginTop: 18 }}>
          <Divider label="Informations" />
        </View>

        <View style={{ paddingHorizontal: 16, marginTop: 12, gap: 12 }}>
          <BookFormField
            label="Titre"
            required
            value={values.title}
            onChangeText={(v) => setField("title", v)}
            placeholder="Ex: Dune"
          />

          <BookFormField
            label="Auteurs"
            value={values.authorsText}
            onChangeText={(v) => setField("authorsText", v)}
            placeholder="Ex: Frank Herbert"
            hint="Sépare plusieurs auteurs par des virgules."
          />

          <BookFormField
            label="Éditeur"
            value={values.publisher}
            onChangeText={(v) => setField("publisher", v)}
            placeholder="Ex: Robert Laffont"
          />

          <BookFormField
            label="Nombre de pages"
            value={values.pageCountText}
            placeholder="Ex: 614"
            keyboardType="number-pad"
            inputMode="numeric"
            maxLength={5}
            onChangeText={(v) => setField("pageCountText", v.replace(/[^\d]/g, ""))} // ✅ digits only
          />
        </View>

        {/* Status */}
        <StatusSelector value={values.statusId} onChange={(id) => setField("statusId", id)} />

        {/* Identifiants */}
        <View style={{ paddingHorizontal: 16, marginTop: 18 }}>
          <Divider label="Identifiants" />
        </View>

        <View style={{ paddingHorizontal: 16, marginTop: 12, gap: 12 }}>
          <BookFormField
            label="ISBN"
            value={values.isbn}
            onChangeText={(v) => setField("isbn", v)}
            placeholder="Ex: 207036822X"
            autoCapitalize="characters"
            actionLabel="Scanner"
            actionIcon="barcode-scan"
            onActionPress={() => Alert.alert("Bientôt", "Le scan ISBN/EAN arrive bientôt 🙂")}
          />

          <BookFormField
            label="EAN"
            value={values.ean}
            onChangeText={(v) => setField("ean", v.replace(/[^\d]/g, ""))}
            placeholder="Ex: 9782221127483"
            keyboardType="number-pad"
            inputMode="numeric"
            maxLength={13}
            hint="EAN = 13 chiffres"
          />

          <BookFormField
            label="Date de publication"
            value={values.publishedDate}
            onChangeText={(v) => setField("publishedDate", v)}
            placeholder="YYYY-MM-DD"
            hint="Format conseillé : 2024-08-29"
          />
        </View>

        {/* Description */}
        <View style={{ paddingHorizontal: 16, marginTop: 18 }}>
          <Divider label="Description" />
        </View>

        <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
          <BookFormField
            label="Résumé"
            value={values.summary}
            onChangeText={(v) => setField("summary", v)}
            placeholder="Optionnel"
            multiline
          />
        </View>

        {/* Tags plus tard */}
        <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
          <AppText style={{ color: theme.chipMuted, fontSize: 12, marginTop: 4 }}>
            Prochaine étape : Tags (autocomplete premium).
          </AppText>
        </View>
      </ScrollView>
    </Screen>
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
