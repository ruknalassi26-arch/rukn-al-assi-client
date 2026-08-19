import { create } from "zustand";

export type CertificatesState = {
  selectedYear: number | null;
  setSelectedYear: (year: number | null) => void;
};

export const useCertificatesStore = create<CertificatesState>((set) => ({
  selectedYear: null,
  setSelectedYear: (selectedYear) => set({ selectedYear }),
}));
