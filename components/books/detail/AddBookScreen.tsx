import React from "react";
import { Alert, View } from "react-native";
import { useRouter } from "expo-router";

import { Screen } from "@/components/ui";
import BookForm from "@/components/books/BookForm";
import BookFormHeader from "@/components/books/detail/BookFormHeader";
import { useBookForm } from "@/hooks/useBookForm";
import StatusSelector from "../StatusSelector";
import TagsSelector from "../TagSelector";
import ScanPrefillCard from "../ScanPrefillCard";
import { useTranslation } from "react-i18next";

export default function AddBookScreen() {
  const { t } = useTranslation(["books", "common"]);
  const router = useRouter();
  const { values, setField, isValid, submit, isPrefilled, applyScannedData, undoPrefill } = useBookForm();

  const canSave = !!values && isValid;

  const onSave = () => {
    if (!canSave) return;
    submit();
    router.back();
  };

  if (!values) {
    return (
      <Screen>
        <BookFormHeader canSave={false} onBack={() => router.back()} onSave={() => {}}  title={t("books:add", { defaultValue: "Ajouter" })}/>
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }} />
      </Screen>
    );
  }

  return (
    <Screen>
      <BookFormHeader canSave={canSave} onBack={() => router.back()} onSave={onSave} title={t("books:add", { defaultValue: "Ajouter" })} />
      <BookForm mode="create" values={values} setField={setField as any}
      topSlot={
        <ScanPrefillCard
          onScanPress={() => {
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
          onManualPress={() => {}}
          isPrefilled={isPrefilled}
          onUndoPrefill={undoPrefill}
        />
      }
      middleSlot={<StatusSelector value={values.statusId} onChange={(id) => setField("statusId", id)} />}
      bottomSlot={
        <View style={{ marginTop: 12 }}>
          <TagsSelector value={values.tagIds} onChange={(next) => setField("tagIds", next)} />
        </View>
      } />
    </Screen>
  );
}