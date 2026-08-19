import { create } from "zustand";

export type GalleryState = {
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
};

export const useGalleryStore = create<GalleryState>((set) => ({
  activeCategory: null,
  setActiveCategory: (activeCategory) => set({ activeCategory }),
}));
