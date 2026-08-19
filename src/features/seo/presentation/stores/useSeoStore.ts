import { create } from "zustand";

interface SeoState {
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
}

export const useSeoStore = create<SeoState>((set) => ({
  currentRoute: "/",
  setCurrentRoute: (currentRoute) => set({ currentRoute }),
}));
