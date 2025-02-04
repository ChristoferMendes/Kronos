import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { RecordingType } from "@/types/recording-types.types";
interface DeleteRecordingTypeAlertProps {
  recordingType: RecordingType;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteRecordingTypeAlert({ recordingType, isOpen, onClose, onConfirm }: Readonly<DeleteRecordingTypeAlertProps>) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {recordingType.label}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this recording type? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 