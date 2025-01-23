import { create } from "zustand";

interface Screen {
  id: string;
  name: string;
}

interface Store {
  screen: Screen;
  fps: number;
  quality: number;
  output: "mp4" | "webm";
  isMuted: boolean;
  volume: number;

  setScreen: (screen: Screen) => void;
  setFps: (fps: number) => void;
  setQuality: (quality: number) => void;
  setOutput: (output: "mp4" | "webm") => void;
  setIsMuted: (isMuted: boolean) => void;
  setVolume: (volume: number) => void;
}

export const useGlobalVideoSettings = create<Store>((set) => ({
  screen: {
    name: "Screen 1",
    id: "",
  },
  fps: 60,
  quality: 1080,
  output: "mp4",
  isMuted: false,
  volume: 100,
  setScreen: (screen) => set({ screen }),
  setFps: (fps: number) => set({ fps }),
  setQuality: (quality: number) => set({ quality }),
  setOutput: (output: "mp4" | "webm") => set({ output }),
  setIsMuted: (isMuted: boolean) => set({ isMuted }),
  setVolume: (volume: number) => set({ volume }),
}));
