import React, { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Pencil, Trash2 } from "lucide-react";
import { Workspace } from "@/lib/types/workspace.types";
import { EditWorkspaceDialog } from "./EditWorkspaceDialog";
import { DeleteWorkspaceAlert } from "./DeleteWorkspaceAlert";

interface WorkspaceItemProps {
  workspace: Workspace;
  onSelect: (workspace: Workspace) => void;
  onEdit: (old: Workspace, workspace: Workspace) => void;
  onDelete: (workspace: Workspace, deleteFolder: boolean) => void;
}

export function WorkspaceItem({ workspace, onSelect, onEdit, onDelete }: Readonly<WorkspaceItemProps>) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <DropdownMenuItem onSelect={() => onSelect(workspace)}>
            <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: workspace.color }}></div>
            <span>{workspace.label}</span>
          </DropdownMenuItem>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => setIsEditOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            <span>Edit Workspace</span>
          </ContextMenuItem>
          <ContextMenuItem className="text-red-600" onClick={() => setIsDeleteOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete Workspace</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <EditWorkspaceDialog
        workspace={workspace}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={(updatedWorkspace) => {
          onEdit(workspace, updatedWorkspace);
          setIsEditOpen(false);
        }}
      />

      <DeleteWorkspaceAlert
        workspace={workspace}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={(deleteFolder) => {
          onDelete(workspace, deleteFolder);
          setIsDeleteOpen(false);
        }}
      />
    </>
  );
}