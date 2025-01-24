import { GetVideosResponse } from "@/lib/types/video.types";
import { create } from "zustand";

interface Store {
  recordings: GetVideosResponse[];
  setRecordings(recordings: GetVideosResponse[]): void;
}

export const useGlobalRecordings = create<Store>(set => ({
  recordings: [],
  setRecordings: (recordings) => set({ recordings }),
}))