import { create } from "zustand";

interface State {
  isRecording: boolean;
  setIsRecording: (isRecording: boolean) => void;
}

export const useGlobalIsRecording = create<State>((set) => ({
  isRecording: false,
  setIsRecording: (isRecording: boolean) => set({ isRecording }),
}));
