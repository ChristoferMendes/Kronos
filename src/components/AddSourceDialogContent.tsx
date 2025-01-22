import { useVideoRef } from "@/hooks/useVideoRef";
import { useGlobalVideoSources } from "@/store/useGlobalVideoSources";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";

export function AddSourceDialogContent() {
  const { videoSources } = useGlobalVideoSources();
  const { videoRef, setStream } = useVideoRef(videoSources[0]?.id);

  return (
    <div className="">
      <DialogHeader className="mb-2">Add Video Source</DialogHeader>
      <video ref={videoRef} autoPlay muted className=""></video>
      <div className="mt-4">
        <Select onValueChange={setStream}>
          <SelectTrigger>
            <SelectValue placeholder="Select Video Source" />
          </SelectTrigger>
          <SelectContent>
            {videoSources.map((source) => (
              <SelectItem key={source.id} value={source.id}>
                {source.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DialogFooter className="mt-8">
        <Button variant={"outline"}>Cancel</Button>
        <Button>Save</Button>
      </DialogFooter>
    </div>
  );
}
