import React, { useState } from "react"
import { Volume2, VolumeX, Mic, MicOff } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { DecibelMeter } from "./DecibelMeter"
import { cn } from "@/lib/utils"

interface AudioControlProps {
  type: "system" | "microphone"
  volume: number
  isMuted: boolean
  onVolumeChange: (value: number) => void
  onMuteChange: (checked: boolean) => void
  realTimeVolume: number
}

export function AudioControl({
  type,
  volume,
  isMuted,
  onVolumeChange,
  onMuteChange,
  realTimeVolume,
}: Readonly<AudioControlProps>) {
  const [isDragging, setIsDragging] = useState(false);

  function getIcon() {
    const hasAudio = volume > 0 && !isMuted;
    if (type === "system") {
      return hasAudio ? Volume2 : VolumeX;
    }

    return hasAudio ? Mic : MicOff;
  }

  const Icon = getIcon();
  const label = type === "system" ? "System Sound" : "Microphone";

  function handleVolumeChange(value: number) {
    setIsDragging(true);
    if (isMuted) {
      onMuteChange(false);
    }

    onVolumeChange(value);
    setIsDragging(false);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon className="h-4 w-4" />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <Switch checked={!isMuted} onCheckedChange={(checked) => onMuteChange(!checked)} />
      </div>
      <Slider
        value={[isMuted ? 0 : volume]}
        max={100}
        step={1}
        className={cn({
          'cursor-grab': !isDragging,
          'cursor-grabbing': isDragging,
        })}
        onValueChange={(value) => handleVolumeChange(value[0])}
      />
      <DecibelMeter volume={realTimeVolume} isMuted={isMuted} />
    </div>
  )
} 