import { create } from "zustand";

type FiltersState = {
  query: string;
  selectedStatusId: string; // "all" ou status id
  selectedTagId: string; // "all" ou tag id

  setQuery: (q: string) => void;
  setSelectedStatusId: (id: string) => void;
  setSelectedTagId: (id: string) => void;
  resetFilters: () => void;
};

export const useFiltersStore = create<FiltersState>((set) => ({
  query: "",
  selectedStatusId: "all",
  selectedTagId: "all",

  setQuery: (query) => set({ query }),
  setSelectedStatusId: (selectedStatusId) => set({ selectedStatusId }),
  setSelectedTagId: (selectedTagId) => set({ selectedTagId }),

  resetFilters: () =>
    set({ query: "", selectedStatusId: "all", selectedTagId: "all" }),
}));
