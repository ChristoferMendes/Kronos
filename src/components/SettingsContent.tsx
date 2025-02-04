import React, { useState, useEffect } from "react";
import { AudioControl } from "./AudioControl";
import { ScreenSelector } from "./ScreenSelector";
import { FormatSelector } from "./FormatSelector";
import { Separator } from "@/components/ui/separator";
import { buildVideoStream, buildMicAudioStream } from "@/helpers/video_helpers";
import { useGlobalVideoSources } from "@/store/useGlobalVideoSources";

interface AudioAnalyzer {
  audioContext: AudioContext;
  analyser: AnalyserNode;
  stopAnalyzing: () => void;
}

function createAudioAnalyzer(stream: MediaStream, setRealTimeVolume: (volume: number) => void): AudioAnalyzer {
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  const mediaStreamSource = audioContext.createMediaStreamSource(stream);
  mediaStreamSource.connect(analyser);

  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  
  let isAnalyzing = true;
  
  const updateVolume = () => {
    if (!isAnalyzing) return;
    
    analyser.getByteFrequencyData(dataArray);
    const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
    setRealTimeVolume(Math.round((average / 255) * 100));
    requestAnimationFrame(updateVolume);
  };

  updateVolume();

  return {
    audioContext,
    analyser,
    stopAnalyzing: () => {
      isAnalyzing = false;
    }
  };
}

export function SettingsContent() {
  const [systemVolume, setSystemVolume] = useState(50);
  const [micVolume, setMicVolume] = useState(50);
  const [isSystemMuted, setIsSystemMuted] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState("primary");
  const [format, setFormat] = useState("mp4");
  const [realTimeSystemVolume, setRealTimeSystemVolume] = useState(0);
  const [realTimeMicVolume, setRealTimeMicVolume] = useState(0);
  const { videoSources } = useGlobalVideoSources();

  useEffect(() => {
    if (!videoSources.length) return;

    let systemAnalyzer: AudioAnalyzer | null = null;
    let micAnalyzer: AudioAnalyzer | null = null;

    (async () => {
      const videoStream = await buildVideoStream(videoSources[0].id, {
        fps: 0,
        quality: 0,
        volume: systemVolume,
        type: "screen",
      });

      systemAnalyzer = createAudioAnalyzer(videoStream, setRealTimeSystemVolume);
      
      const micStream = await buildMicAudioStream();
      micAnalyzer = createAudioAnalyzer(micStream, setRealTimeMicVolume);
    })();

    return () => {
      if (systemAnalyzer) {
        systemAnalyzer.stopAnalyzing();
        systemAnalyzer.audioContext.close();
      }
      if (micAnalyzer) {
        micAnalyzer.stopAnalyzing();
        micAnalyzer.audioContext.close();
      }
    };
  }, [videoSources]);

  return (
    <div className="flex w-full justify-center">
      <div className="relative grid w-full grid-cols-2 gap-12">
        <div className="flex flex-col justify-center space-y-8">
          <ScreenSelector selectedScreen={selectedScreen} onScreenSelect={setSelectedScreen} />
          <FormatSelector selectedFormat={format} onFormatSelect={setFormat} />
        </div>
        <Separator orientation="vertical" className="absolute left-1/2 -translate-x-1/2" />
        <div className="flex flex-col justify-center space-y-8">
          <AudioControl
            type="system"
            volume={systemVolume}
            isMuted={isSystemMuted}
            onVolumeChange={setSystemVolume}
            onMuteChange={setIsSystemMuted}
            realTimeVolume={realTimeSystemVolume}
          />
          <AudioControl
            type="microphone"
            volume={micVolume}
            isMuted={isMicMuted}
            onVolumeChange={setMicVolume}
            onMuteChange={setIsMicMuted}
            realTimeVolume={realTimeMicVolume}
          />
        </div>
      </div>
    </div>
  );
}
