import { create } from "zustand";

export type ClientsState = {
  selectedSector: string | null;
  setSelectedSector: (sector: string | null) => void;
};

export const useClientsStore = create<ClientsState>((set) => ({
  selectedSector: null,
  setSelectedSector: (selectedSector) => set({ selectedSector }),
}));
