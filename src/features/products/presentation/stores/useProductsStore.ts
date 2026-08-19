import { create } from "zustand";

export type ProductsState = {
  selectedCategory: string | null;
  searchQuery: string;
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
};

export const useProductsStore = create<ProductsState>((set) => ({
  selectedCategory: null,
  searchQuery: "",
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
