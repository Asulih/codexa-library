import React from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Divider } from "@/components/ui";
import CoverPicker from "@/components/books/CoverPicker";
import BookFormField from "@/components/books/BookFormField";

export type BookFormMode = "create" | "edit" | "read";

export type BookFormBodyValues = {
  title: string;
  authorsText: string;
  publisher: string;
  pageCountText: string;

  isbn: string;
  ean: string;
  publishedDate: string;

  summary: string;
  cover?: any;
};

type Props = {
  mode: BookFormMode;
  values: BookFormBodyValues;
  setField: <K extends keyof BookFormBodyValues>(key: K, value: BookFormBodyValues[K]) => void;

  topSlot?: React.ReactNode;    // ScanPrefillCard
  middleSlot?: React.ReactNode; // StatusSelector
  bottomSlot?: React.ReactNode; // TagsSelector
};

export default function BookFormBody({ mode, values, setField, topSlot, middleSlot, bottomSlot }: Props) {
  const insets = useSafeAreaInsets();
  const editable = mode !== "read";

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom + 28 }}
    >
      {topSlot}

      <CoverPicker value={values.cover} onChange={(c) => setField("cover", c)} />

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
          editable={editable}
        />

        <BookFormField
          label="Auteurs"
          value={values.authorsText}
          onChangeText={(v) => setField("authorsText", v)}
          placeholder="Ex: Frank Herbert"
          hint="Sépare plusieurs auteurs par des virgules."
          editable={editable}
        />

        <BookFormField
          label="Éditeur"
          value={values.publisher}
          onChangeText={(v) => setField("publisher", v)}
          placeholder="Ex: Robert Laffont"
          editable={editable}
        />

        <BookFormField
          label="Nombre de pages"
          value={values.pageCountText}
          placeholder="Ex: 614"
          keyboardType="number-pad"
          inputMode="numeric"
          maxLength={5}
          editable={editable}
          onChangeText={(v) => setField("pageCountText", v.replace(/[^\d]/g, ""))}
        />
      </View>

      {middleSlot}

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
          editable={editable}
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
          editable={editable}
        />

        <BookFormField
          label="Date de publication"
          value={values.publishedDate}
          onChangeText={(v) => setField("publishedDate", v)}
          placeholder="YYYY-MM-DD"
          hint="Format conseillé : 2024-08-29"
          editable={editable}
        />
      </View>

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
          editable={editable}
        />
      </View>

      {bottomSlot}
    </ScrollView>
  );
}