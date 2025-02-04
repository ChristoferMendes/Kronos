import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusCircle, FolderOpen } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useWorkspaces } from "@/hooks/useWorkspaces";
import { useDisclosure } from "@/hooks/useDisclosure";
import { WorkspaceItem } from "./WorkspaceItem";
import { Workspace } from "@/lib/types/workspace.types";

export function WorkspaceSelector() {
  const {
    workspaces,
    selectedWorkspace,
    createWorkspace,
    selectWorkspace,
    updateWorkspace,
    deleteWorkspace,
    deleteWorkspaceFolder,
  } = useWorkspaces();
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [newWorkspaceColor, setNewWorkspaceColor] = useState("#000000");
  const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose, onChange: onDialogChange } = useDisclosure();
  const { isOpen: isDropdownOpen, onClose: onDropdownClose, onChange: onDropdownChange } = useDisclosure();

  function handleCreateWorkspace() {
    createWorkspace({ label: newWorkspaceName, color: newWorkspaceColor });
    setNewWorkspaceName("");
    setNewWorkspaceColor("#000000");
    onDialogClose();
  }

  function handleEditWorkspace(old: Workspace, updatedWorkspace: Workspace) {
    updateWorkspace(old.label, updatedWorkspace);
    const isSameWorkspaceAsSelected = old.label === selectedWorkspace?.label;
    if (isSameWorkspaceAsSelected) {
      selectWorkspace(updatedWorkspace);
    }
  }

  async function handleDeleteWorkspace(workspace: Workspace, deleteFolder: boolean) {
    deleteWorkspace(workspace.label);
    if (deleteFolder) await deleteWorkspaceFolder(workspace.label);
    onDropdownClose();
  }

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={onDropdownChange}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-[200px] justify-start">
            <div className="flex flex-1 items-center">
              <FolderOpen className="mr-2 h-4 w-4" color={selectedWorkspace?.color ?? "white"} />
              <span>{selectedWorkspace?.label ?? "Select Workspace"}</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
          <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {workspaces.map((workspace) => (
            <WorkspaceItem
              key={workspace.label}
              workspace={workspace}
              onSelect={selectWorkspace}
              onEdit={handleEditWorkspace}
              onDelete={handleDeleteWorkspace}
            />
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              onDropdownClose();
              onDialogOpen();
            }}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>New Workspace</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={onDialogChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Workspace</DialogTitle>
            <DialogDescription>Add a new workspace to organize your recordings.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                placeholder="Ex: Project Management"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="color">Color</Label>
              <Input id="color" type="color" value={newWorkspaceColor} onChange={(e) => setNewWorkspaceColor(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onDialogClose}>
              Cancel
            </Button>
            <Button onClick={handleCreateWorkspace}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
