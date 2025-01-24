import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";
import { useGetRecordingTypes } from "@/hooks/useGetRecordingTypes";

export function RecordingTypesList() {
  const { recordingTypes } = useGetRecordingTypes();

  return (
    <div className="flex items-center space-x-2">
      <Label>Recording Type:</Label>
      <Select>
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
    </div>
  );
}
