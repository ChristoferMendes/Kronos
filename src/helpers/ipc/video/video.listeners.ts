import { desktopCapturer, dialog, ipcMain } from "electron";
import { VIDEO_GET_SOURCES, VIDEO_SAVE_FILE, VIDEO_SHOW_SAVE_DIALOG } from "./video.channels";
import { writeFile } from "fs";
import { homedir } from "os";
import { join } from "path";

export function addVideoEventListeners() {
  ipcMain.handle(VIDEO_GET_SOURCES, () => desktopCapturer.getSources({ types: ["window", "screen"] }));
  ipcMain.handle(VIDEO_SHOW_SAVE_DIALOG, async () => {
    return await dialog.showSaveDialog({
      buttonLabel: "Save video",
      defaultPath: `vid-${Date.now()}.webm`,
    });
  });
  ipcMain.handle(VIDEO_SAVE_FILE, async (_, arrayBuffer: ArrayBuffer) => {
    const homeDir = homedir();
    const fileName = `vid-${Date.now()}.webm`;
    const videosPath = join(homeDir, "Videos", fileName);
    const buffer = Buffer.from(arrayBuffer);

    writeFile(videosPath, buffer, () => console.log("video saved successfully!"));
  });
}
