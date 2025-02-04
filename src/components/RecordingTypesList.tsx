import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";
import { useGetRecordingTypes } from "@/hooks/useGetRecordingTypes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";

export function RecordingTypesList() {
  const { recordingTypes, setSelectedRecording } = useGetRecordingTypes();

  return (
    <div className="relative flex items-center space-x-2">
      <Label>Recording Type:</Label>

      <Select onValueChange={setSelectedRecording} value={selectedRecording} key={selectedRecording}>
        {" "}
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          {recordingTypes?.map((type) => (
            <SelectItem key={type.label} value={type.label}>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: type.color }} />
                <span>{type.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <CircleHelp size={22} />
          </TooltipTrigger>
          <TooltipContent className={'w-72'}>
            This type is used to make automatic folders in your ~/Videos folder. You can create and customize type in the
            Recording Types tab
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
