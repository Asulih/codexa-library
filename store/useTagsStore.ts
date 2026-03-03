import { create } from "zustand";
import { tags as INITIAL_TAGS, type Tag } from "@/models/tag";

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

type TagsState = {
  tags: Tag[];
  addTag: (name: string) => Tag;
  findByName: (name: string) => Tag | undefined;
};

export const useTagsStore = create<TagsState>((set, get) => ({
  tags: INITIAL_TAGS,

  findByName: (name) => {
    const n = name.trim().toLowerCase();
    if (!n) return undefined;
    return get().tags.find((t) => t.name.trim().toLowerCase() === n);
  },

  addTag: (name) => {
    const cleaned = name.trim();
    if (!cleaned) return get().tags[0];

    const existing = get().findByName(cleaned);
    if (existing) return existing;

    const newTag: Tag = {
      id: `tag#${Date.now()}`,
      name: cleaned,
      slug: slugify(cleaned) || cleaned,
    };

    set((state) => ({ tags: [newTag, ...state.tags] }));
    return newTag;
  },
}));
