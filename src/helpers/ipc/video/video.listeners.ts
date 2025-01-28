import { desktopCapturer, dialog, ipcMain } from "electron";
import {
  VIDEO_DELETE_VIDEOS,
  VIDEO_GET_SOURCES,
  VIDEO_GET_VIDEOS,
  VIDEO_SAVE_FILE,
  VIDEO_SHOW_SAVE_DIALOG,
} from "./video.channels";
import { writeFile } from "fs";
import { homedir } from "os";
import { join } from "path";

import { createFolderIfNotExists, deleteFile, getFileInfoFromFolder } from "../../../utils/server/file.utils"; //Rollup cannot import this properly with @
import { getVideoDateFormat } from "../../../utils/server/date.utils"; //Rollup cannot import this properly with @
import type { RecordingType } from "@/types/recording-types.types";
import { SelectedFile } from "@/lib/types/video.types";

export function addVideoEventListeners() {
  ipcMain.handle(VIDEO_GET_SOURCES, () => desktopCapturer.getSources({ types: ["window", "screen"] }));
  ipcMain.handle(VIDEO_SHOW_SAVE_DIALOG, async () => {
    return await dialog.showSaveDialog({
      buttonLabel: "Save video",
      defaultPath: `vid-${Date.now()}.webm`,
    });
  });
  ipcMain.handle(VIDEO_SAVE_FILE, async (_, arrayBuffer: ArrayBuffer, selectedWorkspace?: string, folder?: string) => {
    const homeDir = homedir();
    const videosRootPath = join(homeDir, "Videos");
    if (selectedWorkspace && folder) createFolderIfNotExists(join(videosRootPath, selectedWorkspace, folder));
    if (!selectedWorkspace && folder) createFolderIfNotExists(join(videosRootPath, folder));

    const date = getVideoDateFormat();

    function getFileFolder() {
      if (selectedWorkspace && folder) {
        return join(selectedWorkspace, folder);
      }
      if (folder && !selectedWorkspace) {
        return folder;
      }

      if (selectedWorkspace) {
        return selectedWorkspace;
      }

      return null;
    }

    const fileName = folder ? `${folder}-${date}.webm` : `${date}.webm`;
    const folderPath = getFileFolder();
    const filePath = folderPath ? join(folderPath, fileName) : fileName;
    const videosPath = join(videosRootPath, filePath);
    const buffer = Buffer.from(arrayBuffer);

    writeFile(videosPath, buffer, () => console.log("video saved successfully!"));
  });
  ipcMain.handle(VIDEO_GET_VIDEOS, (_, recordingTypes: RecordingType[], selectedWorkspace?: string) => {
    const videosFolder = selectedWorkspace ? join(homedir(), "Videos", selectedWorkspace) : join(homedir(), "Videos");

    return recordingTypes.map((type) => {
      const folder = join(videosFolder, type.label);
      const files = getFileInfoFromFolder(folder);

      return {
        ...type,
        files,
      };
    });
  });
  ipcMain.handle(VIDEO_DELETE_VIDEOS, async (_, selectedFiles: SelectedFile[]) => {
    const videosFolder = join(homedir(), "Videos");

    for (const route of selectedFiles) {
      for (const file of route.files) {
        const path = join(videosFolder, route.label, file);
        deleteFile(path);
      }
    }
  });
}
