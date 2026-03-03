import { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";

import { useBooksStore } from "@/store/useBooksStore";
import { useTagsStore } from "@/store/useTagsStore";
import { statuses } from "@/models/status";

export function useBookDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const books = useBooksStore((s) => s.books);
  const deleteBook = useBooksStore((s) => s.deleteBook);
  const tags = useTagsStore((s) => s.tags);

  const toggleBookTag = useBooksStore((s) => s.toggleBookTag);
  const setBookTags = useBooksStore((s) => s.setBookTags);
  const setBookStatus = useBooksStore((s) => s.setBookStatus);

  const book = useMemo(() => books.find((b) => b.id === id), [books, id]);

  const status = useMemo(() => {
    if (!book) return undefined;
    return statuses.find((s) => s.id === book.statusId);
  }, [book]);

  const bookTags = useMemo(() => {
    if (!book) return [];
    const set = new Set(book.tagIds);
    return tags.filter((t) => set.has(t.id));
  }, [book, tags]);

  return { id, book, status, bookTags, deleteBook, toggleBookTag, setBookTags, setBookStatus };
}
