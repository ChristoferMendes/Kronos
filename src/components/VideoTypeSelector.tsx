"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const videoTypes = [
  "Daily",
  "Business Refinement",
  "Tech Refinement",
  "Sprint Review",
  "Sprint Retrospective",
  "Sprint Planning",
  "Backlog Retro",
];

export function VideoTypeSelector() {
  const [selectedType, setSelectedType] = useState<string>("Select Video Type");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px]"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {selectedType}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
        <div className="py-2">
          {videoTypes.map((type) => (
            <Button
              key={type}
              variant="ghost"
              className="w-full justify-start px-4 py-2 text-sm"
              onClick={() => {
                setSelectedType(type);
                setIsOpen(false);
              }}
            >
              {type}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
