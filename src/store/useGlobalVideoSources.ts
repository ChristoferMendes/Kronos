import { VideoSource } from "@/lib/types/video.types";
import { create } from "zustand";

interface GlobalVideoSources {
  videoSources: VideoSource[];
  setVideoSources: (videoSources: VideoSource) => void;
}

export const useGlobalVideoSources = create<GlobalVideoSources>((set) => ({
  videoSources: [],
  setVideoSources: (videoSources) => {
    set((state) => {
      const alreadyOnList = state.videoSources.find((source) => source.id === videoSources.id);

      if (alreadyOnList) return { videoSources: state.videoSources };

      return { videoSources: [...state.videoSources, videoSources] };
    });
  },
}));
