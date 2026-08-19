import { create } from "zustand";

export type ProjectsState = {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
};

export const useProjectsStore = create<ProjectsState>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
}));
