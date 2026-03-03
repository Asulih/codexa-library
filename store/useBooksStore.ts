import { create } from "zustand";
import type { Book } from "@/models/book";
import { books as MOCK_BOOKS } from "@/models/book";

type BooksState = {
  books: Book[];

  setBooks: (books: Book[]) => void;
  addBook: (book: Omit<Book, "id" | "createdAt" | "updatedAt">) => void;
  updateBook: (id: string, updates: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  setBookStatus: (bookId: string, statusId: string) => void;
  toggleBookTag: (bookId: string, tagId: string) => void;
  setBookTags: (bookId: string, tagIds: string[]) => void;
};

export const useBooksStore = create<BooksState>((set, get) => ({
  books: MOCK_BOOKS,

  setBooks: (books) => set({ books }),

  addBook: (bookData) => {
    const now = new Date().toISOString();

    const newBook: Book = {
      ...bookData,
      id: `book#${Date.now()}`, // simple unique id
      createdAt: now,
      updatedAt: now,
    };

    set((state) => ({
      books: [newBook, ...state.books],
    }));
  },

  updateBook: (id, updates) => {
    set((state) => ({
      books: state.books.map((book) =>
        book.id === id
          ? { ...book, ...updates, updatedAt: new Date().toISOString() }
          : book
      ),
    }));
  },

  deleteBook: (id) => {
    set((state) => ({
      books: state.books.filter((book) => book.id !== id),
    }));
  },

  setBookStatus: (bookId, statusId) => {
    set((state) => ({
      books: state.books.map((b) =>
        b.id === bookId ? { ...b, statusId, updatedAt: new Date().toISOString() } : b
      ),
    }));
  },

  toggleBookTag: (bookId, tagId) => {
    set((state) => ({
      books: state.books.map((b) => {
        if (b.id !== bookId) return b;
        const has = b.tagIds.includes(tagId);
        const next = has ? b.tagIds.filter((x) => x !== tagId) : [...b.tagIds, tagId];
        return { ...b, tagIds: next, updatedAt: new Date().toISOString() };
      }),
    }));
  },

  setBookTags: (bookId, tagIds) => {
    set((state) => ({
      books: state.books.map((b) =>
        b.id === bookId ? { ...b, tagIds, updatedAt: new Date().toISOString() } : b
      ),
    }));
  },
}));
