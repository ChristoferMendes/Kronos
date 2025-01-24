import { desktopCapturer, dialog, ipcMain } from "electron";
import { VIDEO_GET_SOURCES, VIDEO_GET_VIDEOS, VIDEO_SAVE_FILE, VIDEO_SHOW_SAVE_DIALOG } from "./video.channels";
import { writeFile, readdirSync } from "fs";
import { homedir } from "os";
import { join } from "path";

import { createFolderIfNotExists, getFileInfoFromFolder } from "../../../utils/server/file.utils"; //Rollup cannot import this properly with @
import { getVideoDateFormat } from "../../../utils/server/date.utils";
import type { RecordingType } from "@/types/recording-types.types"; //Rollup cannot import this properly with @

export function addVideoEventListeners() {
  ipcMain.handle(VIDEO_GET_SOURCES, () => desktopCapturer.getSources({ types: ["window", "screen"] }));
  ipcMain.handle(VIDEO_SHOW_SAVE_DIALOG, async () => {
    return await dialog.showSaveDialog({
      buttonLabel: "Save video",
      defaultPath: `vid-${Date.now()}.webm`,
    });
  });
  ipcMain.handle(VIDEO_SAVE_FILE, async (_, arrayBuffer: ArrayBuffer, folder?: string) => {
    const homeDir = homedir();
    if (folder) createFolderIfNotExists(join(homeDir, "Videos", folder));
    const date = getVideoDateFormat();

    const fileName = folder ? `${folder}-${date}.webm` : `${date}.webm`;
    const filePath = folder ? join(folder, fileName) : fileName;
    const videosPath = join(homeDir, "Videos", filePath);
    const buffer = Buffer.from(arrayBuffer);

    writeFile(videosPath, buffer, () => console.log("video saved successfully!"));
  });
  ipcMain.handle(VIDEO_GET_VIDEOS, (_, recordingTypes: RecordingType[]) => {
    const videosFolder = join(homedir(), "Videos");


    return recordingTypes.map((type) => {
      const folder = join(videosFolder, type.label);
      const files = getFileInfoFromFolder(folder);

      return {
        ...type,
        files,
      };
    });
  });
}
