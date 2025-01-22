import { create } from "zustand";

interface Store {
  isConfigOpen: boolean;
  setIsConfigOpen: (isConfigOpen: boolean) => void;
}

export const useGlobalIsConfigOpen = create<Store>(set => ({
  isConfigOpen: false,
  setIsConfigOpen: (isConfigOpen: boolean) => set({isConfigOpen}),
}))