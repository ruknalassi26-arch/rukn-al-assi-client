import { create } from "zustand";

export type RfqState = {
  isSubmitted: boolean;
  setIsSubmitted: (isSubmitted: boolean) => void;
};

export const useRfqStore = create<RfqState>((set) => ({
  isSubmitted: false,
  setIsSubmitted: (isSubmitted) => set({ isSubmitted }),
}));
