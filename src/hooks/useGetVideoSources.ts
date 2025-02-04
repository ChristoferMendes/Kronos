import { useGlobalVideoSettings } from "@/store/useGlobalVideoSettings";
import { useGlobalVideoSources } from "@/store/useGlobalVideoSources";
import { useEffect, useState } from "react";

export function useGetVideoSources() {
  const [isLoading, setIsLoading] = useState(false);
  const { setVideoSources, videoSources } = useGlobalVideoSources();
  const { setScreen } = useGlobalVideoSettings();

  async function getVideoSources() {
    setIsLoading(true);
    const inputSources = await window.video.getSources();
    inputSources.forEach((source) => {
      const isScreen = source.id.includes("screen");
      setVideoSources({ id: source.id, name: source.name, type: isScreen ? "screen" : "window" });
    });
    setIsLoading(false);
  }

  useEffect(() => {
    if (videoSources.length) return;
    getVideoSources();
  }, []);

  useEffect(() => {
    if (videoSources.length) {
      setScreen(videoSources[0]);
    }
  }, [videoSources]);

  return { videoSources, isGetVideoSourcesLoading: isLoading };
}
