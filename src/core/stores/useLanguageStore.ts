import { create } from "zustand";
import { AppLocale } from "@core/types/i18n";

export type LanguageState = {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
};

export const useLanguageStore = create<LanguageState>((set) => ({
  locale: "ar",
  setLocale: (locale) => set({ locale }),
}));
