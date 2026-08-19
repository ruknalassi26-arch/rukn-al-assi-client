import { create } from "zustand";

export type HomeState = {
  activeHeroIndex: number;
  setActiveHeroIndex: (index: number) => void;
};

export const useHomeStore = create<HomeState>((set) => ({
  activeHeroIndex: 0,
  setActiveHeroIndex: (index) => set({ activeHeroIndex: index }),
}));
