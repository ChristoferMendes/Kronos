import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RecordingType } from "@/types/recording-types.types";
interface EditRecordingTypeDialogProps {
  recordingType: RecordingType;
  isOpen: boolean;
  onClose: () => void;
  onSave: (recordingType: RecordingType) => void;
}

export function EditRecordingTypeDialog({ recordingType, isOpen, onClose, onSave }: EditRecordingTypeDialogProps) {
  const [name, setName] = useState(recordingType.label);
  const [color, setColor] = useState(recordingType.color);

  const handleSave = () => {
    onSave({
      label: name,
      color: color,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Recording Type</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Tutorial"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="color">Color</Label>
            <Input
              id="color"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 