import LangToggle from "@/components/LangToggle";
import ToggleTheme from "@/components/ToggleTheme";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { VideoTypeSelector } from "@/components/VideoTypeSelector";
import { VideoSource } from "@/lib/types/video.types";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const videoTypes = [
  "Daily",
  "Business Refinement",
  "Tech Refinement",
  "Sprint Review",
  "Sprint Retrospective",
  "Sprint Planning",
  "Backlog Retro",
];

export default function HomePage() {
  const { t } = useTranslation();
  const [videoSources, setVideoSources] = useState<VideoSource[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedVideoSource, setSelectedVideoSource] = useState<VideoSource | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  function buildVideoStream(videoId: string) {
    const constraints = {
      audio: {
        mandatory: {
          chromeMediaSource: "desktop",
        },
      },
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: videoId,
        },
      },
    } as MediaStreamConstraints;

    return navigator.mediaDevices.getUserMedia(constraints);
  }

  useEffect(() => {
    (async () => {
      const sources = await getVideoSources();

      const video = videoRef.current;
      if (!video) return;

      const stream = await buildVideoStream(sources[0].id);
      video.srcObject = stream;
    })();
  }, []);

  async function getVideoSources() {
    const inputSources = await window.video.getSources();

    inputSources.forEach((source) => {
      setVideoSources((prev) => [...prev, { id: source.id, name: source.name }]);
    });

    return inputSources;
  }

  async function startRecording() {
    if (isRecording) return;
    setIsRecording(true);
    if (!selectedVideoSource) {
      return;
    }

    const constraints = {
      audio: {
        mandatory: {
          chromeMediaSource: "desktop",
        },
      },
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: selectedVideoSource.id,
        },
      },
    } as MediaStreamConstraints;

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      const video = videoRef.current;
      if (!video) return;

      video.srcObject = stream;

      const media = new MediaRecorder(stream, { mimeType: "video/webm; codecs=vp9,opus" });
      mediaRecorderRef.current = media;

      mediaRecorderRef.current.start(1000);
      const localChunks: Blob[] = [];
      mediaRecorderRef.current.ondataavailable = (e) => onDataAvailable(e, localChunks);
      setRecordedChunks(localChunks);
    } catch (error) {
      console.error("Error capturing media:", error);
    }
  }

  function onDataAvailable(e: BlobEvent, localChunks: Blob[]) {
    localChunks.push(e.data);
  }

  async function stopRecording() {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    if (!videoRef.current) return;
    videoRef.current.srcObject = null;

    const { canceled, filePath } = await window.video.showSaveDialog();
    if (canceled) return;

    if (filePath) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const arrayBuffer = await blob.arrayBuffer();
      await window.video.saveFile(filePath, arrayBuffer);
    }
  }

  async function handleSelectChange(value: string) {
    const source = videoSources.find((source) => source.id === value);
    if (!source) return;
    setSelectedVideoSource(source);
    const video = videoRef.current;
    if (!video) return;

    const stream = await buildVideoStream(value);
    video.srcObject = stream;
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-center">
          <VideoTypeSelector onClick={isRecording ? stopRecording : startRecording} isRecording={isRecording} />
        </div>
        <div className="mt-4 flex justify-center">
          {videoSources.length > 0 && (
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Screen to Record" />
              </SelectTrigger>
              <SelectContent>
                {videoSources.map((source) => (
                  <SelectItem key={source.id} value={source.id}>
                    {source.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <video ref={videoRef} autoPlay playsInline muted className="mx-52 h-72 w-96"></video>
      </div>
    </>
  );
}
