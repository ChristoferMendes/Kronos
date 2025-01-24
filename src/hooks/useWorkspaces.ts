import useLocalStorageState from "use-local-storage-state";
import { Workspace } from "@/lib/types/workspace.types";

const key = "Workspaces";
const selectedKey = "workspaces:selected";

export function useWorkspaces() {
  const [workspaces, setWorkspaces] = useLocalStorageState<Workspace[]>(key, {
    defaultValue: [],
  });
  const [selectedWorkspace, setSelectedWorkspace] = useLocalStorageState<Workspace | undefined>(selectedKey);

  function createWorkspace(newWorkspace: Workspace) {
    setWorkspaces((prevWorkspace) => [...prevWorkspace, newWorkspace]);
  }

  function deleteWorkspace(label: string) {
    const newWorkspaces = workspaces.filter((w) => w.label === label);

    setWorkspaces(newWorkspaces);
  }

  function selectWorkspace(newWorkspace: string) {
    const workspace = workspaces.find(({ label }) => label === newWorkspace);
    if (!workspace) return;
    setSelectedWorkspace(workspace);
  }

  return {
    workspaces,
    selectedWorkspace,
    createWorkspace,
    selectWorkspace,
    deleteWorkspace
  };
}
