import { create } from "zustand";

export type AboutState = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const useAboutStore = create<AboutState>((set) => ({
  activeTab: "vision",
  setActiveTab: (activeTab) => set({ activeTab }),
}));
