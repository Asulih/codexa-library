import React from "react";
import { Alert, View } from "react-native";
import { useRouter } from "expo-router";

import { Screen } from "@/components/ui";
import BookForm from "@/components/books/BookForm";
import BookFormHeader from "@/components/books/detail/BookFormHeader";
import { useEditBookForm } from "@/hooks/useEditBookForm";
import { useTranslation } from "react-i18next";

export default function EditBookScreen() {
  const { t } = useTranslation(["books", "common"]);
  const router = useRouter();
  const { book, values, setField, isValid, isDirty, submit } = useEditBookForm();

  const canSave = !!values && isValid && isDirty;

  const onBack = () => {
    if (!isDirty) return router.back();
    Alert.alert("Modifications non enregistrées", "Quitter sans enregistrer ?", [
      { text: "Rester", style: "cancel" },
      { text: "Quitter", style: "destructive", onPress: () => router.back() },
    ]);
  };

  const onSave = () => {
    if (!canSave) return;
    submit();
    router.back();
  };

  if (!book || !values) {
    return (
      <Screen>
        <BookFormHeader canSave={false} onBack={() => router.back()} onSave={() => {}} title={t("books:edit", { defaultValue: "Modifier" })} />
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }} />
      </Screen>
    );
  }

  return (
    <Screen>
      <BookFormHeader canSave={canSave} onBack={onBack} onSave={onSave} title={t("books:edit", { defaultValue: "Modifier" })} />
      <BookForm mode="edit" values={values} setField={setField as any} />
    </Screen>
  );
}