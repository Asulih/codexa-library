// store/useFiltersStore.ts
import { create } from "zustand";

type FiltersState = {
  query: string;
  selectedStatusId: string; // "all" ou status id
  selectedTagIds: string[]; // tableau d'ids de tags, vide = "all"
  selectedSortId: string; // title_asc ou sort id
  selectedDisplayId: string; // cover ou display id

  setQuery: (q: string) => void;
  setSelectedStatusId: (id: string) => void;
  addTagId: (id: string) => void; // ajouter un tag
  removeTagId: (id: string) => void; // retirer un tag
  toggleTagId: (id: string) => void; // ajouter/supprimer
  clearTags: () => void; // vider tous les tags
  setSelectedSortId: (id: string) => void;
  setSelectedDisplayId: (id: string) => void;
  resetFilters: () => void;
};

export const useFiltersStore = create<FiltersState>((set, get) => ({
  query: "",
  selectedStatusId: "all",
  selectedTagIds: [], // ← tableau vide = "all"
  selectedSortId: "title_asc",
  selectedDisplayId: 'cover',

  setQuery: (query) => set({ query }),
  setSelectedStatusId: (selectedStatusId) => set({ selectedStatusId }),
  addTagId: (id) => {
    const { selectedTagIds } = get();
    if (!selectedTagIds.includes(id)) {
      set({ selectedTagIds: [...selectedTagIds, id] });
    }
  },
  removeTagId: (id) => {
    const { selectedTagIds } = get();
    set({ selectedTagIds: selectedTagIds.filter((tagId) => tagId !== id) });
  },
  toggleTagId: (id) => {
    const { selectedTagIds } = get();
    if (selectedTagIds.includes(id)) {
      set({ selectedTagIds: selectedTagIds.filter((tagId) => tagId !== id) });
    } else {
      set({ selectedTagIds: [...selectedTagIds, id] });
    }
  },
  clearTags: () => set({ selectedTagIds: [] }),
  setSelectedSortId: (selectedSortId) => set({ selectedSortId }),
  setSelectedDisplayId: (selectedDisplayId) => set({ selectedDisplayId }),

  resetFilters: () =>
    set({
      query: "",
      selectedStatusId: "all",
      selectedTagIds: [], // ← réinitialisé à vide
      selectedSortId: "title_asc",
      selectedDisplayId: 'cover'
    }),
}));