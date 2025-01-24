import { useEffect, useState } from "react";
import { useGetRecordingTypes } from "@/hooks/useGetRecordingTypes";
import { GetVideosResponse } from "@/lib/types/video.types";

export function useGetRecordings() {
  const [recordings, setRecordings] = useState<GetVideosResponse[]>([]);
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
