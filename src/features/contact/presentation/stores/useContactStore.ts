import { create } from "zustand";

export type ContactState = {
  isSubmitting: boolean;
  isSubmitted: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
};

export const useContactStore = create<ContactState>((set) => ({
  isSubmitting: false,
  isSubmitted: false,
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setIsSubmitted: (isSubmitted) => set({ isSubmitted }),
}));
