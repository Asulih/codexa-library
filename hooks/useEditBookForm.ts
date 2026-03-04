import { useMemo, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import type { ImageSourcePropType } from "react-native";

import type { Book } from "@/models/book";
import { useBooksStore } from "@/store/useBooksStore";

type Values = {
  title: string;
  authorsText: string;
  publisher: string;
  pageCountText: string;
  isbn: string;
  ean: string;
  publishedDate: string;
  summary: string;
  cover?: ImageSourcePropType;
};

function authorsToText(authors?: string[]) {
  return (authors ?? []).join(", ");
}

function textToAuthors(text: string): string[] | undefined {
  const parts = text.split(",").map((s) => s.trim()).filter(Boolean);
  return parts.length ? parts : undefined;
}

function optionalInt(text: string): number | undefined {
  const t = text.trim();
  if (!t) return undefined;
  const n = Number(t);
  if (!Number.isFinite(n)) return undefined;
  const i = Math.trunc(n);
  return i >= 0 ? i : undefined;
}

function optionalString(text: string): string | undefined {
  const t = text.trim();
  return t ? t : undefined;
}

function build(book: Book): Values {
  return {
    title: book.title ?? "",
    authorsText: authorsToText(book.authors),
    publisher: book.publisher ?? "",
    pageCountText: book.pageCount ? String(book.pageCount) : "",
    isbn: book.isbn ?? "",
    ean: book.ean ? String(book.ean) : "",
    publishedDate: book.publishedDate ?? "",
    summary: book.summary ?? "",
    cover: book.cover,
  };
}

function equal(a: Values, b: Values) {
  return (
    a.title === b.title &&
    a.authorsText === b.authorsText &&
    a.publisher === b.publisher &&
    a.pageCountText === b.pageCountText &&
    a.isbn === b.isbn &&
    a.ean === b.ean &&
    a.publishedDate === b.publishedDate &&
    a.summary === b.summary &&
    a.cover === b.cover
  );
}

export function useEditBookForm() {
  const params = useLocalSearchParams();
  const bookId = String((params.id ?? params.bookId ?? "") as string);

  const book = useBooksStore((s) => s.books.find((b) => b.id === bookId));
  const updateBook = useBooksStore((s) => s.updateBook);

  const initial = useMemo(() => (book ? build(book) : null), [book]);
  const [values, setValues] = useState<Values | null>(initial);

  if (book && !values) setValues(build(book));

  const isValid = useMemo(() => !!values?.title.trim(), [values]);

  const isDirty = useMemo(() => {
    if (!values || !initial) return false;
    return !equal(values, initial);
  }, [values, initial]);

  const setField = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const submit = () => {
    if (!book || !values) return;

    const patch: Partial<Book> = {
      title: values.title.trim(),
      authors: textToAuthors(values.authorsText),
      publisher: optionalString(values.publisher),
      pageCount: optionalInt(values.pageCountText),
      isbn: optionalString(values.isbn),
      ean: optionalInt(values.ean.replace(/[^\d]/g, "")),
      publishedDate: optionalString(values.publishedDate),
      summary: optionalString(values.summary),
      cover: values.cover,
    };

    updateBook(book.id, patch);
  };

  return { bookId, book, values, setField, isValid, isDirty, submit };
}