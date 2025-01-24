import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, TrashIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PopoverClose } from "@radix-ui/react-popover";
import { useWorkspaces } from "@/hooks/useWorkspaces";


export function WorkspacesManager() {
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [newWorkspaceColor, setNewWorkspaceColor] = useState("#000000");
  const { createWorkspace, workspaces: workspaceList, deleteWorkspace } = useWorkspaces();

  const handleAddWorkspace = () => {
    createWorkspace({
      color: newWorkspaceColor,
      label: newWorkspaceName,
    });
  };

  const canAdd = newWorkspaceName && newWorkspaceName.trim().length > 0;

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="ml-auto">
            <Plus className="mr-2 h-4 w-4" /> Add Workspace
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">New Workspace</h4>
              <p className="text-sm text-muted-foreground">
                Create a new workspace with custom name and color
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={newWorkspaceName} onChange={(e) => setNewWorkspaceName(e.target.value)} placeholder="Ex: Project Management" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="color">Color</Label>
              <Input id="color" type="color" value={newWorkspaceColor} onChange={(e) => setNewWorkspaceColor(e.target.value)} />
            </div>
            <PopoverClose asChild>
              <Button onClick={handleAddWorkspace} disabled={!canAdd}>
                Add
              </Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
      <div className="mt-4 space-y-2">
        {workspaceList?.map((workspace) => (
          <div
            key={workspace.label}
            className="flex items-center space-x-2 rounded p-2"
            style={{ backgroundColor: workspace.color + "20" }}
          >
            <div className="h-4 w-4 rounded-full" style={{ backgroundColor: workspace.color }} />
            <span>{workspace.label}</span>
            <div className={"flex flex-1 items-center justify-end"}>
              <Dialog>
                <DialogTrigger>
                  <TrashIcon className="h-4 w-4 cursor-pointer rounded-full" />
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Delete {workspace.label}</DialogTitle>
                  <DialogDescription>Are you sure you want to delete the {workspace.label} workspace?</DialogDescription>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant={"outline"}>No</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button onClick={() => deleteWorkspace(workspace.label)}>Yes</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
