import { create } from "zustand";

export type SettingsState = {
  isLoaded: boolean;
  setIsLoaded: (isLoaded: boolean) => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  isLoaded: false,
  setIsLoaded: (isLoaded) => set({ isLoaded }),
}));
