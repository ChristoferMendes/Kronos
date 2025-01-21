"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";

const videoTypes = [
  "Daily",
  "Business Refinement",
  "Tech Refinement",
  "Sprint Review",
  "Sprint Retrospective",
  "Sprint Planning",
  "Backlog Retro",
];

interface Props {
  onClick: (type: string) => void;
  isRecording: boolean;
}

export function VideoTypeSelector({ onClick, isRecording }: Readonly<Props>) {
  const [selectedType, setSelectedType] = useState<string>("Select Video Type");
  const isDefaultType = selectedType === "Select Video Type";

  function handleClick() {
    if (isDefaultType) return;

    onClick(selectedType);
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Button variant={isRecording ? "destructive" : "default"} className="w-[300px]" onClick={handleClick}>
          {isRecording ? "Stop Recording" : "Start Recording"} {selectedType}
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-[200px]">
        {videoTypes.map((type) => (
          <ContextMenuItem key={type} onClick={() => setSelectedType(type)}>
            {type}
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}
