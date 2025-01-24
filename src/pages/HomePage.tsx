import LangToggle from "@/components/LangToggle";
import ToggleTheme from "@/components/ToggleTheme";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { VideoTypeSelector } from "@/components/VideoTypeSelector";
import { VideoSource } from "@/lib/types/video.types";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

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
      // Captura do áudio e vídeo da tela
      const screenStream = await navigator.mediaDevices.getUserMedia(constraints);

      // Captura do áudio do microfone
      const micStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      const audioContext = new AudioContext();

      // Fontes de áudio
      const desktopAudioSource = audioContext.createMediaStreamSource(screenStream);
      const micAudioSource = audioContext.createMediaStreamSource(micStream);

      // Destino de áudio combinado
      const destination = audioContext.createMediaStreamDestination();

      // Conectar fontes de áudio ao destino
      desktopAudioSource.connect(destination);
      micAudioSource.connect(destination);

      // Criar um novo MediaStream para combinar áudio e vídeo
      const combinedStream = new MediaStream();

      // Adicionar faixas de vídeo
      screenStream.getVideoTracks().forEach((track) => combinedStream.addTrack(track));

      // Adicionar faixas de áudio combinadas
      destination.stream.getAudioTracks().forEach((track) => combinedStream.addTrack(track));

      // Atualizar a referência de vídeo no DOM
      const video = videoRef.current;
      if (!video) return;
      video.srcObject = combinedStream;

      const mediaRecorder = new MediaRecorder(combinedStream, { mimeType: "video/webm; codecs=vp9,opus" });
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(1000);

      // Armazenar os dados gravados
      const localChunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => onDataAvailable(e, localChunks);
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

    const blob = new Blob(recordedChunks, {
      type: "video/webm",
    });
    const arrayBuffer = await blob.arrayBuffer();
    await window.video.saveFile(arrayBuffer);
    toast.success("Video saved successfully!");
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
          <Button onClick={isRecording ? stopRecording : startRecording} className={cn("mr-4", isRecording && "bg-red-500")}>
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>
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
