import React, { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Workspace } from "@/lib/types/workspace.types";

interface DeleteWorkspaceAlertProps {
  workspace: Workspace;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (deleteFolder: boolean) => void;
}

export function DeleteWorkspaceAlert({ workspace, isOpen, onClose, onConfirm }: Readonly<DeleteWorkspaceAlertProps>) {
  const [deleteFolder, setDeleteFolder] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const isConfirmValid = !deleteFolder || (deleteFolder && confirmText === "I confirm");

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {workspace.label}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this workspace? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="delete-folder"
              checked={deleteFolder}
              onCheckedChange={(checked) => {
                setDeleteFolder(checked as boolean);
                setConfirmText("");
              }}
            />
            <Label htmlFor="delete-folder" className="text-sm text-muted-foreground">
              Also delete folder and its contents from Videos directory
            </Label>
          </div>
          {deleteFolder && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirm-text" className="text-sm text-muted-foreground">
                Type "I confirm" to delete the folder
              </Label>
              <input
                id="confirm-text"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="I confirm"
              />
            </div>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onConfirm(deleteFolder)} disabled={!isConfirmValid}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
