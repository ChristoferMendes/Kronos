import { buildVideoStream } from "@/helpers/video_helpers";
import { useEffect, useRef } from "react";

export function useVideoRef(defaultVideoId: string | null) {
  const videoRef = useRef<HTMLVideoElement>(null);

  async function setStream(videoId: string) {
    const video = videoRef.current;
    if (!video) return;

    const stream = await buildVideoStream(videoId);
    video.srcObject = stream;
  }

  useEffect(() => {
    if (!defaultVideoId) return;

    setStream(defaultVideoId);
  }, [defaultVideoId]);

  return { videoRef, setStream };
}
