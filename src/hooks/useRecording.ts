import { buildMicAudioStream, buildVideoStream, mergeAudios } from "@/helpers/video_helpers";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useGlobalVideoSettings } from "@/store/useGlobalVideoSettings";
import { useGetRecordingTypes } from "@/hooks/useGetRecordingTypes";
import { useGetRecordings } from "@/hooks/useGetRecordings";

export function useRecording() {
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const { screen, quality, fps, volume, isMuted } = useGlobalVideoSettings();
  const { selectedRecording } = useGetRecordingTypes();
  const { getRecordings } = useGetRecordings();

  async function startRecording() {
    if (isRecording || !screen.id) return;
    setIsRecording(true);

    const screenStream = await buildVideoStream(screen.id, {
      quality,
      fps,
      volume,
    });
    const micStream = await buildMicAudioStream();

    const combinedStream = isMuted ? screenStream : mergeAudios(screenStream, micStream);
    mediaRecorderRef.current = new MediaRecorder(combinedStream, {
      mimeType: "video/webm; codecs=vp9,opus",
      videoBitsPerSecond: quality === 1080 ? 8000000 : quality === 720 ? 5000000 : 2500000,
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
    await window.video.saveFile(arrayBuffer, selectedRecording);
    await getRecordings();
    toast.success("Video saved successfully!", {
      duration: 1000,
      position: "top-center",
    });

  }

  return { startRecording, stopRecording, isRecording };
}
