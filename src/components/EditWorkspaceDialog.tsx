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
import { Workspace } from "@/lib/types/workspace.types";

interface EditWorkspaceDialogProps {
  workspace: Workspace;
  isOpen: boolean;
  onClose: () => void;
  onSave: (workspace: Workspace) => void;
}

export function EditWorkspaceDialog({ workspace, isOpen, onClose, onSave }: EditWorkspaceDialogProps) {
  const [name, setName] = useState(workspace.label);
  const [color, setColor] = useState(workspace.color);

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
          <DialogTitle>Edit Workspace</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Project Management"
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