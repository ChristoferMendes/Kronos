import { VideoSource } from "@/lib/types/video.types";
import { useState } from "react";

export function useLocalStorageVideoSources() {
  const key = "videoSources";
  const [videoSources, setVideoSources] = useState<VideoSource[]>(() => {
    const sources = localStorage.getItem(key);
    return sources ? JSON.parse(sources) : [];
  });

  function setSource(source: VideoSource) {
    const newSources = [...videoSources, source];
    localStorage.setItem(key, JSON.stringify(newSources));
    setVideoSources(newSources);
  }

  function removeSource(id: string) {
    const newSources = videoSources.filter((source) => source.id !== id);
    localStorage.setItem(key, JSON.stringify(newSources));
    setVideoSources(newSources);
  }

  return { videoSources, setSource, removeSource };
}
