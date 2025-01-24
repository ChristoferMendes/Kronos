import { useGlobalVideoSettings } from "@/store/useGlobalVideoSettings";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import React from "react";
import { useGlobalVideoSources } from "@/store/useGlobalVideoSources";
import { HeadphoneOffIcon, HeadphonesIcon, Mic, MicOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

export function Settings() {
  const { setScreen, isMuted, setIsMuted, volume, setVolume, setFps, setQuality, fps, quality } = useGlobalVideoSettings();
  const { videoSources } = useGlobalVideoSources();

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Select Screen</Label>
        <Select
          onValueChange={(value) => {
            const screen = videoSources.find((video) => video.id === value);
            if (!screen) return;
            setScreen(screen);
          }}
          defaultValue={videoSources[0]?.id}
        >
          <SelectTrigger>
            <SelectValue placeholder={videoSources[0]?.name} />
          </SelectTrigger>
          <SelectContent>
            {videoSources?.map((video) => (
              <SelectItem key={video.id} value={video.id}>
                {video.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Quality</Label>
        <Select onValueChange={(value) => setQuality(Number(value))} value={quality.toString()}>
          <SelectTrigger>
            <SelectValue placeholder="1080p" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"1080"}>1080p</SelectItem>
            <SelectItem value={"720"}>720p</SelectItem>
            <SelectItem value={"480"}>480p</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>FPS</Label>
        <Select onValueChange={(value) => setFps(Number(value))} value={fps.toString()}>
          <SelectTrigger>
            <SelectValue placeholder="60 FPS" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="60">60 FPS</SelectItem>
            <SelectItem value="30">30 FPS</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Output Format</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="WebM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="webm" className={"cursor-pointer"}>
              WebM
            </SelectItem>
            <SelectItem value="mp4" disabled>
              MP4 (Not Implement Yet)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-full space-y-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">{isMuted ? <MicOff /> : <Mic />}</div>
          <Switch checked={!isMuted} onCheckedChange={(checked) => setIsMuted(!checked)} />
        </div>
        <div className={"flex gap-2"}>
          {volume === 0 ? <HeadphoneOffIcon /> : <HeadphonesIcon />}
          <Slider value={[volume]} max={100} step={1} className="w-72" onValueChange={(value) => setVolume(value[0])} />
        </div>
      </div>
    </div>
  );
}
