import { VIDEO_GET_SOURCES, VIDEO_SAVE_FILE, VIDEO_SHOW_SAVE_DIALOG } from "./video.channels";

export function exposeVideoContext() {
  const { contextBridge, ipcRenderer } = window.require("electron");
  contextBridge.exposeInMainWorld("video", {
    getSources: () => ipcRenderer.invoke(VIDEO_GET_SOURCES),
    showSaveDialog: (blob: Blob) => ipcRenderer.invoke(VIDEO_SHOW_SAVE_DIALOG, blob),
    saveFile: async (arrayBuffer: ArrayBuffer) => ipcRenderer.invoke(VIDEO_SAVE_FILE, arrayBuffer),
  });
}
