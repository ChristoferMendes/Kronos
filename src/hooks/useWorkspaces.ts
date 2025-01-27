import useLocalStorageState from "use-local-storage-state";
import { Workspace } from "@/lib/types/workspace.types";
import { useGetRecordings } from "@/hooks/useGetRecordings";
import { useGlobalRecordings } from "@/store/useGlobalRecordings";
import { useGetRecordingTypes } from "@/hooks/useGetRecordingTypes";

const key = "Workspaces";
const selectedKey = "workspaces:selected";

export function useWorkspaces() {
  const [workspaces, setWorkspaces] = useLocalStorageState<Workspace[]>(key, {
    defaultValue: [],
  });
  const [selectedWorkspace, setSelectedWorkspace] = useLocalStorageState<Workspace | undefined>(selectedKey);
  const {  setRecordings } = useGlobalRecordings();
  const { recordingTypes } = useGetRecordingTypes();

  function createWorkspace(newWorkspace: Workspace) {
    setWorkspaces((prevWorkspace) => [...prevWorkspace, newWorkspace]);
  }

  function deleteWorkspace(label: string) {
    const isSelected = selectedWorkspace?.label === label;
    if (isSelected) {
      setSelectedWorkspace(undefined);
    }
    const newWorkspaces = workspaces.filter((w) => w.label !== label);


    setWorkspaces(newWorkspaces);
  }

  async function getRecordings() {
    const { video } = window;

    const videos = await video.getVideos(recordingTypes, selectedWorkspace?.label);
    setRecordings(videos);
  }


  function selectWorkspace(newWorkspace: string) {
    const workspace = workspaces.find(({ label }) => label === newWorkspace);
    if (!workspace) return;
    setSelectedWorkspace(workspace);
    getRecordings();
  }

  return {
    workspaces,
    selectedWorkspace,
    createWorkspace,



    selectWorkspace,
    deleteWorkspace
  };
}
