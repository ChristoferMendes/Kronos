import React, { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Pencil, Trash2 } from "lucide-react";
import { EditRecordingTypeDialog } from "./EditRecordingTypeDialog";
import { DeleteRecordingTypeAlert } from "./DeleteRecordingTypeAlert";
import { RecordingType } from "@/types/recording-types.types";

interface RecordingTypeItemProps {
  recordingType: RecordingType;
  onSelect: (recordingType: RecordingType) => void;
  onEdit: (old: RecordingType, recordingType: RecordingType) => void;
  onDelete: (recordingType: RecordingType) => void;
}

export function RecordingTypeItem({ recordingType, onSelect, onEdit, onDelete }: Readonly<RecordingTypeItemProps>) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  function releasePointerEvents() {
    setTimeout(() => (document.body.style.pointerEvents = ""), 100)
  }

  return (
    <>
      <ContextMenu onOpenChange={releasePointerEvents}>
        <ContextMenuTrigger>
          <DropdownMenuItem onSelect={() => onSelect(recordingType)}>
            <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: recordingType.color }}></div>
            <span>{recordingType.label}</span>
          </DropdownMenuItem>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => setIsEditOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            <span>Edit Type</span>
          </ContextMenuItem>
          <ContextMenuItem className="text-red-600" onClick={() => setIsDeleteOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete Type</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <EditRecordingTypeDialog
        recordingType={recordingType}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={(updatedType) => {
          onEdit(recordingType, updatedType);
          setIsEditOpen(false);
        }}
      />

      <DeleteRecordingTypeAlert
        recordingType={recordingType}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          onDelete(recordingType);
          setIsDeleteOpen(false);
        }}
      />
    </>
  );
} 