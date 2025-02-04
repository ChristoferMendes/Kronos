import { buildMicAudioStream, buildVideoStream, mergeAudios } from "@/helpers/video_helpers";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useGlobalVideoSettings } from "@/store/useGlobalVideoSettings";
import { useGetRecordingTypes } from "@/hooks/useGetRecordingTypes";
import { useGetRecordings } from "@/hooks/useGetRecordings";
import { useWorkspaces } from "@/hooks/useWorkspaces";
import { useGlobalIsRecording } from "@/store/useGlobalIsRecording";

export function useRecording() {
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const { setIsRecording, isRecording } = useGlobalIsRecording();
  const { screen, quality, fps, volume, isMuted } = useGlobalVideoSettings();
  const { selectedType } = useGetRecordingTypes();
  const { selectedWorkspace } = useWorkspaces();
  const { getRecordings } = useGetRecordings();

  const getBitrate = (quality: number) => {
    if (quality === 1080) return 8000000;
    if (quality === 720) return 5000000;
    return 2500000;
  };

  async function startRecording() {
    if (isRecording || !screen.id) return;
    setIsRecording(true);

    const screenStream = await buildVideoStream(screen.id, {
      quality,
      fps,
      volume,
      type: screen.type,
    });
    const micStream = await buildMicAudioStream();

    const combinedStream = isMuted ? screenStream : mergeAudios(screenStream, micStream);
    mediaRecorderRef.current = new MediaRecorder(combinedStream, {
      mimeType: "video/webm; codecs=vp9,opus",
      videoBitsPerSecond: getBitrate(quality),
    });

    if (!screenStream.getAudioTracks().length) {
      console.error("No audio tracks found.");
      return;
    }

    mediaRecorderRef.current.start(1000);
    const localChunks: Blob[] = [];
    mediaRecorderRef.current.ondataavailable = (e) => onDataAvailable(e, localChunks);
    setRecordedChunks(localChunks);
  }

  function onDataAvailable(e: BlobEvent, localChunks: Blob[]) {
    localChunks.push(e.data);
  }

  async function stopRecording() {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    setIsRecording(false);

    const blob = new Blob(recordedChunks, {
      type: "video/webm",
    });
    const arrayBuffer = await blob.arrayBuffer();
    await window.video.saveFile(arrayBuffer, selectedWorkspace?.label, selectedType?.label);
    await getRecordings();
  }

  function handleStopRecordingToast() {
    toast.promise(stopRecording, {
      loading: "Saving...",
      success: "Video saved successfully!",
      error: "Failed to save video!",
      duration: 1000,
      position: "top-center",
    });
  }

  return { startRecording, stopRecording: handleStopRecordingToast, isRecording };
}
