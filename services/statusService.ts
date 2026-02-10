import { Status, statuses } from "@/models/status";

export const statusService = {
  /**
   * Get all status
   */
  getAll: async (): Promise<Status[]> => {
    // TODO: Replace with API call when backend is ready
    // return fetch('/api/status').then(res => res.json());
    return Promise.resolve(statuses.sort((a, b) => a.order - b.order));
  },

  /**
   * Get a single status by ID
   */
  getById: async (id: string): Promise<Status | undefined> => {
    // TODO: Replace with API call when backend is ready
    // return fetch(`/api/status/${id}`).then(res => res.json());
    return Promise.resolve(statuses.find((s) => s.id === id));
  },
}