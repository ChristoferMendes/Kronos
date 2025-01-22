import { create } from "zustand";

interface GlobalSelectedVideoSource {
  selectedVideoSource: string | null;
  setSelectedVideoSource: (videoSource: string) => void;
}

export const useGlobalSelectedVideoSource = create<GlobalSelectedVideoSource>((set) => ({
  selectedVideoSource: null,
  setSelectedVideoSource: (videoSource: string) => set({ selectedVideoSource: videoSource }),
}));
