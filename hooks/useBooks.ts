import { bookService } from '@/services/bookService';
import { useQuery } from '@tanstack/react-query';

/**
 * Hook to fetch all books
 */
export const useBooks = (userId: string) => {
  return useQuery({
    queryKey: ['userId', userId],
    queryFn: () => bookService.getAll(userId),
    enabled: !!userId,
  });
};

/**
 * Hook to fetch a single book by ID
 */
export const useBook = (id: string) => {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => bookService.getById(id),
    enabled: !!id,
  });
};