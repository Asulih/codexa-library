import { Book, books } from "@/models/book";

export const bookService = {
  /**
   * Get all books for user
   */
  getAll: async (userId: string): Promise<Book[]> => {
    // TODO: Replace with API call when backend is ready
    // return fetch('/api/books').then(res => res.json());
    return Promise.resolve(books);
  },

  /**
   * Get a single book by ID
   */
  getById: async (id: string): Promise<Book | undefined> => {
    // TODO: Replace with API call when backend is ready
    // return fetch(`/api/books/${id}`).then(res => res.json());
    return Promise.resolve(books.find((b) => b.id === id));
  },

  /**
   * Search books by query
   */
  search: async (query: string): Promise<Book[]> => {
    // TODO: Replace with API call when backend is ready
    // return fetch(`/api/books/search?q=${query}`).then(res => res.json());
    const lowerQuery = query.toLowerCase();
    return Promise.resolve(
      books.filter(
        (b) =>
          b.title.toLowerCase().includes(lowerQuery) ||
          b?.isbn?.toString().includes(lowerQuery) ||
          b?.publisher?.toLowerCase().includes(lowerQuery) ||
          b?.summary?.toLowerCase().includes(lowerQuery) ||
          b?.authors?.some((c) => c.toLowerCase().includes(lowerQuery))
      )
    );
  },

  /**
   * Filter books by author
   */
  filterByAuthor: async (author: string): Promise<Book[]> => {
    // TODO: Replace with API call when backend is ready
    // return fetch(`/api/book?author=${author}`).then(res => res.json());
    return Promise.resolve(books.filter((b) => b?.authors?.includes(author)));
  },

  /**
   * Filter books by tag
   */
  filterByTag: async (tag: string): Promise<Book[]> => {
    // TODO: Replace with API call when backend is ready
    // return fetch(`/api/book?tag=${tag}`).then(res => res.json());
    return Promise.resolve(books.filter((b) => {
      const tagFound = b.tags.filter((t) => t.name === tag);
      return tagFound.length > 0;
    }));
  },
};