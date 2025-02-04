import React from "react";
import { FileVideo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FormatSelectorProps {
  selectedFormat: string;
  onFormatSelect: (format: string) => void;
}

export function FormatSelector({ selectedFormat, onFormatSelect }: Readonly<FormatSelectorProps>) {
  const formatOptions = [
    { id: "mp4", label: "MP4" },
    { id: "webm", label: "WebM", disabled: true },
    { id: "mov", label: "MOV", disabled: true },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <FileVideo className="h-4 w-4" />
        <span className="text-sm font-medium">Format</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {formatOptions.map((option) => (
          <>
            {option.disabled ? (
              <TooltipProvider key={option.id}>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger>
                    <Button
                      key={option.id}
                      disabled
                      variant={selectedFormat === option.id ? "secondary" : "outline"}
                      className="w-full"
                      onClick={() => onFormatSelect(option.id)}
                    >
                      {option.label}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This format is not supported yet. But it's coming soon!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Button
                key={option.id}
                variant={selectedFormat === option.id ? "secondary" : "outline"}
                className="w-full"
                onClick={() => onFormatSelect(option.id)}
              >
                {option.label}
              </Button>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
