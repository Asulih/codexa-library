import React from "react";
import { View } from "react-native";

import AppText from "@/components/ui/AppText";
import { useTheme } from "@/providers/ThemeProvider";
import type { Book } from "@/models/book";
import { formatDate } from "@/utils/formatDate";

function InfoRow({ label, value }: { label: string; value: string }) {
  const { theme } = useTheme();
  return (
    <View style={{ marginBottom: 12 }}>
      <AppText style={{ color: theme.muted, fontSize: 12 }}>{label}</AppText>
      <AppText style={{ color: theme.text, marginTop: 2 }} weight="semibold">
        {value}
      </AppText>
    </View>
  );
}

export default function BookMetaSection({ book, locale }: { book: Book; locale: string }) {
  const { theme } = useTheme();

  const hasAny =
    !!book.publisher || !!book.publishedDate || !!book.pageCount || !!book.ean || !!book.isbn;

  if (!hasAny) return null;

  return (
    <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
      {book.publisher ? <InfoRow label="Éditeur" value={book.publisher} /> : null}
      {book.publishedDate ? (
        <InfoRow label="Publication" value={formatDate(book.publishedDate, { locale })} />
      ) : null}
      {book.pageCount ? <InfoRow label="Pages" value={`${book.pageCount}`} /> : null}
      {book.ean ? <InfoRow label="EAN" value={`${book.ean}`} /> : null}
      {book.isbn ? <InfoRow label="ISBN" value={book.isbn} /> : null}
    </View>
  );
}
