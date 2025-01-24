import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWorkspaces } from "@/hooks/useWorkspaces";
import { Label } from "@/components/ui/label";

export function WorkspaceSelector() {
  const { workspaces, selectedWorkspace, selectWorkspace } = useWorkspaces();

  console.log({ workspaces });
  return (
    <div className="relative flex items-center space-x-2">
      <Label>
        Workspace type:
      </Label>
      <Select onValueChange={selectWorkspace} defaultValue={selectedWorkspace?.label}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Workspace" />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.map((workspace) => (
            <SelectItem key={workspace.label} value={workspace.label}>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: workspace.color }} />
                <span>{workspace.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

  )
}