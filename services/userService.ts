import { User, users } from "@/models/user";

export const tagsService = {
  /**
   * Get a single user by ID
   */
  getById: async (id: string): Promise<User | undefined> => {
    // TODO: Replace with API call when backend is ready
    // return fetch(`/api/users/${id}`).then(res => res.json());
    return Promise.resolve(users.find((u) => u.id === id));
  },
}