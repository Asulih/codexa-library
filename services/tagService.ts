import { Tag, tags } from "@/models/tag";

export const tagsService = {
  /**
   * Get all tags
   */
  getAll: async (): Promise<Tag[]> => {
    // TODO: Replace with API call when backend is ready
    // return fetch('/api/tags').then(res => res.json());
    return Promise.resolve(tags);
  },

  /**
   * Get a single tag by ID
   */
  getById: async (id: string): Promise<Tag | undefined> => {
    // TODO: Replace with API call when backend is ready
    // return fetch(`/api/tags/${id}`).then(res => res.json());
    return Promise.resolve(tags.find((t) => t.id === id));
  },
}