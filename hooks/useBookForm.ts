import { useMemo, useRef, useState } from "react";
import type { ImageSourcePropType } from "react-native";

import { useBooksStore } from "@/store/useBooksStore";
import { STATUS_IDS } from "@/models/status";
import { Book } from "@/models/book";

export type NewBook = Omit<Book, "id" | "createdAt" | "updatedAt">;

export type BookFormValues = {
  title: string;

  authorsText: string;
  publisher: string;

  pageCountText: string;

  isbn: string;
  ean: string;
  publishedDate: string;

  summary: string;

  cover?: ImageSourcePropType;

  statusId: string;
  tagIds: string[];
};

type ScannedBookData = {
  title?: string;
  authors?: string[]; // déjà parsé
  publisher?: string;
  pageCount?: number;
  isbn?: string;
  ean?: string;
  publishedDate?: string; // YYYY-MM-DD si possible
  summary?: string;
  coverUri?: string;
};

const initialValues: BookFormValues = {
  title: "",
  authorsText: "",
  publisher: "",
  pageCountText: "",
  isbn: "",
  ean: "",
  publishedDate: "",
  summary: "",
  cover: undefined,
  statusId: STATUS_IDS.READ, // ✅ LU
  tagIds: [],
};

export function useBookForm() {
  const addBook = useBooksStore((s) => s.addBook);

  const [values, setValues] = useState<BookFormValues>(initialValues);

  // ✅ état préfill
  const [isPrefilled, setIsPrefilled] = useState(false);
  const snapshotBeforePrefill = useRef<BookFormValues | null>(null);

  const setField = <K extends keyof BookFormValues>(key: K, value: BookFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const isValid = useMemo(() => values.title.trim().length > 0, [values.title]);

  // ✅ Appliquer des données scannées au form
  const applyScannedData = (data: ScannedBookData) => {
    // on snapshot une seule fois (si on re-scan on remplace le snapshot par l’état actuel)
    snapshotBeforePrefill.current = values;
    setIsPrefilled(true);

    setValues((prev) => ({
      ...prev,
      title: data.title ?? prev.title,
      authorsText: data.authors?.join(", ") ?? prev.authorsText,
      publisher: data.publisher ?? prev.publisher,
      pageCountText: data.pageCount != null ? String(data.pageCount) : prev.pageCountText,
      isbn: data.isbn ?? prev.isbn,
      ean: data.ean ?? prev.ean,
      publishedDate: data.publishedDate ?? prev.publishedDate,
      summary: data.summary ?? prev.summary,
      cover: data.coverUri ? ({ uri: data.coverUri } as ImageSourcePropType) : prev.cover,
    }));
  };

  const undoPrefill = () => {
    const snap = snapshotBeforePrefill.current;
    if (!snap) return;
    setValues(snap);
    snapshotBeforePrefill.current = null;
    setIsPrefilled(false);
  };

  const payload = useMemo(() => {
    const authorsArr = values.authorsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const pageCountNum = values.pageCountText ? Number(values.pageCountText) : undefined;
    const eanNum = values.ean ? Number(values.ean) : undefined;

    const res: NewBook = {
      title: values.title.trim(),
      authors: authorsArr.length ? authorsArr : undefined,
      publisher: values.publisher.trim() || undefined,
      pageCount: Number.isFinite(pageCountNum) ? pageCountNum : undefined,

      isbn: values.isbn.trim() || undefined,
      ean: Number.isFinite(eanNum) ? eanNum : undefined,
      publishedDate: values.publishedDate.trim() || undefined,

      summary: values.summary.trim() || undefined,
      cover: values.cover,

      tagIds: values.tagIds,
      statusId: values.statusId,
      userId: "user#1",
    };

    return res;
  }, [values]);

  const submit = () => {
    if (!isValid) return;
    addBook(payload);
  };

  return { values, setField, isValid, submit, isPrefilled, applyScannedData, undoPrefill };
}
