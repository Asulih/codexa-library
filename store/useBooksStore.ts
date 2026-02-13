import { create } from "zustand";
import type { Book } from "@/models/book";
import { books as MOCK_BOOKS } from "@/models/book";

type BooksState = {
  books: Book[];
  setBooks: (books: Book[]) => void;
};

export const useBooksStore = create<BooksState>((set) => ({
  books: MOCK_BOOKS,
  setBooks: (books) => set({ books }),
}));