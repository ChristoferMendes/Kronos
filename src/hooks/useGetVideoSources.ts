import { useGlobalSelectedVideoSource } from "@/store/useGlobalSelectedVideoSource";
import { useGlobalVideoSources } from "@/store/useGlobalVideoSources";
import { useEffect, useState } from "react";

export function useGetVideoSources() {
  const [isLoading, setIsLoading] = useState(false);
  const { setSelectedVideoSource } = useGlobalSelectedVideoSource();
  const { setVideoSources, videoSources } = useGlobalVideoSources();

  async function getVideoSources() {
    setIsLoading(true);
    const inputSources = await window.video.getSources();
    inputSources.forEach((source) => {
      const isScreen = source.name.includes("screen");
      setVideoSources({ id: source.id, name: source.name, type: isScreen ? "screen" : "window" });
    });
    setSelectedVideoSource(inputSources[0].id);
    setIsLoading(false);
  }

  useEffect(() => {
    if (videoSources.length) return;
    getVideoSources();
  }, []);

  return { videoSources, isGetVideoSourcesLoading: isLoading };
}
