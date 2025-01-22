import React from "react";
import { Button } from "./ui/button";
import { CirclePauseIcon, PlayIcon, StopCircleIcon, VideotapeIcon } from "lucide-react";
import { useRecording } from "@/hooks/useRecording";
import { useGlobalSelectedVideoSource } from "@/store/useGlobalSelectedVideoSource";

export function RecordingControl() {
  const { selectedVideoSource } = useGlobalSelectedVideoSource();
  const { startRecording, stopRecording, isRecording } = useRecording();

  return (
    <Button
      variant={isRecording ? "destructive" : "default"}
      className="w-full justify-start gap-2"
      disabled={!selectedVideoSource}
      onClick={isRecording ? stopRecording : startRecording}
    >
      {isRecording ? <CirclePauseIcon className="animate-pulse" /> : <PlayIcon />}
      Start Recording
    </Button>
  );
}
