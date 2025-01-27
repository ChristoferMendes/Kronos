import { useEffect } from "react";
import { useGetRecordingTypes } from "@/hooks/useGetRecordingTypes";
import { useGlobalRecordings } from "@/store/useGlobalRecordings";
import { useWorkspaces } from "@/hooks/useWorkspaces";

export function useGetRecordings() {
  const { recordings, setRecordings } = useGlobalRecordings();
  const { recordingTypes } = useGetRecordingTypes();
  const { selectedWorkspace } = useWorkspaces()

  async function getRecordings() {
    const { video } = window;

    const videos = await video.getVideos(recordingTypes, selectedWorkspace?.label);
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
