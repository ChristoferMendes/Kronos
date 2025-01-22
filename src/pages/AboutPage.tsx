import { Controls } from "@/components/Controls";
import { useGetVideoSources } from "@/hooks/useGetVideoSources";
import { useVideoRef } from "@/hooks/useVideoRef";
import React from "react";
import ToggleTheme from "@/components/ToggleTheme";
import { Skeleton } from "@/components/Skeleton";
import { Sources } from "@/components/Sources";

export default function AboutPage() {
  const { videoSources, isGetVideoSourcesLoading } = useGetVideoSources();
  const { videoRef } = useVideoRef(videoSources[0]?.id);

  return (
    <div className="flex h-screen flex-col">
      <ToggleTheme />
      <div className="flex h-[65%] w-full items-center justify-center">
        <div className="h-full w-[65%]">
          {isGetVideoSourcesLoading ? (
            <Skeleton className="h-full w-full object-contain" />
          ) : (
            <video ref={videoRef} autoPlay muted playsInline className="h-full w-full object-contain"></video>
          )}
        </div>
      </div>
      <div className="flex w-full flex-1 gap-1">
        <Sources />
        <Controls />
      </div>
    </div>
  );
}
