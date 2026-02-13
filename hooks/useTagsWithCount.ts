import { useMemo } from "react";
import type { Book } from "@/models/book";
import { tags, type Tag } from "@/models/tag";

export type TagWithCount = Tag & { count: number };

// OK au top-level: pas un hook, juste une constante.
const tagById = new Map<string, Tag>(tags.map((t) => [t.id, t]));

export function useTagsWithCount(books: Book[]) {
  return useMemo<TagWithCount[]>(() => {
    const counts = new Map<string, number>();

    for (const book of books) {
      for (const tagId of book.tagIds ?? []) {
        counts.set(tagId, (counts.get(tagId) ?? 0) + 1);
      }
    }

    const res: TagWithCount[] = [];
    for (const [tagId, count] of counts.entries()) {
      const tag = tagById.get(tagId);
      if (!tag) continue;
      res.push({ ...tag, count });
    }

    return res.sort((a, b) => b.count - a.count);
  }, [books]);
}
