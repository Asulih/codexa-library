import React from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import { Screen } from "@/components/ui";
import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";
import { useBookDetail } from "@/hooks/useBookDetail";
import BookHero from "@/components/books/detail/BookHero";
import BookTitleBlock from "@/components/books/detail/BookTitleBlock";
import BookTagsChips from "@/components/books/detail/BookTagChips";
import BookMetaSection from "@/components/books/detail/BookMetaSection";
import BookActions from "@/components/books/detail/BookActions";
import BookDetailHeader from "./BookHeaderDetail";

export default function BookDetailScreen() {
  const { theme } = useTheme();
  const { i18n } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { book, status, bookTags, deleteBook } = useBookDetail();

  if (!book) {
    return (
      <Screen>
        <View style={{ padding: 20 }}>
          <AppText style={{ color: theme.text }}>Livre introuvable.</AppText>
        </View>
      </Screen>
    );
  }

  const onDelete = () => {
    Alert.alert("Supprimer", "Voulez-vous supprimer ce livre ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          deleteBook(book.id);
          router.back();
        },
      },
    ]);
  };

  const onEdit = () => {
    // Ajuste la route quand tu feras l'édition
    router.push(`/books/edit/${book.id}`);
  };

  return (
    <Screen>
      <BookDetailHeader
        title={book.title}
        onBack={() => router.back()}
        onMenu={() => {
          Alert.alert(book.title, "Que veux-tu faire ?", [
            { text: "Annuler", style: "cancel" },
            { text: "Modifier", onPress: onEdit },
            { text: "Supprimer", style: "destructive", onPress: onDelete },
          ]);
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 32, paddingTop: 12 }}
      >
        <BookHero cover={book.cover} status={status} />

        <BookTitleBlock title={book.title} authors={book.authors} />

        <BookTagsChips tags={bookTags} />

        <BookMetaSection book={book} locale={i18n.language} />

        {book.summary ? (
          <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
            <AppText weight="bold" style={{ fontSize: 16, color: theme.text }}>
              Résumé
            </AppText>
            <AppText style={{ marginTop: 10, lineHeight: 22, color: theme.text }}>
              {book.summary}
            </AppText>
          </View>
        ) : null}

        <BookActions onEdit={onEdit} onDelete={onDelete} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({});
