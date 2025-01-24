import { useEffect } from "react";
import { useGetRecordingTypes } from "@/hooks/useGetRecordingTypes";
import { useGlobalRecordings } from "@/store/useGlobalRecordings";

export function useGetRecordings() {
  const { recordings, setRecordings } = useGlobalRecordings();
  const { recordingTypes } = useGetRecordingTypes();

  async function getRecordings() {
    const { video } = window;

    const videos = await video.getVideos(recordingTypes);
    setRecordings(videos);
  }

  useEffect(() => {
    if (!recordingTypes.length) return;

    getRecordings();
  }, [recordingTypes]);

  return {
    recordings,
    getRecordings,
  };
}
