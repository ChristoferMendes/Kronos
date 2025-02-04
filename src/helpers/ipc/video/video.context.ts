import {
  VIDEO_DELETE_FOLDER,
  VIDEO_DELETE_VIDEOS,
  VIDEO_GET_SOURCES,
  VIDEO_GET_VIDEOS,
  VIDEO_SAVE_FILE,
  VIDEO_SHOW_SAVE_DIALOG,
} from "./video.channels";
import { SelectedFile } from "@/lib/types/video.types";

export function exposeVideoContext() {
  const { contextBridge, ipcRenderer } = window.require("electron");
  contextBridge.exposeInMainWorld("video", {
    getSources: () => ipcRenderer.invoke(VIDEO_GET_SOURCES),
    showSaveDialog: (blob: Blob) => ipcRenderer.invoke(VIDEO_SHOW_SAVE_DIALOG, blob),
    saveFile: async (arrayBuffer: ArrayBuffer, selectedWorkspace?: string, folder?: string) =>
      ipcRenderer.invoke(VIDEO_SAVE_FILE, arrayBuffer, selectedWorkspace, folder),
    getVideos: (types: string[], selectedWorkspace?: string) => ipcRenderer.invoke(VIDEO_GET_VIDEOS, types, selectedWorkspace),
    deleteVideos: (selectedFiles: SelectedFile[]) => ipcRenderer.invoke(VIDEO_DELETE_VIDEOS, selectedFiles),
    deleteFolder: (path: string) => ipcRenderer.invoke(VIDEO_DELETE_FOLDER, path),
  });
}
