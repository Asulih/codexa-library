import { create } from "zustand";

type FiltersState = {
  query: string;
  selectedStatusId: string; // "all" ou status id
  selectedTagId: string; // "all" ou tag id
  selectedSortId: string; // title_asc ou sort id
  selectedDisplayId: string; // cover ou display id

  setQuery: (q: string) => void;
  setSelectedStatusId: (id: string) => void;
  setSelectedTagId: (id: string) => void;
  setSelectedSortId: (id: string) => void;
  setSelectedDisplayId: (id: string) => void;
  resetFilters: () => void;
};

export const useFiltersStore = create<FiltersState>((set) => ({
  query: "",
  selectedStatusId: "all",
  selectedTagId: "all",
  selectedSortId: "title_asc",
  selectedDisplayId: 'cover',

  setQuery: (query) => set({ query }),
  setSelectedStatusId: (selectedStatusId) => set({ selectedStatusId }),
  setSelectedTagId: (selectedTagId) => set({ selectedTagId }),
  setSelectedSortId: (selectedSortId) => set({ selectedSortId }),
  setSelectedDisplayId: (selectedDisplayId) => set({ selectedDisplayId }),

  resetFilters: () =>
    set({
      query: "",
      selectedStatusId: "all",
      selectedTagId: "all",
      selectedSortId: "title_asc",
      selectedDisplayId: 'cover'
    }),
}));
