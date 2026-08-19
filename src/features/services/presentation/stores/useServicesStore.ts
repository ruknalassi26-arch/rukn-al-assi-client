import { create } from "zustand";

export type ServicesState = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export const useServicesStore = create<ServicesState>((set) => ({
  searchQuery: "",
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
