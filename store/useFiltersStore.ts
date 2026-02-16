// store/useFiltersStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STATUS_ALL_ID } from "@/models/status";

export type DisplayMode = "cover" | "list";

type FiltersState = {
  query: string;
  selectedStatusId: string;
  selectedTagIds: string[];
  selectedSortId: string;
  selectedDisplayId: DisplayMode;

  setQuery: (q: string) => void;
  setSelectedStatusId: (id: string) => void;
  addTagId: (id: string) => void;
  removeTagId: (id: string) => void;
  toggleTagId: (id: string) => void;
  clearTags: () => void;
  setSelectedSortId: (id: string) => void;
  setDisplayMode: (mode: DisplayMode) => void;
  resetFilters: () => void;
};

export const useFiltersStore = create<FiltersState>()(
  persist(
    (set, get) => ({
      query: "",
      selectedStatusId: STATUS_ALL_ID,
      selectedTagIds: [],
      selectedSortId: "title_asc",
      selectedDisplayId: "cover",

      setQuery: (query) => set({ query }),
      setSelectedStatusId: (selectedStatusId) => set({ selectedStatusId }),
      addTagId: (id) => {
        const { selectedTagIds } = get();
        if (!selectedTagIds.includes(id)) set({ selectedTagIds: [...selectedTagIds, id] });
      },
      removeTagId: (id) => {
        const { selectedTagIds } = get();
        set({ selectedTagIds: selectedTagIds.filter((tagId) => tagId !== id) });
      },
      toggleTagId: (id) => {
        const { selectedTagIds } = get();
        set({
          selectedTagIds: selectedTagIds.includes(id)
            ? selectedTagIds.filter((tagId) => tagId !== id)
            : [...selectedTagIds, id],
        });
      },
      clearTags: () => set({ selectedTagIds: [] }),
      setSelectedSortId: (selectedSortId) => set({ selectedSortId }),
      setDisplayMode: (mode) => set({ selectedDisplayId: mode }),

      resetFilters: () =>
        set((s) => ({
          query: "",
          selectedStatusId: STATUS_ALL_ID,
          selectedTagIds: [],
          selectedSortId: "title_asc",
          selectedDisplayId: "cover",
        })),
    }),
    {
      name: "codexa.filters",
      storage: createJSONStorage(() => AsyncStorage),

      // ✅ on persiste seulement les préférences (et pas la recherche/tags si tu veux)
      partialize: (state) => ({
        selectedDisplayId: state.selectedDisplayId,
        selectedSortId: state.selectedSortId,
      }),

      version: 1,
    }
  )
);
