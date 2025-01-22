import { buildMicAudioStream, buildVideoStream, mergeAudios } from "@/helpers/video_helpers";
import { useGlobalSelectedVideoSource } from "@/store/useGlobalSelectedVideoSource";
import { useRef, useState } from "react";
import { toast } from "sonner";

export function useRecording() {
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const { selectedVideoSource } = useGlobalSelectedVideoSource();

  async function startRecording() {
    if (isRecording || !selectedVideoSource) return;
    setIsRecording(true);

    const screenStream = await buildVideoStream(selectedVideoSource);
    const micStream = await buildMicAudioStream();

    const combinedStream = mergeAudios(screenStream, micStream);
    const media = new MediaRecorder(combinedStream, { mimeType: "video/webm; codecs=vp9,opus" });
    mediaRecorderRef.current = media;

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
    await window.video.saveFile(arrayBuffer);
    toast.success("Video saved successfully!", {
      duration: 1000,
    });
  }

  return { startRecording, stopRecording, isRecording };
}
